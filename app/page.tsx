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
          <h1 className={styles.title}>{t.name}</h1>
          <p className={styles.tagline}>{t.tagline}</p>

          <p className={styles.bio}>{t.bio}</p>

          {/* Action CTAs */}
          <div className={styles.buttons}>
            <Link href="/projects/gen-ciftligi" className="btn-main">
              {t.tryGameBtn}
            </Link>
            <Link href="/projects/growth-automation" className="btn-main">
              {t.growthWorkBtn}
            </Link>
            <a
              href="/Portfolio/documents/CaglaEraslan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main"
            >
              {t.downloadCv}
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
            {language === 'tr' ? "CET programında aldığım temel dersler ve kazandığım yetkinlikler." : "Key courses taken and competencies gained in the CET program."}
          </p>
        </Link>

        {/* Projects Feature */}
        <Link href="/projects" className={styles.featureCard}>
          <i className={`fas fa-laptop-code ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{content.nav.projects}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Gen Çiftliği, Büyüme Pazarlaması, Unity 3D ve Web projelerim." : "Gen Çiftliği, Growth Case Studies, Unity 3D, and Web projects."}
          </p>
        </Link>

      </section>

    </div>
  );
}

