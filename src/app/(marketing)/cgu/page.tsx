import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation de la plateforme SaaS LocalBoost destinée aux commerçants et artisans de proximité.",
  alternates: { canonical: "/cgu" },
};

export default function CGUPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Conditions Générales d&apos;Utilisation (CGU)
      </h1>
      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-4">
        <p>
          En vigueur au 15 novembre 2026. Les présentes CGU régissent l&apos;accès et l&apos;utilisation
          de la plateforme SaaS LocalBoost à destination des professionnels.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 mt-6">1. Définitions et Objet</h2>
        <p>
          LocalBoost est une plateforme logicielle fournissant des outils de pilotage marketing,
          de gestion de fidélité, de planification de campagnes et de diagnostic pour les commerces
          de proximité.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 mt-6">2. Accès et Comptes</h2>
        <p>
          L&apos;accès à la plateforme est strictement réservé aux personnes morales ou entrepreneurs
          individuels dûment enregistrés. L&apos;utilisateur est seul responsable de la sécurité
          de ses identifiants.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 mt-6">3. Responsabilité & Engagements</h2>
        <p>
          Le commerçant s&apos;engage à respecter les lois applicables en matière de publicité, de
          protection des consommateurs et de protection des données personnelles (RGPD).
        </p>
      </div>
    </div>
  );
}
