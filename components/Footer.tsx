"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { content } = useLanguage();
  const t = content.footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <h5 className={styles.title}>{t.title}</h5>
            <p className={styles.bio}>{t.bio}</p>
          </div>
          
          <div className={styles.col}>
            <h5 className={styles.title}>{t.contact}</h5>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <i className="fas fa-map-marker-alt"></i> {t.location}
              </li>
              <li className={styles.listItem}>
                <i className="fas fa-envelope"></i> 
                <a href="mailto:caglaeraslan@gmail.com">caglaeraslan@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h5 className={styles.title}>{t.follow}</h5>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/%C3%A7a%C4%9Fla-eraslan-76608b1b5/" target="_blank" rel="noopener noreferrer" className={styles.icon} title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/caglaeras" target="_blank" rel="noopener noreferrer" className={styles.icon} title="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <hr className={styles.hr} />
          <p className={styles.copy}>&copy; {new Date().getFullYear()} {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
