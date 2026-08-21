"use client";

import React, { useEffect, useRef } from "react";
import styles from "./StoryDrawer.module.css";

const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export interface StorySection {
  label: string;
  /** Duz paragraf ya da madde listesi. */
  text?: string;
  items?: string[];
}

export interface StoryLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  primary?: boolean;
  /** PDF gibi indirilebilir dosyalar icin. */
  download?: boolean;
}

interface StoryDrawerProps {
  /** null ise panel kapalidir. */
  title: string | null;
  kicker: string;
  closeLabel: string;
  sections: StorySection[];
  links: StoryLink[];
  onClose: () => void;
}

/**
 * Sagdan kayarak acilan proje hikayesi paneli; 640px altinda alttan yukari
 * acilan tam genislik panele doner.
 *
 * Acikken: body scroll kilitli, ESC ve arka plan tiklamasi kapatir, odak panel
 * icinde kalir ve kapaninca paneli acan ogeye geri doner.
 */
export default function StoryDrawer({
  title,
  kicker,
  closeLabel,
  sections,
  links,
  onClose,
}: StoryDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const open = title !== null;

  useEffect(() => {
    if (!open) return;

    const panel = drawerRef.current;
    lastFocused.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (scrollRef.current) scrollRef.current.scrollTop = 0;

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
        onClose();
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
      const target = lastFocused.current;
      if (target && typeof target.focus === "function") target.focus();
      lastFocused.current = null;
    };
  }, [open, onClose]);

  return (
    <div className={styles.root}>
      <div
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={open ? `${title} ${kicker}` : kicker}
        aria-hidden={open ? "false" : "true"}
      >
        {open && (
          <>
            <div className={styles.head}>
              <div>
                <span className={styles.kicker}>{kicker}</span>
                <h3>{title}</h3>
              </div>
              <button type="button" className={styles.closeBtn} aria-label={closeLabel} onClick={onClose}>
                {CloseIcon}
              </button>
            </div>

            <div className={styles.scroll} ref={scrollRef}>
              {sections.map((section) => (
                <div key={section.label} className={styles.block}>
                  <h4>{section.label}</h4>
                  {section.items ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.text}</p>
                  )}
                </div>
              ))}
            </div>

            {links.length > 0 && (
              <div className={styles.foot}>
                {links.map((link) => (
                  <a
                    key={link.href + link.label}
                    className={`${styles.footLink} ${link.primary ? styles.primary : ""}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.download ? "" : undefined}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
