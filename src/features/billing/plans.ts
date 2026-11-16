/**
 * Offres commerciales LocalBoost — source unique partagée entre la page
 * tarifs (marketing) et l'espace Abonnement du dashboard.
 */
export interface PricingPlan {
  id: "starter" | "pro" | "business";
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
  href: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "49€",
    period: "/mois par établissement",
    desc: "Idéal pour structurer ses publications et lancer un premier programme de fidélité moderne.",
    features: [
      "1 établissement inclus",
      "Gestion des publications & médias",
      "Calendrier éditorial interactif",
      "Programme de fidélité QR Code",
      "Interface scan employé illimitée",
      "Statistiques de fréquentation basiques",
      "Support par email",
    ],
    highlighted: false,
    cta: "Commencer avec Starter",
    href: "/register?plan=starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "89€",
    period: "/mois par établissement",
    desc: "Pour les commerces qui souhaitent fidéliser activement et optimiser leur réputation locale.",
    features: [
      "Tout ce qui est dans Starter, plus :",
      "Moteur de plan d'actions déterministe",
      "Campagnes commerciales ciblées",
      "Relances automatiques clients inactifs",
      "Diagnostic de présence noté sur 100",
      "Gestion des avis Google & réponses types",
      "Intégration Brevo (emails transactionnels)",
      "Support prioritaire sous 24h",
    ],
    highlighted: true,
    badge: "Le plus choisi",
    cta: "Essai gratuit 14 jours",
    href: "/register?plan=pro",
  },
  {
    id: "business",
    name: "Business",
    price: "159€",
    period: "/mois",
    desc: "Conçu pour les commerces multi-établissements, franchises et groupes régionaux.",
    features: [
      "Jusqu'à 3 établissements inclus (puis +39€/est)",
      "Gestion multi-établissements centralisée",
      "Attribution fine des rôles (Managers & Employés)",
      "Surveillance comparative des concurrents",
      "Rapports mensuels PDF consolidés",
      "Module Site Vitrine optimisé SEO local",
      "Accompagnement d'onboarding dédié",
    ],
    highlighted: false,
    cta: "Choisir l'offre Business",
    href: "/register?plan=business",
  },
];
