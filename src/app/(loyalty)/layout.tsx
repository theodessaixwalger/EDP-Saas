import type { Metadata } from "next";

// Portail client de démonstration : non indexé.
export const metadata: Metadata = {
  title: "Programme fidélité",
  robots: { index: false, follow: false },
};

export default function LoyaltyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
