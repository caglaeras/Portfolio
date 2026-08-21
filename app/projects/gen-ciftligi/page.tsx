"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GenCiftligi.module.css";

export default function GenCiftligiPage() {
  const { content, language } = useLanguage();
  const data = content.genCiftligi;

  if (!data) return null;

  return (
    <div className={styles.container}>
      {/* Case Study Header */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-microscope" style={{ marginRight: "6px" }}></i>
          {language === "tr" ? "EdTech Araştırma Vaka Çalışması" : "EdTech Research Case Study"}
        </span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </header>

      {/* 1. Research Problem & Context */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.problemTitle}</h2>
        <p className={styles.bodyText}>{data.problemDesc}</p>
        <div className={styles.methodGrid}>
          <div className={styles.methodStatCard}>
            <div className={styles.statValue}>8th Grade</div>
            <div className={styles.statLabel}>{language === "tr" ? "MEB Fen Bilimleri Müfredatı" : "MEB National Science Curriculum"}</div>
          </div>
          <div className={styles.methodStatCard}>
            <div className={styles.statValue}>Genetics</div>
            <div className={styles.statLabel}>{language === "tr" ? "DNA, Genotip & Fenotip Kazanımları" : "DNA, Genotype & Phenotype Objectives"}</div>
          </div>
        </div>
      </section>

      {/* 2. Design & Development */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.designTitle}</h2>
        <p className={styles.bodyText}>{data.designDesc}</p>
        
        {/* Screenshot Placeholders */}
        <div className={styles.placeholderGrid}>
          <div className={styles.mediaPlaceholder}>
            <i className={`fas fa-gamepad ${styles.mediaIcon}`}></i>
            <div>
              <strong>{language === "tr" ? "Oyun Ekranı Placeholder #1" : "Game UI Screenshot Placeholder #1"}</strong>
              <div style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                {language === "tr" ? "Kalıtım Çaprazlama Simülasyonu Arayüzü" : "Genetics Crossbreeding Simulation Interface"}
              </div>
            </div>
          </div>
          <div className={styles.mediaPlaceholder}>
            <i className={`fas fa-cubes ${styles.mediaIcon}`}></i>
            <div>
              <strong>{language === "tr" ? "Oyun Ekranı Placeholder #2" : "Game UI Screenshot Placeholder #2"}</strong>
              <div style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                {language === "tr" ? "Unity C# Etkileşimli Minigame Altyapısı" : "Unity C# Interactive Minigame Mechanics"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Methodology & Statistical Evaluation */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.methodTitle}</h2>
        <p className={styles.bodyText}>{data.methodDesc}</p>

        {/* MANDATORY SIMULATED DATASET DISCLAIMER */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: "8px" }}></i>
            {data.disclaimer}
          </p>
        </div>

        <p className={styles.bodyText}>{data.analysisDetails}</p>

        <div className={styles.methodGrid}>
          <div className={styles.methodStatCard}>
            <div className={styles.statValue}>N = 60</div>
            <div className={styles.statLabel}>{language === "tr" ? "Simüle Örneklem (30 Kontrol, 30 Deney)" : "Simulated Sample (30 Control, 30 Experimental)"}</div>
          </div>
          <div className={styles.methodStatCard}>
            <div className={styles.statValue}>SPSS</div>
            <div className={styles.statLabel}>{language === "tr" ? "Shapiro-Wilk, t-test, Spearman" : "Shapiro-Wilk, t-tests, Spearman Correlation"}</div>
          </div>
        </div>
      </section>

      {/* 4. Findings & Evaluation */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.findingsTitle}</h2>
        <p className={styles.bodyText}>{data.findingsDesc}</p>

        {/* Data Table Placeholder */}
        <table className={styles.tablePlaceholder}>
          <thead>
            <tr>
              <th>{language === "tr" ? "Grup" : "Group"}</th>
              <th>{language === "tr" ? "Ön Test Ortalama" : "Pre-Test Mean"}</th>
              <th>{language === "tr" ? "Son Test Ortalama" : "Post-Test Mean"}</th>
              <th>{language === "tr" ? "Anlamlılık (p)" : "Significance (p)"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{language === "tr" ? "Deney Grubu (Gen Çiftliği)" : "Experimental (Gen Çiftliği)"}</strong></td>
              <td>51.4 (± 8.2)</td>
              <td>84.6 (± 6.8)</td>
              <td>p &lt; 0.001</td>
            </tr>
            <tr>
              <td><strong>{language === "tr" ? "Kontrol Grubu (Geleneksel)" : "Control (Traditional)"}</strong></td>
              <td>52.1 (± 7.9)</td>
              <td>63.2 (± 9.1)</td>
              <td>p &lt; 0.05</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 5. Reflection & Next Steps */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.reflectionTitle}</h2>
        <p className={styles.bodyText}>{data.reflectionDesc}</p>
      </section>
    </div>
  );
}
