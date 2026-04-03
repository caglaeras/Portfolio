"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../vizyon/Vizyon.module.css"; 

export default function Education() {
  const { content } = useLanguage();
  const t = content.vizyon;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{content.nav.education}</h1>

      <div className={`card-glass ${styles.section}`}>
        {t.educationIntro && <p className={styles.lead} style={{ marginBottom: "30px" }}>{t.educationIntro}</p>}
        {t.educationTargetTitle && <h2 className="section-title" style={{ marginTop: "20px" }}>{t.educationTargetTitle}</h2>}
        {t.educationTargetDesc && <p className={styles.text} style={{ marginBottom: "50px" }}>{t.educationTargetDesc}</p>}
        
        <h2 className="section-title">{t.coursesTitle}</h2>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>{t.courseCode}</th>
                <th>{t.courseCompetency}</th>
              </tr>
            </thead>
            <tbody>
              {t.courses.map((course, idx) => (
                <tr key={idx}>
                  <td className={styles.courseCode}>{course.code}</td>
                  <td>{course.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
