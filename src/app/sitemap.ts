import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PUBLIC_ROUTES.map((path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: path === "/" ? ("weekly" as const) : ("yearly" as const),
      priority: path === "/" ? 1 : 0.3,
    })),
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
