"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../GridPage.module.css"; 

export default function Projects() {
  const { content } = useLanguage();

  return (
    <div className={styles.container}>
      
      {/* Unity 3D Section */}
      <div className={styles.header} style={{ marginTop: 0 }}>
        <h1 className={styles.title}>{content.unity.title}</h1>
        <p className={styles.lead}>{content.unity.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.unity.projects.map((project: any, idx: number) => (
          <ProjectCard key={`unity-${idx}`} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>

      <hr style={{ margin: "80px 0", border: 0, borderTop: "1px solid var(--card-border)" }} />

      {/* Web Development Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>{content.web.title}</h1>
        <p className={styles.lead}>{content.web.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.web.projects.map((project: any, idx: number) => (
          <ProjectCard key={`web-${idx}`} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>

      <hr style={{ margin: "80px 0", border: 0, borderTop: "1px solid var(--card-border)" }} />

      {/* Other Projects Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>{content.other.title}</h1>
        <p className={styles.lead}>{content.other.lead}</p>
      </div>
      <div className={styles.grid}>
        {content.other.projects.map((project: any, idx: number) => (
          <ProjectCard key={`other-${idx}`} title={project.title} description={project.desc} videoId={project.videoId} image={project.image} />
        ))}
      </div>

      <hr style={{ margin: "80px 0", border: 0, borderTop: "1px solid var(--card-border)" }} />

      {/* Marketing Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>{content.marketing.title}</h1>
        <p className={styles.lead}>{content.marketing.lead}</p>
      </div>
      
      {/* Marketing Videos */}
      <h3 style={{ marginBottom: "30px", fontSize: "1.5rem", fontFamily: "Lora, serif" }}>
        {content.nav.projects === "Projects" ? "Video Content" : "Video İçerikleri"}
      </h3>
      <div className={styles.grid} style={{ marginBottom: "60px" }}>
        {content.marketing.videos?.map((vid: any, idx: number) => (
          <ProjectCard key={`mvid-${idx}`} title={vid.title} description={vid.desc} videoId={vid.videoId} />
        ))}
      </div>

      {/* Marketing Images */}
      <h3 style={{ marginBottom: "30px", fontSize: "1.5rem", fontFamily: "Lora, serif" }}>
        {content.nav.projects === "Projects" ? "Visual Design" : "Görsel Tasarım"}
      </h3>
      <div className={styles.grid}>
        {content.marketing.images?.map((img: any, idx: number) => (
          <ProjectCard key={`mimg-${idx}`} title={img.title} description={img.desc} image={img.image} />
        ))}
      </div>

    </div>
  );
}
