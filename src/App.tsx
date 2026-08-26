import { MouseEvent, useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Copy, Languages, Mail, Menu, MessageSquare, PenLine, Share2, X } from 'lucide-react'
import { getCopy, languages, Language, seo, sources } from './content'
import { Participation } from './Participation'
import { ShareKit } from './ShareKit'

const photo = '/images/thami-bennani.jpeg'
const campaignHashtag = '#JusticeForThamiBennani'
const petitionLabels: Record<Language, string> = {
  en: 'Sign the petition', ar: 'وقّع العريضة', fr: 'Signer la pétition', es: 'Firmar la petición',
  de: 'Petition unterschreiben', tr: 'Dilekçeyi imzala', it: 'Firma la petizione', zgh: 'ⵣⵎⵎⴻⵎ ⴳ ⵜⵓⵜⵜⵔⴰ', nl: 'Onderteken de petitie', ja: '署名する', zh: '签署请愿',
}
const newsletterLabels: Record<Language, string> = {
  en: 'Get case updates', ar: 'توصل بالمستجدات', fr: "Recevoir l'actualité", es: 'Recibir novedades',
  de: 'Neuigkeiten erhalten', tr: 'Gelişmeleri al', it: 'Ricevi aggiornamenti', zgh: 'ⴰⵡⵉ ⵉⵎⴰⵢⵏⵓⵜⵏ', nl: 'Ontvang updates', ja: '最新情報を受け取る', zh: '接收最新消息',
}
const messageLabels: Record<Language, string> = {
  en: 'Send a private message', ar: 'أرسل رسالة خاصة', fr: 'Envoyer un message privé', es: 'Enviar mensaje privado',
  de: 'Private Nachricht senden', tr: 'Özel mesaj gönder', it: 'Invia un messaggio privato', zgh: 'ⴰⵣⵏ ⵉⵣⵏ ⵓⵙⵍⵉⴳ', nl: 'Stuur een privébericht', ja: '非公開メッセージを送る', zh: '发送私密消息',
}
const languageLabels: Record<Language, { button: string; menu: string }> = {
  en: { button: 'Language', menu: 'Choose your language' },
  ar: { button: 'اللغة', menu: 'اختر لغتك' },
  fr: { button: 'Langue', menu: 'Choisissez votre langue' },
  es: { button: 'Idioma', menu: 'Elige tu idioma' },
  de: { button: 'Sprache', menu: 'Sprache auswählen' },
  tr: { button: 'Dil', menu: 'Dilinizi seçin' },
  it: { button: 'Lingua', menu: 'Scegli la tua lingua' },
  zgh: { button: 'ⵜⵓⵜⵍⴰⵢⵜ', menu: 'ⵙⵜⵉ ⵜⵓⵜⵍⴰⵢⵜ ⵏⵏⴽ' },
  nl: { button: 'Taal', menu: 'Kies uw taal' },
  ja: { button: '言語', menu: '言語を選択' },
  zh: { button: '语言', menu: '选择语言' },
}
const supporterPhotos = [
  { src: '/images/supporters/supporters-stadium-01.jpg', width: 1024, height: 1536 },
  { src: '/images/supporters/supporters-stadium-02.jpg', width: 1166, height: 1989 },
  { src: '/images/supporters/supporters-stadium-03.jpg', width: 1284, height: 1902 },
  { src: '/images/supporters/supporters-stadium-04.jpg', width: 499, height: 1080 },
]

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get('lang')
    return requestedLanguage && requestedLanguage in languages ? requestedLanguage as Language : 'en'
  })
  const [languageOpen, setLanguageOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const copy = getCopy(language)
  const rtl = language === 'ar'
  const canonicalOrigin = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://thamibennani.com'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    document.title = seo[language].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo[language].description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', seo[language].title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', seo[language].description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', seo[language].locale)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', seo[language].title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', seo[language].description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', getSiteUrl(language, canonicalOrigin))
  }, [language, rtl])

  const getSiteUrl = (selectedLanguage: Language, origin = window.location.origin) => {
    return selectedLanguage === 'en' ? `${origin}/` : `${origin}/?lang=${selectedLanguage}`
  }

  const siteUrl = getSiteUrl(language, canonicalOrigin)

  const selectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage)
    window.history.replaceState({}, '', getSiteUrl(selectedLanguage))
    setLanguageOpen(false)
  }

  const copySiteUrl = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(siteUrl)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = siteUrl
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const share = async () => {
    const data = { title: copy.title, text: `${copy.subtitle} ${campaignHashtag}`, url: siteUrl }
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data)
      } else {
        await copySiteUrl()
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      await copySiteUrl()
    }
  }

  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    window.history.replaceState({}, '', `#${target}`)
    document.getElementById(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  const navTargets = ['story', 'timeline', 'case', 'sources']

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Justice for Thami Bennani home">
          <span className="brand-mark">TB</span>
          <span>Justice for Thami</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {copy.nav.map((item, index) => <a key={item} href={`#${navTargets[index]}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-picker">
            <button className="language-button" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen} aria-haspopup="menu" aria-label={`${languageLabels[language].button}: ${languages[language]}`}>
              <span className="language-icon"><Languages size={19} /></span>
              <span className="language-button-copy"><small>{languageLabels[language].button}</small><strong>{languages[language]}</strong></span>
              <ChevronDown className="language-chevron" size={16} />
            </button>
            {languageOpen && <div className="language-menu" role="menu">
              <p>{languageLabels[language].menu}</p>
              {Object.entries(languages).map(([code, label]) => (
              <button key={code} role="menuitemradio" aria-checked={code === language} className={code === language ? 'active' : ''} onClick={() => selectLanguage(code as Language)}>
                <span><small>{code.toUpperCase()}</small>{label}</span>{code === language && <Check size={15} />}
              </button>
            ))}</div>}
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={copy.menu}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <img src={photo} alt="Thami Bennani" width="1024" height="952" fetchPriority="high" decoding="async" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light"><span />{copy.heroTag}</p>
          <p className="campaign-hashtag" dir="ltr">{campaignHashtag}</p>
          <h1>{copy.title}</h1>
          <p className="hero-subtitle">{copy.subtitle}</p>
          <p className="hero-body">{copy.heroBody}</p>
          <div className="hero-actions">
            <a className="button primary" href="#petition" onClick={event => jumpTo(event, 'petition')}>{petitionLabels[language]}<PenLine size={18} /></a>
            <a className="button ghost" href="#newsletter" onClick={event => jumpTo(event, 'newsletter')}>{newsletterLabels[language]}<Mail size={18} /></a>
            <a className="button ghost" href="#contact" onClick={event => jumpTo(event, 'contact')}>{messageLabels[language]}<MessageSquare size={18} /></a>
            <button className="button ghost" onClick={share}>{copied ? <Check size={18} /> : <Share2 size={18} />}{copied ? copy.copied : copy.share}</button>
          </div>
        </div>
        <p className="photo-credit">{copy.photoCredit}</p>
      </section>

      <section className="facts" aria-label="Case facts">
        <div><strong>2007</strong><span>{copy.since}</span></div>
        <div><strong>17</strong><span>{copy.age}</span></div>
        <div><strong>19+</strong><span>{copy.years}</span></div>
        <div><strong>1</strong><span>{copy.truth}</span></div>
      </section>

      <section className="story section" id="story">
        <div className="section-label"><span>01</span><p className="eyebrow">{copy.storyTag}</p></div>
        <div className="story-grid">
          <div><h2>{copy.storyTitle}</h2><p className="lead">{copy.storyBody}</p></div>
          <blockquote>“{copy.storyQuote}”</blockquote>
        </div>
      </section>

      <section className="supporters-section section" aria-labelledby="supporters-title">
        <div className="section-label"><span>02</span><p className="eyebrow">{copy.supportersTag}</p></div>
        <div className="section-heading supporters-heading">
          <h2 id="supporters-title">{copy.supportersTitle}</h2>
          <p>{copy.supportersBody}</p>
        </div>
        <div className="supporters-grid">
          {supporterPhotos.map((image, index) => (
            <figure className={`supporter-photo supporter-photo-${index + 1}`} key={image.src}>
              <img src={image.src} alt={copy.supportersAlt[index]} width={image.width} height={image.height} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
        <p className="supporters-credit">{copy.supportersCredit}</p>
      </section>

      <section className="timeline-section section" id="timeline">
        <div className="section-label"><span>03</span><p className="eyebrow">{copy.timelineTag}</p></div>
        <div className="section-heading"><h2>{copy.timelineTitle}</h2><p>{copy.timelineIntro}</p></div>
        <div className="timeline">
          {copy.timeline.map((event, index) => <article key={event.year} className="timeline-item">
            <div className="timeline-year">{event.year.replace('–', '–\u200b')}</div><div className="timeline-dot">{String(index + 1).padStart(2, '0')}</div>
            <div><h3>{event.title}</h3><p>{event.body}</p></div>
          </article>)}
        </div>
      </section>

      <section className="case-section" id="case">
        <div className="case-inner section">
          <div className="section-label dark"><span>04</span><p className="eyebrow light">{copy.statusTag}</p></div>
          <div className="case-grid"><h2>{copy.statusTitle}</h2><div><p className="lead">{copy.statusBody}</p><p className="legal-note">{copy.statusNote}</p></div></div>
        </div>
      </section>

      <Participation language={language} />

      <section className="sources section" id="sources">
        <div className="section-label"><span>06</span><p className="eyebrow">{copy.sourcesTag}</p></div>
        <div className="section-heading"><h2>{copy.sourcesTitle}</h2><p>{copy.sourcesBody}</p></div>
        <article className="featured-video">
          <div className="video-frame">
            <iframe
              src="https://geo.dailymotion.com/player.html?video=x87r3wo"
              title="Ils demandent justice pour Thami Bennani"
              allow="autoplay; fullscreen; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="video-details">
            <p className="eyebrow">Dailymotion · Brut Afrique</p>
            <h3>Ils demandent justice pour Thami Bennani</h3>
            <p>{copy.videoBody}</p>
            <a href="https://www.dailymotion.com/video/x87r3wo" target="_blank" rel="noreferrer">
              {copy.watchVideo}<ArrowUpRight size={17} />
            </a>
          </div>
        </article>
        <div className="source-list">{sources.map((source, index) => (
          <a href={source.url} target="_blank" rel="noreferrer" className="source-row" key={source.outlet}>
            <span className="source-index">0{index + 1}</span><span className="source-meta">{source.outlet}<small>{source.date}</small></span>
            <strong>{source.title}</strong><span className="source-open">{copy.read}<ArrowUpRight size={17} /></span>
          </a>
        ))}</div>
      </section>

      <section className="action-section" id="share">
        <div className="action-intro"><p className="eyebrow light">{copy.principle}</p><p className="action-hashtag" dir="ltr">{campaignHashtag}</p><h2>{copy.actionTitle}</h2><p>{copy.actionBody}</p></div>
        <ShareKit language={language} title={copy.title} subtitle={copy.subtitle} siteUrl={siteUrl} hashtag={campaignHashtag} />
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">TB</span><span>Justice for Thami</span></a><p>{copy.disclaimer}</p><small>{copy.updated}</small></footer>
    </main>
  )
}

export default App