/**
 * Marketing Works — content list for /projects/marketing-works
 *
 * This file is the single source of truth for WHICH items appear in the two
 * horizontal reels on the Marketing Works page. The surrounding page copy
 * (title, subtitle, intro paragraph, section headings) lives in
 * data/content.json under `marketingWorks`, alongside the rest of the site's
 * TR/EN strings.
 *
 * ── Where the files live ─────────────────────────────────────────────────────
 *   Videos   →  public/marketing/videos/<filename>
 *               plus a same-named poster frame, e.g. reel-01.mp4 + reel-01.jpg
 *   Visuals  →  public/marketing/visuals/<filename>
 *
 * Paths are resolved with the `/Portfolio` basePath by the page itself, so only
 * the bare file name goes here.
 *
 * ── Adding an item ───────────────────────────────────────────────────────────
 * Drop the file into the folder above, then append an entry below. Captions are
 * rendered as one line: "platform • goal (role)".
 *
 *   marketingVideos:
 *     {
 *       id: "v1",
 *       type: "video",
 *       filename: "reel-01.mp4",
 *       poster: "reel-01.jpg",
 *       platform: "Instagram Reels",
 *       goal: { tr: "Hasta Bilgilendirme", en: "Patient Education" },
 *       role: { tr: "İçerik Üretimi & Kurgu", en: "Content Production & Editing" },
 *     }
 *
 *   marketingVisuals (ratio drives the card shape — "1:1" | "4:5" | "9:16"):
 *     {
 *       id: "i1",
 *       type: "visual",
 *       filename: "post-01.png",
 *       ratio: "4:5",
 *       platform: "Instagram Feed",
 *       goal: { tr: "Farkındalık Postu", en: "Awareness Post" },
 *       role: { tr: "Görsel Tasarım", en: "Visual Design" },
 *     }
 */

export type MarketingWorkType = "video" | "visual";

/** Instagram-friendly card shapes. */
export type VisualRatio = "1:1" | "4:5" | "9:16";

export interface LocalizedText {
  tr: string;
  en: string;
}

interface MarketingWorkBase {
  /** Stable key — also used to track which video is currently playing. */
  id: string;
  type: MarketingWorkType;
  filename: string;
  /** Distribution surface, e.g. "Instagram Reels". Same in both languages. */
  platform: string;
  /** What the piece was made to do. */
  goal: LocalizedText;
  /** Contribution on the piece. */
  role: LocalizedText;
}

export interface MarketingVideo extends MarketingWorkBase {
  type: "video";
  /** Poster frame in the same folder, same base name, `.jpg`. */
  poster: string;
}

export interface MarketingVisual extends MarketingWorkBase {
  type: "visual";
  ratio: VisualRatio;
}

/** Folder names under public/marketing/, used to build the asset URLs. */
export const VIDEO_DIR = "marketing/videos";
export const VISUAL_DIR = "marketing/visuals";

/** 9:16 video content — Reels / Shorts / TikTok. */
export const marketingVideos: MarketingVideo[] = [];

/** Mixed-ratio visual content — feed posts, stories, banners. */
export const marketingVisuals: MarketingVisual[] = [];

/** Renders the single-line card caption for the active language. */
export const captionFor = (
  item: MarketingVideo | MarketingVisual,
  language: "tr" | "en"
): string => `${item.platform} • ${item.goal[language]} (${item.role[language]})`;
