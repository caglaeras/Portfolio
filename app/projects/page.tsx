"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsIndex() {
  const router = useRouter();
  const { content, href } = useLanguage();

  useEffect(() => {
    // Automatically redirect to the first tab
    router.replace(href("/projects/gen-ciftligi"));
  }, [router, href]);

  return (
    <div style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--secondary-text)" }}>{content.nav.loadingProjects}</p>
    </div>
  );
}
