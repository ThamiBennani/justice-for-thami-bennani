import { useState } from 'react'
import { Check, Copy, Download, Mail, MessageCircle, Send, Share2 } from 'lucide-react'
import { Language } from './content'

type ShareFormat = 'story' | 'post'

type ShareCopy = {
  eyebrow: string
  title: string
  body: string
  story: string
  post: string
  apps: string
  appsHint: string
  facebook: string
  whatsapp: string
  x: string
  email: string
  caption: string
  copyCaption: string
  captionCopied: string
  copyLink: string
  linkCopied: string
  download: string
  downloaded: string
  shared: string
  callToAction: string
  assetAlt: string
}

const english: ShareCopy = {
  eyebrow: 'Share kit',
  title: 'Turn one share into another voice.',
  body: 'Choose a ready-made format, add the caption, and share it where your community will see it.',
  story: 'Story / Reel',
  post: 'Square post',
  apps: 'Instagram / TikTok',
  appsHint: 'Opens your device share menu with the campaign card attached.',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  x: 'X',
  email: 'Email',
  caption: 'Ready-to-post caption',
  copyCaption: 'Copy caption',
  captionCopied: 'Caption copied',
  copyLink: 'Copy link',
  linkCopied: 'Link copied',
  download: 'Download card',
  downloaded: 'Card downloaded',
  shared: 'Share menu opened',
  callToAction: 'Read the verified timeline and sign the petition:',
  assetAlt: 'Preview of a Justice for Thami Bennani social media card',
}

