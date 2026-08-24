import { FormEvent, useEffect, useState } from 'react'
import { Check, Mail, MessageSquare, PenLine } from 'lucide-react'
import { Language } from './content'
import { getPetitionSummary, participationEnabled, PetitionSigner, PublicAction, submitPublicAction } from './publicActions'

type ParticipationCopy = {
  tag: string
  title: string
  intro: string
  petition: string
  petitionBody: string
  signatures: string
  goal: string
  name: string
  email: string
  country: string
  sign: string
  petitionPrivacy: string
  newsletter: string
  newsletterBody: string
  consent: string
  subscribe: string
  contact: string
  contactBody: string
  message: string
  send: string
  anonymity: string
  unavailable: string
  required: string
  success: Record<PublicAction, string>
  error: string
}

const english: ParticipationCopy = {
  tag: 'Take part', title: 'Stand with the call for truth.', intro: 'Sign the petition, receive verified case updates, or send information privately.',
  petition: 'Sign the petition', petitionBody: 'Support the call for full disclosure, due process, and accountability. The first goal is 10,000 signatures.', signatures: 'signatures', goal: 'Initial goal', name: 'Full name', email: 'Email address', country: 'Country', sign: 'Add my signature', petitionPrivacy: 'Your name and email will not be displayed publicly. Your email is converted to a one-way fingerprint to prevent duplicate signatures.',
  newsletter: 'Receive case updates', newsletterBody: 'Subscribe for significant court and campaign updates. We will email you a welcome note after you subscribe.', consent: 'I agree to receive email updates and understand that I can unsubscribe.', subscribe: 'Subscribe',
  contact: 'Send a private message', contactBody: 'Share a correction, source, or message without providing your name or email.', message: 'Your message', send: 'Send message', anonymity: 'No identity is requested. Hosting and security providers may still process technical data such as an IP address to prevent abuse.',
  unavailable: 'Submissions are being prepared and are not yet open.', required: 'Complete the verification before submitting.', error: 'The submission could not be completed. Please try again.',
  success: { petition: 'Your signature has been recorded. Thank you.', newsletter: 'Thank you for subscribing. Check your inbox and spam folder for our welcome email.', contact: 'Your message has been received.' },
}

