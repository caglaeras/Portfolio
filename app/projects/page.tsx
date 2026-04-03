"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsIndex() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the first tab
    router.replace("/projects/unity");
  }, [router]);

  return (
    <div style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--secondary-text)" }}>Loading projects...</p>
    </div>
  );
}