const copies: Partial<Record<Language, ShareCopy>> = {
  ar: { ...english, eyebrow: 'حزمة المشاركة', title: 'اجعل من كل مشاركة صوتًا جديدًا.', body: 'اختر تصميمًا جاهزًا، وأضف النص، ثم شاركه حيث يمكن لمجتمعك رؤيته.', story: 'ستوري / ريل', post: 'منشور مربع', apps: 'إنستغرام / تيك توك', appsHint: 'يفتح قائمة المشاركة في جهازك مع إرفاق بطاقة الحملة.', facebook: 'فيسبوك', whatsapp: 'واتساب', email: 'البريد', caption: 'نص جاهز للنشر', copyCaption: 'انسخ النص', captionCopied: 'تم نسخ النص', copyLink: 'انسخ الرابط', linkCopied: 'تم نسخ الرابط', download: 'نزّل البطاقة', downloaded: 'تم تنزيل البطاقة', shared: 'فُتحت قائمة المشاركة', callToAction: 'اطّلع على التسلسل الزمني الموثق ووقّع العريضة:', assetAlt: 'معاينة لبطاقة عدالة للتهامي بناني على شبكات التواصل' },
  fr: { ...english, eyebrow: 'Kit de partage', title: 'Faites de chaque partage une nouvelle voix.', body: 'Choisissez un format prêt à publier, ajoutez la légende et partagez-le auprès de votre communauté.', story: 'Story / Reel', post: 'Publication carrée', apps: 'Instagram / TikTok', appsHint: 'Ouvre le menu de partage de votre appareil avec la carte de la campagne.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'E-mail', caption: 'Légende prête à publier', copyCaption: 'Copier la légende', captionCopied: 'Légende copiée', copyLink: 'Copier le lien', linkCopied: 'Lien copié', download: 'Télécharger la carte', downloaded: 'Carte téléchargée', shared: 'Menu de partage ouvert', callToAction: 'Consultez la chronologie vérifiée et signez la pétition :', assetAlt: 'Aperçu d’une carte pour la justice pour Thami Bennani sur les réseaux sociaux' },
  es: { ...english, eyebrow: 'Kit para compartir', title: 'Convierte cada publicación en una nueva voz.', body: 'Elige un formato listo, añade el texto y compártelo donde tu comunidad pueda verlo.', story: 'Historia / Reel', post: 'Publicación cuadrada', apps: 'Instagram / TikTok', appsHint: 'Abre el menú para compartir de tu dispositivo con la tarjeta adjunta.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'Correo', caption: 'Texto listo para publicar', copyCaption: 'Copiar texto', captionCopied: 'Texto copiado', copyLink: 'Copiar enlace', linkCopied: 'Enlace copiado', download: 'Descargar tarjeta', downloaded: 'Tarjeta descargada', shared: 'Menú para compartir abierto', callToAction: 'Consulta la cronología verificada y firma la petición:', assetAlt: 'Vista previa de una tarjeta de Justicia para Thami Bennani' },
  de: { ...english, eyebrow: 'Teilen-Paket', title: 'Machen Sie aus jedem Beitrag eine weitere Stimme.', body: 'Wählen Sie ein fertiges Format, ergänzen Sie den Text und teilen Sie es mit Ihrer Community.', story: 'Story / Reel', post: 'Quadratischer Beitrag', apps: 'Instagram / TikTok', appsHint: 'Öffnet das Teilen-Menü Ihres Geräts mit der Kampagnenkarte.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'E-Mail', caption: 'Fertiger Begleittext', copyCaption: 'Text kopieren', captionCopied: 'Text kopiert', copyLink: 'Link kopieren', linkCopied: 'Link kopiert', download: 'Karte herunterladen', downloaded: 'Karte heruntergeladen', shared: 'Teilen-Menü geöffnet', callToAction: 'Lesen Sie die geprüfte Chronik und unterzeichnen Sie die Petition:', assetAlt: 'Vorschau einer Social-Media-Karte für Gerechtigkeit für Thami Bennani' },
  tr: { ...english, eyebrow: 'Paylaşım seti', title: 'Her paylaşımı yeni bir sese dönüştürün.', body: 'Hazır bir format seçin, metni ekleyin ve topluluğunuzun göreceği yerde paylaşın.', story: 'Hikâye / Reel', post: 'Kare gönderi', apps: 'Instagram / TikTok', appsHint: 'Kampanya kartı eklenmiş olarak cihazınızın paylaşım menüsünü açar.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'E-posta', caption: 'Paylaşıma hazır metin', copyCaption: 'Metni kopyala', captionCopied: 'Metin kopyalandı', copyLink: 'Bağlantıyı kopyala', linkCopied: 'Bağlantı kopyalandı', download: 'Kartı indir', downloaded: 'Kart indirildi', shared: 'Paylaşım menüsü açıldı', callToAction: 'Doğrulanmış zaman çizelgesini okuyun ve dilekçeyi imzalayın:', assetAlt: 'Thami Bennani için Adalet sosyal medya kartının önizlemesi' },
  it: { ...english, eyebrow: 'Kit di condivisione', title: 'Trasforma ogni condivisione in una nuova voce.', body: 'Scegli un formato pronto, aggiungi la didascalia e condividilo dove la tua comunità potrà vederlo.', story: 'Storia / Reel', post: 'Post quadrato', apps: 'Instagram / TikTok', appsHint: 'Apre il menu di condivisione del dispositivo con la scheda della campagna allegata.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'E-mail', caption: 'Didascalia pronta da pubblicare', copyCaption: 'Copia didascalia', captionCopied: 'Didascalia copiata', copyLink: 'Copia link', linkCopied: 'Link copiato', download: 'Scarica scheda', downloaded: 'Scheda scaricata', shared: 'Menu di condivisione aperto', callToAction: 'Leggi la cronologia verificata e firma la petizione:', assetAlt: 'Anteprima di una scheda social per la giustizia per Thami Bennani' },
  zgh: { ...english, eyebrow: 'ⵜⴰⴽⴽⴰ ⵏ ⵓⴱⴹⵓ', title: 'ⵙⵏⴼⵍ ⴽⵓ ⴰⴱⴹⵓ ⵙ ⵢⴰⵜ ⵜⵡⴰⵍⴰ ⵜⴰⵎⴰⵢⵏⵓⵜ.', body: 'ⵙⵜⵉ ⴰⵎⴰⵙⴰⵍ ⵉⵜⵜⵓⵙⵎⵓⵜⵜⴳⵏ، ⵔⵏⵓ ⴰⴹⵕⵉⵚ، ⴱⴹⵓ ⵜ ⵎⴰⵏⵉ ⵔⴰⴷ ⵜ ⵥⵕⵏ ⵉⵎⵙⵙⴰⵡⴰⴹⵏ ⵏⵏⴽ.', story: 'Story / Reel', post: 'ⵜⴰⵙⵏⴰ ⵜⴰⵎⴽⵓⵥⵜ', apps: 'Instagram / TikTok', appsHint: 'ⴰⴷ ⵉⵔⵣⵎ ⵓⵎⵓⵖ ⵏ ⵓⴱⴹⵓ ⴳ ⵓⵙⵍⴽⵉⵎ ⵏⵏⴽ ⵙ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵙⵓⵜⵔ.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'ⵉⵎⴰⵢⵍ', caption: 'ⴰⴹⵕⵉⵚ ⵉⵙⵎⵓⵜⵜⴳⵏ ⵉ ⵓⴱⴹⵓ', copyCaption: 'ⵏⵖⵍ ⴰⴹⵕⵉⵚ', captionCopied: 'ⵉⵜⵜⵓⵏⵖⵍ ⵓⴹⵕⵉⵚ', copyLink: 'ⵏⵖⵍ ⴰⵙⵖⵡⵏ', linkCopied: 'ⵉⵜⵜⵓⵏⵖⵍ ⵓⵙⵖⵡⵏ', download: 'ⵙⵙⵉⴷⵔ ⵜⴰⴽⴰⵕⴹⴰ', downloaded: 'ⵜⴻⵜⵜⵓⵙⵙⵉⴷⵔ ⵜⴽⴰⵕⴹⴰ', shared: 'ⵉⵔⵣⵎ ⵓⵎⵓⵖ ⵏ ⵓⴱⴹⵓ', callToAction: 'ⵖⵔ ⴰⵎⵣⵣⵉⵣⵍ ⵉⵜⵜⵓⵙⵙⵏⴷⵏ، ⵣⵎⵎⴻⵎ ⴳ ⵜⵓⵜⵜⵔⴰ:', assetAlt: 'ⵜⴰⵎⵓⵖⵍⵉ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵜⵉⵣⵔⴼⵜ ⵉ ⵜⴰⵎⵉ ⴱⵏⴰⵏⵉ ⴳ ⵉⵎⵏⵣⴰⵢⵏ ⵉⵏⴰⵎⵓⵔⵏ' },
  nl: { ...english, eyebrow: 'Deelpakket', title: 'Maak van elke gedeelde post een nieuwe stem.', body: 'Kies een kant-en-klaar formaat, voeg het bijschrift toe en deel het waar uw gemeenschap het ziet.', story: 'Story / Reel', post: 'Vierkante post', apps: 'Instagram / TikTok', appsHint: 'Opent het deelmenu van uw apparaat met de campagnekaart als bijlage.', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'E-mail', caption: 'Klaar om te plaatsen', copyCaption: 'Bijschrift kopiëren', captionCopied: 'Bijschrift gekopieerd', copyLink: 'Link kopiëren', linkCopied: 'Link gekopieerd', download: 'Kaart downloaden', downloaded: 'Kaart gedownload', shared: 'Deelmenu geopend', callToAction: 'Lees de geverifieerde tijdlijn en onderteken de petitie:', assetAlt: 'Voorbeeld van een socialemediakaart voor gerechtigheid voor Thami Bennani' },
  ja: { ...english, eyebrow: 'シェア素材', title: '一つのシェアを、次の声へ。', body: '投稿形式を選び、用意された文章を添えて、あなたのコミュニティに届けてください。', story: 'ストーリー / リール', post: '正方形の投稿', apps: 'Instagram / TikTok', appsHint: 'キャンペーンカードを添付して端末の共有メニューを開きます。', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'メール', caption: '投稿用テキスト', copyCaption: '文章をコピー', captionCopied: '文章をコピーしました', copyLink: 'リンクをコピー', linkCopied: 'リンクをコピーしました', download: 'カードを保存', downloaded: 'カードを保存しました', shared: '共有メニューを開きました', callToAction: '確認済みの経緯を読み、署名してください：', assetAlt: 'タミ・ベナニに正義を求めるSNSカードのプレビュー' },
  zh: { ...english, eyebrow: '分享素材', title: '让每一次分享带来新的声音。', body: '选择现成格式，添加配文，并分享到您的社群能够看到的地方。', story: '快拍 / Reel', post: '方形帖子', apps: 'Instagram / TikTok', appsHint: '打开设备的分享菜单，并附上活动图片。', facebook: 'Facebook', whatsapp: 'WhatsApp', email: '电子邮件', caption: '可直接发布的配文', copyCaption: '复制配文', captionCopied: '配文已复制', copyLink: '复制链接', linkCopied: '链接已复制', download: '下载图片', downloaded: '图片已下载', shared: '分享菜单已打开', callToAction: '阅读经核实的时间线并签署请愿：', assetAlt: '塔米·本纳尼正义行动社交媒体图片预览' },
}

const writeToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()
}

const wrapCanvasText = (context: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  words.forEach(word => {
    const candidate = line ? `${line} ${word}` : word
    if (context.measureText(candidate).width <= maxWidth || !line) {
      line = candidate
    } else {
      lines.push(line)
      line = word
    }
  })
  if (line) lines.push(line)
  return lines
}

const drawWrappedText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
  const lines = wrapCanvasText(context, text, maxWidth)
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight))
  return y + lines.length * lineHeight
}

const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = reject
  image.src = source
})

