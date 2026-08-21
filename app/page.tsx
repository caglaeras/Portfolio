"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Skills from "@/components/Skills";
import styles from "./Home.module.css";

export default function Home() {
  const { content, language } = useLanguage();
  const t = content.home;

  return (
    <div className={styles.container}>
      
      {/* Editorial Asymmetrical Hero */}
      <section className={styles.heroSection}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            {t.greeting1} <br/>
            <strong>{t.greeting2}</strong>
          </h1>
          
          <p className={styles.bio}>{t.bio}</p>

          {/* Credibility Signals Badges */}
          {t.credibility && (
            <div className={styles.credibilityList}>
              {t.credibility.map((item, idx) => (
                <div key={idx} className={styles.credibilityBadge}>
                  <i className={`fas ${idx === 0 ? "fa-trophy" : idx === 1 ? "fa-award" : "fa-chalkboard-teacher"} ${styles.credibilityIcon}`}></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className={styles.buttons}>
            <Link href="/projects/gen-ciftligi" className="btn-main">
              <i className="fas fa-microscope" style={{ marginRight: "6px" }}></i>
              {t.seeResearchBtn || "See My Research"}
            </Link>
            <Link href="/projects/cancera-growth" className="btn-main">
              <i className="fas fa-chart-line" style={{ marginRight: "6px" }}></i>
              {t.marketingCasesBtn || "Marketing Case Studies"}
            </Link>
            <a href="/Portfolio/documents/CaglaEraslan_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-main">
              {t.downloadCv}
            </a>
            <a href="mailto:caglaeraslan@gmail.com" aria-label="Email Çağla Eraslan" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--main-color)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)' }}>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image 
            src={`/Portfolio${t.heroImage}`}
            alt="Çağla Eraslan Profile Picture" 
            className={styles.profileImg}
            width={450}
            height={560}
            unoptimized
          />
        </div>
      </section>

      {/* Categorized Skills Section */}
      <Skills />

      {/* Featured Navigation Grid */}
      <section className={styles.featuredGrid} style={{ marginTop: "60px" }}>
        
        {/* Vision Feature */}
        <Link href="/vizyon" className={styles.featureCard}>
          <i className={`fas fa-leaf ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{content.nav.vision}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Eğitim vizyonum ve dijital çözümler tasarlama amacım." : "My educational vision and goal to design digital solutions."}
          </p>
        </Link>
        
        {/* Education Feature */}
        <Link href="/education" className={styles.featureCard}>
          <i className={`fas fa-graduation-cap ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{content.nav.education}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "BÖTE programında aldığım temel dersler ve kazandığım yetkinlikler." : "Key courses taken and competencies gained in the CEIT program."}
          </p>
        </Link>

        {/* Projects Feature */}
        <Link href="/projects" className={styles.featureCard}>
          <i className={`fas fa-laptop-code ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{content.nav.projects}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Gen Çiftliği, Cancera Growth, Unity 3D ve Web projelerim." : "Gen Çiftliği, Cancera Growth, Unity 3D, and Web projects."}
          </p>
        </Link>

      </section>

    </div>
  );
}