const copies: Partial<Record<Language, ParticipationCopy>> = {
  ar: { ...english, tag: 'شارك', title: 'ساندوا مطلب الحقيقة.', intro: 'وقّعوا العريضة، وتلقوا مستجدات موثقة، أو أرسلوا معلومات بشكل خاص.', petition: 'وقّع العريضة', petitionBody: 'ساند مطلب الكشف الكامل والحقيقة والمساءلة في إطار القانون. هدفنا الأول 10,000 توقيع.', signatures: 'توقيع', goal: 'الهدف الأول', name: 'الاسم الكامل', email: 'البريد الإلكتروني', country: 'البلد', sign: 'أضف توقيعي', petitionPrivacy: 'لن يُعرض اسمك أو بريدك علنًا. يُحوّل البريد إلى بصمة أحادية الاتجاه لمنع التوقيعات المكررة.', newsletter: 'توصل بمستجدات القضية', newsletterBody: 'اشترك لتلقي أهم مستجدات المحكمة والحملة. سنرسل إليك رسالة ترحيب بعد الاشتراك.', consent: 'أوافق على تلقي المستجدات ويمكنني إلغاء الاشتراك.', subscribe: 'اشترك', contact: 'أرسل رسالة خاصة', contactBody: 'شارك تصحيحًا أو مصدرًا أو رسالة دون تقديم اسمك أو بريدك.', message: 'رسالتك', send: 'أرسل الرسالة', anonymity: 'لا نطلب هويتك. قد يعالج مزودو الاستضافة والحماية بيانات تقنية مثل عنوان IP لمنع إساءة الاستخدام.', unavailable: 'نعمل على تجهيز الاستمارات ولم تُفتح بعد.', required: 'أكمل التحقق قبل الإرسال.', error: 'تعذر إتمام الإرسال. حاول مرة أخرى.', success: { petition: 'تم تسجيل توقيعك. شكرًا لك.', newsletter: 'شكرًا لاشتراكك. تحقق من بريدك الوارد ومجلد الرسائل غير المرغوب فيها لرسالة الترحيب.', contact: 'تم استلام رسالتك.' } },
  fr: { ...english, tag: 'Agir', title: "Soutenez l'appel à la vérité.", intro: "Signez la pétition, recevez des nouvelles vérifiées ou transmettez des informations en privé.", petition: 'Signer la pétition', petitionBody: "Soutenez l'appel à la divulgation complète, au respect de la procédure et à la responsabilité. Premier objectif : 10 000 signatures.", signatures: 'signatures', goal: 'Premier objectif', name: 'Nom complet', email: 'Adresse e-mail', country: 'Pays', sign: 'Ajouter ma signature', petitionPrivacy: "Votre nom et votre e-mail ne seront pas affichés publiquement. L'e-mail est transformé en empreinte irréversible pour éviter les doublons.", newsletter: "Recevoir l'actualité", newsletterBody: "Inscrivez-vous aux principales nouvelles judiciaires et de la mobilisation. Les envois commenceront après la connexion d'un service de newsletter.", consent: "J'accepte de recevoir des nouvelles par e-mail et peux me désinscrire.", subscribe: "S'inscrire", contact: 'Envoyer un message privé', contactBody: 'Partagez une correction, une source ou un message sans indiquer votre nom ni votre e-mail.', message: 'Votre message', send: 'Envoyer', anonymity: "Aucune identité n'est demandée. Les prestataires techniques peuvent néanmoins traiter des données comme l'adresse IP pour prévenir les abus.", unavailable: "Les formulaires sont en préparation et ne sont pas encore ouverts.", required: "Effectuez la vérification avant l'envoi.", error: "L'envoi n'a pas abouti. Veuillez réessayer.", success: { petition: 'Votre signature a été enregistrée. Merci.', newsletter: 'Votre inscription a été enregistrée.', contact: 'Votre message a été reçu.' } },
  es: { ...english, tag: 'Participa', title: 'Apoya la petición de verdad.', intro: 'Firma la petición, recibe novedades verificadas o envía información en privado.', petition: 'Firma la petición', petitionBody: 'Apoya la divulgación completa, el debido proceso y la rendición de cuentas. La primera meta son 10.000 firmas.', signatures: 'firmas', goal: 'Meta inicial', name: 'Nombre completo', email: 'Correo electrónico', country: 'País', sign: 'Añadir mi firma', petitionPrivacy: 'Tu nombre y correo no se mostrarán públicamente. El correo se transforma en una huella irreversible para evitar duplicados.', newsletter: 'Recibe novedades', newsletterBody: 'Suscríbete a noticias importantes del tribunal y la campaña. Los envíos comenzarán al conectar un proveedor.', consent: 'Acepto recibir novedades por correo y puedo cancelar mi suscripción.', subscribe: 'Suscribirme', contact: 'Envía un mensaje privado', contactBody: 'Comparte una corrección, fuente o mensaje sin indicar nombre ni correo.', message: 'Tu mensaje', send: 'Enviar', anonymity: 'No solicitamos tu identidad. Los proveedores técnicos aún pueden procesar datos como la dirección IP para evitar abusos.', unavailable: 'Los envíos se están preparando y todavía no están abiertos.', required: 'Completa la verificación antes de enviar.', error: 'No se pudo completar el envío. Inténtalo de nuevo.', success: { petition: 'Tu firma ha sido registrada. Gracias.', newsletter: 'Tu suscripción ha sido registrada.', contact: 'Tu mensaje ha sido recibido.' } },
  de: { ...english, tag: 'Mitmachen', title: 'Unterstützen Sie den Ruf nach Wahrheit.', intro: 'Unterzeichnen Sie die Petition, erhalten Sie geprüfte Neuigkeiten oder senden Sie privat Informationen.', petition: 'Petition unterzeichnen', petitionBody: 'Unterstützen Sie vollständige Offenlegung, rechtsstaatliche Verfahren und Rechenschaft. Erstes Ziel: 10.000 Unterschriften.', signatures: 'Unterschriften', goal: 'Erstes Ziel', name: 'Vollständiger Name', email: 'E-Mail-Adresse', country: 'Land', sign: 'Unterschrift hinzufügen', petitionPrivacy: 'Name und E-Mail werden nicht öffentlich angezeigt. Die E-Mail wird zur Vermeidung von Duplikaten in einen unumkehrbaren Fingerabdruck umgewandelt.', newsletter: 'Neuigkeiten erhalten', newsletterBody: 'Abonnieren Sie wichtige Gerichts- und Kampagnenmeldungen. Der Versand beginnt nach Anbindung eines Newsletter-Dienstes.', consent: 'Ich möchte E-Mail-Neuigkeiten erhalten und kann mich jederzeit abmelden.', subscribe: 'Abonnieren', contact: 'Private Nachricht senden', contactBody: 'Senden Sie eine Korrektur, Quelle oder Nachricht ohne Namen oder E-Mail.', message: 'Ihre Nachricht', send: 'Senden', anonymity: 'Wir fragen nicht nach Ihrer Identität. Technische Anbieter können zur Missbrauchsabwehr dennoch Daten wie die IP-Adresse verarbeiten.', unavailable: 'Einsendungen werden vorbereitet und sind noch nicht geöffnet.', required: 'Schließen Sie vor dem Senden die Überprüfung ab.', error: 'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es erneut.', success: { petition: 'Ihre Unterschrift wurde erfasst. Danke.', newsletter: 'Ihr Abonnement wurde erfasst.', contact: 'Ihre Nachricht ist eingegangen.' } },
  tr: { ...english, tag: 'Katılın', title: 'Hakikat çağrısına destek olun.', intro: 'Dilekçeyi imzalayın, doğrulanmış gelişmeleri alın veya özel olarak bilgi gönderin.', petition: 'Dilekçeyi imzalayın', petitionBody: 'Eksiksiz açıklama, adil yargılama ve hesap verebilirlik çağrısını destekleyin. İlk hedef 10.000 imza.', signatures: 'imza', goal: 'İlk hedef', name: 'Ad soyad', email: 'E-posta adresi', country: 'Ülke', sign: 'İmzamı ekle', petitionPrivacy: 'Adınız ve e-postanız kamuya gösterilmez. E-posta, tekrar imzaları önlemek için geri döndürülemez bir parmak izine çevrilir.', newsletter: 'Gelişmeleri alın', newsletterBody: 'Önemli mahkeme ve kampanya gelişmelerine abone olun. Gönderimler bir bülten hizmeti bağlandıktan sonra başlayacaktır.', consent: 'E-posta gelişmelerini almayı kabul ediyorum; abonelikten çıkabilirim.', subscribe: 'Abone ol', contact: 'Özel mesaj gönderin', contactBody: 'Adınızı veya e-postanızı vermeden düzeltme, kaynak ya da mesaj paylaşın.', message: 'Mesajınız', send: 'Gönder', anonymity: 'Kimliğiniz istenmez. Teknik sağlayıcılar kötüye kullanımı önlemek için IP adresi gibi verileri yine de işleyebilir.', unavailable: 'Gönderimler hazırlanıyor ve henüz açık değil.', required: 'Göndermeden önce doğrulamayı tamamlayın.', error: 'Gönderim tamamlanamadı. Lütfen tekrar deneyin.', success: { petition: 'İmzanız kaydedildi. Teşekkürler.', newsletter: 'Aboneliğiniz kaydedildi.', contact: 'Mesajınız alındı.' } },
  ja: { ...english, tag: '参加する', title: '真実を求める声を支えてください。', intro: '署名、確認済みの最新情報の受信、または情報の非公開送信ができます。', petition: '署名する', petitionBody: '全面的な情報開示、適正な手続、説明責任を求める声を支えてください。最初の目標は10,000筆です。', signatures: '筆', goal: '最初の目標', name: '氏名', email: 'メールアドレス', country: '国', sign: '署名を追加', petitionPrivacy: '氏名とメールアドレスは公開されません。重複防止のためメールは元に戻せない識別値に変換されます。', newsletter: '最新情報を受け取る', newsletterBody: '重要な裁判・活動情報を受け取れます。配信サービス接続後に送信を開始します。', consent: 'メールでの最新情報の受信に同意します。いつでも解除できます。', subscribe: '登録する', contact: '非公開メッセージ', contactBody: '氏名やメールを入力せず、訂正、資料、メッセージを送れます。', message: 'メッセージ', send: '送信', anonymity: '本人情報は求めません。ただし不正防止のため、技術提供者がIPアドレス等を処理する場合があります。', unavailable: '投稿機能は準備中で、まだ利用できません。', required: '送信前に認証を完了してください。', error: '送信できませんでした。もう一度お試しください。', success: { petition: '署名を受け付けました。ありがとうございます。', newsletter: '登録を受け付けました。', contact: 'メッセージを受け付けました。' } },
  zh: { ...english, tag: '参与支持', title: '支持追寻真相。', intro: '签署请愿、接收经核实的最新消息，或私下提供信息。', petition: '签署请愿', petitionBody: '支持全面披露、正当程序和问责。首个目标为10,000个签名。', signatures: '个签名', goal: '首个目标', name: '姓名', email: '电子邮箱', country: '国家/地区', sign: '添加我的签名', petitionPrivacy: '您的姓名和邮箱不会公开显示。邮箱将转换为不可逆指纹以防止重复签名。', newsletter: '接收最新消息', newsletterBody: '订阅重要的庭审和行动进展。连接新闻邮件服务后将开始发送。', consent: '我同意接收邮件更新，并可随时退订。', subscribe: '订阅', contact: '发送私密消息', contactBody: '无需提供姓名或邮箱，即可发送更正、资料或消息。', message: '您的消息', send: '发送', anonymity: '我们不要求提供身份信息。但技术服务商仍可能为防止滥用而处理IP地址等数据。', unavailable: '提交功能正在准备中，尚未开放。', required: '请在提交前完成验证。', error: '提交未完成，请重试。', success: { petition: '您的签名已记录，谢谢。', newsletter: '您的订阅已记录。', contact: '您的消息已收到。' } },
}

