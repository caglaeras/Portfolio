"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GrowthAutomation.module.css";

interface Point {
  label: string;
  text: string;
}

/** Numarali baslik, kisa giris ve etiketli kartlardan olusan bolum. */
function Section({
  num,
  title,
  lead,
  points,
  cols = 3,
  children,
}: {
  num: string;
  title: string;
  lead: string;
  points?: Point[];
  /** Uc maddeli bolumler ucer, dort maddeli bolum ikiser dizilir. */
  cols?: 2 | 3;
  children?: React.ReactNode;
}) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>{num}</span>
        <h3 className={styles.sectionHeading}>{title}</h3>
      </div>

      <p className={styles.bodyText}>{lead}</p>

      {children}

      {points && (
        <div className={`${styles.pointGrid} ${cols === 2 ? styles.cols2 : styles.cols3}`}>
          {points.map((p) => (
            <div key={p.label} className={styles.pointCard}>
              <span className={styles.pointLabel}>{p.label}</span>
              <p className={styles.pointText}>{p.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function GrowthAutomationPage() {
  const { content } = useLanguage();
  const data = content.growthAutomation;

  if (!data) return null;

  const pipeline = [
    { icon: "fa-chart-line", label: data.flow1, sub: data.flow1Sub },
    { icon: "fa-list-check", label: data.flow2, sub: data.flow2Sub },
    { icon: "fa-robot", label: data.flow3, sub: data.flow3Sub },
    { icon: "fa-magnifying-glass-chart", label: data.flow4, sub: data.flow4Sub },
    { icon: "fa-paper-plane", label: data.flow5, sub: data.flow5Sub },
  ];

  const chips = [data.chip1, data.chip2, data.chip3, data.chip4, data.chip5, data.chip6];

  const guidelines = [
    { code: "NCCN", name: "National Comprehensive Cancer Network" },
    { code: "ASCO", name: "American Society of Clinical Oncology" },
    { code: "ESMO", name: "European Society for Medical Oncology" },
  ];

  return (
    <div className={styles.container}>
      {/* Baslik blogu Gen Ciftligi sayfasiyla ayni kalipta. */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-chart-line" style={{ marginRight: "6px" }} aria-hidden="true"></i>
          {data.badge}
        </span>
        {/* Gorunum Gen Ciftligi ile ayni; layout zaten bir h1 bastigi icin
            burada h2 kullaniliyor. */}
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <ul className={styles.chipRow}>
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </header>

      <Section
        num="01"
        title={data.pipelineTitle}
        lead={data.pipelineDesc}
        points={[
          { label: data.p1Label, text: data.p1Text },
          { label: data.p2Label, text: data.p2Text },
          { label: data.p3Label, text: data.p3Text },
        ]}
      >
        <div className={styles.flowchart}>
          <div className={styles.flowchartTitle}>{data.flowTitle}</div>
          <div className={styles.flowchartGrid}>
            {pipeline.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && (
                  <div className={styles.flowArrow}>
                    <i className="fas fa-chevron-right" aria-hidden="true"></i>
                  </div>
                )}
                <div className={styles.flowStep}>
                  <i className={`fas ${step.icon} ${styles.flowIcon}`} aria-hidden="true"></i>
                  <div className={styles.flowLabel}>{step.label}</div>
                  <div className={styles.flowSub}>{step.sub}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      <Section
        num="02"
        title={data.videoTitle}
        lead={data.videoDesc}
        points={[
          { label: data.v1Label, text: data.v1Text },
          { label: data.v2Label, text: data.v2Text },
          { label: data.v3Label, text: data.v3Text },
        ]}
      />

      <Section
        num="03"
        title={data.testTitle}
        lead={data.testDesc}
        points={[
          { label: data.t1Label, text: data.t1Text },
          { label: data.t2Label, text: data.t2Text },
          { label: data.t3Label, text: data.t3Text },
        ]}
      >
        <div className={styles.noteBox}>
          <p>
            <i className="fas fa-scale-balanced" style={{ marginRight: "8px", color: "var(--main-color)" }} aria-hidden="true"></i>
            {data.testNote}
          </p>
        </div>
      </Section>

      <Section num="04" title={data.ebookTitle} lead={data.ebookDesc}>
        <div className={styles.guidelineGrid}>
          {guidelines.map((g) => (
            <div key={g.code} className={styles.guidelineCard}>
              <span className={styles.guidelineCode}>{g.code}</span>
              <span className={styles.guidelineName}>{g.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="05"
        title={data.opsTitle}
        lead={data.opsDesc}
        cols={2}
        points={[
          { label: data.o1Label, text: data.o1Text },
          { label: data.o2Label, text: data.o2Text },
          { label: data.o3Label, text: data.o3Text },
          { label: data.o4Label, text: data.o4Text },
        ]}
      />
    </div>
  );
}
