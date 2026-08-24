export const languages = {
  en: 'English', ar: 'العربية', fr: 'Français', es: 'Español', de: 'Deutsch',
  tr: 'Türkçe', ja: '日本語', zh: '中文',
} as const

export type Language = keyof typeof languages

export const seo: Record<Language, { title: string; description: string; locale: string }> = {
  en: { title: 'Thami Bennani Case | Timeline, Sources & Justice', description: 'Explore the verified timeline, reporting, and public record of the Thami Bennani case, a Moroccan teenager missing since 2007.', locale: 'en_US' },
  ar: { title: 'قضية التهامي بناني | التسلسل الزمني والمصادر والعدالة', description: 'اطلع على التسلسل الزمني الموثق والتغطيات والسجل العام لقضية التهامي بناني، الشاب المغربي المختفي منذ سنة 2007.', locale: 'ar_MA' },
  fr: { title: 'Affaire Thami Bennani | Chronologie, sources et justice', description: "Consultez la chronologie vérifiée, les articles et le dossier public de l'affaire Thami Bennani, adolescent marocain disparu en 2007.", locale: 'fr_FR' },
  es: { title: 'Caso Thami Bennani | Cronología, fuentes y justicia', description: 'Consulta la cronología verificada, las noticias y el registro público del caso de Thami Bennani, adolescente marroquí desaparecido en 2007.', locale: 'es_ES' },
  de: { title: 'Fall Thami Bennani | Chronik, Quellen und Gerechtigkeit', description: 'Lesen Sie die geprüfte Chronik, Berichte und öffentlichen Quellen zum Fall Thami Bennani, einem seit 2007 vermissten marokkanischen Jugendlichen.', locale: 'de_DE' },
  tr: { title: 'Thami Bennani Davası | Zaman Çizelgesi ve Kaynaklar', description: "2007'den beri kayıp olan Faslı genç Thami Bennani'nin davasına ilişkin doğrulanmış zaman çizelgesini, haberleri ve kamuya açık kayıtları inceleyin.", locale: 'tr_TR' },
  ja: { title: 'タミ・ベナニ事件 | 経緯・情報源・正義を求める記録', description: '2007年から行方不明となっているモロッコの少年タミ・ベナニについて、確認された経緯、報道、公的記録をまとめています。', locale: 'ja_JP' },
  zh: { title: '塔米·本纳尼案件 | 时间线、来源与正义', description: '查阅塔米·本纳尼案件经核实的时间线、新闻报道和公开记录。这名摩洛哥少年自2007年以来一直失踪。', locale: 'zh_CN' },
}

type Copy = {
  nav: string[]
  menu: string
  heroTag: string
  title: string
  subtitle: string
  heroBody: string
  explore: string
  share: string
  since: string
  age: string
  years: string
  truth: string
  photoCredit: string
  storyTag: string
  storyTitle: string
  storyBody: string
  storyQuote: string
  supportersTag: string
  supportersTitle: string
  supportersBody: string
  supportersCredit: string
  supportersAlt: string[]
  timelineTag: string
  timelineTitle: string
  timelineIntro: string
  timeline: { year: string; title: string; body: string }[]
  statusTag: string
  statusTitle: string
  statusBody: string
  statusNote: string
  sourcesTag: string
  sourcesTitle: string
  sourcesBody: string
  videoBody: string
  watchVideo: string
  read: string
  actionTitle: string
  actionBody: string
  copyLink: string
  copied: string
  principle: string
  disclaimer: string
  updated: string
}

const baseTimeline = {
  en: [
    { year: '14 Mar 2007', title: 'Thami disappears', body: 'Thami Bennani, 17, leaves his family home in Mohammedia and does not return. His mother, Hayat Alami, begins a search that will span years.' },
    { year: '2022', title: 'The case returns to public attention', body: 'Moroccan social media and national and international reporting renew scrutiny of the disappearance and the family’s search.' },
    { year: '2023', title: 'Trial judgment', body: 'The Casablanca Court of Appeal’s criminal chamber sentences two defendants to 20 years in prison each. Reporting describes the case as a homicide case.' },
    { year: '2025–Today', title: 'The case is not considered closed', body: 'In December 2025, the National Committee for Truth and Justice for Thami Bennani renewed its call for transparency and accountability, saying the case had not reached its conclusion. The family and supporters continue to seek the full truth.' },
  ],
  ar: [
    { year: '14 مارس 2007', title: 'اختفاء التهامي', body: 'غادر التهامي بناني، البالغ 17 سنة، منزل أسرته بالمحمدية ولم يعد. ومنذ ذلك اليوم بدأت والدته حياة العلمي رحلة بحث امتدت لسنوات.' },
    { year: '2022', title: 'عودة القضية إلى الواجهة', body: 'أعادت شبكات التواصل والإعلام المغربي والدولي تسليط الضوء على الاختفاء وعلى مسار بحث الأسرة عن الحقيقة.' },
    { year: '2023', title: 'الحكم الابتدائي', body: 'قضت الغرفة الجنائية بمحكمة الاستئناف بالدار البيضاء بسجن متهمين اثنين 20 سنة لكل منهما، في ملف وصفته التغطيات الإعلامية بقضية مقتل.' },
    { year: '2025–اليوم', title: 'القضية لم تصل إلى نهايتها', body: 'في دجنبر 2025، جددت اللجنة الوطنية للحقيقة والعدالة للتهامي بناني دعوتها إلى الشفافية والمساءلة، مؤكدة أن القضية لم تصل إلى نهايتها. وتواصل الأسرة والمتضامنون البحث عن الحقيقة الكاملة.' },
  ],
}

