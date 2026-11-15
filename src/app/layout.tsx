import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="fr" className={`${inter.variable}`}>
      <body className="min-h-screen bg-surface-bg font-sans antialiased text-slate-900 selection:bg-brand-100 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
