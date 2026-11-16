import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Geist (OFL-1.1) : police de l'espace commerçant ; Geist Mono pour les codes et raccourcis
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "LocalBoost — Copilote Marketing pour Commerces Locaux",
  description:
    "Votre marketing local, centralisé et piloté depuis une seule application : fidélité QR code, calendrier éditorial, campagnes ciblées, avis clients et diagnostic.",
  keywords: [
    "marketing local",
    "commerces de proximité",
    "fidélité QR code",
    "gestion avis google",
    "calendrier marketing",
    "SaaS B2B",
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
