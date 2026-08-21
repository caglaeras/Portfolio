"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Reel.module.css";

const ChevronLeft = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

const ChevronRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

interface ReelProps {
  children: React.ReactNode;
  /** Ok dugmelerinin erisilebilirlik etiketleri. */
  prevLabel: string;
  nextLabel: string;
}

/**
 * Yatay kaydirmali serit.
 *
 * Oklar sabit bir piksel miktari degil, bir sonraki kart kadar ilerler; boylece
 * farkli genislikteki kartlar her zaman seridin sol kenarina hizali durur.
 * Dokunmatik cihazlarda serit dogal olarak kaydirilabilir kalir.
 */
export default function Reel({ children, prevLabel, nextLabel }: ReelProps) {
  const ref = useRef<HTMLDivElement>(null);
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

  const step = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const left = el.getBoundingClientRect().left;
    const offsets = Array.from(el.children).map(
      (child) => (child as HTMLElement).getBoundingClientRect().left - left
    );

    const target =
      direction === 1
        ? offsets.find((offset) => offset > 2)
        : [...offsets].reverse().find((offset) => offset < -2);

    if (target === undefined) {
      el.scrollTo({ left: direction === 1 ? el.scrollWidth : 0, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: target, behavior: "smooth" });
  };

  return (
    <div className={styles.viewport}>
      <button
        type="button"
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={() => step(-1)}
        disabled={edges.atStart}
        aria-label={prevLabel}
      >
        {ChevronLeft}
      </button>

      <div ref={ref} className={styles.reel}>
        {children}
      </div>

      <button
        type="button"
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={() => step(1)}
        disabled={edges.atEnd}
        aria-label={nextLabel}
      >
        {ChevronRight}
      </button>
    </div>
  );
}
