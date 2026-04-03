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
            {language === 'tr' ? "Merhaba," : "Hello,"} <br/>
            <strong>{t.greeting.split("Ben ")[1] || "Çağla Eraslan."}</strong>
          </h1>
          
          <p className={styles.bio}>{t.bio}</p>

          <div className={styles.buttons}>
            <a href="/Portfolio/documents/CaglaEraslanCV.pdf" target="_blank" rel="noopener noreferrer" className="btn-main">
              {t.downloadCv}
            </a>
            <a href="mailto:caglaeraslan@gmail.com" className="btn-main">
              {t.letsMeet}
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
          <h3 className={styles.featureTitle}>{content.nav.vizyon}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Akademik vizyonum, öğrenim geçmişim ve eğitim teknolojilerine olan tutkum." : "My academic vision, learning background, and passion for educational technologies."}
          </p>
        </Link>
        
        {/* Unity Feature */}
        <Link href="/unity" className={styles.featureCard}>
          <i className={`fa-brands fa-unity ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>Unity 3D</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Oyun motoru üzerinde geliştirdiğim yaratıcı simülasyon ve mobil 2D/3D oyun projelerim." : "Creative simulation and mobile 2D/3D game projects I developed on the Unity engine."}
          </p>
        </Link>

        {/* Marketing Feature */}
        <Link href="/marketing" className={styles.featureCard}>
          <i className={`fas fa-pen-nib ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{content.nav.marketing}</h3>
          <p className={styles.featureDesc}>
            {language === 'tr' ? "Modern pazarlama stratejilerim, dijital içerik yönetimlerim ve yaratıcı video kurgularım." : "My modern marketing strategies, digital content management, and creative video edits."}
          </p>
        </Link>

      </section>

    </div>
  );
}
