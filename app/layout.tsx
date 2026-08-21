import React from "react";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Çağla Eraslan - Educational Technologist & Growth Marketer",
  description: "Portfolio of Çağla Eraslan - Educational Technologist & Growth Marketer. Boğaziçi University CET Class of 2026 (1st Rank). Unity EdTech Research & Meta Ads / n8n Automation.",
  openGraph: {
    title: "Çağla Eraslan - Educational Technologist & Growth Marketer",
    description: "Educational Technologist & Growth Marketer | Boğaziçi University CET Class of 2026 (1st Rank)",
    url: "https://caglaeras.github.io/Portfolio",
    siteName: "Çağla Eraslan Portfolio",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Çağla Eraslan - Educational Technologist & Growth Marketer",
    description: "Educational Technologist & Growth Marketer | Boğaziçi University CET Class of 2026 (1st Rank)",
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Çağla Eraslan",
  "jobTitle": "Educational Technologist & Growth Marketer",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Boğaziçi University",
    "department": "Computer Education and Instructional Technology (CET)"
  },
  "workLocation": {
    "@type": "Place",
    "name": "Istanbul, Turkey"
  },
  "url": "https://caglaeras.github.io/Portfolio",
  "sameAs": [
    "https://www.linkedin.com/in/%C3%A7a%C4%9Fla-eraslan-76608b1b5/",
    "https://github.com/caglaeras"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", color: "#1a1a1a" }}>
            <h1>Çağla Eraslan - Educational Technologist &amp; Growth Marketer</h1>
            <p>Boğaziçi University CET Class of 2026 (Graduated 1st in Cohort, GPA: 3.22/4.00).</p>
            <p>Designing interactive learning experiences in Unity and web, and running data-driven growth marketing with Meta Ads and n8n + LLM automation.</p>
            <h2>Navigation &amp; Key Projects</h2>
            <ul>
              <li><a href="/Portfolio/projects/gen-ciftligi">Gen Çiftliği: Unity-Based Educational Game &amp; Research Case Study</a></li>
              <li><a href="/Portfolio/projects/cancera-growth">Cancera Growth: LLM-Assisted Content Pipeline &amp; Guideline-Verified E-Books</a></li>
              <li><a href="/Portfolio/education">Education &amp; Competencies</a></li>
              <li><a href="/Portfolio/vizyon">Educational Vision</a></li>
              <li><a href="/Portfolio/projects">Projects Portfolio</a></li>
            </ul>
          </div>
        </noscript>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

