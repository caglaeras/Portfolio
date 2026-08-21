/**
 * Marketing Works - content list for /projects/marketing
 *
 * Single source of truth for both horizontal strips on the Marketing Works
 * page. Page copy (title, intro, section headings) stays in data/content.json
 * under `marketing`, with the rest of the site's TR/EN strings.
 *
 * -- Videos -----------------------------------------------------------------
 * Two kinds of entry are supported in the same strip:
 *
 *   source: "youtube"  ->  needs `videoId`. Nothing but a thumbnail loads
 *                          until the card is clicked, then the player is
 *                          mounted with autoplay.
 *   source: "file"     ->  needs `src` (path under public/) plus `poster`,
 *                          `width` and `height`. Use this for self-hosted
 *                          Reels dropped into public/marketing/videos/:
 *
 *   {
 *     id: "v1",
 *     type: "video",
 *     source: "file",
 *     src: "/marketing/videos/reel-01.mp4",
 *     poster: "/marketing/videos/reel-01.jpg",
 *     width: 1080,
 *     height: 1920,
 *     label: { tr: "Instagram Reels", en: "Instagram Reels" },
 *     note: { tr: "Hasta bilgilendirme", en: "Patient education" },
 *   }
 *
 * -- Visuals ----------------------------------------------------------------
 * `width` and `height` are the file's real pixel size. Card shape is derived
 * from them, so any ratio works without touching the CSS - just keep them
 * accurate or the thumbnail will be letterboxed.
 *
 * -- Captions ---------------------------------------------------------------
 * Rendered as one line: "label - note". Both are TR/EN.
 */

export interface LocalizedText {
  tr: string;
  en: string;
}

interface ItemBase {
  id: string;
  label: LocalizedText;
  note: LocalizedText;
}

export interface YouTubeVideo extends ItemBase {
  type: "video";
  source: "youtube";
  videoId: string;
}

export interface FileVideo extends ItemBase {
  type: "video";
  source: "file";
  src: string;
  poster: string;
  width: number;
  height: number;
}

export type MarketingVideo = YouTubeVideo | FileVideo;

export interface MarketingVisual extends ItemBase {
  type: "visual";
  /** Path under public/, e.g. "/images/1.png". */
  src: string;
  width: number;
  height: number;
}

/** Shorts and Reels. Vertical cards. */
export const marketingVideos: MarketingVideo[] = [
  {
    id: "yt1",
    type: "video",
    source: "youtube",
    videoId: "gMKkm5kcke8",
    label: { tr: "YouTube Shorts 1", en: "YouTube Shorts 1" },
    note: { tr: "Tanıtım videosu 1", en: "Promotional video 1" },
  },
  {
    id: "yt2",
    type: "video",
    source: "youtube",
    videoId: "X3o4-4pyn2g",
    label: { tr: "YouTube Shorts 2", en: "YouTube Shorts 2" },
    note: { tr: "Tanıtım videosu 2", en: "Promotional video 2" },
  },
  {
    id: "yt3",
    type: "video",
    source: "youtube",
    videoId: "gynXSZEaN98",
    label: { tr: "YouTube Shorts 3", en: "YouTube Shorts 3" },
    note: { tr: "Tanıtım videosu 3", en: "Promotional video 3" },
  },
  {
    id: "yt4",
    type: "video",
    source: "youtube",
    videoId: "ct7o0Q4l6sk",
    label: { tr: "YouTube Shorts 4", en: "YouTube Shorts 4" },
    note: { tr: "Tanıtım videosu 4", en: "Promotional video 4" },
  },
  {
    id: "yt5",
    type: "video",
    source: "youtube",
    videoId: "AITJHwzmJnI",
    label: { tr: "YouTube Shorts 5", en: "YouTube Shorts 5" },
    note: { tr: "Tanıtım videosu 5", en: "Promotional video 5" },
  },
  {
    id: "yt6",
    type: "video",
    source: "youtube",
    videoId: "dMhl93xgxQ4",
    label: { tr: "YouTube Shorts 6", en: "YouTube Shorts 6" },
    note: { tr: "Tanıtım videosu 6", en: "Promotional video 6" },
  },
  {
    id: "yt7",
    type: "video",
    source: "youtube",
    videoId: "lKKu1GCBBN8",
    label: { tr: "YouTube Shorts 7", en: "YouTube Shorts 7" },
    note: { tr: "Tanıtım videosu 7", en: "Promotional video 7" },
  },
];

