import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Web Projects",
  "Web projects with live previews and project stories: Lion Commerce, Essay Grader, Hue Hunter, UniMarket and WorldStory.",
  "/projects/web",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
