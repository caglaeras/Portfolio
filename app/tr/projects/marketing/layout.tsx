import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Pazarlama Portföyü",
  "Pazarlama ve içerik üretimi için hazırladığım görsel ve video çalışmaları.",
  "/projects/marketing",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
