"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../Home.module.css"; 

export default function Projects() {
  const { content, language } = useLanguage();

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.8rem", fontFamily: "Lora, serif", color: "var(--text-color)" }}>
           {content.nav.projects}
        </h1>
        <p style={{ color: "var(--secondary-text)", marginTop: "15px", fontSize: "1.1rem" }}>
           {language === "tr" ? "Lütfen incelemek istediğiniz kategoriye tıklayın." : "Please select a category to explore."}
        </p>
      </div>

      {/* Projects Sub-Navigation Grid */}
      <section className={styles.featuredGrid}>
        
        {/* Unity */}
        <Link href="/unity" className={styles.featureCard}>
          <i className={`fa-brands fa-unity ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>Unity 3D</h3>
          <p className={styles.featureDesc}>
             {language === 'tr' ? "Yaratıcı simülasyon ve mobil 2D/3D oyun projelerim." : "Creative simulation and mobile 2D/3D game projects."}
          </p>
        </Link>
        
        {/* Web */}
        <Link href="/web" className={styles.featureCard}>
          <i className={`fas fa-code ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{language === 'tr' ? "Web Geliştirme" : "Web Development"}</h3>
          <p className={styles.featureDesc}>
             {language === 'tr' ? "Front-end ve back-end web uygulamalarım." : "Front-end and back-end web applications."}
          </p>
        </Link>

        {/* Marketing */}
        <Link href="/marketing" className={styles.featureCard}>
          <i className={`fas fa-pen-nib ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{language === 'tr' ? "Marketing Portfolyo" : "Marketing Portfolio"}</h3>
          <p className={styles.featureDesc}>
             {language === 'tr' ? "Dijital içerik yönetimlerim ve yaratıcı video kurgularım." : "Digital content management and creative video edits."}
          </p>
        </Link>

        {/* Other */}
        <Link href="/other" className={styles.featureCard}>
          <i className={`fas fa-layer-group ${styles.featureIcon}`}></i>
          <h3 className={styles.featureTitle}>{language === 'tr' ? "Diğer Projeler" : "Other Projects"}</h3>
          <p className={styles.featureDesc}>
             {language === 'tr' ? "Çeşitli yazılım ve tasarım projelerim." : "Various software and design projects."}
          </p>
        </Link>

      </section>
    </div>
  );
}