async function createCampaignCard(format: ShareFormat, title: string, subtitle: string, siteUrl: string, hashtag: string, rtl: boolean, tifinagh: boolean) {
  await document.fonts.ready
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = format === 'story' ? 1920 : 1080
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const image = await loadImage('/images/thami-bennani.jpeg')
  const imageHeight = format === 'story' ? 1180 : 700
  const scale = Math.max(canvas.width / image.naturalWidth, imageHeight / image.naturalHeight)
  const sourceWidth = canvas.width / scale
  const sourceHeight = imageHeight / scale
  const sourceX = (image.naturalWidth - sourceWidth) / 2
  const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) * .18)

  context.fillStyle = '#171816'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.filter = 'grayscale(1) contrast(1.08)'
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, imageHeight)
  context.filter = 'none'

  const shade = context.createLinearGradient(0, imageHeight * .25, 0, imageHeight)
  shade.addColorStop(0, 'rgba(23,24,22,0)')
  shade.addColorStop(1, '#171816')
  context.fillStyle = shade
  context.fillRect(0, 0, canvas.width, imageHeight)

  const padding = 84
  const textX = rtl ? canvas.width - padding : padding
  context.direction = rtl ? 'rtl' : 'ltr'
  context.textAlign = rtl ? 'right' : 'left'
  context.fillStyle = '#b2252d'
  context.fillRect(rtl ? canvas.width - padding - 150 : padding, imageHeight - 28, 150, 7)

  let textY = imageHeight + (format === 'story' ? 105 : 65)
  const titleFont = tifinagh ? '"Noto Sans Tifinagh", sans-serif' : '"Source Serif 4", serif'
  const bodyFont = tifinagh ? '"Noto Sans Tifinagh", sans-serif' : '"Libre Franklin", sans-serif'
  context.fillStyle = '#fffdf8'
  context.font = `700 ${format === 'story' ? 82 : 64}px ${titleFont}`
  textY = drawWrappedText(context, title, textX, textY, canvas.width - padding * 2, format === 'story' ? 91 : 72)
  context.fillStyle = '#d5d1c8'
  context.font = `500 ${format === 'story' ? 35 : 29}px ${bodyFont}`
  textY = drawWrappedText(context, subtitle, textX, textY + 34, canvas.width - padding * 2, format === 'story' ? 52 : 43)
  context.direction = 'ltr'
  context.textAlign = rtl ? 'right' : 'left'
  context.fillStyle = '#e34b53'
  context.font = `700 ${format === 'story' ? 31 : 25}px "Libre Franklin", sans-serif`
  context.fillText(hashtag, textX, textY + 56)
  context.fillStyle = '#fffdf8'
  context.font = `600 ${format === 'story' ? 27 : 22}px "Libre Franklin", sans-serif`
  context.fillText(siteUrl.replace(/^https?:\/\//, ''), textX, canvas.height - (format === 'story' ? 90 : 52))

  return new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image creation failed')), 'image/png'))
}

function ShareLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a className="share-platform" href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}<span>{label}</span></a>
}

