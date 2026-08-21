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
    kind: "document",
    pdf: "/documents/coaching_system_presentation.pdf",
    image: "/images/coaching_system_preview.png",
    tags: ["SQL Server", "T-SQL", "PDF"],
    extras: [{ kind: "schema", href: "/documents/coaching_system_schema.pdf", local: true }],
    title: {
      tr: "SQL ile Koçluk Sistemi Planlaması",
      en: "Coaching System Planning with SQL",
    },
    summary: {
      tr: "Öğrenci koçluğu sistemi için SQL Server üzerinde kurulmuş veritabanı tasarımı: 20 tablo, saklı yordam, tetikleyici ve görünümler.",
      en: "A database design built on SQL Server for a student coaching system: 20 tables, a stored procedure, a trigger and views.",
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
        tr: "SQL Server üzerinde öğrenci, koç, oturum, paket, hedef, ödeme ve iletişim kayıtlarını kapsayan 20 tabloyu yabancı anahtar ilişkileriyle birlikte kurdum. Tasarımı yalnızca şemada bırakmayıp saklı yordam, tetikleyici ve görünümlerle çalışır hale getirdim, raporları da JOIN ve GROUP BY sorgularıyla çıkardım.",
        en: "On SQL Server I built 20 tables covering students, coaches, sessions, packages, goals, payments and communication records, wired together with foreign keys. Rather than leaving the design as a schema, I made it work through a stored procedure, a trigger and views, and produced the reports with JOIN and GROUP BY queries.",
      },
      ozellikler: {
        tr: [
          "Yabancı anahtarlarla bağlanmış 20 tablo",
          "Hedef eklemek için saklı yordam (AddGoal)",
          "Geri bildirim eklenince bildirim üreten tetikleyici",
          "Öğrenci gelişimi ve iletişim özeti için iki görünüm",
          "JOIN, GROUP BY ve ORDER BY ile raporlama sorguları",
        ],
        en: [
          "20 tables wired together with foreign keys",
          "A stored procedure for adding a goal (AddGoal)",
          "A trigger that creates a notification when feedback arrives",
          "Two views, for student progress and a communication summary",
          "Reporting queries with JOIN, GROUP BY and ORDER BY",
        ],
      },
      ogrendim: {
        tr: "Bir sistemi anlamanın en hızlı yolunun, ondan hangi soruları soracağımı yazmak olduğunu gördüm. İlişkileri baştan kurmanın sonradan tablo eklemekten çok daha az iş çıkardığını, tetikleyici ve görünümlerin ise tekrar eden işi şemanın içine taşıdığını öğrendim.",
        en: "I saw that the fastest way to understand a system is to write down which questions I will ask of it. I learned that establishing the relationships up front creates far less work than adding tables later, and that triggers and views move repetitive work into the schema itself.",
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
    id: "lesson-plan-spreadsheet",
    kind: "document",
    pdf: "/documents/lesson_plan_spreadsheet.pdf",
    image: "/images/lesson_plan_spreadsheet_preview.png",
    tags: ["MEB BT.6.4.1", "ISTE", "PRIMM", "PDF"],
    title: {
      tr: "Ders Planı: Acemi Dedektif ile Tablo Biçimlendirme",
      en: "Lesson Plan: Spreadsheet Formatting with a Detective Case",
    },
    summary: {
      tr: "6. sınıf Bilişim Teknolojileri için 35 dakikalık ders planı: senaryo temelli bir dedektif vakası üzerinden elektronik tablo biçimlendirme. Sınıfta uygulandı.",
      en: "A 35 minute lesson plan for 6th grade Information Technologies: spreadsheet formatting through a scenario based detective case. Taught in class.",
    },
    story: {
      problem: {
        tr: "Elektronik tablo biçimlendirme, öğrenciye anlatıldığında sıkıcı bir düğme turuna dönüşüyor. Kalın, italik ya da sütun genişliği tek tek gösterildiğinde öğrenci neden bunu yaptığını bilmiyor, dolayısıyla ertesi hafta hatırlamıyor.",
        en: "Spreadsheet formatting turns into a dull tour of buttons when it is simply demonstrated. Shown one by one, bold, italics or column width leave the learner without a reason for doing it, so none of it survives to the following week.",
      },
      amac: {
        tr: "Biçimlendirmenin bir amaca hizmet ettiği bir durum kurmak istedim. Hedefim, öğrencinin tabloyu güzelleştirmek için değil, bir başkasının okuyabilmesi için düzenlemesiydi.",
        en: "I wanted to set up a situation where formatting serves a purpose. My goal was for students to tidy the table not to make it pretty, but so that someone else could read it.",
      },
      cozum: {
        tr: "Dersi bir vaka dosyası üzerine kurdum: öğrenciler acemi dedektif oluyor ve dağınık şüpheli tablosunu profesyonel dedektife teslim edilecek okunur bir tabloya çeviriyor. Vakayı çözmek görevin parçası değil, bu sınırı derste açıkça tekrarlıyorum; böylece dikkat biçimlendirmede kalıyor. Grup içinde rol dağılımı, ekler ve teslim klasörüyle akış baştan sona planlandı.",
        en: "I built the lesson around a case file: students become trainee detectives and turn a messy suspect table into a readable one to hand to the professional detective. Solving the case is deliberately not part of the task, a boundary I restate during the lesson so attention stays on the formatting. The flow is planned end to end, with group roles, appendices and a submission folder.",
      },
      ozellikler: {
        tr: [
          "Acemi dedektif senaryosu üzerine kurulu 35 dakikalık akış",
          "Sütun genişliği, kalın, italik, yazı boyutu ve üstü çizili biçimlendirme hedefleri",
          "Grup içinde rol dağılımıyla iş birliği",
          "Öğrencinin kendi ve eşinin işini denetlediği öz değerlendirme listesi",
          "MEB BT.6.4.1.2 kazanımı, ISTE ve PRIMM çerçeveleriyle hizalama",
          "Yedi ek: senaryo, vaka dosyası, yeni kanıt, görevler, kontrol listesi, kapanış videosu, teslim klasörü",
        ],
        en: [
          "A 35 minute flow built on a trainee detective scenario",
          "Formatting targets: column width, bold, italics, font size and strikethrough",
          "Collaboration through assigned roles within the group",
          "A self assessment checklist covering both the student's work and their partner's",
          "Aligned to the MoNE BT.6.4.1.2 outcome and to the ISTE and PRIMM frameworks",
          "Seven appendices: scenario, case file, new evidence, tasks, checklist, closing video, submission folder",
        ],
      },
      ogrendim: {
        tr: "Senaryonun asıl işinin motivasyon değil sınır çizmek olduğunu gördüm; görevin ne OLMADIĞINI söylemek, ne olduğunu söylemek kadar önemliydi. Öz değerlendirme listesinin de öğretmenin yerine geçmediğini, öğrenciye neye bakacağını öğrettiğini fark ettim.",
        en: "I saw that the scenario's real job is not motivation but drawing a boundary; saying what the task is NOT mattered as much as saying what it is. I also noticed that the self assessment checklist does not replace the teacher, it teaches the student what to look for.",
      },
    },
  },
  {
    id: "lesson-plan-ai-literacy",
    kind: "document",
    pdf: "/documents/lesson_plan_ai_literacy.pdf",
    image: "/images/lesson_plan_ai_literacy_preview.png",
    tags: ["AI4K12", "CSTA", "ISTE", "PDF"],
    title: {
      tr: "Ders Planı: Yapay Zekada Temsil ve Prompt ile Arayüz Tasarımı",
      en: "Lesson Plan: Representation in AI and Designing UI through Prompts",
    },
    summary: {
      tr: "9. sınıf hazırlık için 40 dakikalık yapay zeka okuryazarlığı ders planı: temsil kavramı ve yapılandırılmış prompt ile arayüz üretimi. Sınıfta uygulandı.",
      en: "A 40 minute AI literacy lesson plan for 9th grade preparatory: the concept of representation and generating a UI with a structured prompt. Taught in class.",
    },
    story: {
      problem: {
        tr: "Öğrenciler yapay zekaya bir şey yazıp çıktı almayı biliyor ama arada ne olduğunu bilmiyor. Çıktı beklediği gibi olmadığında da suçu araca atıyor, kendi isteminin belirsizliğini görmüyor.",
        en: "Students know how to type something into an AI and get an output, but not what happens in between. When the output is not what they expected they blame the tool, without seeing how vague their own prompt was.",
      },
      amac: {
        tr: "Temsil kavramını soyut bir tanım olarak değil, öğrencinin kendi gözüyle görebileceği bir zincir olarak öğretmek istedim: yazdığı cümle, üretilen kod ve ekranda çıkan sayfa. Aynı derste istemin belirginliğinin çıktıyı nasıl değiştirdiğini de göstermeyi hedefledim.",
        en: "I wanted to teach representation not as an abstract definition but as a chain the student can see for themselves: the sentence they write, the code produced, and the page that appears on screen. In the same lesson I aimed to show how the specificity of a prompt changes the output.",
      },
      cozum: {
        tr: "Dersi bir karşılaştırma üzerine kurdum: aynı hedef için belirsiz bir istem (V1) ile beş parçalı tarife göre yazılmış yapılandırılmış bir istem (V2) yazdırıp iki çıktıyı yan yana inceletiyorum. Tarifin parçaları hedef kitle, amaç, içerik, biçem ve yapı. Ders, yapay zekanın varsayılan biçem tercihlerinin eğitim verisindeki örüntülerden geldiği tartışmasıyla kapanıyor, çıkışta iki dakikalık sessiz bir çıkış kartı toplanıyor.",
        en: "I built the lesson around a comparison: for the same goal, students write a vague prompt (V1) and a structured one following a five part recipe (V2), then examine the two outputs side by side. The parts of the recipe are audience, purpose, content, style and structure. The lesson closes on a discussion of how an AI's default style choices come from patterns in its training data, and a two minute silent exit ticket is collected at the door.",
      },
      ozellikler: {
        tr: [
          "Temsilin üç katmanı: doğal dil istemi, HTML/CSS kodu, ekrandaki sayfa",
          "Beş parçalı istem tarifi: hedef kitle, amaç, içerik, biçem, yapı",
          "Belirsiz istem ile yapılandırılmış istemin çıktılarını karşılaştırma",
          "Yapay zekanın varsayılan tercihlerinin eğitim verisinden geldiğini tartışma",
          "Iki dakikalık çıkış kartı ve ödev olarak verilen düzey belirleme değerlendirmesi",
          "AI4K12 Büyük Fikir 2, 3 ve 5, CSTA 3A, ISTE ve MEB TYMM ile hizalama",
        ],
        en: [
          "The three layers of representation: natural language prompt, HTML and CSS code, the rendered page",
          "A five part prompt recipe: audience, purpose, content, style, structure",
          "Comparing the outputs of a vague prompt and a structured one",
          "Discussing how an AI's default choices come from its training data",
          "A two minute exit ticket plus a summative assessment set as homework",
          "Aligned to AI4K12 Big Ideas 2, 3 and 5, CSTA 3A, ISTE and the MoNE TYMM framework",
        ],
      },
      ogrendim: {
        tr: "Yapay zekayı öğretirken en zor kısmın araç değil, öğrencinin kendi isteminin belirsizliğini fark etmesi olduğunu gördüm; iki çıktıyı yan yana koymak, benim anlatabileceğim her açıklamadan daha ikna edici oldu. Kırk dakikalık bir derste eleştirel tartışmayı sona bırakmanın da riskli olduğunu, o yüzden çıkış kartını sabit tuttuğumu öğrendim.",
        en: "I saw that the hardest part of teaching AI is not the tool but getting students to notice how vague their own prompt was; putting two outputs side by side was more convincing than any explanation I could give. I also learned that leaving the critical discussion to the end of a forty minute lesson is risky, which is why I keep the exit ticket fixed.",
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
