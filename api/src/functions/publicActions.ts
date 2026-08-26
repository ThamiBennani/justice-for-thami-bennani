import { createHash, randomUUID } from 'node:crypto'
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { TableClient, TableEntity } from '@azure/data-tables'
import { QueueServiceClient } from '@azure/storage-queue'

const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean))
const languages = new Set(['en', 'ar', 'fr', 'es', 'de', 'tr', 'it', 'zgh', 'nl', 'ja', 'zh'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const tableName = 'publicactions'
const welcomeQueueName = 'newsletter-welcome'

type Body = Record<string, unknown>
type PetitionCounter = { partitionKey: string; rowKey: string; count: number; etag?: string }
type PetitionFeedEntry = { initials?: string; createdAt?: string }
type RateLimit = { partitionKey: string; rowKey: string; count: number; etag?: string }

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const getOrigin = (request: HttpRequest) => {
  const origin = request.headers.get('origin') || ''
  if (allowedOrigins.has(origin)) return origin
  return ''
}

const response = (request: HttpRequest, jsonBody: Body, status = 200): HttpResponseInit => {
  const origin = getOrigin(request)
  return {
    status,
    jsonBody,
    headers: {
      'Cache-Control': 'no-store',
      ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
    },
  }
}

const getTable = async () => {
  const connectionString = process.env.TABLE_STORAGE_CONNECTION_STRING
  if (!connectionString) throw new Error('TABLE_STORAGE_CONNECTION_STRING is not configured')
  const table = TableClient.fromConnectionString(connectionString, tableName)
  await table.createTable().catch(error => {
    if (error.statusCode !== 409) throw error
  })
  return table
}

const hashEmail = (email: string) => {
  const salt = process.env.EMAIL_HASH_SALT
  if (!salt) throw new Error('EMAIL_HASH_SALT is not configured')
  return createHash('sha256').update(`${salt}:${email}`).digest('hex')
}

const enqueueNewsletterWelcome = async (subscriberId: string) => {
  const connectionString = process.env.TABLE_STORAGE_CONNECTION_STRING
  if (!connectionString) throw new Error('TABLE_STORAGE_CONNECTION_STRING is not configured')
  const queueService = QueueServiceClient.fromConnectionString(connectionString)
  const queue = queueService.getQueueClient(welcomeQueueName)
  await queue.createIfNotExists()
  await queue.sendMessage(Buffer.from(JSON.stringify({ subscriberId })).toString('base64'))
}

const enforceRateLimit = async (table: TableClient, request: HttpRequest, action: string) => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (!forwardedFor) throw new Error('RATE_LIMITED')
  const hour = new Date().toISOString().slice(0, 13)
  const partitionKey = `rate-${hour}`
  const rowKey = hashEmail(`${action}:${forwardedFor}`)
  const limit = action === 'contact' ? 3 : 5

  for (let attempt = 0; attempt < 4; attempt += 1) {
    let entity: RateLimit
    try {
      entity = await table.getEntity<RateLimit>(partitionKey, rowKey)
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode !== 404) throw error
      try {
        await table.createEntity({ partitionKey, rowKey, count: 1 })
        return
      } catch (createError) {
        if ((createError as { statusCode?: number }).statusCode !== 409) throw createError
        continue
      }
    }

    if (entity.count >= limit) throw new Error('RATE_LIMITED')
    try {
      await table.updateEntity({ ...entity, count: entity.count + 1 }, 'Replace')
      return
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode !== 412 || attempt === 3) throw error
    }
  }
}

const getPetitionCount = async (table: TableClient) => {
  try {
    const counter = await table.getEntity<PetitionCounter>('petition', '__counter')
    return counter.count
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode !== 404) throw error
    return 0
  }
}

const getInitials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => Array.from(part)[0]?.toLocaleUpperCase() || '')
  .join('')

const getPetitionSummary = async (table: TableClient) => {
  const signatures: { initials: string; signedAt: string }[] = []
  const pages = table.listEntities<PetitionFeedEntry>({
    queryOptions: {
      filter: `PartitionKey eq 'petition-feed'`,
      select: ['initials', 'createdAt'],
    },
  }).byPage({ maxPageSize: 24 })

  for await (const page of pages) {
    for (const entity of page) {
      const initials = clean(entity.initials)
      if (initials) signatures.push({ initials, signedAt: clean(entity.createdAt) })
    }
    break
  }

  return { count: await getPetitionCount(table), signers: signatures }
}

const addPetitionFeedEntry = async (table: TableClient, name: string, createdAt: string) => {
  const reverseTimestamp = String(Number.MAX_SAFE_INTEGER - Date.parse(createdAt)).padStart(16, '0')
  await table.createEntity({
    partitionKey: 'petition-feed',
    rowKey: `${reverseTimestamp}-${randomUUID()}`,
    initials: getInitials(name),
    createdAt,
  })
}

