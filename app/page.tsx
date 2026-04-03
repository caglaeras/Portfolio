"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Home.module.css";

export default function Home() {
  const { content } = useLanguage();
  const t = content.home;

  return (
    <div className={styles.container}>
      <div className={`card-glass ${styles.heroCard}`}>
        <div className={styles.imageContainer}>
          <img 
            src={t.heroImage} 
            alt="Çağla Eraslan Profil Fotoğrafı" 
            className={styles.profileImg} 
          />
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.greeting}>{t.greeting}</h1>
          <p className={styles.bio}>{t.bio}</p>
          
          <a href="/documents/MyCV.pdf" target="_blank" className="btn-main mt-4">
            <i className="fas fa-download"></i> {t.downloadCv}
          </a>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h2 className="section-title text-center" style={{margin: '0 auto 30px'}}>{t.letsMeet}</h2>
        <Link href="/vizyon" className={styles.btnAbout}>
          <i className="fas fa-graduation-cap"></i> {t.aboutMe}
        </Link>
      </div>
    </div>
  );
}
