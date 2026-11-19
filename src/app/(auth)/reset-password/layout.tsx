import type { Metadata } from "next";

// Page atteinte uniquement depuis un lien email : non indexée.
export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  robots: { index: false, follow: false },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
