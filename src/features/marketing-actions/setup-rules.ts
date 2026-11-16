/**
 * Module 4 — Règles déterministes de mise en route.
 * Chaque recommandation découle d'une condition explicite et vérifiable
 * sur l'état réel du compte (aucune IA générative, cf. AGENTS.md §2.A).
 */

export interface SetupSignals {
  establishmentsCount: number;
  googleBusinessConnected: boolean;
  loyaltyProgramConfigured: boolean;
  brevoConfigured: boolean;
  subscriptionActive: boolean;
}

export type Difficulty = "Facile" | "Moyen" | "Avancé";

export interface RecommendedAction {
  /** Identifiant stable de la règle, affiché pour l'auditabilité. */
  code: string;
  title: string;
  justification: string;
  difficulty: Difficulty;
  href: string;
  cta: string;
}

interface SetupRule {
  action: RecommendedAction;
  applies: (s: SetupSignals) => boolean;
}

/** Ordre = priorité. Une règle ne s'évalue que sur les signaux fournis. */
const RULES: SetupRule[] = [
  {
    applies: (s) => s.establishmentsCount === 0,
    action: {
      code: "INIT_ESTABLISHMENT_SETUP",
      title: "Configurez votre premier établissement",
      justification:
        "Aucun établissement n'est enregistré. Fidélité, avis Google et campagnes sont rattachés à un point de vente : ils restent inactifs tant qu'il n'en existe aucun.",
      difficulty: "Facile",
      href: "/dashboard/establishments",
      cta: "Ajouter un établissement",
    },
  },
  {
    applies: (s) => s.establishmentsCount > 0 && !s.googleBusinessConnected,
    action: {
      code: "CONNECT_GOOGLE_BUSINESS",
      title: "Connectez votre fiche Google Business Profile",
      justification:
        "Aucune fiche Google n'est reliée. Sans elle, ni la synchronisation des avis ni le diagnostic de visibilité locale ne peuvent être calculés.",
      difficulty: "Facile",
      href: "/dashboard/channels",
      cta: "Connecter Google",
    },
  },
  {
    applies: (s) => s.establishmentsCount > 0 && !s.loyaltyProgramConfigured,
    action: {
      code: "SETUP_LOYALTY_PROGRAM",
      title: "Paramétrez votre programme de fidélité",
      justification:
        "Aucune règle de cumul n'est définie. Le scan QR en caisse nécessite un mode de cumul (au montant ou à la visite) et au moins une récompense.",
      difficulty: "Moyen",
      href: "/dashboard/loyalty",
      cta: "Configurer la fidélité",
    },
  },
  {
    applies: (s) => s.establishmentsCount > 0 && !s.brevoConfigured,
    action: {
      code: "CONFIGURE_EMAIL_SENDER",
      title: "Activez l'envoi d'emails (Brevo)",
      justification:
        "Aucun expéditeur email n'est configuré. Les campagnes et relances automatiques ne peuvent pas être envoyées.",
      difficulty: "Moyen",
      href: "/dashboard/automations",
      cta: "Configurer les envois",
    },
  },
];

export function evaluateSetupRules(signals: SetupSignals): RecommendedAction[] {
  return RULES.filter((rule) => rule.applies(signals)).map((rule) => rule.action);
}

export interface OnboardingStep {
  label: string;
  done: boolean;
  href: string;
}

export function onboardingSteps(s: SetupSignals): OnboardingStep[] {
  return [
    { label: "Compte créé", done: true, href: "/dashboard/settings" },
    { label: "Premier établissement", done: s.establishmentsCount > 0, href: "/dashboard/establishments" },
    { label: "Fiche Google connectée", done: s.googleBusinessConnected, href: "/dashboard/channels" },
    { label: "Programme de fidélité", done: s.loyaltyProgramConfigured, href: "/dashboard/loyalty" },
    { label: "Abonnement activé", done: s.subscriptionActive, href: "/dashboard/billing" },
  ];
}

/**
 * Signaux disponibles à ce stade du produit. Les intégrations (Google, Brevo,
 * Stripe) et la fidélité n'ont pas encore de tables : leurs signaux valent
 * `false` jusqu'à leur livraison (Phases 2, 3, 5, 6).
 */
export function currentSetupSignals(establishmentsCount: number): SetupSignals {
  return {
    establishmentsCount,
    googleBusinessConnected: false,
    loyaltyProgramConfigured: false,
    brevoConfigured: false,
    subscriptionActive: false,
  };
}
