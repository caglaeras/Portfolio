"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GenCiftligi.module.css";

export default function GenCiftligiPage() {
  const { content, language } = useLanguage();
  const data = content.genCiftligi;
  const [isLoadingGame, setIsLoadingGame] = useState(true);

  if (!data) return null;

  /*
   * WebGL build'i public/games/gen-ciftligi/ altinda. Bu deger null yapilirsa
   * oyun penceresi yerine Windows indirme paneli gosterilir.
   */
  const gameBuildUrl: string | null = "/Portfolio/games/gen-ciftligi/index.html";
  const pdfPaperUrl = "/Portfolio/papers/Cagla_Eraslan_FinalReport.pdf";
  const windowsDownloadUrl = "/Portfolio/downloads/GenCiftligi_Windows.zip";

  const screenshots = [
    { src: "/Portfolio/images/genciftligi-genotype-phenotype.webp", caption: data.shotGenotype },
    { src: "/Portfolio/images/genciftligi-crossbreeding.webp", caption: data.shotCrossbreeding },
    { src: "/Portfolio/images/genciftligi-dna-pairing.webp", caption: data.shotDnaPairing },
  ];

  return (
    <div className={styles.container}>
      {/* Page Title & Subtitle */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-gamepad" style={{ marginRight: "6px" }}></i>
          {language === "tr" ? "Eğitsel Oyun & Araştırma Vaka Çalışması" : "Educational Game & Research Case Study"}
        </span>
        {/* Layout zaten bir h1 bastigi icin sayfa basligi h2. */}
        <h2 className={styles.title}>{data.title}</h2>
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
          {screenshots.map((shot) => (
            <a
              key={shot.src}
              href={shot.src}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shot}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                className={styles.shotImg}
              />
              <span className={styles.shotCaption}>{shot.caption}</span>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 2: PLAY THE GAME */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.playTitle || "2. Play the Game"}</h2>
        <p className={styles.bodyText}>
          {gameBuildUrl
            ? language === "tr"
              ? "Oyun doğrudan tarayıcınızda çalışır. Aşağıdaki Unity WebGL penceresini kullanarak oynamaya başlayabilirsiniz."
              : "Play the game directly in your browser using the interactive Unity WebGL player below."
            : data.playIntroDownload}
        </p>

        {gameBuildUrl ? (
          /* Responsive 16:9 Unity WebGL Iframe Player */
          <div className={styles.webglWrapper}>
            {isLoadingGame && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
                <span>{data.loadingGame || "Loading game..."}</span>
              </div>
            )}
            <iframe
              src={gameBuildUrl}
              title={data.gameFrameTitle}
              className={styles.webglIframe}
              onLoad={() => setIsLoadingGame(false)}
              allowFullScreen
            />
          </div>
        ) : (
          <div className={styles.buildPanel}>
            <i className={`fab fa-windows ${styles.buildIcon}`}></i>
            <strong className={styles.buildTitle}>{data.buildPanelTitle}</strong>
            <p className={styles.buildText}>{data.buildPanelText}</p>
            <a
              href={windowsDownloadUrl}
              className="btn-main"
              style={{ padding: "12px 26px", fontSize: "0.85rem" }}
            >
              <i className="fas fa-download" style={{ marginRight: "8px" }}></i>
              {data.downloadWindowsBtn}
            </a>
            <span className={styles.buildMeta}>{data.buildPanelMeta}</span>
          </div>
        )}

        {/* Masaustu notu ve indirme butonu: yalnizca oynatici varken, cunku
            oynatici yokken ayni buton zaten panelin icinde duruyor. */}
        {gameBuildUrl && (
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
        )}
      </section>

      {/* SECTION 3: READ THE RESEARCH */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>
          {data.researchTitle || "3. Read the Research"}
        </h2>

        {/* Verinin nasil elde edildigi, rapora gitmeden once okunmali; bu
            yuzden baslikla indirme baglantisinin arasinda duruyor. */}
        <div className={styles.dataNote}>
          <i className={`fas fa-circle-info ${styles.dataNoteIcon}`} aria-hidden="true"></i>
          <p className={styles.dataNoteText}>{data.dataNote}</p>
        </div>

        <a
          href={pdfPaperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-main ${styles.pdfBtn}`}
        >
          <i className="fas fa-file-pdf" style={{ marginRight: "6px" }}></i>
          {data.downloadPdfBtn || "Download PDF"}
        </a>

        <p className={styles.bodyText}>
          {language === "tr"
            ? "Gen Çiftliği eğitsel oyununun 8. sınıf genetik öğretimindeki etkisini ve SPSS nicel istatistiksel analiz yöntemlerini inceleyen akademik araştırma makalesi aşağıda gömülü olarak sunulmuştur."
            : "The full academic research paper evaluating the instructional impact of Gen Çiftliği and its SPSS quantitative statistical methodology is embedded below."}
        </p>

        {/* PDF Viewer Embed */}
        <div className={styles.pdfViewerWrapper}>
          <iframe
            src={`${pdfPaperUrl}#view=FitH`}
            title={data.paperFrameTitle}
            className={styles.pdfIframe}
          />
        </div>
      </section>
    </div>
  );
}
