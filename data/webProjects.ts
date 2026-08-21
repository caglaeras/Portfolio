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
 * >>> TASLAK UYARISI <<<
 * story alanlari (problem, amac, cozum, ozellikler, ogrendim) ilk tur TASLAK
 * metinlerdir. Proje tanimlarindan yola cikilarak yazildi; kendi anlatiminizla
 * degistirmeniz beklenir. Bolum yapisini bozmadan serbestce guncelleyebilirsiniz.
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
  github: string;
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
      en: "A multi page e-commerce site built from scratch with HTML and CSS. Covers product listing, product detail and form flows.",
    },
    story: {
      problem: {
        tr: "Web geliştirmeye başlarken öğrenilen HTML ve CSS bilgisi, dağınık alıştırmalar halinde kalıyor ve bir ürün bütünlüğüne dönüşmüyordu. Tek tek denenen etiketler yerine, baştan sona kurgulanmış gerçek bir siteye ihtiyacım vardı.",
        en: "When I started out in web development, the HTML and CSS I picked up stayed scattered across small exercises and never came together as a product. Instead of testing tags one by one, I needed a real site planned from end to end.",
      },
      amac: {
        tr: "Ürün listelemeden ürün detayına, iletişimden kayıt formuna kadar bir e-ticaret akışının tamamını kendi elimle kurmak istedim. Hedefim, temel web yapı taşlarını gerçek bir senaryo içinde oturtmaktı.",
        en: "I wanted to build a complete e-commerce flow with my own hands, from product listing to product detail, from the contact form to sign up. My goal was to settle the basic building blocks of the web inside a realistic scenario.",
      },
      cozum: {
        tr: "Yalnızca HTML ve CSS kullanarak çok sayfalı bir e-ticaret sitesi geliştirdim. Ürün listeleri, ürün detay sayfaları, iletişim ve kayıt formları birbirine bağlı tek bir bütün olarak çalışıyor ve site GitHub Pages üzerinde yayında.",
        en: "I built a multi page e-commerce site using nothing but HTML and CSS. Product lists, product detail pages, contact and sign up forms all work as one connected whole, and the site is published on GitHub Pages.",
      },
      ozellikler: {
        tr: [
          "Çok sayfalı gezinme yapısı ve sayfalar arası tutarlı düzen",
          "Ürün listeleme ve ürün detay sayfaları",
          "İletişim ve kayıt formu şablonları",
          "Responsive yerleşim için CSS düzen teknikleri",
          "GitHub Pages üzerinde canlı yayın",
        ],
        en: [
          "Multi page navigation with a consistent layout across pages",
          "Product listing and product detail pages",
          "Contact and sign up form templates",
          "CSS layout techniques for a responsive structure",
          "Published live on GitHub Pages",
        ],
      },
      ogrendim: {
        tr: "Sayfa sayısı arttıkça, semantik HTML kurgusunun ve CSS ile düzen kurmanın ne kadar belirleyici olduğunu gördüm. Bir projeyi yayına almanın, onu bitmiş saymaktan ayrı bir disiplin istediğini de burada öğrendim.",
        en: "As the number of pages grew, I saw how decisive semantic HTML structure and CSS layout really are. This is also where I learned that shipping a project is a separate discipline from calling it finished.",
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
      tr: "React ve Vite ile geliştirilmiş, dil modeli destekli kompozisyon değerlendirme aracı. Rubrik bazlı puanlama ve Türkçe / İngilizce desteği sunar.",
      en: "An essay grading tool built with React and Vite, backed by a language model. Offers rubric based scoring with Turkish and English support.",
    },
    story: {
      problem: {
        tr: "Kompozisyon değerlendirmesi öğretmenler için hem zaman alan hem de kolayca tutarsızlaşan bir iş. Aynı metni farklı zamanlarda okuyan bir değerlendirici bile birbirinden uzak puanlar verebiliyor.",
        en: "Grading essays is both time consuming for teachers and quick to become inconsistent. Even a single grader reading the same text at different times can land on scores far apart.",
      },
      amac: {
        tr: "Öğretmenlerin değerlendirme yükünü azaltmak ve puanlamayı belirli bir rubriğe bağlayarak tutarlı hale getirmek istedim. Aracın Türkçe ve İngilizce metinlerle birlikte çalışması baştan beri şarttı.",
        en: "I wanted to reduce the grading load on teachers and make scoring consistent by tying it to a defined rubric. Working with both Turkish and English texts was a requirement from the start.",
      },
      cozum: {
        tr: "React ve Vite ile, bir dil modelini rubrik bazlı puanlama için kullanan bir değerlendirme aracı geliştirdim. Kullanıcı metni giriyor, araç rubrik başlıkları üzerinden puan ve kısa gerekçe üretiyor.",
        en: "I built a grading tool with React and Vite that uses a language model for rubric based scoring. The user submits a text and the tool produces a score and a short justification per rubric heading.",
      },
      ozellikler: {
        tr: [
          "Rubrik başlıkları üzerinden puanlama ve gerekçe üretimi",
          "Türkçe ve İngilizce dil desteği",
          "LLM API entegrasyonu",
          "Vite ile hızlı geliştirme ve derleme akışı",
          "Tarayıcıda çalışan hafif arayüz",
        ],
        en: [
          "Scoring and justification produced per rubric heading",
          "Turkish and English language support",
          "LLM API integration",
          "Fast development and build flow with Vite",
          "Lightweight interface that runs in the browser",
        ],
      },
      ogrendim: {
        tr: "Bir dil modelinin çıktısını işe yarar kılanın modelin kendisi değil, ona verilen rubrik ve istem yapısı olduğunu gördüm. Bunun yanında API anahtarı yönetimini ve hata durumlarını arayüzde düzgün karşılamanın önemini kavradım.",
        en: "I saw that what makes a language model output useful is not the model itself but the rubric and prompt structure handed to it. Alongside that I learned how much API key handling and gracefully surfacing errors in the interface matter.",
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
      en: "A second hand marketplace for university students. Includes a cart, orders, favourites and a mover list.",
    },
    story: {
      problem: {
        tr: "Dönem sonlarında öğrenciler taşınırken, hâlâ kullanılabilir durumdaki eşyalar çöpe gidiyor ya da çok ucuza elden çıkıyor. Öğrencilerin birbirine güvenli biçimde ulaşabileceği ortak bir yer yoktu.",
        en: "At the end of every term, as students move out, belongings that are still perfectly usable get thrown away or sold off for almost nothing. There was no shared place where students could reach each other safely.",
      },
      amac: {
        tr: "Üniversite öğrencilerine özel, ikinci el eşyaların alıcısıyla buluştuğu bir pazaryeri kurmak istedim. Sadece ilan panosu değil, siparişe kadar giden eksiksiz bir akış hedefledim.",
        en: "I wanted to build a marketplace dedicated to university students, where second hand items meet a buyer. I aimed at a complete flow that goes all the way to an order, not just a listings board.",
      },
      cozum: {
        tr: "ASP.NET Core MVC, Entity Framework Core ve Identity kullanarak sepet, sipariş, favoriler ve nakliyeci listesi içeren bir pazaryeri geliştirdim. Veriler SQL Server üzerinde tutuluyor.",
        en: "Using ASP.NET Core MVC, Entity Framework Core and Identity, I built a marketplace with a cart, orders, favourites and a mover list. The data is kept on SQL Server.",
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
          "Favourite product list",
          "Mover list to help with the moving process",
          "SQL Server data layer through EF Core",
        ],
      },
      ogrendim: {
        tr: "Katmanlı bir MVC uygulamasında veri modelini baştan doğru kurmanın, sonradan eklenen her özelliği ne kadar kolaylaştırdığını gördüm. Kimlik doğrulamayı hazır ve sınanmış bir altyapıyla çözmenin, kendi çözümümü yazmaya kalkışmaktan çok daha güvenli olduğunu öğrendim.",
        en: "I saw how much getting the data model right up front eases every feature added later in a layered MVC application. I also learned that solving authentication with a ready, well tested framework is far safer than attempting my own.",
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
      en: "A .NET MAUI app that teaches the history and culture of the continents through quizzes. Includes learning tracking and local storage.",
    },
    story: {
      problem: {
        tr: "Kıtaların tarihi ve kültürü, ders kitaplarında çoğu zaman ezberlenecek bir bilgi yığını olarak kalıyor. Öğrenenin kendi hızında ilerleyip ne kadar öğrendiğini görebileceği bir ortam eksikti.",
        en: "The history and culture of the continents often stay a pile of facts to memorise in textbooks. What was missing was a setting where learners move at their own pace and can see how much they have actually learned.",
      },
      amac: {
        tr: "Eğitim teknolojisi geçmişimi mobil geliştirmeyle birleştirip, kıtaları konu alan küçük ve odaklı bir öğrenme uygulaması yapmak istedim. Öğrenme takibinin kullanıcıya görünür olması benim için önemliydi.",
        en: "I wanted to combine my educational technology background with mobile development and make a small, focused learning app about the continents. Keeping progress visible to the learner mattered to me.",
      },
      cozum: {
        tr: ".NET MAUI ile kıtaların tarihini ve kültürünü quizler üzerinden öğreten bir uygulama geliştirdim. Kullanıcı girişi ve öğrenme kaydı SQLite üzerinde cihazda yerel olarak tutuluyor.",
        en: "I built an app with .NET MAUI that teaches the history and culture of the continents through quizzes. Sign in and the learning record are kept locally on the device with SQLite.",
      },
      ozellikler: {
        tr: [
          "Kıta bazlı öğrenme bölümleri",
          "Quiz ile pekiştirme akışı",
          "Öğrenme takibi ve ilerleme kaydı",
          "SQLite ile yerel veri saklama",
          "Tek kod tabanından çok platform hedefi",
        ],
        en: [
          "Learning sections organised by continent",
          "Quiz flow for reinforcement",
          "Learning tracking and progress records",
          "Local data storage with SQLite",
          "Multi platform target from a single code base",
        ],
      },
      ogrendim: {
        tr: "Öğretim tasarımı bilgimin arayüz kararlarını doğrudan etkilediğini fark ettim; soruların sırası ve geri bildirimin tonu, teknik kısımdan daha çok düşündürdü. MAUI ile tek kod tabanından birden çok platforma çıkmanın sınırlarını da yakından gördüm.",
        en: "I noticed that my instructional design background directly shaped interface decisions; the order of the questions and the tone of the feedback made me think harder than the technical side. I also saw first hand where the limits are when shipping to several platforms from one code base.",
      },
    },
  },
];

/** Panelde gosterilecek bolumlerin sirasi. Basliklar content.json'dan gelir. */
export const STORY_ORDER = ["problem", "amac", "cozum", "ozellikler", "ogrendim"] as const;

export type StoryKey = (typeof STORY_ORDER)[number];
