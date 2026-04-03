"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../../GridPage.module.css"; 

export default function Marketing() {
  const { content, language } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{content.marketing.title}</h1>
        <p className={styles.lead}>{content.marketing.lead}</p>
      </div>
      
      <h3 style={{ marginBottom: "30px", fontSize: "1.5rem", fontFamily: "Lora, serif", color: "var(--text-color)" }}>
        {language === "en" ? "Video Content" : "Video İçerikleri"}
      </h3>
      <div className={styles.grid} style={{ marginBottom: "60px" }}>
        {content.marketing.videos?.map((vid: Record<string, any>, idx: number) => (
          <ProjectCard key={idx} title={vid.title} description={vid.desc} videoId={vid.videoId} />
        ))}
      </div>

      <h3 style={{ marginBottom: "30px", fontSize: "1.5rem", fontFamily: "Lora, serif", color: "var(--text-color)" }}>
        {language === "en" ? "Visual Design" : "Görsel Tasarım"}
      </h3>
      <div className={styles.grid}>
        {content.marketing.images?.map((img: Record<string, any>, idx: number) => (
          <ProjectCard key={idx} title={img.title} description={img.desc} image={img.image} />
        ))}
      </div>

    </div>
  );
}
