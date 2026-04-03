"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Vizyon.module.css";

export default function Vizyon() {
  const { content } = useLanguage();
  const t = content.vizyon;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{t.title}</h1>

      <div className={`card-glass ${styles.section}`}>
        <h2 className="section-title">{t.visionTitle}</h2>
        <p className={styles.lead}>{t.visionLead}</p>
        <p className={styles.text}>{t.visionText}</p>
      </div>

      <div className={`card-glass ${styles.section}`}>
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
