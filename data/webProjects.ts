/**
 * Web Gelistirme projeleri - /projects/web sayfasinin icerik kaynagi.
 *
 * Sayfadaki proje metinlerinin tamami burada durur; arayuz metinleri (bolum
 * basliklari, buton yazilari) data/content.json icindeki `web` bolumundedir.
 *
 * Kart tipleri:
 *   kind: "live"     -> `live` adresi 1280px genislikte iframe olarak kucultulup
 *                       kartta gosterilir, tam ekran modal ile buyutulebilir.
 *   kind: "youtube"  -> `videoId` kapak goruntusu olarak inar, oynatici ancak
 *                       tiklaninca kurulur.
 *
 * `live` dis bir adres olabilir ya da public/ altinda barindirilan bir sayfa
 * olabilir; ikisi de ayni sekilde kucultulup gosterilir.
 */

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface LocalizedList {
  tr: string[];
  en: string[];
}

export interface WebProjectStory {
  problem: LocalizedText;
  amac: LocalizedText;
  cozum: LocalizedText;
  ozellikler: LocalizedList;
  ogrendim: LocalizedText;
}

interface WebProjectBase {
  id: string;
  /** Proje adi iki dilde ayni. */
  name: string;
  summary: LocalizedText;
  tags: string[];
  /** Deposu olmayan projelerde bos birakilir, buton gosterilmez. */
  github?: string;
  /** Varsa proje raporu; public/ altina goreli PDF yolu. */
  report?: string;
  story: WebProjectStory;
}

export interface LiveWebProject extends WebProjectBase {
  kind: "live";
  live: string;
}

export interface VideoWebProject extends WebProjectBase {
  kind: "youtube";
  videoId: string;
}

export type WebProject = LiveWebProject | VideoWebProject;

/** Mini onizlemenin render genisligi ve yuksekligi. */
export const PREVIEW_WIDTH = 1280;
export const PREVIEW_HEIGHT = 800;

/** iframe bu sure icinde yuklenmezse yedek baglantiya dusulur. */
export const LOAD_TIMEOUT = 9000;