const common = {
  nav: ['Story', 'Timeline', 'Case', 'Sources'], menu: 'Menu', heroTag: 'Missing since 2007 · Mohammedia, Morocco',
  title: 'Where is Thami Bennani?', subtitle: 'His absence is not the end of his story.',
  heroBody: 'For more than nineteen years, one family has carried one unanswered question. This independent public archive preserves the record and stands for truth, dignity, and justice.',
  explore: 'Explore the case', share: 'Share his name', since: 'Missing since', age: 'Age when missing', years: 'Years without answers', truth: 'One truth still owed', photoCredit: 'Thami Bennani · Photo provided to this archive',
  storyTag: 'Who is Thami?', storyTitle: 'A son. A brother. A life interrupted at seventeen.',
  storyBody: 'Thami Bennani was a Moroccan teenager from Mohammedia. On 14 March 2007, he left home and never returned. His mother, Hayat Alami, has spent the years since seeking a complete account of what happened to her son. Her persistence transformed a private grief into a national call for accountability.',
  storyQuote: 'A disappearance does not erase a person. Silence does not settle the truth.',
  supportersTag: 'Public solidarity', supportersTitle: 'His name carried into the stands.', supportersBody: 'At a Morocco football match in 2023, supporters wore Thami’s portrait and raised a large banner calling for justice. These photographs preserve one moment when a family’s search became visible in a shared public space.', supportersCredit: 'Project-supplied archive photographs · Event details supplied by the project; photographer not independently verified',
  supportersAlt: ['Supporters wearing red shirts printed with Thami Bennani’s portrait in stadium stands.', 'A crowd of Morocco supporters displaying a large Justice for Thami Bennani banner.', 'A Justice for Thami Bennani banner hanging above the stadium crowd.', 'A close view of a large banner bearing Thami Bennani’s portrait and name.'],
  timelineTag: 'The public record', timelineTitle: 'Nineteen years of questions', timelineIntro: 'This edition reflects publicly reported information and materials supplied to the archive. It will continue to grow as primary records and family materials are reviewed.',
  timeline: baseTimeline.en, statusTag: 'Where the case stands', statusTitle: 'The pursuit of justice continues. The whole truth is still sought.',
  statusBody: 'The July 2023 first-instance ruling sentenced two defendants to 20 years in prison each. The family’s lawyers announced an appeal. In December 2025, the National Committee for Truth and Justice for Thami Bennani said that, despite judicial rulings, the case had not reached its conclusion and called for all those responsible for the crime and any cover-up to be identified through due process.',
  statusNote: 'Legal note: the latest procedural status must be confirmed against current court records. This site attributes allegations and advocacy demands to their sources, respects the presumption of innocence, and does not independently determine criminal responsibility.',
  sourcesTag: 'Read the record', sourcesTitle: 'Reporting & sources', sourcesBody: 'Sensitive claims should be traceable. These sources provide the starting public record for this first edition.', videoBody: 'A Brut Afrique report documenting public calls for justice for Thami Bennani. Playback is provided by Dailymotion and is subject to its privacy and cookie policies.', watchVideo: 'Watch on Dailymotion', read: 'Open source',
  actionTitle: 'Keep his name in the light.', actionBody: 'Read carefully. Share responsibly. Help preserve verified information until every question has an answer.', copyLink: 'Copy website link', copied: 'Link copied', principle: 'Truth · Dignity · Justice',
  disclaimer: 'Independent public-interest archive. Not an official family or court website. Corrections and primary documents are welcome.', updated: 'Research reviewed August 2026',
} satisfies Copy

