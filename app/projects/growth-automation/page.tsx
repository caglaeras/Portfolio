"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./GrowthAutomation.module.css";

interface Point {
  label: string;
  text: string;
}

/** Numarali baslik, kisa giris ve istege bagli etiketli kartlardan olusan bolum. */
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
  lead?: string;
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

      {lead && <p className={styles.bodyText}>{lead}</p>}

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

  /*
   * Akisin son iki adimindan onceki hicbir taslak yayinlanabilir sayilmiyor,
   * o yuzden bu iki kutu digerlerinden ayri isaretleniyor (gate: true).
   */
  const pipeline = [
    { icon: "fa-magnifying-glass", label: data.flow1, sub: data.flow1Sub, gate: false },
    { icon: "fa-pen-nib", label: data.flow2, sub: data.flow2Sub, gate: false },
    { icon: "fa-list-check", label: data.flow3, sub: data.flow3Sub, gate: false },
    { icon: "fa-book-medical", label: data.flow4, sub: data.flow4Sub, gate: true },
    { icon: "fa-user-doctor", label: data.flow5, sub: data.flow5Sub, gate: true },
    { icon: "fa-paper-plane", label: data.flow6, sub: data.flow6Sub, gate: false },
  ];

  const chips = [data.chip1, data.chip2, data.chip3, data.chip4, data.chip5, data.chip6];

  const guidelines = [
    { code: "NCCN", name: "National Comprehensive Cancer Network" },
    { code: "ASCO", name: "American Society of Clinical Oncology" },
    { code: "ESMO", name: "European Society for Medical Oncology" },
  ];

  const metrics = [
    { label: data.m1Label, value: data.m1Value },
    { label: data.m2Label, value: data.m2Value },
    { label: data.m3Label, value: data.m3Value },
  ];

  const slots = [data.slot1, data.slot2, data.slot3, data.slot4, data.slot5, data.slot6, data.slot7];

  return (
    <div className={styles.container}>
      {/* Baslik blogu diger proje sekmeleriyle ayni kalipta. Layout zaten bir
          h1 bastigi icin buradaki baslik h2. */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-diagram-project" style={{ marginRight: "6px" }} aria-hidden="true"></i>
          {data.badge}
        </span>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.introText}>{data.intro}</p>
        <ul className={styles.chipRow}>
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </header>

      <Section num="01" title={data.pipelineTitle} lead={data.pipelineDesc}>
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
                <div className={`${styles.flowStep} ${step.gate ? styles.flowGate : ""}`}>
                  {step.gate && <span className={styles.gateTag}>{data.gateLabel}</span>}
                  <i className={`fas ${step.icon} ${styles.flowIcon}`} aria-hidden="true"></i>
                  <div className={styles.flowLabel}>{step.label}</div>
                  <div className={styles.flowSub}>{step.sub}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.noteBox}>
          <p>
            <i
              className="fas fa-shield-halved"
              style={{ marginRight: "8px", color: "var(--main-color)" }}
              aria-hidden="true"
            ></i>
            {data.gateNote}
          </p>
        </div>

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
        num="02"
        title={data.decisionsTitle}
        lead={data.decisionsDesc}
        cols={2}
        points={[
          { label: data.d1Label, text: data.d1Text },
          { label: data.d2Label, text: data.d2Text },
          { label: data.d3Label, text: data.d3Text },
          { label: data.d4Label, text: data.d4Text },
        ]}
      />

      <Section num="03" title={data.limitsTitle} lead={data.limitsText} />

      <Section num="04" title={data.resultsTitle} lead={data.resultsDesc}>
        {/* Degerler henuz olculmedi; yer tutucular kasitli olarak gorunur
            birakildi ki doldurulmadiklari anlasilsin. */}
        <div className={styles.metricGrid}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricValue}>{m.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num="05" title={data.videoTitle} lead={data.videoDesc}>
        <div className={styles.slotStrip}>
          {slots.map((slot, i) => (
            <React.Fragment key={slot}>
              {i > 0 && (
                <span className={styles.slotArrow} aria-hidden="true">
                  <i className="fas fa-chevron-right"></i>
                </span>
              )}
              <span className={styles.slotCard}>
                <span className={styles.slotNum}>{i + 1}</span>
                {slot}
              </span>
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section
        num="06"
        title={data.alsoTitle}
        lead={data.alsoDesc}
        cols={2}
        points={[
          { label: data.a1Label, text: data.a1Text },
          { label: data.a2Label, text: data.a2Text },
        ]}
      >
        <div className={styles.noteBox}>
          <p>
            <i
              className="fas fa-scale-balanced"
              style={{ marginRight: "8px", color: "var(--main-color)" }}
              aria-hidden="true"
            ></i>
            {data.alsoNote}
          </p>
        </div>
      </Section>

      <Section
        num="07"
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
