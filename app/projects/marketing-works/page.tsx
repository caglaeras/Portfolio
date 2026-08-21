"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  captionFor,
  marketingVideos,
  marketingVisuals,
  VIDEO_DIR,
  VISUAL_DIR,
  type MarketingVideo,
  type MarketingVisual,
  type VisualRatio,
} from "@/data/marketingWorks";
import styles from "./MarketingWorks.module.css";

/** basePath is not applied to plain media URLs, so it is prepended by hand. */
const BASE = "/Portfolio";

const RATIO_CLASS: Record<VisualRatio, string> = {
  "1:1": styles.ratio11,
  "4:5": styles.ratio45,
  "9:16": styles.ratio916,
};

/* ---------------------------------------------------------------------------
   Horizontal reel: arrow buttons + mouse drag on desktop, native swipe on touch
   --------------------------------------------------------------------------- */

function useReel() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  const syncEdges = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen keep the native momentum scrolling.
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  /** True when the pointer travelled far enough that the click was really a drag. */
  const wasDragged = () => drag.current.moved;

  const scrollByPage = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return {
    ref,
    edges,
    scrollByPage,
    wasDragged,
    reelProps: {
      className: `${styles.reel} ${dragging ? styles.dragging : ""}`,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
  };
}

interface ReelSectionProps {
  heading: string;
  hint: string;
  emptyLabel: string;
  isEmpty: boolean;
  reel: ReturnType<typeof useReel>;
  children: React.ReactNode;
}

function ReelSection({ heading, hint, emptyLabel, isEmpty, reel, children }: ReelSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.reelHeader}>
        <div>
          <h2 className={styles.sectionHeading}>{heading}</h2>
          {!isEmpty && <p className={styles.hint}>{hint}</p>}
        </div>
        {!isEmpty && (
          <div className={styles.arrowControls}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => reel.scrollByPage(-1)}
              disabled={reel.edges.atStart}
              aria-label="Scroll left"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => reel.scrollByPage(1)}
              disabled={reel.edges.atEnd}
              aria-label="Scroll right"
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>

      {isEmpty ? (
        <div className={styles.emptyState}>
          <i className="fas fa-photo-film" aria-hidden="true"></i>
          <p>{emptyLabel}</p>
        </div>
      ) : (
        <div ref={reel.ref} {...reel.reelProps}>
          {children}
        </div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Video card - poster cover, click to play / click again to pause, lazy loaded
   --------------------------------------------------------------------------- */

interface VideoCardProps {
  item: MarketingVideo;
  caption: string;
  playLabel: string;
  pauseLabel: string;
  isActive: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
  wasDragged: () => boolean;
}

function VideoCard({
  item,
  caption,
  playLabel,
  pauseLabel,
  isActive,
  onPlay,
  onStop,
  wasDragged,
}: VideoCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Nothing is fetched until the card scrolls into view.
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  // Only one video plays at a time.
  useEffect(() => {
    if (!isActive && playing) videoRef.current?.pause();
  }, [isActive, playing]);

  const toggle = () => {
    if (wasDragged()) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setStarted(true);
      onPlay(item.id);
      void video.play().catch(() => setStarted(false));
    } else {
      video.pause();
      onStop();
    }
  };

  return (
    <article className={`${styles.card} ${styles.ratio916}`}>
      <div
        ref={wrapperRef}
        className={styles.media}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${playing ? pauseLabel : playLabel} - ${caption}`}
      >
        <video
          ref={videoRef}
          src={inView ? `${BASE}/${VIDEO_DIR}/${item.filename}` : undefined}
          preload="none"
          playsInline
          controls={false}
          className={styles.video}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setStarted(false);
            onStop();
          }}
        />

        {!started && (
          <Image
            src={`${BASE}/${VIDEO_DIR}/${item.poster}`}
            alt=""
            fill
            sizes="240px"
            unoptimized
            draggable={false}
            className={styles.poster}
          />
        )}

        {!playing && (
          <span className={styles.playOverlay}>
            <span className={styles.playIcon}>
              <i className="fas fa-play" aria-hidden="true"></i>
            </span>
          </span>
        )}
      </div>

      <div className={styles.captionBox}>
        <p className={styles.captionLine} title={caption}>
          {caption}
        </p>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   Page
   --------------------------------------------------------------------------- */

export default function MarketingWorksPage() {
  const { content, language } = useLanguage();
  const copy = content.marketingWorks;

  const videoReel = useReel();
  const visualReel = useReel();

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<MarketingVisual | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  return (
    <div className={styles.container}>
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-photo-film" aria-hidden="true"></i>
          Social Media &amp; Creative
        </span>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.subtitle}>{copy.subtitle}</p>
        <div className={styles.introBox}>
          <p>{copy.intro}</p>
        </div>
      </header>

      <ReelSection
        heading={copy.videoSectionTitle}
        hint={copy.dragHint}
        emptyLabel={copy.emptyState}
        isEmpty={marketingVideos.length === 0}
        reel={videoReel}
      >
        {marketingVideos.map((item) => (
          <VideoCard
            key={item.id}
            item={item}
            caption={captionFor(item, language)}
            playLabel={copy.playLabel}
            pauseLabel={copy.pauseLabel}
            isActive={activeVideoId === item.id}
            onPlay={setActiveVideoId}
            onStop={() => setActiveVideoId(null)}
            wasDragged={videoReel.wasDragged}
          />
        ))}
      </ReelSection>

      <ReelSection
        heading={copy.visualSectionTitle}
        hint={copy.dragHint}
        emptyLabel={copy.emptyState}
        isEmpty={marketingVisuals.length === 0}
        reel={visualReel}
      >
        {marketingVisuals.map((item) => {
          const caption = captionFor(item, language);
          return (
            <article key={item.id} className={`${styles.card} ${RATIO_CLASS[item.ratio]}`}>
              <button
                type="button"
                className={styles.media}
                aria-label={`${copy.zoomLabel} - ${caption}`}
                onClick={() => {
                  if (visualReel.wasDragged()) return;
                  setLightbox(item);
                }}
              >
                <Image
                  src={`${BASE}/${VISUAL_DIR}/${item.filename}`}
                  alt={caption}
                  fill
                  sizes="320px"
                  unoptimized
                  draggable={false}
                  className={styles.visual}
                />
                <span className={styles.zoomOverlay}>
                  <i className="fas fa-expand" aria-hidden="true"></i>
                </span>
              </button>

              <div className={styles.captionBox}>
                <p className={styles.captionLine} title={caption}>
                  {caption}
                </p>
              </div>
            </article>
          );
        })}
      </ReelSection>

      {lightbox && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setLightbox(null)}
              aria-label={copy.closeLabel}
            >
              <i className="fas fa-xmark" aria-hidden="true"></i>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/${VISUAL_DIR}/${lightbox.filename}`}
              alt={captionFor(lightbox, language)}
              className={styles.lightboxImg}
            />
            <p className={styles.lightboxCaption}>{captionFor(lightbox, language)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