const newsletterOverrides: Partial<Record<Language, { body: string; success: string }>> = {
  fr: { body: "Inscrivez-vous aux principales nouvelles judiciaires et de la mobilisation. Nous vous enverrons un message de bienvenue après votre inscription.", success: 'Merci pour votre inscription. Vérifiez votre boîte de réception et vos courriers indésirables pour notre message de bienvenue.' },
  es: { body: 'Suscríbete a noticias importantes del tribunal y la campaña. Te enviaremos un mensaje de bienvenida después de suscribirte.', success: 'Gracias por suscribirte. Revisa tu bandeja de entrada y la carpeta de correo no deseado para encontrar nuestro mensaje de bienvenida.' },
  de: { body: 'Abonnieren Sie wichtige Gerichts- und Kampagnenmeldungen. Nach der Anmeldung senden wir Ihnen eine Willkommensnachricht.', success: 'Vielen Dank für Ihre Anmeldung. Prüfen Sie Ihren Posteingang und Spam-Ordner auf unsere Willkommensnachricht.' },
  tr: { body: 'Önemli mahkeme ve kampanya gelişmelerine abone olun. Abonelikten sonra size bir hoş geldiniz mesajı göndereceğiz.', success: 'Abone olduğunuz için teşekkürler. Hoş geldiniz mesajımız için gelen kutunuzu ve spam klasörünüzü kontrol edin.' },
  ja: { body: '重要な裁判・活動情報を受け取れます。登録後にウェルカムメールをお送りします。', success: 'ご登録ありがとうございます。受信トレイと迷惑メールフォルダーでウェルカムメールをご確認ください。' },
  zh: { body: '订阅重要的庭审和行动进展。订阅后，我们会向您发送一封欢迎邮件。', success: '感谢您的订阅。请检查收件箱和垃圾邮件文件夹，查收我们的欢迎邮件。' },
}