export const webProjects: WebProject[] = [
  {
    id: "lion-commerce",
    name: "Lion Commerce",
    kind: "live",
    live: "https://caglaeras.github.io/LionCommerce/",
    github: "https://github.com/caglaeras/LionCommerce",
    tags: ["HTML", "CSS", "GitHub Pages"],
    summary: {
      tr: "HTML ve CSS ile sıfırdan kurulmuş çok sayfalı e-ticaret sitesi. Ürün listeleme, ürün detayı ve form akışlarını içerir.",
      en: "A multi-page e-commerce site built from scratch with HTML and CSS. It includes product listings, product details, and form flows.",
    },
    story: {
      problem: {
        tr: "Web geliştirmeye başlarken öğrendiğim HTML ve CSS bilgisi, dağınık alıştırmalar hâlinde kalıyor ve bütünlüklü bir ürüne dönüşmüyordu. Etiketleri tek tek denemek yerine, baştan sona tasarlanmış gerçek bir siteye ihtiyacım vardı.",
        en: "When I started learning web development, my HTML and CSS knowledge remained a collection of separate exercises rather than becoming a complete product. I needed to build a real site from start to finish instead of testing tags one by one.",
      },
      amac: {
        tr: "Ürün listelemeden ürün detayına, iletişimden kayıt formuna kadar bir e-ticaret akışının tamamını kendi başıma kurmak istedim. Hedefim, webin temel yapı taşlarını gerçek bir senaryo içinde kullanmaktı.",
        en: "I wanted to build an entire e-commerce flow myself, from product listings and details to contact and registration forms. My goal was to use the basic building blocks of the web in a real scenario.",
      },
      cozum: {
        tr: "Yalnızca HTML ve CSS kullanarak çok sayfalı bir e-ticaret sitesi geliştirdim. Ürün listeleri, ürün detay sayfaları, iletişim ve kayıt formları birbirine bağlı, bütünlüklü bir yapı içinde çalışıyor. Site GitHub Pages üzerinde yayında.",
        en: "I developed a multi-page e-commerce site using only HTML and CSS. Its product lists, product detail pages, contact forms, and registration forms work together as a complete system. The site is live on GitHub Pages.",
      },
      ozellikler: {
        tr: [
          "Çok sayfalı gezinme yapısı ve sayfalar arasında tutarlı düzen",
          "Ürün listeleme ve ürün detay sayfaları",
          "İletişim ve kayıt formu şablonları",
          "Responsive yerleşim için CSS düzen teknikleri",
          "GitHub Pages üzerinde canlı yayın",
        ],
        en: [
          "Multi-page navigation and a consistent layout across pages",
          "Product listing and product detail pages",
          "Contact and registration form templates",
          "CSS layout techniques for a responsive design",
          "Live deployment on GitHub Pages",
        ],
      },
      ogrendim: {
        tr: "Sayfa sayısı arttıkça semantik HTML kurgusunun ve CSS ile düzen oluşturmanın ne kadar belirleyici olduğunu gördüm. Bir projeyi yayına almanın, onu bitmiş saymaktan farklı bir disiplin gerektirdiğini de burada öğrendim.",
        en: "As the number of pages grew, I saw how important semantic HTML and a well-planned CSS layout are. I also learned that publishing a project requires a different discipline from simply considering it finished.",
      },
    },
  },
  {
    id: "essay-grader",
    name: "Essay Grader",
    kind: "live",
    live: "https://caglaeras.github.io/EssayGrader/",
    github: "https://github.com/caglaeras/EssayGrader",
    tags: ["React", "Vite", "LLM API"],
    summary: {
      tr: "React ve Vite ile geliştirilmiş, dil modeli destekli kompozisyon değerlendirme aracı. Rubriğe dayalı puanlama ile Türkçe / İngilizce desteği sunar.",
      en: "A language model-assisted essay assessment tool built with React and Vite. It offers rubric-based scoring and Turkish / English support.",
    },
    story: {
      problem: {
        tr: "Kompozisyon değerlendirmesi, öğretmenler için hem zaman alan hem de kolayca tutarsızlaşabilen bir iş. Aynı metni farklı zamanlarda okuyan bir değerlendirici bile birbirinden uzak puanlar verebiliyor.",
        en: "Assessing essays takes teachers a great deal of time and can easily become inconsistent. Even the same evaluator may give very different scores when reading a text at different times.",
      },
      amac: {
        tr: "Öğretmenlerin değerlendirme yükünü azaltmak ve puanlamayı belirli bir rubriğe bağlayarak daha tutarlı hâle getirmek istedim. Aracın Türkçe ve İngilizce metinlerle çalışması baştan beri şarttı.",
        en: "I wanted to reduce teachers' assessment workload and make scoring more consistent by tying it to a specific rubric. Support for both Turkish and English texts was a requirement from the start.",
      },
      cozum: {
        tr: "React ve Vite ile, rubriğe dayalı puanlama için bir dil modeli kullanan değerlendirme aracı geliştirdim. Kullanıcı metni giriyor; araç, rubrik başlıklarına göre bir puan ve kısa bir gerekçe üretiyor.",
        en: "I developed an assessment tool with React and Vite that uses a language model for rubric-based scoring. The user enters a text, and the tool produces a score and a brief explanation for each rubric category.",
      },
      ozellikler: {
        tr: [
          "Rubrik başlıklarına göre puanlama ve gerekçe üretimi",
          "Türkçe ve İngilizce dil desteği",
          "LLM API entegrasyonu",
          "Vite ile hızlı geliştirme ve derleme akışı",
          "Tarayıcıda çalışan hafif arayüz",
        ],
        en: [
          "Scoring and explanations based on rubric categories",
          "Turkish and English language support",
          "LLM API integration",
          "Fast development and build flow with Vite",
          "Lightweight browser-based interface",
        ],
      },
      ogrendim: {
        tr: "Bir dil modelinin çıktısını kullanışlı kılanın modelin kendisi değil, ona verilen rubrik ve istem yapısı olduğunu gördüm. Ayrıca API anahtarı yönetiminin ve hata durumlarını arayüzde doğru biçimde ele almanın önemini kavradım.",
        en: "I saw that what makes a language model's output useful is not the model alone, but the rubric and prompt structure given to it. I also learned the importance of API key management and handling errors properly in the interface.",
      },
    },
  },
  {
    id: "hue-hunter",
    name: "Hue Hunter",
    kind: "live",
    live: "/Portfolio/apps/hue-hunter/index.html",
    report: "/documents/HueHunter_HCI_Report.pdf",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: {
      tr: "RGB kaydırıcılarıyla hedef rengi yakalamaya çalıştığınız tek dosyalık renk karıştırma oyunu. İnsan bilgisayar etkileşimi dersi için Hilal Semiz ile birlikte geliştirildi.",
      en: "A single-file color-mixing game in which players use RGB sliders to match a target color. Developed with Hilal Semiz for a human-computer interaction course.",
    },
    story: {
      problem: {
        tr: "RGB ile renk karışımı yalnızca anlatıldığında soyut kalıyor; kırmızı, yeşil ve mavi kanalların birlikte ne ürettiğini görmeden kavramak zor. Ayrıca küçük bir oyunda arayüz kararları çoğu zaman sezgiyle alınıyor. Bu kararların hangi ilkeye dayandığı yazılı olmadığında onları tartışmak da zorlaşıyor.",
        en: "RGB color mixing remains abstract when it is only explained. It is difficult to understand what the red, green, and blue channels produce together without seeing the result. Interface decisions in a small game are also often based on intuition, and they are difficult to discuss when their underlying principles are not documented.",
      },
      amac: {
        tr: "Renk karışımını deneyerek öğrenmeyi sağlayan, küçük ama tamamlanmış bir oyun yapmak istedik. İkinci hedefimiz, her arayüz kararını bilinen bir etkileşim ilkesine bağlamak ve gerekçesini raporda açıklamaktı.",
        en: "We wanted to make a small but complete game that allowed players to learn color mixing through experimentation. Our second goal was to connect every interface decision to an established interaction principle and explain the reasoning in our report.",
      },
      cozum: {
        tr: "HTML, CSS ve JavaScript ile tek dosyada çalışan bir oyun geliştirdim. Kurulum gerektirmeden tarayıcıda açılıyor. Oyun beş modülden oluşuyor: renk karıştırma, ipucu sistemi, Odd One Out mini oyunu, gardırop ve öğretici. Oyuncu hedef rengi yakaladıkça puan, puan karşılığında da gardıroptaki avatar eşyalarını alabileceği coin kazanıyor. Tüm durum tarayıcının yerel deposunda tutuluyor.",
        en: "I developed a single-file game with HTML, CSS, and JavaScript. It opens in a browser without installation. The game has five modules: color mixing, a hint system, an Odd One Out mini-game, a wardrobe, and a tutorial. Players earn points by matching the target color and receive coins they can spend on avatar items in the wardrobe. All state is stored in the browser's local storage.",
      },
      ozellikler: {
        tr: [
          "Hedef rengi ve oyuncunun karışımını yan yana gösteren ekran ile R, G, B kaydırıcıları",
          "Puanın coine, coinin gardıroptaki avatar eşyalarına dönüştüğü döngü",
          "Beş saniyelik Odd One Out mini oyunuyla ek ipucu kazanma",
          "İlk oyunda adım adım öğretici, kalıcı yardım ekranı ve genişletilebilir RGB açıklaması",
          "Kurulum gerektirmeyen tek dosya ve tarayıcının yerel deposunda tutulan durum",
        ],
        en: [
          "Side-by-side target and player colors with R, G, B sliders",
          "A loop that turns points into coins and coins into wardrobe items",
          "Extra hints earned through a five-second Odd One Out mini-game",
          "A step-by-step first-game tutorial, a persistent help screen, and an expandable RGB explanation",
          "A single file requiring no installation, with state stored in the browser's local storage",
        ],
      },
      ogrendim: {
        tr: "Kaydırıcıyı kontrol ettiği kanalın rengiyle boyamak gibi küçük kararların, ekrana açıklama yazmaktan daha etkili olduğunu gördüm. Tüm onay pencerelerini aynı düzende sunmanın da kullanıcıyı her seferinde arayüzü yeniden öğrenmekten kurtardığını öğrendim. Başka bir deyişle, tutarlılık kendi başına kullanım kolaylığı sağlıyor.",
        en: "I found that small decisions, such as coloring each slider to match the channel it controls, worked better than adding explanations to the screen. I also learned that using the same layout for every confirmation window keeps users from having to relearn the interface each time. In other words, consistency improves usability on its own.",
      },
    },
  },
  {
    id: "unimarket",
    name: "UniMarket",
    kind: "youtube",
    videoId: "xbRc3xKAoq8",
    github: "https://github.com/caglaeras/HousingMarket",
    tags: ["ASP.NET Core", "EF Core", "SQL Server"],
    summary: {
      tr: "Üniversite öğrencilerine yönelik ikinci el eşya pazaryeri. Sepet, sipariş, favoriler ve nakliyeci listesi içerir.",
      en: "A second-hand goods marketplace for university students. It includes a cart, orders, favorites, and a list of moving companies.",
    },
    story: {
      problem: {
        tr: "Dönem sonlarında öğrenciler taşınırken hâlâ kullanılabilir durumdaki eşyalar çöpe gidiyor ya da çok ucuza elden çıkarılıyor. Öğrencilerin birbirine güvenli biçimde ulaşabileceği ortak bir platform yoktu.",
        en: "When students move at the end of a term, usable items are often thrown away or sold very cheaply. There was no shared platform where students could safely connect with one another.",
      },
      amac: {
        tr: "Üniversite öğrencilerine özel, ikinci el eşyaları alıcılarla buluşturan bir pazaryeri kurmak istedim. Yalnızca bir ilan panosu değil, siparişe kadar uzanan eksiksiz bir akış hedefledim.",
        en: "I wanted to build a marketplace specifically for university students that connected second-hand goods with buyers. I aimed for a complete flow through to ordering, not just a listings board.",
      },
      cozum: {
        tr: "ASP.NET Core MVC, Entity Framework Core ve Identity kullanarak sepet, sipariş, favoriler ve nakliyeci listesi içeren bir pazaryeri geliştirdim. Veriler SQL Server üzerinde tutuluyor.",
        en: "I developed a marketplace with ASP.NET Core MVC, Entity Framework Core, and Identity. It includes a cart, orders, favorites, and a list of moving companies. Data is stored in SQL Server.",
      },
      ozellikler: {
        tr: [
          "Identity ile kullanıcı kaydı ve oturum yönetimi",
          "Sepet ve sipariş akışı",
          "Favori ürün listesi",
          "Taşınma sürecine yardımcı nakliyeci listesi",
          "EF Core ile SQL Server veri katmanı",
        ],
        en: [
          "User registration and session management with Identity",
          "Cart and order flow",
          "Favorite products list",
          "List of moving companies to help with relocation",
          "SQL Server data layer with EF Core",
        ],
      },
      ogrendim: {
        tr: "Katmanlı bir MVC uygulamasında veri modelini baştan doğru kurmanın, sonradan eklenen her özelliği ne kadar kolaylaştırdığını gördüm. Kimlik doğrulamayı hazır ve sınanmış bir altyapıyla çözmenin, kendi çözümümü yazmaya çalışmaktan çok daha güvenli olduğunu öğrendim.",
        en: "I saw how much a well-designed data model simplifies every feature added later to a layered MVC application. I also learned that using an established and tested authentication system is much safer than trying to write my own.",
      },
    },
  },
  {
    id: "worldstory",
    name: "WorldStory",
    kind: "youtube",
    videoId: "FFdFfIFaShI",
    github: "https://github.com/caglaeras/WorldStoryApp",
    tags: [".NET MAUI", "C#", "SQLite"],
    summary: {
      tr: "Kıtaların tarihini ve kültürünü quizlerle öğreten .NET MAUI uygulaması. Öğrenme takibi ve yerel veri saklama içerir.",
      en: "A .NET MAUI app that teaches the history and culture of continents through quizzes. It includes learning progress tracking and local data storage.",
    },
    story: {
      problem: {
        tr: "Kıtaların tarihi ve kültürü, ders kitaplarında çoğu zaman ezberlenecek bir bilgi yığını olarak kalıyor. Öğrenenin kendi hızında ilerleyip ne kadar öğrendiğini görebileceği bir ortam eksikti.",
        en: "The history and culture of continents are often presented in textbooks as facts to memorize. There was a need for an environment where learners could work at their own pace and see how much they had learned.",
      },
      amac: {
        tr: "Eğitim teknolojisi geçmişimi mobil geliştirmeyle birleştirerek kıtaları konu alan küçük ve odaklı bir öğrenme uygulaması yapmak istedim. Öğrenme takibinin kullanıcı tarafından görülebilmesi benim için önemliydi.",
        en: "I wanted to combine my educational technology background with mobile development by creating a small, focused learning app about continents. It was important that users could see their own learning progress.",
      },
      cozum: {
        tr: ".NET MAUI ile kıtaların tarihini ve kültürünü quizler üzerinden öğreten bir uygulama geliştirdim. Kullanıcı girişi ve öğrenme kayıtları, SQLite üzerinde cihazda yerel olarak tutuluyor.",
        en: "I developed a .NET MAUI app that teaches the history and culture of continents through quizzes. User login data and learning records are stored locally on the device with SQLite.",
      },
      ozellikler: {
        tr: [
          "Kıta temelli öğrenme bölümleri",
          "Quiz ile pekiştirme akışı",
          "Öğrenme takibi ve ilerleme kaydı",
          "SQLite ile yerel veri saklama",
          "Tek kod tabanından birden çok platformu hedefleme",
        ],
        en: [
          "Continent-based learning sections",
          "Quiz-based practice flow",
          "Learning tracking and progress records",
          "Local data storage with SQLite",
          "Multiple platforms from a single codebase",
        ],
      },
      ogrendim: {
        tr: "Öğretim tasarımı bilgimin arayüz kararlarını doğrudan etkilediğini fark ettim. Soruların sırası ve geri bildirimin tonu, beni teknik bölümden daha fazla düşündürdü. MAUI ile tek kod tabanından birden çok platforma çıkmanın sınırlarını da yakından gördüm.",
        en: "I realized that my instructional design knowledge directly shaped my interface decisions. The order of the questions and the tone of the feedback required more thought than the technical work. I also saw the limits of targeting multiple platforms from a single codebase with MAUI.",
      },
    },
  },
];

/** Panelde gosterilecek bolumlerin sirasi. Basliklar content.json'dan gelir. */
export const STORY_ORDER = ["problem", "amac", "cozum", "ozellikler", "ogrendim"] as const;

export type StoryKey = (typeof STORY_ORDER)[number];
