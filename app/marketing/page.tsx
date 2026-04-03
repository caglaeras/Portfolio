"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import styles from "../GridPage.module.css";

export default function Marketing() {
  const { content } = useLanguage();
  const t = content.marketing;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <div style={{ marginBottom: "60px" }}>
        <h2 className="section-title text-center" style={{ margin: "0 auto 40px" }}>Videolar / Videos</h2>
        <div className={styles.grid}>
          {t.videos.map((project, idx) => (
            <ProjectCard 
              key={`video-${idx}`}
              title={project.title}
              description={project.desc}
              videoId={project.videoId}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title text-center" style={{ margin: "0 auto 40px" }}>Görseller / Images</h2>
        <div className={styles.grid}>
          {t.images.map((project, idx) => (
            <ProjectCard 
              key={`image-${idx}`}
              title={project.title}
              description={project.desc}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
