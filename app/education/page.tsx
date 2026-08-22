"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "../vizyon/Vizyon.module.css"; 

export default function Education() {
  const { content } = useLanguage();
  const t = content.vizyon;
  const [isTableOpen, setIsTableOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{content.nav.education}</h1>

      <div className={`card-glass ${styles.section}`}>
        {t.credibility && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "35px" }}>
            {t.credibility.map((item, idx) => (
              <div key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(140, 123, 101, 0.08)", borderLeft: "3px solid var(--main-color)", padding: "12px 18px", borderRadius: "0 4px 4px 0", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-color)" }}>
                <i className={`fas ${idx === 0 ? "fa-trophy" : idx === 1 ? "fa-award" : "fa-chalkboard-teacher"}`} style={{ color: "var(--main-color)", fontSize: "1.1rem" }}></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {t.educationIntro && <p className={styles.lead} style={{ marginBottom: "30px" }}>{t.educationIntro}</p>}
        {t.educationTargetTitle && <h2 className="section-title" style={{ marginTop: "20px", fontSize: "1.6rem" }}>{t.educationTargetTitle}</h2>}
        {t.educationTargetDesc && <p className={styles.text} style={{ marginBottom: "50px" }}>{t.educationTargetDesc}</p>}
        
        <div 
          onClick={() => setIsTableOpen(!isTableOpen)}
          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: isTableOpen ? "0" : "20px" }}
        >
          <h2 className="section-title" style={{ fontSize: "1.6rem", margin: 0, paddingBottom: "10px" }}>
            {t.coursesTitle}
          </h2>
          <i 
            className="fas fa-chevron-down" 
            style={{ 
              transition: "transform 0.3s ease", 
              transform: isTableOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--main-color)",
              marginTop: "-10px"
            }}
          ></i>
        </div>

        {isTableOpen && (
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
        )}
      </div>
    </div>
  );
}
