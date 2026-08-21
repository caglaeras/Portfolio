"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import StoryDrawer, { type StoryLink, type StorySection } from "@/components/StoryDrawer";
import { academicWork, type AcademicItem, type AcademicVideo } from "@/data/academicWork";
import { LOAD_TIMEOUT } from "@/data/webProjects";
import styles from "./Academic.module.css";

/** basePath duz medya adreslerine uygulanmadigi icin elle ekleniyor. */
const BASE = "/Portfolio";

const STORY_ORDER = ["problem", "amac", "cozum", "ozellikler", "ogrendim"] as const;

const Icons = {
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 3.5v17l15-8.5z" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  ),
};

const watchUrl = (videoId: string) => "https://www.youtube.com/watch?v=" + videoId;

type Copy = Record<string, string>;

/**
 * YouTube karti: sayfa acilisinda yalnizca kapak goruntusu iner, oynatici
 * ancak tiklaninca kurulur. src, dinleyici baglandiktan sonra atanir ki
 * onbellekten gelen bir sayfada load olayi kacmasin.
 */
function VideoStage({
  item,
  copy,
  isPlaying,
  onPlay,
  onStop,
}: {
  item: AcademicVideo;
  copy: Copy;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const { language } = useLanguage();
  const [thumbFailed, setThumbFailed] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const started = useRef(false);

  const title = item.title[language];
  const thumb = thumbFailed
    ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !isPlaying || started.current) return;
    started.current = true;

    let timer = 0;
    const onLoad = () => {
      window.clearTimeout(timer);
      setFailed(false);
    };
    frame.addEventListener("load", onLoad);
    timer = window.setTimeout(() => setFailed(true), LOAD_TIMEOUT);
    frame.src =
      `https://www.youtube.com/embed/${item.videoId}` +
      "?autoplay=1&rel=0&playsinline=1&modestbranding=1";

    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, [isPlaying, item.videoId]);

  useEffect(() => {
    if (!isPlaying) {
      started.current = false;
      setFailed(false);
    }
  }, [isPlaying]);

  return (
    <div className={styles.stage}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.thumb}
        src={thumb}
        alt=""
        loading="lazy"
        draggable={false}
        onError={() => setThumbFailed(true)}
      />

      {isPlaying && (
        <>
          <iframe
            ref={frameRef}
            className={styles.player}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            className={styles.videoClose}
            aria-label={`${title} ${copy.closeVideo}`}
            onClick={() => {
              onStop();
              playRef.current?.focus();
            }}
          >
            {Icons.close}
          </button>
        </>
      )}

      {isPlaying && failed && (
        <div className={styles.stageFallback}>
          <p>{copy.videoFailed}</p>
          <a
            className={`${styles.btn} ${styles.quiet}`}
            href={watchUrl(item.videoId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.openYoutube}
          </a>
        </div>
      )}

      {!isPlaying && (
        <button
          ref={playRef}
          type="button"
          className={styles.playBtn}
          aria-label={`${title} ${copy.playVideo}`}
          onClick={onPlay}
        >
          <span className={styles.playBadge}>{Icons.play}</span>
        </button>
      )}
    </div>
  );
}

export default function Other() {
  const { content, language } = useLanguage();
  const copy = content.other as unknown as Copy;
  const storyCopy = content.story as unknown as {
    kicker: string;
    button: string;
    close: string;
    openFor: string;
    labels: Record<(typeof STORY_ORDER)[number], string>;
  };

  const [storyFor, setStoryFor] = useState<AcademicItem | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const closeStory = useCallback(() => setStoryFor(null), []);

  const sections: StorySection[] = storyFor
    ? STORY_ORDER.map((key) => {
        const value = storyFor.story[key][language];
        return Array.isArray(value)
          ? { label: storyCopy.labels[key], items: value }
          : { label: storyCopy.labels[key], text: value };
      })
    : [];

  const links: StoryLink[] = storyFor
    ? storyFor.kind === "youtube"
      ? [
          {
            label: copy.watchBtn,
            href: watchUrl(storyFor.videoId),
            icon: Icons.play,
            primary: true,
          },
        ]
      : [
          {
            label: copy.docLink,
            href: `${BASE}${storyFor.pdf}`,
            icon: Icons.external,
            primary: true,
          },
        ]
    : [];

  return (
    <div className={styles.page}>
      <header>
        <h2 className={styles.pageTitle}>{copy.title}</h2>
        <p className={styles.pageLead}>{copy.lead}</p>
      </header>

      <div className={styles.grid}>
        {academicWork.map((item) => {
          const title = item.title[language];
          return (
            <article key={item.id} className={styles.card}>
              {item.kind === "youtube" ? (
                <VideoStage
                  item={item}
                  copy={copy}
                  isPlaying={playingId === item.id}
                  onPlay={() => setPlayingId(item.id)}
                  onStop={() => setPlayingId(null)}
                />
              ) : (
                <div className={`${styles.stage} ${styles.docStage}`}>
                  <span className={styles.docBadge}>
                    {Icons.doc}
                    PDF
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.thumb}
                    src={`${BASE}${item.image}`}
                    alt={`${title} ${copy.previewOf}`}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              )}

              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{title}</h3>
                <p className={styles.cardSummary}>{item.summary[language]}</p>

                {item.tags.length > 0 && (
                  <ul className={styles.chips} aria-label={`${title} ${copy.techsOf}`}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}

                {/* Hikaye ve indirme butonlari yan yana */}
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.btn}
                    aria-label={`${title} ${storyCopy.openFor}`}
                    onClick={() => setStoryFor(item)}
                  >
                    {Icons.book}
                    <span>{storyCopy.button}</span>
                  </button>

                  {item.kind === "document" ? (
                    <a
                      className={`${styles.btn} ${styles.quiet}`}
                      href={`${BASE}${item.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${title} ${copy.openDocFor}`}
                    >
                      {Icons.download}
                      <span>{copy.downloadBtn}</span>
                    </a>
                  ) : (
                    <a
                      className={`${styles.btn} ${styles.quiet}`}
                      href={watchUrl(item.videoId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${title} ${copy.openYoutube}`}
                    >
                      {Icons.external}
                      <span>{copy.watchBtn}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <StoryDrawer
        title={storyFor ? storyFor.title[language] : null}
        kicker={storyCopy.kicker}
        closeLabel={storyCopy.close}
        sections={sections}
        links={links}
        onClose={closeStory}
      />
    </div>
  );
}
