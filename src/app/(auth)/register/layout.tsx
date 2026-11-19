import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essai gratuit 14 jours",
  description:
    "Créez votre compte LocalBoost : fidélité QR code, calendrier éditorial, campagnes et avis clients. 14 jours d'essai gratuit, sans engagement.",
  alternates: { canonical: "/register" },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