const addSignature = async (table: TableClient, entity: TableEntity<Record<string, unknown>>) => {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    let counter: PetitionCounter
    try {
      counter = await table.getEntity<PetitionCounter>('petition', '__counter')
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode !== 404) throw error
      try {
        await table.createEntity({ partitionKey: 'petition', rowKey: '__counter', count: 0 })
      } catch (createError) {
        if ((createError as { statusCode?: number }).statusCode !== 409) throw createError
      }
      continue
    }

    try {
      await table.submitTransaction([
        ['create', entity],
        ['update', { ...counter, count: counter.count + 1 }, 'Replace'],
      ])
      return
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode
      if (status === 409) throw new Error('DUPLICATE_SIGNATURE')
      if (status !== 412 || attempt === 3) throw error
    }
  }
}

async function publicActions(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const origin = getOrigin(request)
  if (!origin) return response(request, { message: 'Origin not allowed.' }, 403)

  if (request.method === 'OPTIONS') {
    return { status: 204, headers: { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', Vary: 'Origin' } }
  }

  try {
    const table = await getTable()

    if (request.method === 'GET' && request.query.get('action') === 'petition-summary') {
      return response(request, await getPetitionSummary(table))
    }
    if (request.method === 'GET' && request.query.get('action') === 'petition-count') {
      return response(request, { count: await getPetitionCount(table) })
    }
    if (request.method !== 'POST') return response(request, { message: 'Method not allowed.' }, 405)

    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 12_000) return response(request, { message: 'Request too large.' }, 413)

    let body: Body
    try {
      body = await request.json() as Body
    } catch {
      return response(request, { message: 'Invalid request.' }, 400)
    }

    if (clean(body.website)) return response(request, { accepted: true })

    const action = clean(body.action)
    if (!['petition', 'newsletter', 'contact'].includes(action)) return response(request, { message: 'Unknown action.' }, 400)
    try {
      await enforceRateLimit(table, request, action)
    } catch (error) {
      if ((error as Error).message === 'RATE_LIMITED') return response(request, { message: 'Too many requests. Please try again later.' }, 429)
      throw error
    }
    const language = languages.has(clean(body.language)) ? clean(body.language) : 'en'
    const now = new Date().toISOString()

    if (action === 'petition') {
      const name = clean(body.name)
      const email = clean(body.email).toLowerCase()
      const country = clean(body.country)
      if (name.length < 2 || name.length > 100 || country.length < 2 || country.length > 80 || email.length > 254 || (email && !emailPattern.test(email))) return response(request, { message: 'Invalid petition details.' }, 400)
      try {
        await addSignature(table, { partitionKey: 'petition', rowKey: email ? hashEmail(email) : randomUUID(), name, country, language, createdAt: now })
      } catch (error) {
        if ((error as Error).message === 'DUPLICATE_SIGNATURE') return response(request, { message: email ? 'This email has already signed.' : 'This signature could not be recorded.' }, 409)
        throw error
      }
      await addPetitionFeedEntry(table, name, now)
      return response(request, { accepted: true }, 201)
    }

    if (action === 'newsletter') {
      const email = clean(body.email).toLowerCase()
      if (body.consent !== true || email.length > 254 || !emailPattern.test(email)) return response(request, { message: 'Valid email and consent are required.' }, 400)
      const subscriberId = hashEmail(email)
      try {
        await table.createEntity({ partitionKey: 'newsletter', rowKey: subscriberId, email, language, consentedAt: now, status: 'pending' })
      } catch (error) {
        if ((error as { statusCode?: number }).statusCode !== 409) throw error
        const subscriber = await table.getEntity<Record<string, unknown>>('newsletter', subscriberId)
        if (subscriber.welcomeQueuedAt || subscriber.welcomeSentAt) return response(request, { accepted: true })
      }
      await enqueueNewsletterWelcome(subscriberId)
      await table.updateEntity({ partitionKey: 'newsletter', rowKey: subscriberId, welcomeQueuedAt: now }, 'Merge')
      return response(request, { accepted: true }, 201)
    }

    if (action === 'contact') {
      const message = clean(body.message)
      if (message.length < 20 || message.length > 5000) return response(request, { message: 'Message must be between 20 and 5,000 characters.' }, 400)
      await table.createEntity({ partitionKey: 'messages', rowKey: randomUUID(), message, language, createdAt: now, reviewed: false })
      return response(request, { accepted: true }, 201)
    }

    return response(request, { message: 'Unknown action.' }, 400)
  } catch (error) {
    context.error('Public action failed', error)
    return response(request, { message: 'Service unavailable.' }, 503)
  }
}

app.http('public-actions', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'public-actions',
  handler: publicActions,
})
