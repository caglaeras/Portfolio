"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../../GridPage.module.css"; 

export default function Unity() {
  const { content } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title} style={{ fontSize: "2.2rem" }}>{content.unity.title}</h2>
        <p className={styles.lead}>{content.unity.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.unity.projects.map((project: Record<string, any>, idx: number) => (
          <ProjectCard key={idx} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>
    </div>
  );
}
