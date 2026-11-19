import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Copilote marketing pour commerces locaux`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/dashboard",
    display: "standalone",
    lang: "fr",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
