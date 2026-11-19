import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site/config";
import "./globals.css";

/*
 * Polices auto-hébergées (OFL-1.1) : sous-ensembles latins de Google Fonts, réduits à la plage
 * de graisses réellement utilisée et aux fonctions OpenType actives (kern, liga, calt, tnum…).
 * Même rendu, environ un tiers d'octets en moins sur le chemin critique.
 * Régénération : fontTools (varLib.instancer puis subset), voir CREDITS.md.
 *
 * Polices de secours : mêmes métriques que celles générées par next/font/google (globals.css,
 * « LB … Fallback »), pour que le texte ne se recompose pas à l'arrivée des polices (CLS nul).
 */
const inter = localFont({
  src: "./fonts/inter-latin-var.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
  fallback: ["LB Inter Fallback"],
});

// Geist : police des titres de l'espace commerçant ; Geist Mono pour les codes et raccourcis
const geist = localFont({
  src: "./fonts/geist-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-geist",
  adjustFontFallback: false,
  fallback: ["LB Geist Fallback"],
});

// Usage ponctuel (raccourcis, codes) : pas de préchargement pour ne pas concurrencer les polices de texte.
const geistMono = localFont({
  src: "./fonts/geist-mono-latin-var.woff2",
  weight: "400 600",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: ["LB Geist Mono Fallback"],
});

const DEFAULT_TITLE = "LocalBoost — Copilote Marketing pour Commerces Locaux";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "marketing local",
    "commerces de proximité",
    "fidélité QR code",
    "gestion avis google",
    "calendrier marketing",
    "SaaS B2B",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: "/",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
