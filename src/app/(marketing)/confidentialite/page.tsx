import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD)",
  description: "Comment LocalBoost collecte, protège et traite les données personnelles des commerçants et de leurs clients, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Politique de Confidentialité et Protection des Données (RGPD)
      </h1>
      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-4">
        <p>
          Date de dernière mise à jour : 15 novembre 2026. La protection des données de nos clients
          et de leurs clients finaux est un engagement fondamental de LocalBoost.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 mt-6">
          1. Rôles et Responsabilités de Traitement
        </h2>
        <p>
          Dans le cadre de l&apos;utilisation des modules CRM et Fidélité, le commerçant agit en tant
          que <strong>Responsable du Traitement</strong> de ses données clients. LocalBoost agit
          exclusivement en tant que <strong>Sous-traitant</strong> au sens de l&apos;article 28 du RGPD.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 mt-6">
          2. Séparation Stricte des Consentements
        </h2>
        <p>
          LocalBoost applique le principe de <em>Privacy by Design</em>. L&apos;adhésion au programme de
          fidélité par un client ne constitue en aucun cas un consentement tacite à l&apos;envoi de
          communications commerciales par email ou SMS. Un consentement explicite distinct (opt-in)
          est systématiquement requis et horodaté.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 mt-6">
          3. Droits des Personnes Concernées
        </h2>
        <p>
          Conformément au RGPD, toute personne dispose d&apos;un droit d&apos;accès, de rectification, de
          suppression et d&apos;opposition au traitement de ses données personnelles, exerçable à tout
          moment via le lien de désinscription ou par simple demande.
        </p>
      </div>
    </div>
  );
}