const signerLabels: Record<Language, string> = {
  en: 'Latest signers', ar: 'آخر الموقعين', fr: 'Derniers signataires', es: 'Últimos firmantes',
  de: 'Neueste Unterzeichnende', tr: 'Son imzalayanlar', ja: '最新の署名者', zh: '最新签署者',
}

const petitionPrivacy: Record<Language, string> = {
  en: 'Only your initials may appear in the public signer list. Your full name and email remain private, and your email is converted to a one-way fingerprint to prevent duplicate signatures.',
  ar: 'قد تظهر الأحرف الأولى من اسمك فقط في قائمة الموقعين العامة. يظل اسمك الكامل وبريدك الإلكتروني سريين، ويُحوّل البريد إلى بصمة أحادية الاتجاه لمنع التوقيعات المكررة.',
  fr: "Seules vos initiales peuvent apparaître dans la liste publique des signataires. Votre nom complet et votre e-mail restent privés, et l'e-mail est transformé en empreinte irréversible pour éviter les doublons.",
  es: 'Solo tus iniciales pueden aparecer en la lista pública de firmantes. Tu nombre completo y correo permanecen privados, y el correo se transforma en una huella irreversible para evitar duplicados.',
  de: 'Nur Ihre Initialen können in der öffentlichen Liste erscheinen. Ihr vollständiger Name und Ihre E-Mail bleiben privat; die E-Mail wird zur Vermeidung von Duplikaten in einen unumkehrbaren Fingerabdruck umgewandelt.',
  tr: 'Herkese açık listede yalnızca adınızın baş harfleri görünebilir. Tam adınız ve e-postanız gizli kalır; e-posta tekrar imzaları önlemek için geri döndürülemez bir parmak izine çevrilir.',
  ja: '公開署名者一覧にはイニシャルのみが表示される場合があります。氏名とメールアドレスは非公開のままで、重複防止のためメールは元に戻せない識別値に変換されます。',
  zh: '公开签署者列表中只会显示您的姓名首字母。您的完整姓名和邮箱保持私密，邮箱将转换为不可逆指纹以防止重复签名。',
}

