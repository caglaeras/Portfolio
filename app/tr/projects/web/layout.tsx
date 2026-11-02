import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Web Projeleri",
  "Canlı önizlemeli web projeleri ve proje hikayeleri: Lion Commerce, Essay Grader, Hue Hunter, UniMarket ve WorldStory.",
  "/projects/web",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
