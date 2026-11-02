"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./NotFound.module.css";

/*
 * Statik ciktida 404.html olarak uretilir; GitHub Pages /Portfolio altinda
 * bulunamayan her adreste bunu gosterir. Kok layout'un icinde calistigi icin
 * menu, alt bilgi ve dil secimi burada da var.
 */
export default function NotFound() {
  const { content, href } = useLanguage();
  const t = content.notFound;

  return (
    <section className={styles.wrap}>
      <span className={styles.code} aria-hidden="true">404</span>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.text}>{t.text}</p>
      <div className={styles.actions}>
        <Link href={href("/")} className="btn-main">
          {t.homeBtn}
        </Link>
        <Link href={href("/projects/gen-ciftligi")} className={styles.secondary}>
          {t.projectsBtn}
        </Link>
      </div>
    </section>
  );
}
