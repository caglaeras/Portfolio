"use client";

import React, { useEffect, useRef, useState } from "react";
import Reel from "@/components/Reel";
import { useLanguage } from "@/context/LanguageContext";
import { unityProjects, type UnityProject } from "@/data/unityProjects";
import { LOAD_TIMEOUT } from "@/data/webProjects";
import styles from "./Unity.module.css";

const Icons = {
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 3.5v17l15-8.5z" />
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
 * Proje karti. Sayfa acilisinda yalnizca kapak goruntusu iner; oynatici ancak
 * tiklaninca kurulur ve src, load dinleyicisi baglandiktan sonra atanir ki
 * onbellekten gelen bir sayfada load olayi kacmasin.
 */
function UnityCard({
  project,
  copy,
  language,
  isPlaying,
  onPlay,
  onStop,
}: {
  project: UnityProject;
  copy: Copy;
  language: "tr" | "en";
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const started = useRef(false);

  const title = project.title[language];
  const thumb = thumbFailed
    ? `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${project.videoId}/maxresdefault.jpg`;

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
      `https://www.youtube.com/embed/${project.videoId}` +
      "?autoplay=1&rel=0&playsinline=1&modestbranding=1";

    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, [isPlaying, project.videoId]);

  useEffect(() => {
    if (!isPlaying) {
      started.current = false;
      setFailed(false);
    }
  }, [isPlaying]);

  return (
    <article className={styles.card}>
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
            <a href={watchUrl(project.videoId)} target="_blank" rel="noopener noreferrer">
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

      {/* Yazilar kartin altinda kalir. */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{title}</h3>
        <p className={styles.cardDesc}>{project.desc[language]}</p>
        <a
          className={styles.watchLink}
          href={watchUrl(project.videoId)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} ${copy.openWatchFor}`}
        >
          {Icons.external}
          <span>{copy.watchBtn}</span>
        </a>
      </div>
    </article>
  );
}

export default function Unity() {
  const { content, language } = useLanguage();
  const copy = content.unity as unknown as Copy;
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className={`${styles.page} ${styles.container}`}>
      {/* Baslik blogu Gen Ciftligi sayfasiyla ayni kalipta; sekmeler arasi
          gecerken duzen degismiyor. Layout zaten bir h1 bastigi icin
          buradaki baslik h2. */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-cube" aria-hidden="true"></i>
          {copy.badge}
        </span>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.subtitle}>{copy.lead}</p>
      </header>

      <p className={styles.hint}>{copy.reelHint}</p>

      <Reel prevLabel={copy.prevLabel} nextLabel={copy.nextLabel}>
        {unityProjects.map((project) => (
          <UnityCard
            key={project.id}
            project={project}
            copy={copy}
            language={language}
            isPlaying={playingId === project.id}
            onPlay={() => setPlayingId(project.id)}
            onStop={() => setPlayingId(null)}
          />
        ))}
      </Reel>
    </div>
  );
}
