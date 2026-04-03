"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
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

          <div className={styles.buttons}>
            <a href="/Portfolio/documents/CaglaEraslan_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-main">
              {t.downloadCv}
            </a>
            <Link href="/vizyon" className="btn-main">
              {language === 'tr' ? 'Daha..' : 'More..'}
            </Link>
            <a href="mailto:caglaeraslan@gmail.com" aria-label="Email Me" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--main-color)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)' }}>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image 
            src={`/Portfolio${t.heroImage}`}
            alt="Profile Picture" 
            className={styles.profileImg}
            width={450}
            height={560}
            unoptimized
          />
        </div>
      </section>

      {/* Featured Navigation Grid */}
      <section className={styles.featuredGrid}>
        
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
            {language === 'tr' ? "Unity 3D, Web Geliştirme, Marketing ve diğer projelerim." : "My Unity 3D, Web Development, Marketing, and other projects."}
          </p>
        </Link>

      </section>

    </div>
  );
}
