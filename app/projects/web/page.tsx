"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  LOAD_TIMEOUT,
  PREVIEW_HEIGHT,
  PREVIEW_WIDTH,
  STORY_ORDER,
  webProjects,
  type LiveWebProject,
  type StoryKey,
  type VideoWebProject,
  type WebProject,
} from "@/data/webProjects";
import styles from "./Web.module.css";

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
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
};

const watchUrl = (videoId: string) => "https://www.youtube.com/watch?v=" + videoId;

/* ---------------------------------------------------------------------------
   Mini onizleme: iframe 1280px genislikte render edilir, kart genisligine
   JS ile hesaplanan olcekle sigdirilir. Kart boyu degistikce yeniden hesaplanir.
   --------------------------------------------------------------------------- */

function useFitPreview(
  stageRef: React.RefObject<HTMLElement>,
  frameRef: React.RefObject<HTMLIFrameElement>
) {
  const fit = useCallback(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;
    const scale = stage.clientWidth / PREVIEW_WIDTH;
    frame.style.transform = "scale(" + scale + ")";
    frame.style.height = scale > 0 ? stage.clientHeight / scale + "px" : PREVIEW_HEIGHT + "px";
  }, [stageRef, frameRef]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    fit();
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver === "function") {
      observer = new ResizeObserver(fit);
      observer.observe(stage);
    }
    window.addEventListener("resize", fit);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [fit]);

  return { fit };
}

/**
 * Kart goruntu alanina girdi mi? loading="lazy" iframe'ler ekranin altinda
 * beklerken yuklenmez, bu yuzden zaman asimi sayaci ancak kart gorunur olunca
 * baslatilir. Aksi halde alt siradaki kart bosuna yedek baglantiya duser.
 */
function useInView(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver !== "function") {
      setInView(true);
      return;
    }
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
  }, [ref, inView]);

  return inView;
}

/**
 * iframe yukleme durumu.
 *
 * src, dinleyici baglandiktan SONRA JS ile atanir. Onbellekten gelen bir sayfa
 * React handler'i baglanmadan yuklenmeyi bitirebiliyor; boyle bir durumda load
 * olayi kaciyor ve kart bosuna yedek baglantiya dusuyordu. Src'yi burada
 * atayinca olay kacmiyor, ayrica zaman asimi sayaci tam yukleme baslarken
 * calismaya basliyor.
 */
function useFrameLoader(src: string, active: boolean) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const started = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !active || started.current) return;
    started.current = true;

    let timer = 0;
    const onLoad = () => {
      window.clearTimeout(timer);
      setLoaded(true);
      setFailed(false);
    };

    frame.addEventListener("load", onLoad);
    timer = window.setTimeout(() => setFailed(true), LOAD_TIMEOUT);
    frame.src = src;

    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, [src, active]);

  return { frameRef, loaded, failed };
}

/* ---------------------------------------------------------------------------
   Kart sahneleri
   --------------------------------------------------------------------------- */

interface Copy {
  [key: string]: string;
}

function LiveStage({ project, copy }: { project: LiveWebProject; copy: Copy }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const { frameRef, loaded, failed } = useFrameLoader(project.live, inView);
  const { fit } = useFitPreview(stageRef, frameRef);

  // Yuklendiginde olcegi bir kez daha hesapla.
  useEffect(() => {
    if (loaded) fit();
  }, [loaded, fit]);

  return (
    <div className={styles.stage} ref={stageRef}>
      <span className={styles.liveDot}>
        <span />
        {copy.liveBadge}
      </span>

      {!loaded && <div className={styles.skeleton} data-label={copy.previewLoading} />}

      {failed && (
        <div className={styles.stageFallback}>
          <p>{copy.previewFailed}</p>
          <a className={`${styles.btn} ${styles.quiet}`} href={project.live} target="_blank" rel="noopener noreferrer">
            {copy.openSite}
          </a>
        </div>
      )}

      {/* src, dinleyici baglandiktan sonra useFrameLoader icinde atanir. */}
      <iframe
        ref={frameRef}
        className={styles.mini}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        title={`${project.name} ${copy.previewBtn}`}
      />
    </div>
  );
}

