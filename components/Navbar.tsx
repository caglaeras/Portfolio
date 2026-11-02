"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { content, language, toggleLanguage, href, barePath } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: content.nav.home, path: "/" },
    { name: content.nav.vision, path: "/vizyon" },
    { name: content.nav.education, path: "/education" },
    { name: content.nav.projects, path: "/projects" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return barePath === "/";
    return barePath === path || barePath.startsWith(path + "/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={href("/")} className={styles.brand}>
          Çağla Eraslan
        </Link>

        {/* Mobile menu button */}
        <button 
          className={styles.menuBtn} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={content.nav.menuToggle}
          aria-expanded={isMenuOpen}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path} className={styles.navItem}>
                <Link 
                  href={href(link.path)} 
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className={styles.navItem}>
              <button onClick={toggleLanguage} className={styles.langBtn}>
                {language === "tr" ? "EN" : "TR"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