function ParticipationForm({ action, language, copy, countChanged }: { action: PublicAction; language: Language; copy: ParticipationCopy; countChanged: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const configured = participationEnabled

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      await submitPublicAction({ action, language, website: String(data.get('website') || ''), name: String(data.get('name') || ''), email: String(data.get('email') || ''), country: String(data.get('country') || ''), message: String(data.get('message') || ''), consent: data.has('consent') })
      form.reset()
      setStatus('success')
      if (action === 'petition') countChanged()
    } catch {
      setStatus('error')
    }
  }

  return <form className="participation-form" onSubmit={submit}>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {action === 'petition' && <>
      <label>{copy.name}<input name="name" minLength={2} maxLength={100} required disabled={!configured} /></label>
      <label>{copy.email}<input name="email" type="email" maxLength={254} required disabled={!configured} /></label>
      <label>{copy.country}<input name="country" minLength={2} maxLength={80} required disabled={!configured} /></label>
    </>}
    {action === 'newsletter' && <>
      <label>{copy.email}<input name="email" type="email" maxLength={254} required disabled={!configured} /></label>
      <label className="consent"><input name="consent" type="checkbox" required disabled={!configured} /><span>{copy.consent}</span></label>
    </>}
    {action === 'contact' && <label>{copy.message}<textarea name="message" minLength={20} maxLength={5000} rows={7} required disabled={!configured} /></label>}
    <button className="button primary" disabled={!configured || status === 'sending'} type="submit">
      {status === 'success' ? <Check size={17} /> : action === 'petition' ? <PenLine size={17} /> : action === 'newsletter' ? <Mail size={17} /> : <MessageSquare size={17} />}
      {action === 'petition' ? copy.sign : action === 'newsletter' ? copy.subscribe : copy.send}
    </button>
    {!configured && <p className="form-note">{copy.unavailable}</p>}
    {status === 'success' && <p className="form-status success" role="status">{copy.success[action]}</p>}
    {status === 'error' && <p className="form-status error" role="alert">{copy.error}</p>}
  </form>
}

export function Participation({ language }: { language: Language }) {
  const baseCopy = copies[language] ?? english
  const newsletterOverride = newsletterOverrides[language]
  const copy = newsletterOverride ? {
    ...baseCopy,
    newsletterBody: newsletterOverride.body,
    success: { ...baseCopy.success, newsletter: newsletterOverride.success },
  } : baseCopy
  const [count, setCount] = useState(0)
  const [signers, setSigners] = useState<PetitionSigner[]>([])
  const refreshPetition = () => getPetitionSummary().then(summary => {
    setCount(summary.count)
    setSigners(summary.signers)
  }).catch(() => undefined)

  useEffect(() => {
    void refreshPetition()
    const interval = window.setInterval(refreshPetition, 15_000)
    return () => window.clearInterval(interval)
  }, [])

  return <section className="participation section" id="participate">
    <div className="section-label"><span>05</span><p className="eyebrow">{copy.tag}</p></div>
    <div className="section-heading"><h2>{copy.title}</h2><p>{copy.intro}</p></div>
    <article className="petition-panel" id="petition">
      <div className="petition-copy"><PenLine size={24} /><h3>{copy.petition}</h3><p>{copy.petitionBody}</p>
        <div className="petition-count"><strong>{count.toLocaleString(language)}</strong><span>{copy.signatures}</span><small>{copy.goal}: 10,000</small></div>
        <div className="progress" aria-label={`${count} / 10000`}><span style={{ width: `${Math.min(100, count / 100)}%` }} /></div>
        {signers.length > 0 && <div className="signer-feed" aria-live="polite">
          <p>{signerLabels[language]}</p>
          <ul>{signers.map((signer, index) => <li key={`${signer.signedAt}-${index}`} aria-label={signer.initials}>{signer.initials}</li>)}</ul>
        </div>}
      </div>
      <div><ParticipationForm action="petition" language={language} copy={copy} countChanged={refreshPetition} /><p className="privacy-note">{petitionPrivacy[language]}</p></div>
    </article>
    <div className="participation-secondary">
      <article id="newsletter"><Mail size={24} /><h3>{copy.newsletter}</h3><p>{copy.newsletterBody}</p><ParticipationForm action="newsletter" language={language} copy={copy} countChanged={refreshPetition} /></article>
      <article id="contact"><MessageSquare size={24} /><h3>{copy.contact}</h3><p>{copy.contactBody}</p><ParticipationForm action="contact" language={language} copy={copy} countChanged={refreshPetition} /><p className="privacy-note">{copy.anonymity}</p></article>
    </div>
  </section>
}
