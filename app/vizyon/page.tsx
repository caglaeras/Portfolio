"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Vizyon.module.css";

export default function Vizyon() {
  const { content } = useLanguage();
  const t = content.vizyon;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{content.nav.vision}</h1>

      <div className={`card-glass ${styles.section}`}>
        <h2 className="section-title">{t.visionTitle}</h2>
        <p className={styles.lead}>{t.visionLead}</p>
        <p className={styles.text}>{t.visionText}</p>
      </div>

    </div>
  );
}
