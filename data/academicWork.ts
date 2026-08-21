/**
 * Academic Work - /projects/other sayfasinin icerik kaynagi.
 *
 * Calisma metinlerinin tamami burada durur; arayuz metinleri (bolum basliklari,
 * buton yazilari) data/content.json icindeki `other` ve `story` bolumlerindedir.
 *
 * Kart tipleri:
 *   kind: "youtube"   -> `videoId` kapak goruntusu olarak inar, oynatici ancak
 *                        tiklaninca kurulur.
 *   kind: "document"  -> `image` onizleme gorseli olarak gosterilir, `pdf` ise
 *                        yeni sekmede acilir. Ikisi de public/ altina gorelidir.
 *
 * extras: karta ve hikaye paneline eklenen ek baglantilar. kind degeri
 * content.json icindeki `other` bolumunden etiketini alir:
 *   "essay"   -> calismanin yazili raporu (public/ altina goreli PDF)
 *   "mockup"  -> arayuz taslagi (dis adres)
 */

import type { LocalizedList, LocalizedText } from "./webProjects";

export type { LocalizedList, LocalizedText };

export interface AcademicStory {
  problem: LocalizedText;
  amac: LocalizedText;
  cozum: LocalizedText;
  ozellikler: LocalizedList;
  ogrendim: LocalizedText;
}

export type AcademicExtraKind = "essay" | "mockup";

export interface AcademicExtra {
  kind: AcademicExtraKind;
  /** essay icin public/ altina goreli yol, mockup icin tam adres. */
  href: string;
  /** true ise adres public/ altinda, basePath onune eklenir. */
  local?: boolean;
  /** mockup icin: kart gorseli yerine kucultulmus canli onizleme gosterilir. */
  preview?: boolean;
}

interface AcademicBase {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  tags: string[];
  extras?: AcademicExtra[];
  story: AcademicStory;
}

export interface AcademicVideo extends AcademicBase {
  kind: "youtube";
  videoId: string;
}

export interface AcademicDocument extends AcademicBase {
  kind: "document";
  /** public/ altina gore PDF yolu. */
  pdf: string;
  /** public/ altina gore onizleme gorseli. */
  image: string;
}

export type AcademicItem = AcademicVideo | AcademicDocument;

