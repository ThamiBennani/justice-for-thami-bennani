import { EmailClient } from '@azure/communication-email'
import { app, InvocationContext } from '@azure/functions'
import { TableClient } from '@azure/data-tables'

const tableName = 'publicactions'

const messages: Record<string, { subject: string; heading: string; body: string; spam: string }> = {
  en: {
    subject: 'Thank you for subscribing',
    heading: 'Thank you for subscribing',
    body: 'You are now subscribed to important court and campaign updates about the Thami Bennani case.',
    spam: 'To make sure you receive the newsletter, add this sender to your contacts and check your spam or junk folder.',
  },
  ar: {
    subject: 'شكراً لاشتراكك',
    heading: 'شكراً لاشتراكك',
    body: 'لقد اشتركت الآن لتلقي أهم مستجدات المحكمة والحملة المتعلقة بقضية التهامي بناني.',
    spam: 'لضمان توصلك بالنشرة، أضف عنوان المرسل إلى جهات اتصالك وتحقق من مجلد الرسائل غير المرغوب فيها.',
  },
  fr: {
    subject: 'Merci pour votre inscription',
    heading: 'Merci pour votre inscription',
    body: "Vous êtes maintenant inscrit(e) pour recevoir les principales actualités judiciaires et de la campagne concernant l'affaire Thami Bennani.",
    spam: "Pour ne pas manquer la newsletter, ajoutez cette adresse à vos contacts et vérifiez votre dossier de courriers indésirables.",
  },
  es: {
    subject: 'Gracias por suscribirte',
    heading: 'Gracias por suscribirte',
    body: 'Ya estás suscrito a las novedades importantes del tribunal y de la campaña sobre el caso de Thami Bennani.',
    spam: 'Para no perderte el boletín, añade este remitente a tus contactos y revisa la carpeta de correo no deseado.',
  },
  de: {
    subject: 'Vielen Dank für Ihre Anmeldung',
    heading: 'Vielen Dank für Ihre Anmeldung',
    body: 'Sie erhalten künftig wichtige Gerichts- und Kampagnenmeldungen zum Fall Thami Bennani.',
    spam: 'Fügen Sie diesen Absender Ihren Kontakten hinzu und prüfen Sie Ihren Spam-Ordner, damit Sie den Newsletter nicht verpassen.',
  },
  tr: {
    subject: 'Abone olduğunuz için teşekkürler',
    heading: 'Abone olduğunuz için teşekkürler',
    body: 'Thami Bennani davasıyla ilgili önemli mahkeme ve kampanya gelişmelerine artık abonesiniz.',
    spam: 'Bülteni kaçırmamak için bu göndericiyi kişilerinize ekleyin ve spam ya da gereksiz klasörünüzü kontrol edin.',
  },
  it: {
    subject: "Grazie per l'iscrizione",
    heading: "Grazie per l'iscrizione",
    body: 'Ora riceverai gli aggiornamenti più importanti sul tribunale e sulla mobilitazione relativi al caso Thami Bennani.',
    spam: 'Per non perdere la newsletter, aggiungi questo mittente ai contatti e controlla la cartella della posta indesiderata.',
  },
  zgh: {
    subject: 'ⵜⴰⵏⵎⵎⵉⵔⵜ ⴼ ⵓⵍⴽⴰⵎ',
    heading: 'ⵜⴰⵏⵎⵎⵉⵔⵜ ⴼ ⵓⵍⴽⴰⵎ',
    body: 'ⵜⵍⴽⵎⴷ ⴷⵖⵉ ⴰⴼⴰⴷ ⴰⴷ ⴽ ⵉⴷ ⴰⵡⴹⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ ⵉⵎⵇⵇⵔⴰⵏⵏ ⵏ ⵜⵎⵀⵍⴰ ⴷ ⵜⵎⵙⴰⵍⵜ ⵏ ⵜⴰⵎⵉ ⴱⵏⴰⵏⵉ.',
    spam: 'ⴰⴼⴰⴷ ⴰⴷ ⴽ ⵉⴷ ⵉⵍⴽⵎ ⵓⵍⵖⵓ، ⵔⵏⵓ ⴰⵎⴰⵣⴰⵏ ⴰⴷ ⵖⵔ ⵉⵎⴷⵔⴰⵡⵏ ⵏⵏⴽ، ⵙⵙⵉⴳⴳⵍ ⵓⵍⴰ ⴰⴽⴰⵔⴰⵎ ⵏ spam.',
  },
  nl: {
    subject: 'Dank voor uw inschrijving',
    heading: 'Dank voor uw inschrijving',
    body: 'U ontvangt voortaan belangrijke updates over de rechtszaak en de campagne rond de zaak van Thami Bennani.',
    spam: 'Voeg deze afzender toe aan uw contacten en controleer uw spammap om er zeker van te zijn dat u de nieuwsbrief ontvangt.',
  },
  ja: {
    subject: 'ご登録ありがとうございます',
    heading: 'ご登録ありがとうございます',
    body: 'Thami Bennani事件に関する重要な裁判および活動情報の配信登録が完了しました。',
    spam: 'ニュースレターを確実に受信できるよう、この送信者を連絡先に追加し、迷惑メールフォルダーもご確認ください。',
  },
  zh: {
    subject: '感谢您的订阅',
    heading: '感谢您的订阅',
    body: '您已订阅有关Thami Bennani案件的重要庭审和行动进展。',
    spam: '为确保收到新闻邮件，请将此发件人添加到联系人，并检查垃圾邮件文件夹。',
  },
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character] || character)

