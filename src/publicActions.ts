export type PublicAction = 'petition' | 'newsletter' | 'contact'

type Submission = {
  action: PublicAction
  language: string
  website: string
  name?: string
  email?: string
  country?: string
  message?: string
  consent?: boolean
}

type ApiResponse = {
  count?: number
  signers?: PetitionSigner[]
  message?: string
}

export type PetitionSigner = {
  initials: string
  signedAt: string
}

export type PetitionSummary = {
  count: number
  signers: PetitionSigner[]
}

const apiUrl = (import.meta.env.VITE_PUBLIC_ACTIONS_URL as string | undefined)?.trim()

export const participationEnabled = Boolean(apiUrl)

const request = async (path: string, init?: RequestInit): Promise<ApiResponse> => {
  if (!apiUrl) throw new Error('Participation service is not configured.')

  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  const data = await response.json().catch(() => ({})) as ApiResponse
  if (!response.ok) throw new Error(data.message || 'Request failed.')
  return data
}

export const getPetitionSummary = async (): Promise<PetitionSummary> => {
  const data = await request('?action=petition-summary')
  return { count: data.count ?? 0, signers: data.signers ?? [] }
}

export const submitPublicAction = (submission: Submission) => request('', {
  method: 'POST',
  body: JSON.stringify(submission),
})
