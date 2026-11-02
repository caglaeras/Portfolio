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
 *   "schema"  -> veritabani semasi / kod dokumu (public/ altina goreli PDF)
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

export type AcademicExtraKind = "essay" | "mockup" | "schema";

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
      en: "Instructional content created in Articulate Storyline to teach fractions through interactive activities.",
    },
    story: {
      problem: {
        tr: "Kesirler, ilkokul matematiğinin en soyut konularından biri. Öğrenci sayıyı görebiliyor ancak parçanın bütünle ilişkisini zihninde kuramadığında konu ezbere dönüşüyor.",
        en: "Fractions are one of the most abstract topics in primary school mathematics. Students can see the number, but the subject becomes an exercise in memorization when they cannot understand how a part relates to the whole.",
      },
      amac: {
        tr: "Öğrencinin izleyici değil, katılımcı olduğu bir içerik hazırlamak istedim. Amacım, kesri yalnızca anlatmak yerine öğrencinin kendi elleriyle denemesini sağlamaktı.",
        en: "I wanted to create content in which the student was a participant rather than a viewer. Instead of simply explaining fractions, my aim was to let the student experiment directly.",
      },
      cozum: {
        tr: "Articulate Storyline üzerinde, her adımda etkileşim gerektiren bir öğretim akışı kurdum. Öğrenci parçaları kendisi bölüyor, seçim yapıyor ve verdiği cevaba göre anında geri bildirim alıyor.",
        en: "I built an instructional flow in Articulate Storyline that requires interaction at every step. Students divide the parts themselves, make choices, and receive immediate feedback based on their answers.",
      },
      ozellikler: {
        tr: [
          "Her adımda öğrenci katılımı gerektiren etkileşimli ekranlar",
          "Kesir kavramının görsel parça-bütün ilişkisiyle sunumu",
          "Cevaba göre anında geri bildirim",
          "Öğretim tasarımı ilkelerine göre kurgulanmış adım sırası",
        ],
        en: [
          "Interactive screens requiring student participation at every step",
          "Fractions presented through a visual part-whole relationship",
          "Immediate feedback based on the answer",
          "A sequence structured around instructional design principles",
        ],
      },
      ogrendim: {
        tr: "Etkileşimin tek başına öğrenme sağlamadığını, geri bildirimin ne söylediğinin en az etkileşimin kendisi kadar önemli olduğunu gördüm. Bir yazarlık aracının sınırlarını bilerek tasarım yapmanın da ayrı bir beceri olduğunu öğrendim.",
        en: "I saw that interaction alone does not lead to learning, and that the content of the feedback matters at least as much as the interaction itself. I also learned that designing with a clear understanding of an authoring tool's limits is a skill in its own right.",
      },
    },
  },
  {
    id: "sql-coaching",
    kind: "document",
    pdf: "/documents/coaching_system_presentation.pdf",
    image: "/images/coaching_system_preview.png",
    tags: ["SQL Server", "T-SQL", "PDF"],
    extras: [{ kind: "schema", href: "/documents/coaching_system_schema.pdf", local: true }],
    title: {
      tr: "SQL ile Koçluk Sistemi Planlaması",
      en: "Planning a Coaching System with SQL",
    },
    summary: {
      tr: "Öğrenci koçluğu sistemi için SQL Server üzerinde kurulmuş veritabanı tasarımı: 20 tablo, saklı yordam, tetikleyici ve görünümler.",
      en: "A database design built in SQL Server for a student coaching system: 20 tables, a stored procedure, a trigger, and views.",
    },
    story: {
      problem: {
        tr: "Bir koçluk sisteminde kullanıcı, oturum ve planlama bilgileri birbiriyle bağlantılıdır. Bu bağlantılar veritabanında doğru kurulmazsa sistem büyüdükçe her yeni ihtiyaç için elle yama yapmak gerekir.",
        en: "In a coaching system, user, session, and planning data are connected. If these relationships are not set up correctly in the database, every new need requires a manual patch as the system grows.",
      },
      amac: {
        tr: "Sistemi arayüzden değil, veriden başlayarak planlamak istedim. Hedefim, hangi sorunun hangi sorguyla yanıtlanacağını baştan görebilmekti.",
        en: "I wanted to plan the system from the data rather than the interface. My goal was to know from the start which query would answer each question.",
      },
      cozum: {
        tr: "SQL Server üzerinde öğrenci, koç, oturum, paket, hedef, ödeme ve iletişim kayıtlarını kapsayan 20 tabloyu yabancı anahtar ilişkileriyle birlikte kurdum. Tasarımı yalnızca şemada bırakmayıp saklı yordam, tetikleyici ve görünümlerle çalışır hâle getirdim. Raporları da JOIN ve GROUP BY sorgularıyla oluşturdum.",
        en: "I created 20 tables in SQL Server covering students, coaches, sessions, packages, goals, payments, and communication records, along with their foreign key relationships. I moved the design beyond the schema by adding a stored procedure, a trigger, and views. I also created reports with JOIN and GROUP BY queries.",
      },
      ozellikler: {
        tr: [
          "Yabancı anahtarlarla bağlanmış 20 tablo",
          "Hedef eklemek için saklı yordam (AddGoal)",
          "Geri bildirim eklendiğinde bildirim üreten tetikleyici",
          "Öğrenci gelişimi ve iletişim özeti için iki görünüm",
          "JOIN, GROUP BY ve ORDER BY ile raporlama sorguları",
        ],
        en: [
          "20 tables connected with foreign keys",
          "Stored procedure for adding goals (AddGoal)",
          "A trigger that creates a notification when feedback is added",
          "Two views for student progress and communication summaries",
          "Reporting queries with JOIN, GROUP BY, and ORDER BY",
        ],
      },
      ogrendim: {
        tr: "Bir sistemi anlamanın en hızlı yolunun, sisteme hangi soruları soracağımı yazmak olduğunu gördüm. İlişkileri baştan kurmanın, sonradan tablo eklemekten çok daha az iş çıkardığını öğrendim. Tetikleyici ve görünümlerin ise tekrar eden işleri şemanın içine taşıdığını fark ettim.",
        en: "I found that the fastest way to understand a system was to write down the questions I wanted to ask it. I learned that defining relationships from the start creates far less work than adding tables later. I also saw how triggers and views move repeated tasks into the schema.",
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
      en: "Instructional Video on Brewing Espresso",
    },
    summary: {
      tr: "Kahve tutkunları ve yeni başlayan baristalar için hazırlanmış iki dakikalık espresso demleme rehberi. Senaryo, çekim ve kurgu ekibimize ait.",
      en: "A two-minute espresso brewing guide for coffee enthusiasts and beginner baristas. Our team wrote the script, filmed the video, and edited it.",
    },
    story: {
      problem: {
        tr: "Espresso demlemek, anlatıldığında kolay görünen ancak her adımı ölçüye bağlı bir iş. Yeni başlayan biri hangi adımda ne kadar hassas olması gerektiğini bilmediğinde sonuç her seferinde değişiyor.",
        en: "Brewing espresso can sound simple, but every step depends on precise measurements. When a beginner does not know how careful to be at each stage, the result changes every time.",
      },
      amac: {
        tr: "Kahve tutkunları ve yeni başlayan baristalar için, mükemmel espressoya giden adımları eksiksiz gösteren bir rehber video hazırlamak istedik. Videonun iki dakikayı geçmemesi gerekiyordu.",
        en: "We wanted to create a guide for coffee enthusiasts and beginner baristas that showed every step toward a good espresso. The video had to be no longer than two minutes.",
      },
      cozum: {
        tr: "Birden çok kaynaktan araştırma yaparak adımları doğruladık, ardından senaryoyu ve storyboard'u birlikte yazdık. Çekimi kendimiz yaptık ve kurguyu Adobe Premiere Pro ile tamamladık. Ben demleme sürecinin araştırmasına ve kurgusuna, ekip arkadaşım ise kahvenin kültürel ve tarihsel arka planına odaklandı.",
        en: "We researched several sources to verify the steps, then wrote the script and storyboard together. We filmed the video ourselves and completed the edit in Adobe Premiere Pro. I focused on researching the brewing process and on the edit, while my teammate focused on the cultural and historical background of coffee.",
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
          "Step-by-step demonstration of espresso brewing",
          "Content verified through multiple sources",
          "A script and storyboard written as a team",
          "Post-production with Adobe Premiere Pro",
          "Narration cut to fit a two-minute limit",
        ],
      },
      ogrendim: {
        tr: "Ayrıntılı bir süreci çekerken kamera açısının ve ışığın, anlatımın kendisi kadar belirleyici olduğunu gördüm. İki dakika sınırı en zorlayıcı bölümdü. Neyi çıkaracağıma karar vermek, ne anlatacağıma karar vermekten daha fazla düşünmemi gerektirdi.",
        en: "While filming a detailed process, I saw that camera angles and lighting matter as much as the explanation itself. The two-minute limit was the hardest part. Deciding what to remove took more thought than deciding what to include.",
      },
    },
  },
  {
    id: "lesson-plan-spreadsheet",
    kind: "document",
    pdf: "/documents/6thGrade_LP2.pdf",
    image: "/images/6thGrade_LP2_preview.png",
    tags: ["MEB BT.6.4.1", "ISTE", "PRIMM", "PDF"],
    title: {
      tr: "Ders Planı: Acemi Dedektif ile Tablo Biçimlendirme",
      en: "Lesson Plan: Spreadsheet Formatting with the Rookie Detective",
    },
    summary: {
      tr: "6. sınıf Bilişim Teknolojileri için 35 dakikalık ders planı: senaryo temelli bir dedektif vakası üzerinden elektronik tablo biçimlendirme. Sınıfta uygulandı.",
      en: "A 35-minute lesson plan for 6th-grade Information Technologies: spreadsheet formatting through a scenario-based detective case. Implemented in the classroom.",
    },
    story: {
      problem: {
        tr: "Elektronik tablo biçimlendirme, yalnızca anlatıldığında öğrenci için sıkıcı bir düğme turuna dönüşüyor. Kalın, italik ya da sütun genişliği tek tek gösterildiğinde öğrenci bunları neden kullandığını anlamıyor ve dolayısıyla ertesi hafta hatırlamıyor.",
        en: "When spreadsheet formatting is taught only through explanation, it becomes a dull tour of buttons. If bold, italics, and column width are demonstrated one by one, students do not understand why they are using them and therefore do not remember them the following week.",
      },
      amac: {
        tr: "Biçimlendirmenin bir amaca hizmet ettiği bir durum oluşturmak istedim. Hedefim, öğrencinin tabloyu güzelleştirmek için değil, başka birinin okuyabilmesi için düzenlemesiydi.",
        en: "I wanted to create a situation in which formatting served a clear purpose. My goal was for students to organize the spreadsheet so someone else could read it, not simply to make it look better.",
      },
      cozum: {
        tr: "Dersi bir vaka dosyası üzerine kurdum: Öğrenciler acemi dedektif rolüne giriyor ve dağınık şüpheli tablosunu, profesyonel dedektife teslim edilebilecek okunaklı bir tabloya dönüştürüyor. Vakayı çözmek görevin bir parçası değil. Bu sınırı derste açıkça tekrarlayarak dikkatin biçimlendirmede kalmasını sağlıyorum. Akış, grup içi rol dağılımı, ekler ve teslim klasörüyle baştan sona planlandı.",
        en: "I built the lesson around a case file. Students take the role of rookie detectives and turn a disorganized suspect spreadsheet into a readable document for a professional detective. Solving the case is not part of the task. I repeat this boundary clearly during the lesson so the focus remains on formatting. The full flow was planned around group roles, appendices, and a submission folder.",
      },
      ozellikler: {
        tr: [
          "Acemi dedektif senaryosu üzerine kurulu 35 dakikalık akış",
          "Sütun genişliği, kalın, italik, yazı boyutu ve üstü çizili biçimlendirme hedefleri",
          "Grup içinde rol dağılımıyla iş birliği",
          "Öğrencinin kendi çalışmasını ve eşinin çalışmasını denetlediği öz değerlendirme listesi",
          "MEB BT.6.4.1.2 kazanımı, ISTE ve PRIMM çerçeveleriyle hizalama",
          "Yedi ek: senaryo, vaka dosyası, yeni kanıt, görevler, kontrol listesi, kapanış videosu, teslim klasörü",
        ],
        en: [
          "A 35-minute flow built around a rookie detective scenario",
          "Formatting goals for column width, bold, italics, font size, and strikethrough",
          "Collaboration through assigned group roles",
          "A self-assessment checklist for reviewing the student's own work and a partner's work",
          "Alignment with the MoNE BT.6.4.1.2 learning outcome and the ISTE and PRIMM frameworks",
          "Seven appendices: scenario, case file, new evidence, tasks, checklist, closing video, submission folder",
        ],
      },
      ogrendim: {
        tr: "Senaryonun asıl işlevinin motivasyon sağlamak değil, sınır çizmek olduğunu gördüm. Görevin ne OLMADIĞINI söylemek, ne olduğunu söylemek kadar önemliydi. Öz değerlendirme listesinin öğretmenin yerini almadığını, öğrenciye neye bakması gerektiğini öğrettiğini de fark ettim.",
        en: "I saw that the main purpose of the scenario was not motivation, but setting boundaries. Explaining what the task was NOT was as important as explaining what it was. I also realized that the self-assessment checklist did not replace the teacher; it taught students what to look for.",
      },
    },
  },
  {
    id: "lesson-plan-ai-literacy",
    kind: "document",
    pdf: "/documents/9thGrade_LP2.pdf",
    image: "/images/9thGrade_LP2_preview.png",
    tags: ["AI4K12", "CSTA", "ISTE", "PDF"],
    title: {
      tr: "Ders Planı: Yapay Zekada Temsil ve Prompt ile Arayüz Tasarımı",
      en: "Lesson Plan: Representation in AI and Designing UI through Prompts",
    },
    summary: {
      tr: "9. sınıf hazırlık için 40 dakikalık yapay zeka okuryazarlığı ders planı: temsil kavramı ve yapılandırılmış prompt ile arayüz üretimi. Sınıfta uygulandı.",
      en: "A 40-minute AI literacy lesson plan for a 9th-grade preparatory class: the concept of representation and interface creation with a structured prompt. Implemented in the classroom.",
    },
    story: {
      problem: {
        tr: "Öğrenciler yapay zekaya bir şey yazıp çıktı almayı biliyor ancak arada ne olduğunu bilmiyor. Çıktı bekledikleri gibi olmadığında suçu araca atıyor, kendi istemlerindeki belirsizliği göremiyorlar.",
        en: "Students know how to enter something into an AI tool and receive an output, but they do not know what happens in between. When the output does not match their expectations, they blame the tool without noticing the ambiguity in their own prompt.",
      },
      amac: {
        tr: "Temsil kavramını soyut bir tanım olarak değil, öğrencinin kendi gözleriyle görebileceği bir zincir olarak öğretmek istedim: yazdığı cümle, üretilen kod ve ekranda görünen sayfa. Aynı derste, istemin ne kadar belirgin olduğunun çıktıyı nasıl değiştirdiğini de göstermeyi hedefledim.",
        en: "I wanted to teach representation not as an abstract definition, but as a chain students could see for themselves: the sentence they wrote, the generated code, and the page displayed on the screen. In the same lesson, I aimed to show how the specificity of a prompt changes the output.",
      },
      cozum: {
        tr: "Dersi bir karşılaştırma üzerine kurdum: Öğrencilere aynı hedef için belirsiz bir istem (V1) ile beş parçalı tarife göre hazırlanmış yapılandırılmış bir istem (V2) yazdırıyor, ardından iki çıktıyı yan yana inceletiyorum. Tarifin parçaları hedef kitle, amaç, içerik, biçem ve yapı. Ders, yapay zekanın varsayılan biçem tercihlerinin eğitim verilerindeki örüntülerden geldiği tartışmasıyla sona eriyor. Çıkışta iki dakikalık sessiz bir çıkış kartı toplanıyor.",
        en: "I built the lesson around a comparison. For the same goal, students write a vague prompt (V1) and a structured prompt (V2) that follows a five-part recipe, then examine the two outputs side by side. The parts of the recipe are audience, purpose, content, style, and structure. The lesson ends with a discussion of how an AI tool's default style choices come from patterns in its training data. Students complete a two-minute silent exit ticket before leaving.",
      },
      ozellikler: {
        tr: [
          "Temsilin üç katmanı: doğal dil istemi, HTML/CSS kodu, ekrandaki sayfa",
          "Beş parçalı istem tarifi: hedef kitle, amaç, içerik, biçem, yapı",
          "Belirsiz istem ile yapılandırılmış istemin çıktılarını karşılaştırma",
          "Yapay zekanın varsayılan tercihlerinin eğitim verilerinden geldiğini tartışma",
          "İki dakikalık çıkış kartı ve ödev olarak verilen düzey belirleme değerlendirmesi",
          "AI4K12 Büyük Fikir 2, 3 ve 5, CSTA 3A, ISTE ve MEB TYMM ile hizalama",
        ],
        en: [
          "Three layers of representation: natural language prompt, HTML/CSS code, on-screen page",
          "A five-part prompt recipe: audience, purpose, content, style, structure",
          "Comparing the outputs of a vague prompt and a structured one",
          "Discussion of how AI's default choices come from training data",
          "A two-minute exit ticket and a diagnostic assessment assigned as homework",
          "Alignment with AI4K12 Big Ideas 2, 3, and 5, CSTA 3A, ISTE, and the MoNE TYMM framework",
        ],
      },
      ogrendim: {
        tr: "Yapay zekayı öğretirken en zor kısmın aracı anlatmak değil, öğrencinin kendi istemindeki belirsizliği fark etmesini sağlamak olduğunu gördüm. İki çıktıyı yan yana koymak, yapabileceğim her açıklamadan daha ikna ediciydi. Kırk dakikalık bir derste eleştirel tartışmayı sona bırakmanın riskli olduğunu da öğrendim; bu nedenle çıkış kartını dersin sabit bir parçası olarak tuttum.",
        en: "I found that the hardest part of teaching AI was not explaining the tool, but helping students notice the ambiguity in their own prompts. Placing two outputs side by side was more convincing than any explanation I could give. I also learned that leaving the critical discussion until the end of a forty-minute lesson was risky, so I kept the exit ticket as a fixed part of the lesson.",
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
      tr: "Metodoloji, teorik arka plan ve araştırma hedeflerinin ayrıntılı olarak ele alındığı akademik araştırma önerisi.",
      en: "An academic research proposal detailing the methodology, theoretical background, and research objectives.",
    },
    story: {
      problem: {
        tr: "Bir araştırma fikri ne kadar ilgi çekici olursa olsun, yöntemi netleşmeden sınanabilir hâle gelmiyor. Sorunun nasıl ölçüleceği belirsiz kaldığında çalışma, bir merak konusu olmanın ötesine geçemiyor.",
        en: "No matter how interesting a research idea is, it cannot be tested until its method is clear. If it remains unclear how the question will be measured, the study remains little more than a curiosity.",
      },
      amac: {
        tr: "Bir araştırma sorusunu, başka birinin tekrarlayabileceği kadar açık biçimde yazıya dökmek istedim. Amacım, teorik arka plan ile yöntemi aynı metinde tutarlı biçimde birleştirmekti.",
        en: "I wanted to describe a research question clearly enough for someone else to repeat the study. My aim was to connect the theoretical background and the method consistently in the same text.",
      },
      cozum: {
        tr: "Alan yazınını tarayarak çalışmanın teorik çerçevesini kurdum, ardından araştırma hedeflerini ve bu hedeflere karşılık gelen yöntemi ayrıntılandırdım. Öneri, veri toplama ve analiz planını da içeriyor.",
        en: "I reviewed the literature to build the study's theoretical framework, then detailed the research objectives and the method corresponding to each one. The proposal also includes a data collection and analysis plan.",
      },
      ozellikler: {
        tr: [
          "Alan yazınına dayanan teorik çerçeve",
          "Açıkça tanımlanmış araştırma hedefleri",
          "Hedeflerle eşleşen yöntem bölümü",
          "Veri toplama ve analiz planı",
        ],
        en: [
          "A theoretical framework based on the literature",
          "Clearly defined research objectives",
          "A methods section aligned with the objectives",
          "Data collection and analysis plan",
        ],
      },
      ogrendim: {
        tr: "Yöntemi yazmanın, araştırma sorusunu gerçekten anlayıp anlamadığımı ortaya çıkardığını gördüm. Bir soruyu ölçülebilir hâle getirmek için kapsamını daraltmak gerektiğini öğrendim.",
        en: "I found that writing the method revealed whether I truly understood the research question. I learned that a question must be narrowed before it can become measurable.",
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
      en: "Project Development Course Documentation",
    },
    summary: {
      tr: "Bir projenin planlama, uygulama ve değerlendirme aşamalarını baştan sona gösteren ders dokümantasyonu.",
      en: "Course documentation covering a project's planning, implementation, and evaluation stages from start to finish.",
    },
    story: {
      problem: {
        tr: "Proje çalışmalarında en sık kaybolan şey, alınan kararların gerekçesi oluyor. Sonuç ortada olsa bile neden o yolun seçildiği kaydedilmediğinde, edinilen deneyim sonraki projeye aktarılamıyor.",
        en: "In project work, the reasoning behind decisions is often the first thing to be lost. Even when the result is visible, the experience cannot be carried into the next project if the reason for choosing that approach was not recorded.",
      },
      amac: {
        tr: "Bir projeyi yalnızca teslim etmek değil, nasıl yürütüldüğünü izlenebilir biçimde belgelemek istedim. Hedefim, planlamadan değerlendirmeye kadar her aşamayı gerekçesiyle yazmaktı.",
        en: "I wanted not only to deliver a project, but also to document how it was carried out in a traceable way. My goal was to record every stage, from planning to evaluation, along with its reasoning.",
      },
      cozum: {
        tr: "Projenin planlama, uygulama ve değerlendirme aşamalarını ayrı ayrı ele alan bir dokümantasyon hazırladım. Her aşamada ne yapıldığı, neden yapıldığı ve sonucun nasıl ölçüldüğü birlikte açıklanıyor.",
        en: "I prepared documentation that addresses the planning, implementation, and evaluation stages of the project separately. Each stage explains what was done, why it was done, and how the result was measured.",
      },
      ozellikler: {
        tr: [
          "Planlama, uygulama ve değerlendirme aşamalarının ayrı ayrı ele alınması",
          "Alınan kararların gerekçeleriyle kaydedilmesi",
          "Projenin arayüz taslağı",
          "Sonuçların nasıl ölçüldüğünün belgelenmesi",
          "Sonraki projelere aktarılabilir süreç kaydı",
        ],
        en: [
          "Separate coverage of the planning, implementation, and evaluation stages",
          "Decisions recorded with their reasoning",
          "A UI mock-up of the project",
          "Documentation of how the results were measured",
          "A process record that can inform later projects",
        ],
      },
      ogrendim: {
        tr: "Süreci yazmanın, süreci yönetmenin bir parçası olduğunu gördüm. Yazmaya başladığımda eksik bıraktığım kararlar ortaya çıktı. Değerlendirmeyi baştan planlamanın, sonuca bakışımı değiştirdiğini de öğrendim.",
        en: "I saw that writing down the process is part of managing it. When I began documenting the work, decisions I had left incomplete became clear. I also learned that planning the evaluation from the start changed how I viewed the result.",
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
      en: "Preparing an Online Course with Canvas",
    },
    summary: {
      tr: "Canvas öğrenme yönetim sistemi üzerinde bir online ders için geliştirilen kapsamlı yapı ve hazırlık materyalleri.",
      en: "A complete course structure and preparation materials developed for an online course in the Canvas learning management system.",
    },
    story: {
      problem: {
        tr: "Online derste, öğretmenin sınıfta doğal olarak sağladığı yönlendirme kayboluyor. Öğrenci nereden başlayacağını ve hangi sırayla ilerleyeceğini bilemediğinde, içerik hazır olsa bile ders dağılıyor.",
        en: "In an online course, the guidance a teacher naturally provides in the classroom is missing. Even when the content is ready, the course loses its structure if students do not know where to begin or what order to follow.",
      },
      amac: {
        tr: "Dersi yalnızca içerik yüklenen bir yer değil, kendi başına işleyen bir yapı olarak kurmak istedim. Amacım, öğrencinin ek yönlendirmeye ihtiyaç duymadan ilerleyebilmesiydi.",
        en: "I wanted to build the course as a structure that could function on its own, not simply as a place to upload content. My aim was for students to progress without needing additional guidance.",
      },
      cozum: {
        tr: "Canvas üzerinde dersin modül sırasını, materyallerini ve değerlendirme adımlarını birlikte planladım. Hazırlık materyalleri, öğrencinin her adımda ne yapacağını açıkça gösterecek biçimde düzenlendi.",
        en: "In Canvas, I planned the module order, materials, and assessment steps together. The preparation materials were organized to show students clearly what to do at each step.",
      },
      ozellikler: {
        tr: [
          "Modül sırasına göre planlanmış ders yapısı",
          "Her adım için hazırlanmış materyaller",
          "Değerlendirme adımlarının derse yerleştirilmesi",
          "Öğrencinin yönlendirme olmadan ilerleyebileceği akış",
        ],
        en: [
          "Course structure planned by module order",
          "Materials prepared for each step",
          "Assessment steps integrated into the course",
          "A flow students can follow without additional guidance",
        ],
      },
      ogrendim: {
        tr: "Bir öğrenme yönetim sisteminin, içinde kurulan yapı kadar iyi çalıştığını gördüm. Araç iyi olsa bile sıralama zayıfsa ders ilerlemiyor. Yönlendirmeyi yazıya dökmenin, onu sınıfta söylemekten daha fazla düşünmeyi gerektirdiğini öğrendim.",
        en: "I saw that a learning management system works only as well as the structure built within it. Even with a good tool, a course does not work if its sequence is weak. I learned that writing guidance requires more thought than giving the same instructions in a classroom.",
      },
    },
  },
];
