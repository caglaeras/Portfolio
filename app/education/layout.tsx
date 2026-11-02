import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Education",
  "B.Sc. in Computer Education and Educational Technology at Boğaziçi University: highest GPA in cohort, awards, certifications and key courses.",
  "/education",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
