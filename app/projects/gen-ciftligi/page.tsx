"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GenCiftligi.module.css";

export default function GenCiftligiPage() {
  const { content, language } = useLanguage();
  const data = content.genCiftligi;
  const [isLoadingGame, setIsLoadingGame] = useState(true);

  if (!data) return null;

  const gameBuildUrl = "/Portfolio/games/gen-ciftligi/index.html";
  const pdfPaperUrl = "/Portfolio/papers/Eraslan_2026_GenCiftligi.pdf";
  const windowsDownloadUrl = "/Portfolio/downloads/GenCiftligi_Windows.zip";

  return (
    <div className={styles.container}>
      {/* Page Title & Subtitle */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-gamepad" style={{ marginRight: "6px" }}></i>
          {language === "tr" ? "Eğitsel Oyun & Araştırma Vaka Çalışması" : "Educational Game & Research Case Study"}
        </span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </header>

      {/* SECTION 1: OVERVIEW */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.overviewTitle || "1. Overview"}</h2>
        <p className={styles.bodyText}>{data.overviewSummary}</p>

        {/* 2-3 Screenshot Grid (Placeholders) */}
        <h3 style={{ fontSize: "1.1rem", fontFamily: "'Lora', serif", marginTop: "25px", marginBottom: "15px", color: "var(--text-color)" }}>
          {data.screenshotsTitle || (language === "tr" ? "Oyun İçi Ekran Görüntüleri" : "In-Game Screenshots")}
        </h3>
        <div className={styles.overviewGrid}>
          <div className={styles.mediaPlaceholder}>
            <i className={`fas fa-gamepad ${styles.mediaIcon}`}></i>
            <div>
              <strong>{language === "tr" ? "Ekran Görüntüsü #1" : "Screenshot #1"}</strong>
              <div style={{ fontSize: "0.82rem", marginTop: "4px" }}>
                {language === "tr" ? "Çaprazlama Arayüzü" : "Crossbreeding UI"}
              </div>
            </div>
          </div>

          <div className={styles.mediaPlaceholder}>
            <i className={`fas fa-dna ${styles.mediaIcon}`}></i>
            <div>
              <strong>{language === "tr" ? "Ekran Görüntüsü #2" : "Screenshot #2"}</strong>
              <div style={{ fontSize: "0.82rem", marginTop: "4px" }}>
                {language === "tr" ? "Genotip & Fenotip Minigame" : "Genotype & Phenotype Minigame"}
              </div>
            </div>
          </div>

          <div className={styles.mediaPlaceholder}>
            <i className={`fas fa-trophy ${styles.mediaIcon}`}></i>
            <div>
              <strong>{language === "tr" ? "Ekran Görüntüsü #3" : "Screenshot #3"}</strong>
              <div style={{ fontSize: "0.82rem", marginTop: "4px" }}>
                {language === "tr" ? "Öğrenme Kazanımı Geri Bildirimi" : "Learning Outcome Feedback"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PLAY THE GAME */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.playTitle || "2. Play the Game"}</h2>
        <p className={styles.bodyText}>
          {language === "tr"
            ? "Oyun doğrudan tarayıcınızda çalışır. Aşağıdaki Unity WebGL penceresini kullanarak oynamaya başlayabilirsiniz."
            : "Play the game directly in your browser using the interactive Unity WebGL player below."}
        </p>

        {/* Responsive 16:9 Unity WebGL Iframe Player */}
        <div className={styles.webglWrapper}>
          {isLoadingGame && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <span>{data.loadingGame || "Loading game..."}</span>
            </div>
          )}
          <iframe
            src={gameBuildUrl}
            title="Gen Çiftliği Unity WebGL Game"
            className={styles.webglIframe}
            onLoad={() => setIsLoadingGame(false)}
            allowFullScreen
          />
        </div>

        {/* Desktop Note & Windows Download Button */}
        <div className={styles.playFooter}>
          <div className={styles.playNoteText}>
            <i className="fas fa-desktop" style={{ color: "var(--main-color)" }}></i>
            <span>{data.playNote || "Best experienced on desktop. Windows build also available for download."}</span>
          </div>

          <a
            href={windowsDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main"
            style={{ padding: "10px 20px", fontSize: "0.85rem" }}
          >
            <i className="fab fa-windows" style={{ marginRight: "6px" }}></i>
            {data.downloadWindowsBtn || "Download Windows Build"}
          </a>
        </div>
      </section>

      {/* SECTION 3: READ THE RESEARCH */}
      <section className={styles.sectionCard}>
        <div className={styles.pdfHeader}>
          <h2 className={styles.sectionHeading} style={{ margin: 0 }}>
            {data.researchTitle || "3. Read the Research"}
          </h2>

          <a
            href={pdfPaperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main"
            style={{ padding: "10px 22px", fontSize: "0.85rem" }}
          >
            <i className="fas fa-file-pdf" style={{ marginRight: "6px" }}></i>
            {data.downloadPdfBtn || "Download PDF"}
          </a>
        </div>

        <p className={styles.bodyText}>
          {language === "tr"
            ? "Gen Çiftliği eğitsel oyununun 8. sınıf genetik öğretimindeki etkisini ve SPSS nicel istatistiksel analiz yöntemlerini inceleyen akademik araştırma makalesi aşağıda gömülü olarak sunulmuştur."
            : "The full academic research paper evaluating the instructional impact of Gen Çiftliği and its SPSS quantitative statistical methodology is embedded below."}
        </p>

        {/* PDF Viewer Embed */}
        <div className={styles.pdfViewerWrapper}>
          <iframe
            src={`${pdfPaperUrl}#view=FitH`}
            title="Gen Çiftliği Research Paper PDF"
            className={styles.pdfIframe}
          />
        </div>

        {/* Mandatory Simulated Dataset Disclaimer */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: "8px" }}></i>
            {data.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
