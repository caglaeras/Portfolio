"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../../GridPage.module.css"; 

export default function Web() {
  const { content } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{content.web.title}</h1>
        <p className={styles.lead}>{content.web.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.web.projects.map((project: Record<string, any>, idx: number) => (
          <ProjectCard key={idx} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>
    </div>
  );
}
