"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Skills.module.css";

const categoryIcons: Record<string, string> = {
  programming: "fas fa-code",
  edtech: "fas fa-brain",
  marketing: "fas fa-chart-line",
  design: "fas fa-palette",
};

const Skills = () => {
  const { content } = useLanguage();
  const skillsData = content.home.skills;

  if (!skillsData) return null;

  const categories = [
    { key: "programming", data: skillsData.programming },
    { key: "edtech", data: skillsData.edtech },
    { key: "marketing", data: skillsData.marketing },
    { key: "design", data: skillsData.design },
  ];

  return (
    <section className={styles.skillsSection}>
      <h2 className={styles.skillsTitle}>{skillsData.title}</h2>
      <div className={styles.grid}>
        {categories.map(({ key, data }) => (
          <div key={key} className={styles.card}>
            <div className={styles.categoryHeader}>
              <i className={`${categoryIcons[key]} ${styles.icon}`}></i>
              <h3 className={styles.categoryTitle}>{data.title}</h3>
            </div>
            <ul className={styles.skillList}>
              {data.items.map((item, idx) => (
                <li key={idx} className={styles.skillItem}>
                  <span className={styles.bullet}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
