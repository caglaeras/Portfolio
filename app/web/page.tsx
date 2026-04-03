"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import styles from "../GridPage.module.css";

export default function Web() {
  const { content } = useLanguage();
  const t = content.web;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <div className={styles.grid}>
        {t.projects.map((project, idx) => (
          <ProjectCard 
            key={idx}
            title={project.title}
            description={project.desc}
            videoId={project.videoId}
          />
        ))}
      </div>
    </div>
  );
}