const overrides: Record<Language, Partial<Copy>> = {
  en: {},
  ar: {
    nav: ['القصة', 'التسلسل الزمني', 'القضية', 'المصادر'], menu: 'القائمة', heroTag: 'مختفٍ منذ 2007 · المحمدية، المغرب', title: 'أين التهامي بناني؟', subtitle: 'غيابه ليس نهاية قصته.',
    heroBody: 'لأكثر من تسعة عشر عامًا، حملت أسرة واحدة سؤالًا بلا جواب. يحفظ هذا الأرشيف العام المستقل سجل القضية، ويناصر الحقيقة والكرامة والعدالة.', explore: 'اكتشف القضية', share: 'شارك اسمه', since: 'مختفٍ منذ', age: 'عمره عند الاختفاء', years: 'سنوات بلا أجوبة', truth: 'حقيقة لا تزال مستحقة', photoCredit: 'التهامي بناني · صورة مقدمة لهذا الأرشيف',
    storyTag: 'من هو التهامي؟', storyTitle: 'ابن. أخ. حياة توقفت في السابعة عشرة.', storyBody: 'التهامي بناني شاب مغربي من مدينة المحمدية. غادر منزله يوم 14 مارس 2007 ولم يعد. ومنذ ذلك الحين، كرّست والدته حياة العلمي حياتها للبحث عن الحقيقة الكاملة بشأن ما جرى لابنها. وحوّل إصرارها حزنًا عائليًا إلى نداء وطني للمساءلة.', storyQuote: 'الاختفاء لا يمحو الإنسان، والصمت لا يحسم الحقيقة.',
    supportersTag: 'تضامن شعبي', supportersTitle: 'اسمه حاضر في المدرجات.', supportersBody: 'خلال مباراة للمنتخب المغربي سنة 2023، ارتدى مشجعون قمصانًا تحمل صورة التهامي ورفعوا لافتة كبيرة تطالب بالعدالة. تحفظ هذه الصور لحظة خرج فيها بحث أسرة عن الحقيقة إلى فضاء عام مشترك.', supportersCredit: 'صور مقدمة إلى أرشيف المشروع · تفاصيل الحدث مقدمة من المشروع، ولم يتم التحقق بشكل مستقل من المصور', supportersAlt: ['مشجعون في المدرجات يرتدون قمصانًا حمراء تحمل صورة التهامي بناني.', 'جمهور من مشجعي المغرب يرفع لافتة كبيرة تطالب بالعدالة للتهامي بناني.', 'لافتة تطالب بالعدالة للتهامي بناني معلقة فوق جمهور الملعب.', 'صورة مقربة للافتة كبيرة تحمل صورة التهامي بناني واسمه.'],
    timelineTag: 'السجل العام', timelineTitle: 'تسعة عشر عامًا من الأسئلة', timelineIntro: 'تعتمد هذه النسخة على معلومات منشورة ومواد أضيفت إلى الأرشيف، وستتوسع بعد مراجعة الوثائق الأصلية ومواد الأسرة.', timeline: baseTimeline.ar,
    statusTag: 'أين وصل الملف؟', statusTitle: 'السعي إلى العدالة مستمر، والبحث عن الحقيقة الكاملة لم ينتهِ.', statusBody: 'صدر في يوليوز 2023 حكم ابتدائي بسجن متهمين اثنين 20 سنة لكل منهما، وأعلن دفاع الأسرة عزمه استئناف الحكم. وفي دجنبر 2025، أكدت اللجنة الوطنية للحقيقة والعدالة للتهامي بناني أن القضية لم تصل إلى نهايتها رغم الأحكام القضائية، وطالبت بكشف هوية جميع المسؤولين عن الجريمة وعن أي تستر عليها، في إطار مسار قضائي عادل.', statusNote: 'تنبيه قانوني: يجب التحقق من آخر وضع إجرائي عبر السجلات القضائية الحالية. ينسب الموقع الادعاءات والمطالب إلى مصادرها، ويحترم قرينة البراءة، ولا يحدد المسؤولية الجنائية بصورة مستقلة.',
    sourcesTag: 'اقرأ السجل', sourcesTitle: 'التغطيات والمصادر', sourcesBody: 'يجب أن تكون الادعاءات الحساسة قابلة للتتبع. تشكل هذه المصادر نقطة انطلاق للسجل العام في هذه النسخة.', videoBody: 'تقرير من Brut Afrique يوثق المطالبات الشعبية بتحقيق العدالة للتهامي بناني. يُعرض الفيديو عبر Dailymotion ويخضع لسياسات الخصوصية وملفات تعريف الارتباط الخاصة بالمنصة.', watchVideo: 'شاهد على Dailymotion', read: 'افتح المصدر', actionTitle: 'لنبقِ اسمه حاضرًا.', actionBody: 'اقرأ بتأنٍ. شارك بمسؤولية. ساعد في حفظ المعلومات الموثقة حتى تجد كل الأسئلة أجوبتها.', copyLink: 'انسخ رابط الموقع', copied: 'تم نسخ الرابط', principle: 'الحقيقة · الكرامة · العدالة', disclaimer: 'أرشيف مستقل للمصلحة العامة، وليس موقعًا رسميًا للأسرة أو المحكمة. نرحب بالتصحيحات والوثائق الأصلية.', updated: 'آخر مراجعة للبحث: غشت 2026',
  },
  fr: {
    nav: ['Histoire', 'Chronologie', 'Affaire', 'Sources'], menu: 'Menu', title: 'Où est Thami Bennani ?', subtitle: "Son absence n'est pas la fin de son histoire.", heroTag: 'Disparu depuis 2007 · Mohammedia, Maroc',
    heroBody: "Depuis plus de dix-neuf ans, une famille porte une question sans réponse. Cette archive publique indépendante préserve les faits et défend la vérité, la dignité et la justice.", explore: "Découvrir l'affaire", share: 'Partager son nom', since: 'Disparu depuis', age: 'Âge lors de la disparition', years: 'Années sans réponses', truth: 'Une vérité qui reste à établir', photoCredit: 'Thami Bennani · Photo fournie à ces archives',
    storyTag: 'Qui est Thami ?', storyTitle: 'Un fils. Un frère. Une vie interrompue à dix-sept ans.', storyBody: "Thami Bennani était un adolescent marocain de Mohammedia. Le 14 mars 2007, il a quitté son domicile et n'est jamais revenu. Depuis, sa mère, Hayat Alami, consacre sa vie à obtenir un récit complet de ce qui est arrivé à son fils. Sa persévérance a transformé un deuil familial en appel national à la responsabilité.", storyQuote: "Une disparition n'efface pas une personne. Le silence n'établit pas la vérité.",
    supportersTag: 'Solidarité publique', supportersTitle: 'Son nom porté dans les tribunes.', supportersBody: "Lors d'un match du Maroc en 2023, des supporters ont porté des maillots à l'effigie de Thami et déployé une grande banderole réclamant justice. Ces photographies gardent la trace d'un moment où la quête d'une famille est devenue visible dans l'espace public.", supportersCredit: "Photographies fournies aux archives du projet · Détails de l'événement fournis par le projet ; photographe non vérifié indépendamment", supportersAlt: ["Des supporters en tribune portent des maillots rouges à l'effigie de Thami Bennani.", 'Une foule de supporters marocains présente une grande banderole Justice pour Thami Bennani.', 'Une banderole Justice pour Thami Bennani suspendue au-dessus du public du stade.', "Gros plan sur une grande banderole portant le portrait et le nom de Thami Bennani."],
    timelineTag: 'Les faits publics', timelineTitle: 'Dix-neuf ans de questions', timelineIntro: 'Cette édition reprend les informations publiquement rapportées et les documents fournis aux archives. Elle évoluera après examen des sources originales.',
    timeline: [
      { year: '14 mars 2007', title: 'Thami disparaît', body: 'Thami Bennani, 17 ans, quitte le domicile familial à Mohammedia et ne revient pas. Sa mère, Hayat Alami, entame une recherche qui durera des années.' },
      { year: '2022', title: "L'affaire revient dans le débat public", body: "Les réseaux sociaux marocains et les médias nationaux et internationaux attirent à nouveau l'attention sur la disparition et les recherches de la famille." },
      { year: '2023', title: 'Jugement en première instance', body: "La chambre criminelle de la Cour d'appel de Casablanca condamne deux accusés à 20 ans de prison chacun. La presse présente le dossier comme une affaire d'homicide." },
      { year: "2025–Aujourd'hui", title: "L'affaire n'est pas considérée comme close", body: "En décembre 2025, le Comité national pour la vérité et la justice pour Thami Bennani a renouvelé son appel à la transparence, affirmant que l'affaire n'avait pas atteint sa conclusion." },
    ],
    statusTag: "Où en est l'affaire", statusTitle: "La quête de justice continue. Toute la vérité reste à établir.", statusBody: "Le jugement de première instance de juillet 2023 a condamné deux accusés à 20 ans de prison chacun. Les avocats de la famille ont annoncé leur intention de faire appel. En décembre 2025, le Comité national pour la vérité et la justice pour Thami Bennani a déclaré que l'affaire n'avait pas atteint sa conclusion et a demandé que toutes les responsabilités soient établies par la justice.", statusNote: "Note juridique : l'état actuel de la procédure doit être vérifié dans les dossiers judiciaires. Ce site attribue les allégations à leurs sources, respecte la présomption d'innocence et ne détermine pas lui-même la responsabilité pénale.",
    sourcesTag: 'Consulter les faits', sourcesTitle: 'Articles et sources', sourcesBody: 'Toute affirmation sensible doit être traçable. Ces sources constituent le point de départ public de cette édition.', videoBody: 'Un reportage de Brut Afrique sur les appels publics à la justice pour Thami Bennani. La vidéo est diffusée via Dailymotion et soumise aux politiques de confidentialité et de cookies de la plateforme.', watchVideo: 'Voir sur Dailymotion', read: 'Ouvrir la source', actionTitle: 'Gardons son nom dans la lumière.', actionBody: "Lisez attentivement. Partagez de manière responsable. Aidez à préserver les informations vérifiées jusqu'à ce que chaque question trouve sa réponse.", copyLink: 'Copier le lien', copied: 'Lien copié', principle: 'Vérité · Dignité · Justice', disclaimer: "Archive indépendante d'intérêt public. Ce site n'est pas un site officiel de la famille ou de la justice. Les corrections et documents originaux sont bienvenus.", updated: 'Recherche vérifiée en août 2026',
  },
  es: {
    nav: ['Historia', 'Cronología', 'Caso', 'Fuentes'], menu: 'Menú', title: '¿Dónde está Thami Bennani?', subtitle: 'Su ausencia no es el final de su historia.', heroTag: 'Desaparecido desde 2007 · Mohammedia, Marruecos', heroBody: 'Durante más de diecinueve años, una familia ha vivido con una pregunta sin respuesta. Este archivo público independiente preserva los hechos y defiende la verdad, la dignidad y la justicia.', explore: 'Conocer el caso', share: 'Comparte su nombre', since: 'Desaparecido desde', age: 'Edad al desaparecer', years: 'Años sin respuestas', truth: 'Una verdad aún por esclarecer', photoCredit: 'Thami Bennani · Foto facilitada a este archivo',
    storyTag: '¿Quién es Thami?', storyTitle: 'Un hijo. Un hermano. Una vida interrumpida a los diecisiete.', storyBody: 'Thami Bennani era un adolescente marroquí de Mohammedia. El 14 de marzo de 2007 salió de casa y nunca regresó. Desde entonces, su madre, Hayat Alami, ha dedicado años a buscar una explicación completa de lo ocurrido a su hijo. Su perseverancia convirtió un dolor familiar en un llamamiento nacional a la rendición de cuentas.', storyQuote: 'Una desaparición no borra a una persona. El silencio no establece la verdad.',
    supportersTag: 'Solidaridad pública', supportersTitle: 'Su nombre llegó a las gradas.', supportersBody: 'Durante un partido de Marruecos en 2023, aficionados vistieron camisetas con el retrato de Thami y desplegaron una gran pancarta para pedir justicia. Estas fotografías conservan un momento en que la búsqueda de una familia se hizo visible en un espacio público compartido.', supportersCredit: 'Fotografías facilitadas al archivo del proyecto · Datos del evento aportados por el proyecto; autoría no verificada de forma independiente', supportersAlt: ['Aficionados en las gradas con camisetas rojas que muestran el retrato de Thami Bennani.', 'Una multitud de aficionados marroquíes muestra una gran pancarta que pide justicia para Thami Bennani.', 'Una pancarta por la justicia para Thami Bennani cuelga sobre el público del estadio.', 'Primer plano de una gran pancarta con el retrato y el nombre de Thami Bennani.'],
    timelineTag: 'El registro público', timelineTitle: 'Diecinueve años de preguntas', timelineIntro: 'Esta edición refleja información publicada y materiales aportados al archivo. Crecerá tras revisar documentos originales.', timeline: [
      { year: '14 mar 2007', title: 'Thami desaparece', body: 'Thami Bennani, de 17 años, sale de la casa familiar en Mohammedia y no regresa. Su madre, Hayat Alami, inicia una búsqueda que durará años.' },
      { year: '2022', title: 'El caso vuelve a la atención pública', body: 'Las redes sociales marroquíes y medios nacionales e internacionales reavivan el interés por la desaparición y la búsqueda de la familia.' },
      { year: '2023', title: 'Sentencia en primera instancia', body: 'La sala penal del Tribunal de Apelación de Casablanca condena a dos acusados a 20 años de prisión cada uno. La prensa describe el expediente como un caso de homicidio.' },
      { year: '2025–Hoy', title: 'El caso no se considera cerrado', body: 'En diciembre de 2025, el Comité Nacional por la Verdad y la Justicia para Thami Bennani renovó su petición de transparencia y afirmó que el caso no había llegado a su conclusión.' },
    ],
    statusTag: 'Estado del caso', statusTitle: 'La búsqueda de justicia continúa. Aún queda por esclarecer toda la verdad.', statusBody: 'La sentencia de primera instancia de julio de 2023 condenó a dos acusados a 20 años de prisión cada uno. Los abogados de la familia anunciaron su intención de recurrir la sentencia. En diciembre de 2025, el comité nacional afirmó que el caso no había concluido y pidió que la justicia estableciera todas las responsabilidades.', statusNote: 'Nota jurídica: el estado actual del procedimiento debe verificarse en los registros judiciales. Este sitio atribuye las alegaciones a sus fuentes, respeta la presunción de inocencia y no determina por sí mismo la responsabilidad penal.',
    sourcesTag: 'Consulta el registro', sourcesTitle: 'Reportajes y fuentes', sourcesBody: 'Las afirmaciones sensibles deben poder rastrearse. Estas fuentes son el punto de partida público de esta primera edición.', videoBody: 'Un reportaje de Brut Afrique sobre los llamamientos públicos a la justicia para Thami Bennani. La reproducción es proporcionada por Dailymotion y está sujeta a sus políticas de privacidad y cookies.', watchVideo: 'Ver en Dailymotion', read: 'Abrir fuente', actionTitle: 'Mantengamos vivo su nombre.', actionBody: 'Lee con atención. Comparte con responsabilidad. Ayuda a preservar información verificada hasta que cada pregunta tenga respuesta.', copyLink: 'Copiar enlace', copied: 'Enlace copiado', principle: 'Verdad · Dignidad · Justicia', disclaimer: 'Archivo independiente de interés público. No es un sitio oficial de la familia ni de los tribunales. Se aceptan correcciones y documentos originales.', updated: 'Investigación revisada en agosto de 2026',
  },
  de: {
    nav: ['Geschichte', 'Chronik', 'Fall', 'Quellen'], menu: 'Menü', title: 'Wo ist Thami Bennani?', subtitle: 'Sein Verschwinden ist nicht das Ende seiner Geschichte.', heroTag: 'Vermisst seit 2007 · Mohammedia, Marokko', heroBody: 'Seit mehr als neunzehn Jahren lebt eine Familie mit einer unbeantworteten Frage. Dieses unabhängige öffentliche Archiv bewahrt die Fakten und steht für Wahrheit, Würde und Gerechtigkeit.', explore: 'Den Fall ansehen', share: 'Seinen Namen teilen', since: 'Vermisst seit', age: 'Alter beim Verschwinden', years: 'Jahre ohne Antworten', truth: 'Eine Wahrheit, die noch aussteht', photoCredit: 'Thami Bennani · Foto für dieses Archiv bereitgestellt',
    storyTag: 'Wer ist Thami?', storyTitle: 'Ein Sohn. Ein Bruder. Ein Leben, das mit siebzehn unterbrochen wurde.', storyBody: 'Thami Bennani war ein marokkanischer Jugendlicher aus Mohammedia. Am 14. März 2007 verließ er sein Zuhause und kehrte nie zurück. Seine Mutter Hayat Alami bemüht sich seitdem um eine vollständige Aufklärung dessen, was ihrem Sohn widerfuhr. Ihre Beharrlichkeit machte aus persönlicher Trauer einen landesweiten Ruf nach Rechenschaft.', storyQuote: 'Ein Verschwinden löscht keinen Menschen aus. Schweigen schafft keine Wahrheit.',
    supportersTag: 'Öffentliche Solidarität', supportersTitle: 'Sein Name in den Rängen.', supportersBody: 'Bei einem Fußballspiel Marokkos im Jahr 2023 trugen Fans Shirts mit Thamis Porträt und zeigten ein großes Banner mit der Forderung nach Gerechtigkeit. Die Fotografien bewahren einen Moment, in dem die Suche einer Familie im öffentlichen Raum sichtbar wurde.', supportersCredit: 'Dem Projektarchiv bereitgestellte Fotografien · Veranstaltungsangaben vom Projekt; Urheberschaft nicht unabhängig geprüft', supportersAlt: ['Fans auf der Tribüne tragen rote Shirts mit dem Porträt von Thami Bennani.', 'Eine Menge marokkanischer Fans zeigt ein großes Banner mit der Forderung nach Gerechtigkeit für Thami Bennani.', 'Ein Banner für Gerechtigkeit für Thami Bennani hängt über dem Stadionpublikum.', 'Nahaufnahme eines großen Banners mit dem Porträt und Namen von Thami Bennani.'],
    timelineTag: 'Öffentliche Chronik', timelineTitle: 'Neunzehn Jahre voller Fragen', timelineIntro: 'Diese Ausgabe beruht auf öffentlich berichteten Informationen und dem Archiv übergebenen Materialien. Sie wird nach Prüfung von Originaldokumenten erweitert.', timeline: [
      { year: '14. März 2007', title: 'Thami verschwindet', body: 'Der 17-jährige Thami Bennani verlässt das Familienhaus in Mohammedia und kehrt nicht zurück. Seine Mutter Hayat Alami beginnt eine jahrelange Suche.' },
      { year: '2022', title: 'Der Fall rückt erneut in die Öffentlichkeit', body: 'Marokkanische soziale Medien sowie nationale und internationale Berichte lenken erneut Aufmerksamkeit auf das Verschwinden und die Suche der Familie.' },
      { year: '2023', title: 'Erstinstanzliches Urteil', body: 'Die Strafkammer des Berufungsgerichts Casablanca verurteilt zwei Angeklagte zu jeweils 20 Jahren Haft. Medien bezeichnen das Verfahren als Tötungsfall.' },
      { year: '2025–Heute', title: 'Der Fall gilt nicht als abgeschlossen', body: 'Im Dezember 2025 erneuerte das Nationale Komitee für Wahrheit und Gerechtigkeit für Thami Bennani seinen Ruf nach Transparenz und erklärte, der Fall sei nicht abgeschlossen.' },
    ],
    statusTag: 'Stand des Falls', statusTitle: 'Das Streben nach Gerechtigkeit geht weiter. Die ganze Wahrheit ist noch nicht geklärt.', statusBody: 'Das erstinstanzliche Urteil vom Juli 2023 verhängte gegen zwei Angeklagte jeweils 20 Jahre Haft. Die Anwälte der Familie kündigten an, Rechtsmittel einzulegen. Im Dezember 2025 erklärte das nationale Komitee, der Fall sei nicht abgeschlossen, und forderte die gerichtliche Klärung aller Verantwortlichkeiten.', statusNote: 'Rechtlicher Hinweis: Der aktuelle Verfahrensstand muss anhand der Gerichtsakten geprüft werden. Diese Seite ordnet Behauptungen ihren Quellen zu, achtet die Unschuldsvermutung und bestimmt nicht selbst die strafrechtliche Verantwortung.',
    sourcesTag: 'Die Chronik lesen', sourcesTitle: 'Berichte und Quellen', sourcesBody: 'Sensible Aussagen müssen nachvollziehbar sein. Diese Quellen bilden den öffentlichen Ausgangspunkt dieser ersten Ausgabe.', videoBody: 'Ein Bericht von Brut Afrique über öffentliche Forderungen nach Gerechtigkeit für Thami Bennani. Die Wiedergabe erfolgt über Dailymotion und unterliegt dessen Datenschutz- und Cookie-Richtlinien.', watchVideo: 'Auf Dailymotion ansehen', read: 'Quelle öffnen', actionTitle: 'Halten wir seinen Namen lebendig.', actionBody: 'Lesen Sie sorgfältig. Teilen Sie verantwortungsvoll. Helfen Sie, geprüfte Informationen zu bewahren, bis jede Frage beantwortet ist.', copyLink: 'Link kopieren', copied: 'Link kopiert', principle: 'Wahrheit · Würde · Gerechtigkeit', disclaimer: 'Unabhängiges Archiv im öffentlichen Interesse. Keine offizielle Website der Familie oder eines Gerichts. Korrekturen und Originaldokumente sind willkommen.', updated: 'Recherche geprüft im August 2026',
  },
  tr: {
    nav: ['Hikâye', 'Zaman çizelgesi', 'Dava', 'Kaynaklar'], menu: 'Menü', title: 'Thami Bennani nerede?', subtitle: 'Onun kayboluşu, hikâyesinin sonu değil.', heroTag: '2007’den beri kayıp · Muhammediye, Fas', heroBody: 'On dokuz yılı aşkın süredir bir aile cevapsız bir soruyla yaşıyor. Bu bağımsız kamu arşivi kayıtları koruyor; hakikat, onur ve adalet için ses veriyor.', explore: 'Davayı incele', share: 'Adını paylaş', since: 'Kayıp olduğu yıl', age: 'Kaybolduğundaki yaşı', years: 'Cevapsız geçen yıl', truth: 'Hâlâ aydınlatılmayı bekleyen gerçek', photoCredit: 'Thami Bennani · Bu arşive sağlanan fotoğraf',
    storyTag: 'Thami kim?', storyTitle: 'Bir evlat. Bir kardeş. On yedi yaşında yarım kalan bir hayat.', storyBody: 'Thami Bennani, Muhammediye’den Faslı bir gençti. 14 Mart 2007’de evden çıktı ve geri dönmedi. Annesi Hayat Alami o günden beri oğluna ne olduğunun eksiksiz biçimde açıklanması için mücadele ediyor. Onun kararlılığı, ailevi bir acıyı ülke çapında hesap verebilirlik çağrısına dönüştürdü.', storyQuote: 'Bir kayıp, insanı yok etmez. Sessizlik hakikati belirlemez.',
    supportersTag: 'Toplumsal dayanışma', supportersTitle: 'Adı tribünlere taşındı.', supportersBody: 'Fas’ın 2023 yılındaki bir futbol maçında taraftarlar Thami’nin portresini taşıyan formalar giydi ve adalet talep eden büyük bir pankart açtı. Bu fotoğraflar, bir ailenin arayışının ortak bir kamusal alanda görünür olduğu anı belgeliyor.', supportersCredit: 'Proje arşivine sağlanan fotoğraflar · Etkinlik bilgileri proje tarafından sağlanmıştır; fotoğrafçı bağımsız olarak doğrulanmamıştır', supportersAlt: ['Tribünlerde Thami Bennani’nin portresini taşıyan kırmızı tişörtler giyen taraftarlar.', 'Faslı taraftarlardan oluşan kalabalık Thami Bennani için adalet isteyen büyük bir pankart açıyor.', 'Thami Bennani için adalet pankartı stadyum kalabalığının üzerinde asılı duruyor.', 'Thami Bennani’nin portresi ve adını taşıyan büyük pankartın yakın görünümü.'],
    timelineTag: 'Kamuya açık kayıtlar', timelineTitle: 'On dokuz yıllık sorular', timelineIntro: 'Bu sürüm, kamuya açık haberlere ve arşive sağlanan materyallere dayanmaktadır. Birincil belgeler incelendikçe genişletilecektir.', timeline: [
      { year: '14 Mart 2007', title: 'Thami kaybolur', body: '17 yaşındaki Thami Bennani, Muhammediye’deki aile evinden çıkar ve geri dönmez. Annesi Hayat Alami yıllarca sürecek arayışına başlar.' },
      { year: '2022', title: 'Dava yeniden kamuoyunun gündeminde', body: 'Fas sosyal medyası ile ulusal ve uluslararası haberler, kayboluşa ve ailenin arayışına yeniden dikkat çeker.' },
      { year: '2023', title: 'İlk derece kararı', body: 'Kazablanka İstinaf Mahkemesi ceza dairesi iki sanığa ayrı ayrı 20 yıl hapis cezası verir. Haberlerde dosya bir öldürme davası olarak aktarılır.' },
      { year: '2025–Bugün', title: 'Dava kapanmış sayılmıyor', body: 'Aralık 2025’te Thami Bennani için Hakikat ve Adalet Ulusal Komitesi şeffaflık çağrısını yineledi ve davanın henüz sonuçlanmadığını belirtti.' },
    ],
    statusTag: 'Davanın durumu', statusTitle: 'Adalet arayışı sürüyor. Tüm gerçekler hâlâ aydınlatılmayı bekliyor.', statusBody: 'Temmuz 2023 tarihli ilk derece kararı iki sanığa ayrı ayrı 20 yıl hapis cezası verdi. Ailenin avukatları karara karşı temyize başvuracaklarını açıkladı. Aralık 2025’te ulusal komite davanın sonuçlanmadığını belirterek tüm sorumlulukların yargı önünde belirlenmesini istedi.', statusNote: 'Hukuki not: Güncel usul durumu mahkeme kayıtlarından doğrulanmalıdır. Bu site iddiaları kaynaklarına atfeder, masumiyet karinesine saygı gösterir ve cezai sorumluluğu kendisi belirlemez.',
    sourcesTag: 'Kayıtları oku', sourcesTitle: 'Haberler ve kaynaklar', sourcesBody: 'Hassas iddialar izlenebilir olmalıdır. Bu kaynaklar, ilk sürümün kamuya açık başlangıç kaydını oluşturur.', videoBody: 'Brut Afrique’in Thami Bennani için kamuoyundaki adalet çağrılarını belgeleyen haberi. Oynatma Dailymotion tarafından sağlanır ve platformun gizlilik ve çerez politikalarına tabidir.', watchVideo: 'Dailymotion’da izle', read: 'Kaynağı aç', actionTitle: 'Adını yaşatalım.', actionBody: 'Dikkatle okuyun. Sorumlulukla paylaşın. Her soru yanıtlanana kadar doğrulanmış bilgilerin korunmasına yardım edin.', copyLink: 'Bağlantıyı kopyala', copied: 'Bağlantı kopyalandı', principle: 'Hakikat · Onur · Adalet', disclaimer: 'Bağımsız kamu yararı arşivi. Ailenin veya mahkemenin resmî sitesi değildir. Düzeltmeler ve birincil belgeler kabul edilir.', updated: 'Araştırma Ağustos 2026’da gözden geçirildi',
  },
  ja: {
    nav: ['物語', '経緯', '事件', '情報源'], menu: 'メニュー', title: 'タミ・ベナニはどこに？', subtitle: '彼の不在は、物語の終わりではありません。', heroTag: '2007年から行方不明 · モロッコ、モハメディア', heroBody: '19年以上にわたり、ある家族は答えのない問いを抱え続けています。この独立した公開アーカイブは記録を保存し、真実、尊厳、正義を求めます。', explore: '事件を知る', share: '彼の名前を伝える', since: '行方不明になった年', age: '行方不明時の年齢', years: '答えのない年月', truth: '明らかにされるべき真実', photoCredit: 'タミ・ベナニ · 本アーカイブに提供された写真',
    storyTag: 'タミとは？', storyTitle: '息子。兄弟。17歳で断たれた人生。', storyBody: 'タミ・ベナニはモハメディア出身のモロッコの少年でした。2007年3月14日に家を出たまま、戻りませんでした。母ハヤト・アラミはそれ以来、息子に何が起きたのか、その全容を明らかにするよう求め続けています。その粘り強さは、一家族の悲しみを、説明責任を求める全国的な声へと変えました。', storyQuote: '失踪によって人の存在は消えません。沈黙が真実を決めることもありません。',
    supportersTag: '社会の連帯', supportersTitle: 'スタンドに掲げられた彼の名前。', supportersBody: '2023年に行われたモロッコのサッカーの試合で、サポーターたちはタミの肖像入りシャツを着て、正義を求める大きな横断幕を掲げました。これらの写真は、一家族の訴えが公共の場で共有された一瞬を記録しています。', supportersCredit: 'プロジェクトアーカイブへの提供写真 · イベント情報はプロジェクト提供、撮影者は独自に確認されていません', supportersAlt: ['スタンドでタミ・ベナニの肖像入り赤いシャツを着るサポーターたち。', 'モロッコのサポーターたちがタミ・ベナニへの正義を求める大きな横断幕を掲げている。', 'スタジアムの観客席の上に掲げられたタミ・ベナニへの正義を求める横断幕。', 'タミ・ベナニの肖像と名前が入った大きな横断幕の近景。'],
    timelineTag: '公開記録', timelineTitle: '19年間の問い', timelineIntro: 'この版は公開報道とアーカイブに提供された資料に基づいています。一次資料を確認しながら更新します。', timeline: [
      { year: '2007年3月14日', title: 'タミが行方不明に', body: '17歳のタミ・ベナニはモハメディアの自宅を出たまま戻りませんでした。母ハヤト・アラミは長年にわたる捜索を始めます。' },
      { year: '2022', title: '事件が再び社会の注目を集める', body: 'モロッコのソーシャルメディアと国内外の報道が、失踪と家族の捜索に再び光を当てました。' },
      { year: '2023', title: '第一審判決', body: 'カサブランカ控訴裁判所の刑事部は、被告2人にそれぞれ禁錮20年を言い渡しました。報道では殺人事件として扱われています。' },
      { year: '2025年–現在', title: '事件は終結したとは見なされていない', body: '2025年12月、タミ・ベナニ真実・正義全国委員会は透明性を改めて求め、事件はまだ終結していないと表明しました。' },
    ],
    statusTag: '事件の現在', statusTitle: '正義を求める歩みは続いています。全容はまだ解明されていません。', statusBody: '2023年7月の第一審判決は被告2人にそれぞれ20年の拘禁刑を言い渡しました。家族の弁護士は上訴する意向を表明しました。2025年12月、全国委員会は事件は終結していないと述べ、司法を通じたすべての責任の解明を求めました。', statusNote: '法的注記：最新の手続状況は裁判記録で確認する必要があります。本サイトは主張を情報源に帰属させ、無罪推定を尊重し、独自に刑事責任を認定するものではありません。',
    sourcesTag: '記録を読む', sourcesTitle: '報道と情報源', sourcesBody: '慎重を要する主張には出典が必要です。以下はこの初版における公開記録の出発点です。', videoBody: 'タミ・ベナニへの正義を求める市民の声を記録したBrut Afriqueの報道です。再生はDailymotionが提供し、同社のプライバシーおよびCookieポリシーが適用されます。', watchVideo: 'Dailymotionで見る', read: '情報源を開く', actionTitle: '彼の名前を語り続けよう。', actionBody: '注意深く読み、責任をもって共有してください。すべての問いに答えが出るまで、確認された情報を守りましょう。', copyLink: 'リンクをコピー', copied: 'コピーしました', principle: '真実 · 尊厳 · 正義', disclaimer: '公共の利益のための独立アーカイブです。家族または裁判所の公式サイトではありません。訂正や一次資料を受け付けています。', updated: '2026年8月に調査内容を確認',
  },
  zh: {
    nav: ['故事', '时间线', '案件', '来源'], menu: '菜单', title: '塔米·本纳尼在哪里？', subtitle: '他的失踪并非故事的终点。', heroTag: '自2007年失踪 · 摩洛哥穆罕默迪耶', heroBody: '十九年多以来，一个家庭始终面对着一个没有答案的问题。这份独立的公共档案保存相关记录，支持对真相、尊严与正义的追求。', explore: '了解案件', share: '传播他的名字', since: '失踪年份', age: '失踪时年龄', years: '未获答案的年数', truth: '仍待查明的真相', photoCredit: '塔米·本纳尼 · 照片由资料提供者交予本档案',
    storyTag: '塔米是谁？', storyTitle: '一个儿子。一个兄弟。十七岁时戛然而止的人生。', storyBody: '塔米·本纳尼是来自穆罕默迪耶的摩洛哥少年。2007年3月14日，他离开家后再也没有回来。此后，他的母亲哈雅特·阿拉米一直要求完整查明儿子的遭遇。她的坚持把一个家庭的悲痛转化为全国要求问责的呼声。', storyQuote: '失踪不会抹去一个人。沉默也不能决定真相。',
    supportersTag: '公众声援', supportersTitle: '他的名字出现在看台上。', supportersBody: '在2023年的一场摩洛哥足球比赛中，球迷穿着印有塔米肖像的上衣，并展开要求正义的大型横幅。这些照片记录了一个家庭的追寻在公共空间中被共同看见的时刻。', supportersCredit: '由项目资料提供者交予档案的照片 · 活动信息由项目提供，摄影者未经独立核实', supportersAlt: ['看台上的球迷穿着印有塔米·本纳尼肖像的红色上衣。', '摩洛哥球迷在人群中展开要求为塔米·本纳尼伸张正义的大型横幅。', '要求为塔米·本纳尼伸张正义的横幅悬挂在体育场观众上方。', '印有塔米·本纳尼肖像和姓名的大型横幅近景。'],
    timelineTag: '公开记录', timelineTitle: '十九年的追问', timelineIntro: '本版依据公开报道和提供给档案的资料编写。随着原始文件得到审阅，内容将继续完善。', timeline: [
      { year: '2007年3月14日', title: '塔米失踪', body: '17岁的塔米·本纳尼离开穆罕默迪耶的家后没有返回。他的母亲哈雅特·阿拉米开始了长达多年的寻找。' },
      { year: '2022', title: '案件重回公众视野', body: '摩洛哥社交媒体以及国内外新闻报道再次关注这起失踪事件和家人的寻找。' },
      { year: '2023', title: '一审判决', body: '卡萨布兰卡上诉法院刑事庭判处两名被告各20年监禁。媒体将该案描述为一起杀人案件。' },
      { year: '2025年至今', title: '案件不被视为已经结束', body: '2025年12月，塔米·本纳尼真相与正义全国委员会再次呼吁透明，并表示该案尚未结束。' },
    ],
    statusTag: '案件进展', statusTitle: '追求正义的努力仍在继续，完整真相仍有待查明。', statusBody: '2023年7月的一审判决判处两名被告各20年监禁。家属律师宣布了提起上诉的意向。2025年12月，全国委员会表示案件尚未结束，并呼吁通过司法程序查明所有责任。', statusNote: '法律说明：最新程序状态应以法院记录为准。本网站将相关说法归于其来源，尊重无罪推定，不自行认定刑事责任。',
    sourcesTag: '查阅记录', sourcesTitle: '报道与来源', sourcesBody: '敏感说法应当可以追溯。以下来源构成第一版公开记录的起点。', videoBody: 'Brut Afrique记录公众为塔米·本纳尼寻求正义的报道。视频由Dailymotion提供播放，并受其隐私和Cookie政策约束。', watchVideo: '在Dailymotion观看', read: '打开来源', actionTitle: '让他的名字继续被看见。', actionBody: '认真阅读，负责任地分享。在每个问题得到答案之前，帮助保存经过核实的信息。', copyLink: '复制链接', copied: '已复制', principle: '真相 · 尊严 · 正义', disclaimer: '独立的公益档案，并非家属或法院的官方网站。欢迎提供更正和原始文件。', updated: '研究内容于2026年8月复核',
  },
}