async function newsletterWelcome(message: unknown, context: InvocationContext) {
  const connectionString = process.env.TABLE_STORAGE_CONNECTION_STRING
  const emailConnectionString = process.env.ACS_EMAIL_CONNECTION_STRING
  const senderAddress = process.env.ACS_EMAIL_SENDER_ADDRESS
  if (!connectionString || !emailConnectionString || !senderAddress) throw new Error('Newsletter email settings are not configured')

  const payload = typeof message === 'string' ? JSON.parse(message) as { subscriberId?: string } : message as { subscriberId?: string }
  if (!payload.subscriberId) throw new Error('Newsletter queue message has no subscriber ID')

  const table = TableClient.fromConnectionString(connectionString, tableName)
  const subscriber = await table.getEntity<Record<string, unknown>>('newsletter', payload.subscriberId)
  if (subscriber.welcomeSentAt) return

  const email = String(subscriber.email || '')
  const language = String(subscriber.language || 'en')
  const copy = messages[language] || messages.en
  const direction = language === 'ar' ? 'rtl' : 'ltr'
  const fontFamily = language === 'zgh' ? "'Noto Sans Tifinagh','Segoe UI',sans-serif" : 'Arial,sans-serif'
  const client = new EmailClient(emailConnectionString)
  const poller = await client.beginSend({
    senderAddress,
    recipients: { to: [{ address: email }] },
    content: {
      subject: copy.subject,
      plainText: `${copy.heading}\n\n${copy.body}\n\n${copy.spam}\n\nhttps://thamibennani.com`,
      html: `<div dir="${direction}" style="font-family:${fontFamily};max-width:600px;margin:auto;color:#171717;line-height:1.6"><h1 style="font-size:24px">${escapeHtml(copy.heading)}</h1><p>${escapeHtml(copy.body)}</p><p>${escapeHtml(copy.spam)}</p><p><a href="https://thamibennani.com">thamibennani.com</a></p></div>`,
    },
  })
  const result = await poller.pollUntilDone()
  if (result.status !== 'Succeeded') throw new Error(`Welcome email failed: ${result.error?.message || result.status}`)

  await table.updateEntity({
    partitionKey: 'newsletter',
    rowKey: payload.subscriberId,
    status: 'subscribed',
    welcomeSentAt: new Date().toISOString(),
    welcomeMessageId: result.id,
  }, 'Merge')
  context.log('Newsletter welcome email sent', { subscriberId: payload.subscriberId })
}

app.storageQueue('newsletter-welcome', {
  queueName: 'newsletter-welcome',
  connection: 'TABLE_STORAGE_CONNECTION_STRING',
  handler: newsletterWelcome,
})