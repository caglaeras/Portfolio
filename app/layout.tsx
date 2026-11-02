import React from "react";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OG_IMAGE, PERSON, SITE_NAME, SITE_ORIGIN, SITE_URL } from "./seo";
import "./globals.css";

const SITE_TITLE = "Çağla Eraslan - Educational Technologist & Growth Marketer";
const SITE_DESCRIPTION =
  "Educational Technologist & Growth Marketer | Boğaziçi University CET Class of 2026, highest GPA in cohort";

export const metadata: Metadata = {
  // Gorsel ve kanonik URL'ler bu kokten cozuluyor
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSON}`,
  },
  description: "Portfolio of Çağla Eraslan - Educational Technologist & Growth Marketer. Boğaziçi University CET Class of 2026, highest GPA in cohort. Unity EdTech Research & Meta Ads / n8n Automation.",
  alternates: { canonical: `${SITE_URL}/` },
  icons: {
    icon: "/Portfolio/favicon.png",
    apple: "/Portfolio/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "profile",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
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
            <p>B.Sc. in Computer Education and Educational Technology, Boğaziçi University, Class of 2026. Highest GPA in cohort at 3.22/4.00, departmental award recipient and Hikmet Sebüktekin Award nominee.</p>
            <p>Designing interactive learning experiences in Unity and web, and running data-driven growth marketing with Meta Ads and n8n + LLM automation.</p>
            <h2>Navigation &amp; Key Projects</h2>
            <ul>
              <li><a href="/Portfolio/projects/gen-ciftligi">Gen Çiftliği: Unity-Based Educational Game &amp; Research Case Study</a></li>
              <li><a href="/Portfolio/projects/growth-automation">Growth Marketing and Content Automation: n8n Content Pipeline, Video Script Formula and Guideline-Verified Content</a></li>
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

