"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { content, language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: content.nav.home, path: "/" },
    { name: content.nav.vizyon, path: "/vizyon" },
    { name: content.nav.unity, path: "/unity" },
    { name: content.nav.web, path: "/web" },
    { name: content.nav.other, path: "/other" },
    { name: content.nav.marketing, path: "/marketing" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          Çağla Eraslan
        </Link>

        {/* Mobile menu button */}
        <button 
          className={styles.menuBtn} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path} className={styles.navItem}>
                <Link 
                  href={link.path} 
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