/** Post, story and banner artwork. Mixed ratios. */
export const marketingVisuals: MarketingVisual[] = [
  {
    id: "img1",
    type: "visual",
    src: "/images/1.png",
    width: 1024,
    height: 768,
    label: { tr: "Afiş Örneği 1", en: "Poster Example 1" },
    note: { tr: "Oyun tanıtımı için hazırlanmış bir afiş örneği.", en: "A poster example created for a game promotion." },
  },
  {
    id: "img2",
    type: "visual",
    src: "/images/3.png",
    width: 1024,
    height: 768,
    label: { tr: "Afiş Örneği 2", en: "Poster Example 2" },
    note: { tr: "Oyun tanıtımı için hazırlanmış bir afiş örneği.", en: "A poster example created for a game promotion." },
  },
  {
    id: "img3",
    type: "visual",
    src: "/images/poster.png",
    width: 1024,
    height: 768,
    label: { tr: "Afiş Örneği 3", en: "Poster Example 3" },
    note: { tr: "Oyun tanıtımı için hazırlanmış bir afiş örneği.", en: "A poster example created for a game promotion." },
  },
  {
    id: "img4",
    type: "visual",
    src: "/images/freeproject1.png",
    width: 1024,
    height: 768,
    label: { tr: "Maxxine Serbest Çalışma", en: "Maxxine Free Work" },
    note: { tr: "Poster çalışması.", en: "Poster design work." },
  },
  {
    id: "img5",
    type: "visual",
    src: "/images/freeproject2.png",
    width: 1024,
    height: 768,
    label: { tr: "little Women Serbest Çalışma", en: "Little Women Free Work" },
    note: { tr: "Poster çalışması.", en: "Poster design work." },
  },
  {
    id: "img6",
    type: "visual",
    src: "/images/pre-r_announcement.png",
    width: 1080,
    height: 1080,
    label: { tr: "Yayın Öncesi Duyuru", en: "Pre-Release Announcement" },
    note: { tr: "Ön sipariş ile alınan oyunumuz için yapılan bir duyuru görseli.", en: "Announcement visual for an upcoming pre-order game." },
  },
  {
    id: "img7",
    type: "visual",
    src: "/images/blog_announcement.png",
    width: 1024,
    height: 768,
    label: { tr: "Blog Duyurusu", en: "Blog Announcement" },
    note: { tr: "Yayına alınan blogları duyurmak için hazırlanmış bir görsel", en: "Visual prepared to announce newly published blog posts." },
  },
  {
    id: "img8",
    type: "visual",
    src: "/images/app_storeimage.png",
    width: 1080,
    height: 1920,
    label: { tr: "AppStore Görseli", en: "AppStore Visual" },
    note: { tr: "Appstore'a eklenmek üzere hazırlanmış görsel.", en: "Visual prepared to be featured on the AppStore." },
  },
  {
    id: "img9",
    type: "visual",
    src: "/images/infografik.png",
    width: 800,
    height: 2000,
    label: { tr: "İnfografik Çalışması", en: "Infographic Work" },
    note: { tr: "Veriler ile hazırlanmış bir infografik örneği", en: "An infographic example prepared with data analysis." },
  },
  {
    id: "img10",
    type: "visual",
    src: "/images/announcement_post.gif",
    width: 1080,
    height: 1080,
    label: { tr: "Yeni Mod Duyurusu", en: "New Mode Announcement" },
    note: { tr: "Oyuna yeni eklenen bir mod için yapılan duyuru görseli", en: "Announcement visual for a new game mode." },
  },
  {
    id: "img11",
    type: "visual",
    src: "/images/website_announcement.gif",
    width: 800,
    height: 800,
    label: { tr: "Websitesi Tanıtımı", en: "Website Launch" },
    note: { tr: "Yayına aldığımız websitesi için hazırlanan duyuru", en: "Announcement prepared to celebrate our website launch." },
  },
  {
    id: "img12",
    type: "visual",
    src: "/images/hs.gif",
    width: 810,
    height: 1012,
    label: { tr: "Sosyal Medya İçeriği", en: "Social Media Content" },
    note: { tr: "Verilen hizmete dair ilgi çekici bir içerik fikri", en: "An engaging content idea for a service." },
  },
  {
    id: "img13",
    type: "visual",
    src: "/images/dr.gif",
    width: 810,
    height: 1012,
    label: { tr: "Uygulama Tanıtım", en: "App Promotion" },
    note: { tr: "App tanıtımı için ilgi çekici bir içerik", en: "Engaging visual for app promotion." },
  },
  {
    id: "img14",
    type: "visual",
    src: "/images/files.gif",
    width: 810,
    height: 1012,
    label: { tr: "Sosyal Medya İçeriği", en: "Social Media Content" },
    note: { tr: "Motivasyonel ilgi çekici bir içerik fikri", en: "A motivational and engaging content idea." },
  },
];

/** Single-line card caption for the active language. */
export const captionFor = (
  item: MarketingVideo | MarketingVisual,
  language: "tr" | "en"
): string => `${item.label[language]} — ${item.note[language]}`;
