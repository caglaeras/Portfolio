"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Portal from "@/components/Portal";
import Reel from "@/components/Reel";
import { useLanguage } from "@/context/LanguageContext";
import {
  captionFor,
  marketingVideos,
  marketingVisuals,
  type MarketingVideo,
  type MarketingVisual,
} from "@/data/marketing";
import styles from "./Marketing.module.css";

/** basePath is not applied to plain media URLs, so it is prepended by hand. */
const BASE = "/Portfolio";

/** Shorts are vertical; the file ratios come from the data. */
const SHORTS_AR = 9 / 16;

const arOf = (width: number, height: number) => (width / height).toFixed(4);

interface ReelSectionProps {
  heading: string;
  emptyLabel: string;
  isEmpty: boolean;
  prevLabel: string;
  nextLabel: string;
  children: React.ReactNode;
}

function ReelSection({
  heading,
  emptyLabel,
  isEmpty,
  prevLabel,
  nextLabel,
  children,
}: ReelSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>{heading}</h2>

      {isEmpty ? (
        <div className={styles.emptyState}>
          <i className="fas fa-photo-film" aria-hidden="true"></i>
          <p>{emptyLabel}</p>
        </div>
      ) : (
        <Reel prevLabel={prevLabel} nextLabel={nextLabel}>
          {children}
        </Reel>
      )}
    </section>
  );
}

function Caption({ item, language }: { item: MarketingVideo | MarketingVisual; language: "tr" | "en" }) {
  const full = captionFor(item, language);
  return (
    <div className={styles.captionBox}>
      <p className={styles.captionLine} title={full}>
        <strong>{item.label[language]}</strong> — {item.note[language]}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Video cards
   --------------------------------------------------------------------------- */

interface VideoCardProps {
  item: MarketingVideo;
  language: "tr" | "en";
  playLabel: string;
  pauseLabel: string;
  stopLabel: string;
  isActive: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
}

/**
 * YouTube card: only the poster frame is fetched up front. The player is
 * mounted on click, which also keeps the YouTube scripts off the page until
 * a visitor actually asks for one.
 */
function YouTubeCard({
  item,
  language,
  playLabel,
  stopLabel,
  isActive,
  onPlay,
  onStop,
}: VideoCardProps & { item: Extract<MarketingVideo, { source: "youtube" }> }) {
  const caption = captionFor(item, language);
  const [posterFailed, setPosterFailed] = useState(false);

  // oardefault is the original-aspect (vertical) still; hqdefault is the 4:3 fallback.
  const poster = posterFailed
    ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${item.videoId}/oardefault.jpg`;

  return (
    <article className={styles.card} style={{ ["--ar" as string]: SHORTS_AR.toFixed(4) }}>
      <div className={styles.media}>
        {isActive ? (
          <>
            <iframe
              className={styles.frame}
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
              title={caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              type="button"
              className={styles.stopBtn}
              onClick={onStop}
              aria-label={stopLabel}
            >
              <i className="fas fa-xmark" aria-hidden="true"></i>
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.mediaBtn}
            aria-label={`${playLabel} — ${caption}`}
            onClick={() => onPlay(item.id)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt=""
              loading="lazy"
              draggable={false}
              className={styles.poster}
              onError={() => setPosterFailed(true)}
            />
            <span className={styles.playOverlay}>
              <span className={styles.playIcon}>
                <i className="fas fa-play" aria-hidden="true"></i>
              </span>
            </span>
          </button>
        )}
      </div>
      <Caption item={item} language={language} />
    </article>
  );
}

/**
 * Self-hosted card: click plays, click again pauses, and nothing is fetched
 * until the card scrolls into view.
 */
function FileVideoCard({
  item,
  language,
  playLabel,
  pauseLabel,
  isActive,
  onPlay,
  onStop,
}: VideoCardProps & { item: Extract<MarketingVideo, { source: "file" }> }) {
  const caption = captionFor(item, language);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    <article className={styles.card} style={{ ["--ar" as string]: arOf(item.width, item.height) }}>
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
        aria-label={`${playing ? pauseLabel : playLabel} — ${caption}`}
      >
        <video
          ref={videoRef}
          src={inView ? `${BASE}${item.src}` : undefined}
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
            src={`${BASE}${item.poster}`}
            alt=""
            fill
            sizes="320px"
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
      <Caption item={item} language={language} />
    </article>
  );
}

/* ---------------------------------------------------------------------------
   Page
   --------------------------------------------------------------------------- */

export default function Marketing() {
  const { content, language } = useLanguage();
  const copy = content.marketing;

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
        <p className={styles.subtitle}>{copy.lead}</p>
        <div className={styles.introBox}>
          <p>{copy.intro}</p>
        </div>
      </header>

      <ReelSection
        heading={copy.videoSectionTitle}
        emptyLabel={copy.emptyState}
        isEmpty={marketingVideos.length === 0}
        prevLabel={copy.prevLabel}
        nextLabel={copy.nextLabel}
      >
        {marketingVideos.map((item) => {
          const shared = {
            language,
            playLabel: copy.playLabel,
            pauseLabel: copy.pauseLabel,
            stopLabel: copy.stopLabel,
            isActive: activeVideoId === item.id,
            onPlay: setActiveVideoId,
            onStop: () => setActiveVideoId(null),
          };
          return item.source === "youtube" ? (
            <YouTubeCard key={item.id} item={item} {...shared} />
          ) : (
            <FileVideoCard key={item.id} item={item} {...shared} />
          );
        })}
      </ReelSection>

      <ReelSection
        heading={copy.visualSectionTitle}
        emptyLabel={copy.emptyState}
        isEmpty={marketingVisuals.length === 0}
        prevLabel={copy.prevLabel}
        nextLabel={copy.nextLabel}
      >
        {marketingVisuals.map((item) => {
          const caption = captionFor(item, language);
          return (
            <article
              key={item.id}
              className={styles.card}
              style={{ ["--ar" as string]: arOf(item.width, item.height) }}
            >
              <button
                type="button"
                className={styles.media}
                aria-label={`${copy.zoomLabel} — ${caption}`}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={`${BASE}${item.src}`}
                  alt={caption}
                  fill
                  sizes="420px"
                  unoptimized
                  draggable={false}
                  className={styles.visual}
                />
                <span className={styles.zoomOverlay}>
                  <i className="fas fa-expand" aria-hidden="true"></i>
                </span>
              </button>
              <Caption item={item} language={language} />
            </article>
          );
        })}
      </ReelSection>

      {/* Lightbox body altina tasinir: contentArea transform tasidigi icin
          burada kalsa viewport'a gore konumlanamaz. */}
      {lightbox && (
        <Portal>
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
                  src={`${BASE}${lightbox.src}`}
                  alt={captionFor(lightbox, language)}
                  className={styles.lightboxImg}
                />
                <p className={styles.lightboxCaption}>{captionFor(lightbox, language)}</p>
              </div>
            </div>
        </Portal>
      )}
    </div>
  );
}
