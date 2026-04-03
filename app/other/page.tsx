"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../GridPage.module.css"; 

export default function Other() {
  const { content } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{content.other.title}</h1>
        <p className={styles.lead}>{content.other.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.other.projects.map((project: Record<string, any>, idx: number) => (
          <ProjectCard key={idx} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>
    </div>
  );
}