export function ShareKit({ language, title, subtitle, siteUrl, hashtag }: { language: Language; title: string; subtitle: string; siteUrl: string; hashtag: string }) {
  const copy = copies[language] ?? english
  const [format, setFormat] = useState<ShareFormat>('story')
  const [status, setStatus] = useState<'idle' | 'caption' | 'link' | 'downloaded' | 'shared'>('idle')
  const rtl = language === 'ar'
  const tifinagh = language === 'zgh'
  const petitionUrl = `${siteUrl}#petition`
  const caption = `${title}\n${subtitle}\n\n${copy.callToAction}\n${petitionUrl}\n\n${hashtag}`
  const encodedUrl = encodeURIComponent(petitionUrl)
  const encodedCaption = encodeURIComponent(caption)

  const showStatus = (nextStatus: Exclude<typeof status, 'idle'>) => {
    setStatus(nextStatus)
    window.setTimeout(() => setStatus('idle'), 2200)
  }

  const downloadCard = async () => {
    const blob = await createCampaignCard(format, title, subtitle, petitionUrl, hashtag, rtl, tifinagh)
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = `justice-for-thami-${format}.png`
    link.click()
    URL.revokeObjectURL(objectUrl)
    showStatus('downloaded')
  }

  const shareToApps = async () => {
    const blob = await createCampaignCard(format, title, subtitle, petitionUrl, hashtag, rtl, tifinagh)
    const file = new File([blob], `justice-for-thami-${format}.png`, { type: 'image/png' })
    const shareData = { title, text: caption, url: petitionUrl, files: [file] }
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share(shareData)
        showStatus('shared')
      } else {
        await downloadCard()
        await writeToClipboard(caption)
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      await downloadCard()
    }
  }

  const copyValue = async (value: string, nextStatus: 'caption' | 'link') => {
    await writeToClipboard(value)
    showStatus(nextStatus)
  }

  return <div className="share-kit">
    <div className="share-kit-heading">
      <p className="eyebrow light">{copy.eyebrow}</p>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
    </div>
    <div className="share-workspace">
      <div className={`share-preview ${format}`} role="img" aria-label={copy.assetAlt}>
        <img src="/images/thami-bennani.jpeg" alt="" />
        <div className="share-preview-shade" />
        <div className="share-preview-copy"><span /><strong>{title}</strong><p>{subtitle}</p><small dir="ltr">{hashtag}</small><b dir="ltr">{petitionUrl.replace(/^https?:\/\//, '')}</b></div>
      </div>
      <div className="share-tools">
        <div className="share-format" role="group" aria-label="Social image format">
          <button className={format === 'story' ? 'active' : ''} onClick={() => setFormat('story')} aria-pressed={format === 'story'}>{copy.story}<small>9:16</small></button>
          <button className={format === 'post' ? 'active' : ''} onClick={() => setFormat('post')} aria-pressed={format === 'post'}>{copy.post}<small>1:1</small></button>
        </div>
        <button className="share-apps" onClick={shareToApps}><Share2 size={20} /><span><strong>{copy.apps}</strong><small>{copy.appsHint}</small></span></button>
        <div className="share-platforms">
          <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} label={copy.facebook}><Send size={18} /></ShareLink>
          <ShareLink href={`https://wa.me/?text=${encodedCaption}`} label={copy.whatsapp}><MessageCircle size={18} /></ShareLink>
          <ShareLink href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${hashtag}`)}&url=${encodedUrl}`} label={copy.x}><Share2 size={18} /></ShareLink>
          <ShareLink href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodedCaption}`} label={copy.email}><Mail size={18} /></ShareLink>
        </div>
        <div className="share-caption">
          <p>{copy.caption}</p>
          <blockquote>{caption}</blockquote>
        </div>
        <div className="share-commands">
          <button onClick={() => copyValue(caption, 'caption')}>{status === 'caption' ? <Check size={17} /> : <Copy size={17} />}{status === 'caption' ? copy.captionCopied : copy.copyCaption}</button>
          <button onClick={() => copyValue(petitionUrl, 'link')}>{status === 'link' ? <Check size={17} /> : <Copy size={17} />}{status === 'link' ? copy.linkCopied : copy.copyLink}</button>
          <button onClick={downloadCard}>{status === 'downloaded' ? <Check size={17} /> : <Download size={17} />}{status === 'downloaded' ? copy.downloaded : copy.download}</button>
        </div>
        {status === 'shared' && <p className="share-status" role="status">{copy.shared}</p>}
      </div>
    </div>
  </div>
}