import React from "react";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Çağla Eraslan - Portfolio",
  description: "Bilgisayar ve Öğretim Teknolojileri öğrencisi Çağla Eraslan'ın portfolyosu. / Portfolio of CEIT student Çağla Eraslan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