export const academicWork: AcademicItem[] = [
  {
    id: "articulate",
    kind: "youtube",
    videoId: "xLoHTwxcuTQ",
    tags: ["Articulate Storyline"],
    title: {
      tr: "Articulate ile Etkileşimli Kesir Öğretimi",
      en: "Interactive Fractions Lesson with Articulate",
    },
    summary: {
      tr: "Articulate Storyline üzerinde hazırlanmış, kesir kavramını etkileşimli uygulamalarla anlatan öğretim içeriği.",
      en: "An instructional module built on Articulate Storyline that teaches fractions through interactive activities.",
    },
    story: {
      problem: {
        tr: "Kesirler, ilkokul matematiğinde en çok soyut kalan konulardan biri. Öğrenci sayıyı görebiliyor ama parçanın bütünle ilişkisini zihninde kuramadığında konu ezbere dönüşüyor.",
        en: "Fractions are among the most abstract topics in primary school mathematics. A learner can see the numbers, but when the relationship between part and whole does not form in their mind, the topic turns into memorisation.",
      },
      amac: {
        tr: "Öğrencinin izleyici değil katılımcı olduğu bir içerik hazırlamak istedim. Amaç, kesri anlatmak yerine öğrenciye kendi elleriyle denetebilmekti.",
        en: "I wanted to build a module where the learner is a participant rather than a viewer. The goal was to let them try fractions out for themselves instead of being told about them.",
      },
      cozum: {
        tr: "Articulate Storyline üzerinde, her adımda etkileşim gerektiren bir öğretim akışı kurdum. Öğrenci parçaları kendisi bölüyor, seçim yapıyor ve verdiği cevaba göre anında geri bildirim alıyor.",
        en: "On Articulate Storyline I built a flow that asks for interaction at every step. The learner splits the parts, makes a choice, and gets immediate feedback based on the answer given.",
      },
      ozellikler: {
        tr: [
          "Her adımda öğrenci katılımı gerektiren etkileşimli ekranlar",
          "Kesir kavramının görsel parça, bütün ilişkisiyle sunumu",
          "Cevaba göre anında geri bildirim",
          "Öğretim tasarımı ilkelerine göre kurgulanmış adım sırası",
        ],
        en: [
          "Interactive screens that require learner input at every step",
          "Fractions presented through a visual part and whole relationship",
          "Immediate feedback based on the answer",
          "Step order structured around instructional design principles",
        ],
      },
      ogrendim: {
        tr: "Etkileşimin kendi başına öğrenme getirmediğini, geri bildirimin ne söylediğinin en az etkileşim kadar önemli olduğunu gördüm. Bir yazarlık aracının sınırlarını bilerek tasarım yapmanın da ayrı bir beceri olduğunu öğrendim.",
        en: "I saw that interaction alone does not produce learning, and that what the feedback says matters at least as much as the interaction itself. I also learned that designing within the limits of an authoring tool is a skill of its own.",
      },
    },
  },
  {
    id: "sql-coaching",
    kind: "youtube",
    videoId: "jTIoYyWDDEo",
    tags: ["MySQL"],
    title: {
      tr: "SQL ile Koçluk Sistemi Planlaması",
      en: "Coaching System Planning with SQL",
    },
    summary: {
      tr: "Bireysel koçluk sistemine ait kullanıcı, oturum ve planlama verilerini tutan MySQL veritabanı tasarımı.",
      en: "A MySQL database design holding the user, session and planning data of an individual coaching system.",
    },
    story: {
      problem: {
        tr: "Bir koçluk sisteminde kullanıcı, oturum ve planlama bilgileri birbirine bağlı; bu bağ veritabanında doğru kurulmazsa sistem büyüdükçe her yeni ihtiyaç elle yama gerektiriyor.",
        en: "In a coaching system the user, session and planning records are all connected. If that connection is not modelled properly in the database, every new requirement turns into a manual patch as the system grows.",
      },
      amac: {
        tr: "Sistemi arayüzden değil veriden başlayarak planlamak istedim. Hedefim, hangi sorunun hangi sorguyla cevaplanacağını baştan görebilmekti.",
        en: "I wanted to plan the system starting from the data rather than the interface. My goal was to see up front which question would be answered by which query.",
      },
      cozum: {
        tr: "MySQL üzerinde kullanıcı, oturum ve planlama tablolarını ilişkileriyle birlikte tasarladım. Sistemin ihtiyaç duyduğu raporları SQL sorgularıyla çıkararak tasarımın işe yaradığını doğruladım.",
        en: "On MySQL I designed the user, session and planning tables together with their relationships. I verified the design by producing the reports the system needs through SQL queries.",
      },
      ozellikler: {
        tr: [
          "Kullanıcı, oturum ve planlama tabloları ve aralarındaki ilişkiler",
          "Sistem ihtiyaçlarını karşılayan SQL sorguları",
          "Veriden başlayarak yapılan sistem planlaması",
          "Sorgularla doğrulanmış veri modeli",
        ],
        en: [
          "User, session and planning tables with the relationships between them",
          "SQL queries that answer the needs of the system",
          "System planning that starts from the data",
          "A data model verified through queries",
        ],
      },
      ogrendim: {
        tr: "Bir sistemi anlamanın en hızlı yolunun, ondan hangi soruları soracağımı yazmak olduğunu gördüm. İlişkileri baştan kurmanın, sonradan tablo eklemekten çok daha az iş çıkardığını öğrendim.",
        en: "I saw that the fastest way to understand a system is to write down which questions I will ask of it. I learned that establishing the relationships up front creates far less work than adding tables later.",
      },
    },
  },
  {
    id: "coffee-video",
    kind: "youtube",
    videoId: "KP_9mSYPptw",
    tags: ["Adobe Premiere Pro", "CET 224"],
    extras: [{ kind: "essay", href: "/documents/coffee_video_essay.pdf", local: true }],
    title: {
      tr: "Espresso Demleme Üzerine Eğitsel Video",
      en: "Educational Video on Brewing Espresso",
    },
    summary: {
      tr: "Kahve tutkunları ve yeni başlayan baristalar için hazırlanmış, iki dakikalık espresso demleme rehberi. Senaryo, çekim ve kurgu ekibimize ait.",
      en: "A two minute guide to brewing espresso, made for coffee lovers and beginner baristas. The script, filming and editing were handled by our team.",
    },
    story: {
      problem: {
        tr: "Espresso demlemek, anlatılırken kolay görünen ama her adımı ölçüye bağlı bir iş. Yeni başlayan biri hangi adımda ne kadar hassas olması gerektiğini bilmediğinde sonuç her seferinde değişiyor.",
        en: "Brewing espresso sounds simple when described, yet every step depends on precision. When a beginner does not know how exact to be at which step, the result changes every time.",
      },
      amac: {
        tr: "Kahve tutkunları ve yeni başlayan baristalar için, mükemmel espressoya giden adımları eksiksiz gösteren bir rehber video hazırlamak istedik. Videonun iki dakikayı geçmemesi gerekiyordu.",
        en: "We wanted to make a guide video for coffee lovers and beginner baristas showing every step towards a good espresso. The video had to stay under two minutes.",
      },
      cozum: {
        tr: "Birden çok kaynaktan araştırma yapıp adımları doğruladık, ardından senaryoyu ve storyboard'u birlikte yazdık. Çekimi kendimiz yaptık, kurguyu Adobe Premiere Pro ile tamamladık; ben demleme sürecinin araştırması ve kurgusuna, ekip arkadaşım kahvenin kültürel ve tarihsel arka planına odaklandı.",
        en: "We researched the steps across several sources and cross checked them, then wrote the script and storyboard together. We filmed it ourselves and finished the edit in Adobe Premiere Pro; I focused on researching the brewing process and on the edit, while my teammate covered the cultural and historical background of coffee.",
      },
      ozellikler: {
        tr: [
          "Espresso demlemenin adım adım gösterimi",
          "Birden çok kaynaktan doğrulanmış içerik",
          "Ekip içinde yazılan senaryo ve storyboard",
          "Adobe Premiere Pro ile post prodüksiyon",
          "İki dakika sınırına göre kurgulanmış anlatım",
        ],
        en: [
          "Step by step demonstration of brewing espresso",
          "Content cross checked across several sources",
          "Script and storyboard written within the team",
          "Post production in Adobe Premiere Pro",
          "Narration cut to fit a two minute limit",
        ],
      },
      ogrendim: {
        tr: "Detaylı bir süreci çekerken kamera açısının ve ışığın, anlatımın kendisi kadar belirleyici olduğunu gördüm. İki dakika sınırı ise en zorlayıcı kısımdı; neyi çıkaracağıma karar vermek, ne anlatacağıma karar vermekten daha çok düşündürdü.",
        en: "Filming a detailed process showed me that camera angle and lighting matter as much as the narration itself. The two minute limit was the hardest part; deciding what to cut made me think harder than deciding what to say.",
      },
    },
  },
  {
    id: "research-proposal",
    kind: "document",
    pdf: "/documents/research_proposal.pdf",
    image: "/images/research_proposal.png",
    tags: ["PDF"],
    title: {
      tr: "Akademik Araştırma Önerisi",
      en: "Academic Research Proposal",
    },
    summary: {
      tr: "Metodoloji, teorik arka plan ve araştırma hedeflerinin tamamının detaylandırıldığı akademik araştırma önerisi.",
      en: "An academic research proposal detailing the full methodology, theoretical background and research objectives.",
    },
    story: {
      problem: {
        tr: "Bir araştırma fikri, ne kadar ilgi çekici olursa olsun, yöntemi netleşmeden sınanabilir hale gelmiyor. Sorunun nasıl ölçüleceği belirsiz kaldığında çalışma bir merak olarak kalıyor.",
        en: "A research idea, however interesting, does not become testable until its method is clear. When it stays unclear how the question will be measured, the work remains a curiosity.",
      },
      amac: {
        tr: "Bir araştırma sorusunu, başkasının tekrarlayabileceği kadar açık biçimde yazıya dökmek istedim. Amacım, teorik arka planla yöntemi aynı metinde tutarlı biçimde birleştirmekti.",
        en: "I wanted to write a research question down clearly enough that someone else could repeat it. My aim was to bring the theoretical background and the method together coherently in one text.",
      },
      cozum: {
        tr: "Alan yazını tarayarak çalışmanın teorik çerçevesini kurdum, ardından araştırma hedeflerini ve bu hedeflere karşılık gelen yöntemi ayrıntılandırdım. Öneri, veri toplama ve analiz planını da içeriyor.",
        en: "I reviewed the literature to establish the theoretical frame, then detailed the research objectives and the method matching those objectives. The proposal also covers the data collection and analysis plan.",
      },
      ozellikler: {
        tr: [
          "Alan yazınına dayanan teorik çerçeve",
          "Açıkça tanımlanmış araştırma hedefleri",
          "Hedeflerle eşleşen yöntem bölümü",
          "Veri toplama ve analiz planı",
        ],
        en: [
          "A theoretical frame grounded in the literature",
          "Clearly defined research objectives",
          "A method section matched to the objectives",
          "A data collection and analysis plan",
        ],
      },
      ogrendim: {
        tr: "Yöntem yazmanın, araştırma sorusunu gerçekten anlayıp anlamadığımı ortaya çıkardığını gördüm. Bir soruyu ölçülebilir hale getirmek için onu daraltmak gerektiğini öğrendim.",
        en: "I saw that writing the method reveals whether I actually understand the research question. I learned that making a question measurable requires narrowing it down.",
      },
    },
  },
  {
    id: "project-development",
    kind: "document",
    pdf: "/documents/project_development.pdf",
    image: "/images/project_development.png",
    tags: ["PDF", "Figma"],
    extras: [{ kind: "mockup", href: "https://onion-read-07842130.figma.site/", preview: true }],
    title: {
      tr: "Proje Geliştirme Dersi Dokümantasyonu",
      en: "Project Development Class Documentation",
    },
    summary: {
      tr: "Bir projenin planlama, uygulama ve değerlendirme aşamalarını baştan sona gösteren ders dokümantasyonu.",
      en: "Class documentation that walks through the planning, implementation and evaluation phases of a project.",
    },
    story: {
      problem: {
        tr: "Proje çalışmalarında en çok kaybedilen şey, alınan kararların gerekçesi oluyor. Sonuç ortada duruyor ama neden o yolun seçildiği kayıt altına alınmadığında deneyim sonraki projeye taşınmıyor.",
        en: "In project work, what gets lost most often is the reasoning behind the decisions. The result is there, but when it is not recorded why that path was chosen, the experience does not carry into the next project.",
      },
      amac: {
        tr: "Bir projeyi yalnızca teslim etmek değil, nasıl yürüdüğünü izlenebilir biçimde belgelemek istedim. Hedefim planlamadan değerlendirmeye kadar her aşamayı gerekçesiyle yazmaktı.",
        en: "I wanted to do more than deliver a project; I wanted to document how it progressed in a traceable way. My goal was to write every phase, from planning to evaluation, together with its reasoning.",
      },
      cozum: {
        tr: "Projenin planlama, uygulama ve değerlendirme aşamalarını ayrı ayrı ele alan bir dokümantasyon hazırladım. Her aşamada ne yapıldığı, neden yapıldığı ve sonucun nasıl ölçüldüğü birlikte yer alıyor.",
        en: "I produced documentation that treats the planning, implementation and evaluation phases separately. For each phase it records what was done, why it was done and how the outcome was measured.",
      },
      ozellikler: {
        tr: [
          "Planlama, uygulama ve değerlendirme aşamalarının ayrı ayrı ele alınması",
          "Alınan kararların gerekçeleriyle kaydı",
          "Projenin arayüz taslağı",
          "Sonuçların nasıl ölçüldüğünün belgelenmesi",
          "Sonraki projelere taşınabilir bir süreç kaydı",
        ],
        en: [
          "Planning, implementation and evaluation phases treated separately",
          "Decisions recorded together with their reasoning",
          "A UI mock-up of the project",
          "Documentation of how the outcomes were measured",
          "A process record that carries into later projects",
        ],
      },
      ogrendim: {
        tr: "Süreci yazmanın, süreci yönetmenin bir parçası olduğunu gördüm; yazmaya oturduğumda eksik bıraktığım kararlar ortaya çıktı. Değerlendirmeyi baştan planlamanın da sonuca bakışı değiştirdiğini öğrendim.",
        en: "I saw that writing the process down is part of managing it; sitting down to write surfaced the decisions I had left incomplete. I also learned that planning the evaluation up front changes how you read the result.",
      },
    },
  },
  {
    id: "canvas-lesson",
    kind: "document",
    pdf: "/documents/canvas_lesson.pdf",
    image: "/images/canvas_lesson.png",
    tags: ["Canvas LMS", "PDF"],
    title: {
      tr: "Canvas ile Online Ders Hazırlığı",
      en: "Online Lesson Preparation with Canvas",
    },
    summary: {
      tr: "Canvas öğrenme yönetim sistemi üzerinde bir online ders için geliştirilen tam kapsamlı yapı ve hazırlık materyalleri.",
      en: "The complete structure and preparation materials developed for an online lesson on the Canvas learning management system.",
    },
    story: {
      problem: {
        tr: "Online derste öğretmenin sınıfta doğal olarak yaptığı yönlendirme kayboluyor. Öğrenci nereden başlayacağını ve sırayı bilemediğinde, içerik hazır olsa bile ders dağılıyor.",
        en: "In an online lesson the guidance a teacher naturally provides in class disappears. When learners do not know where to start or in what order to proceed, the lesson falls apart even if the content is ready.",
      },
      amac: {
        tr: "Dersi yalnızca içerik yüklenen bir yer değil, kendi başına yürüyen bir yapı olarak kurmak istedim. Amacım öğrencinin yönlendirmeye ihtiyaç duymadan ilerleyebilmesiydi.",
        en: "I wanted to set the lesson up as a structure that runs on its own, not just a place where content is uploaded. My aim was for learners to progress without needing to be guided.",
      },
      cozum: {
        tr: "Canvas üzerinde dersin modül sırasını, materyallerini ve değerlendirme adımlarını birlikte planladım. Hazırlık materyalleri, öğrencinin hangi adımda ne yapacağını açıkça gösterecek biçimde düzenlendi.",
        en: "On Canvas I planned the module order, the materials and the assessment steps together. The preparation materials were arranged to show clearly what the learner does at each step.",
      },
      ozellikler: {
        tr: [
          "Modül sırasıyla planlanmış ders yapısı",
          "Her adım için hazırlanmış materyaller",
          "Değerlendirme adımlarının derse yerleştirilmesi",
          "Öğrencinin yönlendirme olmadan ilerleyebileceği akış",
        ],
        en: [
          "A lesson structure planned as an ordered set of modules",
          "Materials prepared for each step",
          "Assessment steps placed within the lesson",
          "A flow the learner can follow without external guidance",
        ],
      },
      ogrendim: {
        tr: "Bir öğrenme yönetim sisteminin, kurulan yapı kadar iyi çalıştığını gördüm; araç iyi olsa da sıralama zayıfsa ders taşımıyor. Yönlendirmeyi yazıya dökmenin, sınıfta söylemekten daha çok düşünmeyi gerektirdiğini öğrendim.",
        en: "I saw that a learning management system works only as well as the structure built inside it; a good tool does not carry the lesson if the sequencing is weak. I learned that putting guidance into writing demands more thought than saying it in class.",
      },
    },
  },
];
