"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProjectsLayout.module.css";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { content, language } = useLanguage();
  const pathname = usePathname();

  const tabs = [
    { name: "Unity 3D", path: "/projects/unity" },
    { name: language === 'tr' ? "Web Geliştirme" : "Web Development", path: "/projects/web" },
    { name: language === 'tr' ? "Marketing" : "Marketing", path: "/projects/marketing" },
    { name: language === 'tr' ? "Diğer Projeler" : "Other Projects", path: "/projects/other" },
  ];

  return (
    <div className={styles.container}>
      
      {/* Persistent Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{content.nav.projects}</h1>
        <p className={styles.subtitle}>
          {language === 'tr' ? "Kategoriler arası gezinmek için menüyü kullanın." : "Use the menu to navigate between categories."}
        </p>
      </div>

      {/* Tab Menu */}
      <div className={styles.tabMenuWrapper}>
        <div className={styles.tabMenu}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || pathname.startsWith(tab.path + "/");
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`${styles.tabBtn} ${isActive ? styles.active : ""}`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Dynamic Swapping Content */}
      <div className={styles.contentArea}>
        {children}
      </div>

    </div>
  );
}
