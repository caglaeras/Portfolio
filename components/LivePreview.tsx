"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { LOAD_TIMEOUT, PREVIEW_HEIGHT, PREVIEW_WIDTH } from "@/data/webProjects";
import { frameIsReady } from "./frameReady";
import styles from "./LivePreview.module.css";

export interface LivePreviewLabels {
  /** Iskelet uzerinde gorunen yukleniyor metni. */
  loading: string;
  /** iframe hic gelmezse gosterilen aciklama. */
  failed: string;
  /** Yedek katmandaki baglantinin metni. */
  open: string;
}

interface LivePreviewProps {
  src: string;
  title: string;
  /** CSS aspect-ratio degeri, ornegin "16 / 10". */
  aspect: string;
  labels: LivePreviewLabels;
  badge?: { label: string; live?: boolean };
}

/**
 * Kart icinde kucultulmus, etkilesimsiz canli site onizlemesi.
 *
 * Iki ince nokta var:
 *
 * 1) src, load dinleyicisi baglandiktan SONRA JS ile atanir. Onbellekten gelen
 *    bir sayfa React handler'i baglanmadan yuklenmeyi bitirebiliyor; o zaman
 *    load olayi kaciyor ve kart bosuna yedek katmana dusuyordu.
 *
 * 2) Yukleme ve zaman asimi sayaci, kart goruntu alanina girmeden baslamaz.
 *    Aksi halde ekranin altindaki kart hic yuklenmeye baslamadan zaman asimina
 *    dusuyordu.
 */
export default function LivePreview({ src, title, aspect, labels, badge }: LivePreviewProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const started = useRef(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  /* Olcek: kart genisligi / render genisligi. */
  const fit = useCallback(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;
    const scale = stage.clientWidth / PREVIEW_WIDTH;
    frame.style.transform = "scale(" + scale + ")";
    frame.style.height = scale > 0 ? stage.clientHeight / scale + "px" : PREVIEW_HEIGHT + "px";
  }, []);

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

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || inView) return;
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
    observer.observe(stage);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !inView || started.current) return;
    started.current = true;

    let timer = 0;
    let poll = 0;
    const onLoad = () => {
      window.clearTimeout(timer);
      window.clearInterval(poll);
      setLoaded(true);
      setFailed(false);
      fit();
    };

    frame.addEventListener("load", onLoad);
    timer = window.setTimeout(() => setFailed(true), LOAD_TIMEOUT);
    frame.src = src;

    /*
     * load olayi alt kaynaklari bekledigi icin gecikebiliyor. Ayni origin'de
     * belgeyi okuyup hazir olur olmaz iskeleti kaldiriyoruz; capraz origin'de
     * bu kontrol false doner ve load olayi beklenmeye devam eder.
     */
    poll = window.setInterval(() => {
      if (frameIsReady(frame)) onLoad();
    }, 250);

    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
      window.clearInterval(poll);
    };
  }, [inView, src, fit]);

  return (
    <div className={styles.stage} ref={stageRef} style={{ aspectRatio: aspect }}>
      {badge && (
        <span className={styles.badge}>
          {badge.live && <span className={styles.dot} />}
          {badge.label}
        </span>
      )}

      {!loaded && <div className={styles.skeleton} data-label={labels.loading} />}

      {failed && (
        <div className={styles.fallback}>
          <p>{labels.failed}</p>
          <a className={styles.fallbackLink} href={src} target="_blank" rel="noopener noreferrer">
            {labels.open}
          </a>
        </div>
      )}

      {/* src, dinleyici baglandiktan sonra yukaridaki effect icinde atanir. */}
      <iframe
        ref={frameRef}
        className={styles.mini}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        title={title}
      />
    </div>
  );
}
