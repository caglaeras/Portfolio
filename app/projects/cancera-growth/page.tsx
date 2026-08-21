"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./CanceraGrowth.module.css";

export default function CanceraGrowthPage() {
  const { content, language } = useLanguage();
  const data = content.canceraGrowth;

  if (!data) return null;

  return (
    <div className={styles.container}>
      {/* Case Study Header */}
      <header className={styles.headerCard}>
        <span className={styles.badge}>
          <i className="fas fa-chart-line" style={{ marginRight: "6px" }}></i>
          {language === "tr" ? "Büyüme Pazarlaması Vaka Çalışması" : "Growth Marketing Case Study"}
        </span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </header>

      {/* 1. LLM-Assisted Content Pipeline with n8n */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.pipelineTitle}</h2>
        <p className={styles.bodyText}>{data.pipelineDesc}</p>

        {/* Pure CSS Flowchart Component */}
        <div className={styles.flowchartContainer}>
          <div className={styles.flowchartTitle}>
            <i className="fas fa-network-wired" style={{ marginRight: "8px", color: "var(--main-color)" }}></i>
            {language === "tr" ? "n8n + LLM Otomatik İçerik Boru Hattı Akışı" : "n8n + LLM Automated Content Pipeline Flow"}
          </div>

          <div className={styles.flowchartGrid}>
            <div className={styles.flowStep}>
              <i className={`fas fa-search ${styles.flowIcon}`}></i>
              <div className={styles.flowLabel}>{language === "tr" ? "1. Konu Keşfi" : "1. Topic Discovery"}</div>
              <div className={styles.flowSub}>{language === "tr" ? "SEO & Trend Analizi" : "SEO & Keyword Targeting"}</div>
            </div>

            <div className={styles.flowArrow}>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className={styles.flowStep}>
              <i className={`fas fa-robot ${styles.flowIcon}`}></i>
              <div className={styles.flowLabel}>{language === "tr" ? "2. LLM Taslak" : "2. LLM Drafting"}</div>
              <div className={styles.flowSub}>{language === "tr" ? "İstem Mühendisliği" : "Prompt Engineering"}</div>
            </div>

            <div className={styles.flowArrow}>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className={styles.flowStep}>
              <i className={`fas fa-user-md ${styles.flowIcon}`}></i>
              <div className={styles.flowLabel}>{language === "tr" ? "3. Kılavuz Kontrol" : "3. Guideline Check"}</div>
              <div className={styles.flowSub}>{language === "tr" ? "NCCN / ASCO / ESMO" : "NCCN / ASCO / ESMO"}</div>
            </div>

            <div className={styles.flowArrow}>
              <i className="fas fa-chevron-right"></i>
            </div>

            <div className={styles.flowStep}>
              <i className={`fas fa-paper-plane ${styles.flowIcon}`}></i>
              <div className={styles.flowLabel}>{language === "tr" ? "4. Notion Yayın" : "4. Notion Auto-Publish"}</div>
              <div className={styles.flowSub}>{language === "tr" ? "Sosyal Dağıtım" : "Multi-channel Distribution"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Guideline-Verified Oncology Nutrition E-Books */}
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

      {/* 3. Growth Performance & Metrics */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionHeading}>{data.metricsTitle}</h2>
        <p className={styles.bodyText}>{data.metricsDesc}</p>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>+2.4x</div>
            <div className={styles.metricLabel}>{language === "tr" ? "CTR Artış Oranı" : "Organic CTR Lift Ratio"}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>-35%</div>
            <div className={styles.metricLabel}>{language === "tr" ? "CPL İyileştirme" : "CPL Optimization Ratio"}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>5x</div>
            <div className={styles.metricLabel}>{language === "tr" ? "İçerik Üretim Hızı" : "Content Production Velocity"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
