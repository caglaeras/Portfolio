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
  children,
}: {
  num: string;
  title: string;
  lead: string;
  points?: Point[];
  children?: React.ReactNode;
}) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>{num}</span>
        <h2 className={styles.sectionHeading}>{title}</h2>
      </div>

      <p className={styles.bodyText}>{lead}</p>

      {children}

      {points && (
        <div className={styles.pointGrid}>
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
  const { content, language } = useLanguage();
  const data = content.growthAutomation;

  if (!data) return null;

  const tr = language === "tr";

  const pipeline = [
    { icon: "fa-chart-line", label: data.flow1, sub: data.flow1Sub },
    { icon: "fa-list-check", label: data.flow2, sub: data.flow2Sub },
    { icon: "fa-robot", label: data.flow3, sub: data.flow3Sub },
    { icon: "fa-magnifying-glass-chart", label: data.flow4, sub: data.flow4Sub },
    { icon: "fa-paper-plane", label: data.flow5, sub: data.flow5Sub },
  ];

  const chips = [data.chip1, data.chip2, data.chip3, data.chip4, data.chip5, data.chip6];

  return (
    <div className={styles.container}>
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-chart-line" style={{ marginRight: "6px" }}></i>
          {tr ? "Büyüme Pazarlaması ve Otomasyon" : "Growth Marketing and Automation"}
        </span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>

        {/* Bir bakista kapsam: sayfayi okumadan ne oldugunu gosterir. */}
        <ul className={styles.chipRow} aria-label={tr ? "Kapsam" : "Scope"}>
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
            <i className="fas fa-scale-balanced" style={{ marginRight: "8px", color: "var(--main-color)" }}></i>
            {data.testNote}
          </p>
        </div>
      </Section>

      <Section num="04" title={data.ebookTitle} lead={data.ebookDesc}>
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
      </Section>

      <Section
        num="05"
        title={data.opsTitle}
        lead={data.opsDesc}
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
