import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Métadonnées (title, description, canonical…) toujours rendues dans le <head>,
  // y compris sur les pages dynamiques : lisibles par tous les robots et outils d'audit.
  htmlLimitedBots: /.*/,
  // Pas d'`experimental.inlineCss` : il dupliquait la feuille de style dans chaque HTML
  // (balise <style> + charge RSC, ~25 Ko compressés) sans gain mesuré, et empêchait sa mise en cache.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