export const getCopy = (language: Language): Copy => ({ ...common, ...overrides[language] })

export const sources = [
  { outlet: 'BBC News عربي', date: '28 Jan 2022', title: 'قضية الشاب التهامي بناني تشغل الرأي العام المغربي بعد 15 عاما من اختفائه', url: 'https://www.bbc.com/arabic/tv-and-radio-60161043' },
  { outlet: 'Hespress English', date: '31 Jan 2022', title: '#JusticeForThamiBennani and the public campaign for justice', url: 'https://en.hespress.com/35319-moroccans-continue-to-demand-justice-for-thami-bennani-despite-absence-of-corpse.html' },
  { outlet: 'TelQuel', date: '13 Jul 2023', title: 'Meurtre du jeune Thami Bennani : 20 ans de prison pour les accusés', url: 'https://telquel.ma/instant-t/2023/07/13/meurtre-du-jeune-thami-bennani-20-ans-de-prison-pour-les-accuses_1821202/' },
  { outlet: 'H24Info', date: '13 Jul 2023', title: 'Affaire Thami Bennani : la famille fera appel du jugement', url: 'https://h24info.ma/maroc/affaire-thami-bennani-la-famille-fera-appel-du-jugement/' },
  { outlet: 'Maroc Hebdo', date: '14 Jul 2023', title: 'Affaire Thami Bennani : ce cold case qui glace le sang des internautes', url: 'https://www.maroc-hebdo.com/article/affaire-thami-bennani' },
  { outlet: 'Morocco World News', date: '31 Dec 2025', title: 'After 19 years, rights committee renews calls for transparency', url: 'https://www.moroccoworldnews.com/2025/12/273480/after-19-years-moroccan-rights-committee-renews-calls-for-transparency-in-thami-bennani-case/' },
  { outlet: 'YouTube', date: 'Public video', title: 'Affaire Thami Bennani : une mystérieuse disparition au Maroc refait surface', url: 'https://www.youtube.com/watch?v=EcruoFEoPgQ' },
  { outlet: 'Hayat Alami', date: 'Ongoing', title: "Thami's mother: public video archive and testimony", url: 'https://www.youtube.com/@hayat-alami' },
]