function YouTubeStage({
  project,
  copy,
  isPlaying,
  onPlay,
  onStop,
}: {
  project: VideoWebProject;
  copy: Copy;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const embed =
    `https://www.youtube.com/embed/${project.videoId}` +
    "?autoplay=1&rel=0&playsinline=1&modestbranding=1";
  const { frameRef, failed } = useFrameLoader(embed, isPlaying);

  // maxres her videoda bulunmaz, yoksa hqdefault'a duselim.
  const thumb = thumbFailed
    ? `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${project.videoId}/maxresdefault.jpg`;

  return (
    <div className={`${styles.stage} ${styles.stageVideo}`}>
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
            title={`${project.name} ${copy.demoLink}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            className={styles.videoClose}
            aria-label={`${project.name} ${copy.closeVideo}`}
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
            href={watchUrl(project.videoId)}
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
          aria-label={`${project.name} ${copy.playVideo}`}
          onClick={onPlay}
        >
          <span className={styles.playBadge}>{Icons.play}</span>
        </button>
      )}
    </div>
  );
}

function ModalStage({ project, copy }: { project: LiveWebProject; copy: Copy }) {
  const { frameRef, loaded, failed } = useFrameLoader(project.live, true);

  return (
    <div className={styles.modalStage}>
      {!loaded && <div className={styles.skeleton} data-label={copy.siteLoading} />}
      {failed && (
        <div className={styles.stageFallback}>
          <p>{copy.modalFailed}</p>
          <a className={`${styles.btn} ${styles.quiet}`} href={project.live} target="_blank" rel="noopener noreferrer">
            {copy.openSite}
          </a>
        </div>
      )}
      <iframe ref={frameRef} title={`${project.name} ${copy.previewBtn}`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Sayfa
   --------------------------------------------------------------------------- */

export default function Web() {
  const { content, language } = useLanguage();
  const copy = content.web as unknown as Copy & { storyLabels: Record<StoryKey, string> };

  const [storyFor, setStoryFor] = useState<WebProject | null>(null);
  const [previewFor, setPreviewFor] = useState<LiveWebProject | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openPanel = storyFor ? "drawer" : previewFor ? "modal" : null;

  const closePanel = useCallback(() => {
    setStoryFor(null);
    setPreviewFor(null);
  }, []);

  /* Panel acikken: body scroll kilitli, ESC kapatir, odak panelde kalir. */
  useEffect(() => {
    if (!openPanel) return;

    const panel = openPanel === "drawer" ? drawerRef.current : modalRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => {
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((node) => node.offsetWidth > 0 || node.offsetHeight > 0);
    };

    const items = focusables();
    if (items.length) items[0].focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel, closePanel]);

  /* Panel kapaninca odak, paneli acan butona geri doner. */
  useEffect(() => {
    if (openPanel) return;
    const target = lastFocused.current;
    if (target && typeof target.focus === "function") target.focus();
    lastFocused.current = null;
  }, [openPanel]);

  const remember = (event: React.MouseEvent<HTMLButtonElement>) => {
    lastFocused.current = event.currentTarget;
  };

  return (
    <div className={styles.page}>
      <header>
        <h2 className={styles.pageTitle}>{copy.title}</h2>
        <p className={styles.pageLead}>{copy.lead}</p>
      </header>

      <div className={styles.grid}>
        {webProjects.map((project) => (
          <article key={project.id} className={styles.card}>
            {project.kind === "live" ? (
              <LiveStage project={project} copy={copy} />
            ) : (
              <YouTubeStage
                project={project}
                copy={copy}
                isPlaying={playingId === project.id}
                onPlay={() => setPlayingId(project.id)}
                onStop={() => setPlayingId(null)}
              />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{project.name}</h3>
              <p className={styles.cardSummary}>{project.summary[language]}</p>

              <ul className={styles.chips} aria-label={`${project.name} ${copy.techsOf}`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <div className={styles.actions}>
                {project.kind === "live" && (
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.primary}`}
                    aria-label={`${project.name} ${copy.openPreviewFor}`}
                    onClick={(event) => {
                      remember(event);
                      setPreviewFor(project);
                    }}
                  >
                    {Icons.play}
                    <span>{copy.previewBtn}</span>
                  </button>
                )}

                <button
                  type="button"
                  className={styles.btn}
                  aria-label={`${project.name} ${copy.openStoryFor}`}
                  onClick={(event) => {
                    remember(event);
                    setStoryFor(project);
                  }}
                >
                  {Icons.book}
                  <span>{copy.storyBtn}</span>
                </button>

                <a
                  className={`${styles.btn} ${styles.quiet}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} ${copy.openRepoFor}`}
                >
                  {Icons.github}
                  <span>{copy.githubBtn}</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Hikaye paneli ve onizleme modali icin ortak zemin */}
      <div
        className={`${styles.backdrop} ${openPanel ? styles.open : ""}`}
        onClick={closePanel}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${storyFor ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={storyFor ? `${storyFor.name} ${copy.storyKicker}` : copy.storyKicker}
        aria-hidden={storyFor ? "false" : "true"}
      >
        {storyFor && (
          <>
            <div className={styles.drawerHead}>
              <div>
                <span className={styles.kicker}>{copy.storyKicker}</span>
                <h3>{storyFor.name}</h3>
              </div>
              <button type="button" className={styles.iconBtn} aria-label={copy.closeStory} onClick={closePanel}>
                {Icons.close}
              </button>
            </div>

            <div className={styles.drawerScroll}>
              {STORY_ORDER.map((key) => {
                const value = storyFor.story[key];
                return (
                  <div key={key} className={styles.storyBlock}>
                    <h4>{copy.storyLabels[key]}</h4>
                    {Array.isArray(value[language]) ? (
                      <ul>
                        {(value[language] as string[]).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{value[language] as string}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.drawerFoot}>
              {storyFor.kind === "live" && (
                <a
                  className={`${styles.btn} ${styles.primary}`}
                  href={storyFor.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icons.external}
                  <span>{copy.liveSiteLink}</span>
                </a>
              )}
              {storyFor.kind === "youtube" && (
                <a
                  className={`${styles.btn} ${styles.quiet}`}
                  href={watchUrl(storyFor.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icons.play}
                  <span>{copy.demoLink}</span>
                </a>
              )}
              <a
                className={`${styles.btn} ${styles.quiet}`}
                href={storyFor.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icons.github}
                <span>{copy.repoLink}</span>
              </a>
            </div>
          </>
        )}
      </aside>

      <div
        ref={modalRef}
        className={`${styles.modal} ${previewFor ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={previewFor ? `${previewFor.name} ${copy.previewBtn}` : copy.previewBtn}
        aria-hidden={previewFor ? "false" : "true"}
      >
        {previewFor && (
          <>
            <div className={styles.modalBar}>
              <h3>{previewFor.name}</h3>
              <a
                className={`${styles.btn} ${styles.quiet}`}
                href={previewFor.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.openNewTab}
                {Icons.external}
              </a>
              <button type="button" className={styles.iconBtn} aria-label={copy.closePreview} onClick={closePanel}>
                {Icons.close}
              </button>
            </div>

            {/* Modal kapaninca bu alt agac sokulur, iframe arkada calismaya devam etmez. */}
            <ModalStage project={previewFor} copy={copy} />
          </>
        )}
      </div>
    </div>
  );
}
