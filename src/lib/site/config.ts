/** Configuration publique du site (SEO, URLs absolues, données structurées). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://localboost.fr").replace(/\/$/, "");

export const SITE_NAME = "LocalBoost";

export const SITE_DESCRIPTION =
  "Votre marketing local, centralisé et piloté depuis une seule application : fidélité QR code, calendrier éditorial, campagnes ciblées, avis clients et diagnostic.";

/** Pages publiques indexables (les autres routes sont privées ou non indexées). */
export const PUBLIC_ROUTES = ["/", "/cgu", "/confidentialite"] as const;
