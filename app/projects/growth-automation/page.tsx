"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GrowthAutomation.module.css";

export default function GrowthAutomationPage() {
  const { content, language } = useLanguage();
  const data = content.growthAutomation;

  if (!data) return null;

  const tr = language === "tr";

  /* n8n icerik hattinin adimlari. */
  const pipeline = [
    { icon: "fa-chart-line", label: data.flow1, sub: data.flow1Sub },
    { icon: "fa-list-check", label: data.flow2, sub: data.flow2Sub },
    { icon: "fa-robot", label: data.flow3, sub: data.flow3Sub },
    { icon: "fa-magnifying-glass-chart", label: data.flow4, sub: data.flow4Sub },
    { icon: "fa-paper-plane", label: data.flow5, sub: data.flow5Sub },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-chart-line" style={{ marginRight: "6px" }}></i>
          {tr ? "Büyüme Pazarlaması ve Otomasyon" : "Growth Marketing and Automation"}
        </span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </header>

      {/* 1. n8n icerik otomasyonu */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.pipelineTitle}</h2>
        <p className={styles.bodyText}>{data.pipelineDesc}</p>

        <div className={styles.flowchartContainer}>
          <div className={styles.flowchartTitle}>
            <i className="fas fa-network-wired" style={{ marginRight: "8px", color: "var(--main-color)" }}></i>
            {data.flowTitle}
          </div>

          <div className={styles.flowchartGrid}>
            {pipeline.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && (
                  <div className={styles.flowArrow}>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
                <div className={styles.flowStep}>
                  <i className={`fas ${step.icon} ${styles.flowIcon}`}></i>
                  <div className={styles.flowLabel}>{`${i + 1}. ${step.label}`}</div>
                  <div className={styles.flowSub}>{step.sub}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <ul className={styles.featureList}>
          <li>{data.pipelinePoint1}</li>
          <li>{data.pipelinePoint2}</li>
          <li>{data.pipelinePoint3}</li>
        </ul>
      </section>

      {/* 2. Video formulu ve otomatik kurgu */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.videoTitle}</h2>
        <p className={styles.bodyText}>{data.videoDesc}</p>

        <ul className={styles.featureList}>
          <li>{data.videoPoint1}</li>
          <li>{data.videoPoint2}</li>
          <li>{data.videoPoint3}</li>
        </ul>
      </section>

      {/* 3. Kanser risk testi */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.testTitle}</h2>
        <p className={styles.bodyText}>{data.testDesc}</p>

        <ul className={styles.featureList}>
          <li>{data.testPoint1}</li>
          <li>{data.testPoint2}</li>
          <li>{data.testPoint3}</li>
        </ul>

        <div className={styles.noteBox}>
          <p>
            <i className="fas fa-scale-balanced" style={{ marginRight: "8px", color: "var(--main-color)" }}></i>
            {data.testNote}
          </p>
        </div>
      </section>

      {/* 4. Kilavuz dogrulamali e-kitaplar */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.ebookTitle}</h2>
        <p className={styles.bodyText}>{data.ebookDesc}</p>

        <div className={styles.guidelineGrid}>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineCode}>NCCN</div>
            <div className={styles.guidelineName}>National Comprehensive Cancer Network</div>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineCode}>ASCO</div>
            <div className={styles.guidelineName}>American Society of Clinical Oncology</div>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineCode}>ESMO</div>
            <div className={styles.guidelineName}>European Society for Medical Oncology</div>
          </div>
        </div>
      </section>

      {/* 5. Icerik ve buyume operasyonu */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.opsTitle}</h2>
        <p className={styles.bodyText}>{data.opsDesc}</p>

        <ul className={styles.featureList}>
          <li>{data.opsPoint1}</li>
          <li>{data.opsPoint2}</li>
          <li>{data.opsPoint3}</li>
          <li>{data.opsPoint4}</li>
        </ul>
      </section>
    </div>
  );
}
