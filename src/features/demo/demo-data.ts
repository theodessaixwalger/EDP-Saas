/**
 * Jeu de données FICTIVES du mode démo. Utilisé uniquement quand le cookie
 * `lb_demo` est actif, toujours accompagné du bandeau « Mode démo ».
 * Les dates sont calculées par rapport à aujourd'hui pour rester crédibles.
 */
import type { Establishment, Organization, Profile } from "@/types";
import type { SegmentKey } from "@/features/customers/segments";
import type { SetupSignals } from "@/features/marketing-actions/setup-rules";
import type { RecommendedAction } from "@/features/marketing-actions/setup-rules";

const DAY = 86_400_000;
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const daysAgo = (n: number, hour = 10) => {
  const d = new Date(today().getTime() - n * DAY);
  d.setHours(hour, (n * 17) % 60);
  return d.toISOString();
};
const daysAhead = (n: number, hour = 9) => daysAgo(-n, hour);
const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Générateur pseudo-aléatoire stable : les mêmes chiffres à chaque affichage. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Compte ------------------------------------------------------------------

const now = new Date().toISOString();

export const demoProfile: Profile = {
  id: "demo-user",
  email: "camille@maison-lefevre.fr",
  full_name: "Camille Lefèvre",
  avatar_url: null,
  phone: "06 12 34 56 78",
  is_super_admin: false,
  created_at: now,
  updated_at: now,
};

export const demoOrganization: Organization = {
  id: "demo-org",
  name: "Maison Lefèvre",
  slug: "maison-lefevre",
  billing_email: "compta@maison-lefevre.fr",
  stripe_customer_id: "cus_demo",
  created_at: now,
  updated_at: now,
};

const est = (id: string, name: string, address: string, city: string, postal: string, slug: string): Establishment => ({
  id,
  organization_id: "demo-org",
  category_id: null,
  name,
  slug,
  address,
  city,
  postal_code: postal,
  country: "FR",
  latitude: null,
  longitude: null,
  phone: "04 78 00 00 00",
  email: `${slug}@maison-lefevre.fr`,
  website_url: "https://maison-lefevre.fr",
  is_active: true,
  created_at: now,
  updated_at: now,
});

export const demoEstablishments: Establishment[] = [
  est("demo-est-1", "Maison Lefèvre — République", "8 place de la République", "Lyon", "69002", "republique"),
  est("demo-est-2", "Maison Lefèvre — Croix-Rousse", "21 boulevard de la Croix-Rousse", "Lyon", "69004", "croix-rousse"),
];

export const demoSignals: SetupSignals = {
  establishmentsCount: 2,
  googleBusinessConnected: true,
  loyaltyProgramConfigured: true,
  brevoConfigured: true,
  subscriptionActive: true,
};

/** Recommandations illustrant le moteur de règles (Phase 3) sur un compte actif. */
export const demoActions: RecommendedAction[] = [
  {
    code: "REACTIVATE_INACTIVE_30D",
    title: "Relancez 37 clients inactifs depuis plus de 30 jours",
    justification:
      "37 clients fidèles n'ont enregistré aucun passage depuis 30 jours (seuil boulangerie). Une offre de retour envoyée aux 29 qui ont consenti aux emails réactive en moyenne 1 client sur 5.",
    difficulty: "Facile",
    href: "/dashboard/automations",
    cta: "Lancer la relance",
  },
  {
    code: "WEATHER_RAIN_WEEKEND",
    title: "Pluie annoncée samedi : mettez en avant la livraison et les boissons chaudes",
    justification:
      "Open-Meteo prévoit 8 mm de pluie samedi. Vos passages baissent de 22 % les samedis pluvieux sur les 3 derniers mois.",
    difficulty: "Moyen",
    href: "/dashboard/content",
    cta: "Préparer une publication",
  },
  {
    code: "REPLY_NEGATIVE_REVIEW",
    title: "Répondez à l'avis 2 étoiles de Julien M.",
    justification: "Avis négatif sans réponse depuis 3 jours. Une réponse sous 7 jours améliore la note perçue de la fiche.",
    difficulty: "Facile",
    href: "/dashboard/reviews",
    cta: "Répondre",
  },
];

// --- Indicateurs -------------------------------------------------------------

export const demoKpis = {
  loyalCustomers: 248,
  pointsDistributed: 18_430,
  googleRating: 4.7,
  googleReviews: 312,
  diagnosticScore: 82,
  scans30d: 1_164,
  rewardsRedeemed: 96,
  newCustomers30d: 31,
  uniqueCustomers30d: 412,
  recurrenceRate: 58,
  pointsRedeemed: 9_600,
  emailsDelivered: 1_842,
  clickRate: 6.4,
  codesUsed: 73,
  conversionRate: 4.0,
  remindersSent30d: 64,
  reactivated30d: 13,
  unsubscribed: 4,
  inactive: 37,
};

/** Série quotidienne sur 90 jours : passages et nouveaux clients. */
export function demoTrend(): Array<{ date: string; visits: number; newCustomers: number }> {
  const r = seeded(7);
  const t0 = today().getTime();
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date(t0 - (89 - i) * DAY);
    const dow = d.getDay();
    const weekend = dow === 0 ? 0.55 : dow === 6 ? 1.35 : 1;
    const growth = 1 + i / 260;
    const visits = Math.round((28 + r() * 14) * weekend * growth);
    return { date: isoDay(d), visits, newCustomers: Math.round(r() * 3 + (dow === 6 ? 2 : 0)) };
  });
}

// --- Contenus & calendrier -----------------------------------------------------

export type DemoChannel = "instagram" | "facebook" | "google";
export type DemoContentStatus = "draft" | "review" | "approved" | "scheduled" | "published" | "failed";

export const demoContents: Array<{
  id: string;
  title: string;
  channels: DemoChannel[];
  status: DemoContentStatus;
  date: string;
  author: string;
}> = [
  { id: "c1", title: "Galette des rois : précommandes ouvertes", channels: ["instagram", "facebook"], status: "scheduled", date: daysAhead(2), author: "Camille" },
  { id: "c2", title: "Nouveau pain au levain d'épeautre", channels: ["instagram", "google"], status: "scheduled", date: daysAhead(5), author: "Hugo" },
  { id: "c3", title: "Horaires des fêtes de fin d'année", channels: ["google", "facebook"], status: "review", date: daysAhead(9), author: "Camille" },
  { id: "c4", title: "Coulisses : la fournée de 5 h du matin", channels: ["instagram"], status: "approved", date: daysAhead(12), author: "Hugo" },
  { id: "c5", title: "Atelier viennoiserie pour enfants", channels: ["facebook"], status: "draft", date: daysAhead(18), author: "Léa" },
  { id: "c6", title: "Offre fidélité : 10e baguette offerte", channels: ["instagram", "facebook", "google"], status: "published", date: daysAgo(3), author: "Camille" },
  { id: "c7", title: "Tarte aux pommes de saison", channels: ["instagram"], status: "published", date: daysAgo(6), author: "Léa" },
  { id: "c8", title: "Fermeture exceptionnelle lundi", channels: ["google"], status: "failed", date: daysAgo(1), author: "Hugo" },
];

export const demoCalendarEvents = demoContents
  .filter((c) => c.status === "scheduled" || c.status === "published" || c.status === "approved")
  .flatMap((c) => c.channels.map((ch) => ({ id: `${c.id}-${ch}`, title: c.title, start: c.date, channel: ch })));

export const demoMedia = [
  { id: "m1", name: "levain-epeautre.jpg", kind: "Photo" },
  { id: "m2", name: "fournee-5h.mp4", kind: "Vidéo" },
  { id: "m3", name: "galette-2026.jpg", kind: "Photo" },
  { id: "m4", name: "vitrine-noel.jpg", kind: "Photo" },
];

export const demoQueue = [
  { id: "q1", title: "Galette des rois : précommandes ouvertes", channel: "Instagram", date: daysAhead(2), attempts: 0, state: "En attente" },
  { id: "q2", title: "Nouveau pain au levain d'épeautre", channel: "Google Business", date: daysAhead(5), attempts: 0, state: "En attente" },
  { id: "q3", title: "Fermeture exceptionnelle lundi", channel: "Google Business", date: daysAgo(1), attempts: 3, state: "Échec — export manuel" },
];

// --- Avis ----------------------------------------------------------------------

export const demoReviews: Array<{
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  replied: boolean;
  establishment: string;
}> = [
  { id: "r1", author: "Julien M.", rating: 2, date: daysAgo(3), text: "Croissants bons mais 20 minutes d'attente samedi matin, et plus de pain aux céréales à 10 h.", replied: false, establishment: "République" },
  { id: "r2", author: "Sophie D.", rating: 5, date: daysAgo(4), text: "La meilleure baguette du quartier, et l'équipe est adorable. Le levain d'épeautre est incroyable !", replied: false, establishment: "Croix-Rousse" },
  { id: "r3", author: "Marc A.", rating: 4, date: daysAgo(8), text: "Très bonnes pâtisseries, un peu cher mais la qualité est là.", replied: true, establishment: "République" },
  { id: "r4", author: "Inès B.", rating: 5, date: daysAgo(11), text: "Commande de 40 viennoiseries pour le bureau, tout était parfait et prêt à l'heure.", replied: true, establishment: "République" },
  { id: "r5", author: "Thomas R.", rating: 1, date: daysAgo(15), text: "Fermé alors que Google indiquait ouvert.", replied: true, establishment: "Croix-Rousse" },
];

export const demoReviewTemplates = [
  { id: "t1", name: "Remerciement chaleureux", tone: "Positif", text: "Merci {prénom} pour votre message ! Toute l'équipe est ravie de vous régaler, à très vite à la boutique." },
  { id: "t2", name: "Excuse et solution", tone: "Négatif", text: "Bonjour {prénom}, merci pour votre retour et toutes nos excuses. Nous renforçons l'équipe le samedi matin pour réduire l'attente." },
  { id: "t3", name: "Invitation à revenir", tone: "Neutre", text: "Merci {prénom} ! Votre carte de fidélité vous attend : la 10e baguette est offerte." },
];

// --- Fidélité & clients --------------------------------------------------------

export const demoRewards = [
  { id: "w1", name: "Viennoiserie offerte", cost: 50, redeemed: 54 },
  { id: "w2", name: "10e baguette offerte", cost: 90, redeemed: 31 },
  { id: "w3", name: "Gâteau 4 parts offert", cost: 300, redeemed: 11 },
];

export const demoTransactions = [
  { id: "x1", date: daysAgo(0, 9), customer: "Sophie D.", type: "Crédit", points: 12, staff: "Hugo", establishment: "Croix-Rousse" },
  { id: "x2", date: daysAgo(0, 8), customer: "Karim L.", type: "Crédit", points: 7, staff: "Léa", establishment: "République" },
  { id: "x3", date: daysAgo(1, 17), customer: "Élodie P.", type: "Échange", points: -50, staff: "Hugo", establishment: "République" },
  { id: "x4", date: daysAgo(1, 12), customer: "Paul V.", type: "Crédit", points: 23, staff: "Camille", establishment: "République" },
  { id: "x5", date: daysAgo(2, 11), customer: "Nadia K.", type: "Crédit", points: 9, staff: "Léa", establishment: "Croix-Rousse" },
  { id: "x6", date: daysAgo(2, 8), customer: "Julien M.", type: "Échange", points: -90, staff: "Hugo", establishment: "République" },
];

export const demoSegmentCounts: Record<SegmentKey, number> = {
  new: 31,
  active: 412,
  regular: 126,
  inactive: 37,
  near_reward: 44,
};

export const demoCustomers: Array<{
  id: string;
  name: string;
  email: string;
  segment: SegmentKey;
  points: number;
  lastVisit: string;
  marketing: boolean;
}> = [
  { id: "u1", name: "Sophie Durand", email: "sophie.d@exemple.fr", segment: "regular", points: 184, lastVisit: daysAgo(0), marketing: true },
  { id: "u2", name: "Karim Lahlou", email: "karim.l@exemple.fr", segment: "near_reward", points: 83, lastVisit: daysAgo(0), marketing: true },
  { id: "u3", name: "Élodie Perrin", email: "elodie.p@exemple.fr", segment: "active", points: 12, lastVisit: daysAgo(1), marketing: false },
  { id: "u4", name: "Paul Vidal", email: "paul.v@exemple.fr", segment: "regular", points: 241, lastVisit: daysAgo(1), marketing: true },
  { id: "u5", name: "Nadia Kaci", email: "nadia.k@exemple.fr", segment: "new", points: 9, lastVisit: daysAgo(2), marketing: true },
  { id: "u6", name: "Bernard Morel", email: "b.morel@exemple.fr", segment: "inactive", points: 67, lastVisit: daysAgo(41), marketing: true },
  { id: "u7", name: "Chloé Martin", email: "chloe.m@exemple.fr", segment: "inactive", points: 22, lastVisit: daysAgo(58), marketing: false },
];

// --- Campagnes & relances --------------------------------------------------------

export const demoCampaigns = [
  { id: "k1", name: "Bienvenue — nouveaux membres", segment: "Nouveaux", sent: 31, clicks: 9, codes: 7, status: "En cours" },
  { id: "k2", name: "Galette des rois 2026", segment: "Actifs", sent: 380, clicks: 41, codes: 28, status: "Programmée" },
  { id: "k3", name: "Réactivation automne", segment: "Inactifs", sent: 52, clicks: 6, codes: 5, status: "Terminée" },
  { id: "k4", name: "Offre flash mardi creux", segment: "Réguliers", sent: 126, clicks: 22, codes: 19, status: "Terminée" },
];

export const demoSends = [
  { id: "s1", date: daysAgo(0, 7), customer: "Bernard Morel", scenario: "Relance d'inactivité", status: "Délivré" },
  { id: "s2", date: daysAgo(1, 7), customer: "Karim Lahlou", scenario: "Récompense à portée", status: "Ouvert" },
  { id: "s3", date: daysAgo(2, 7), customer: "Lucie Garnier", scenario: "Relance d'inactivité", status: "Cliqué" },
  { id: "s4", date: daysAgo(3, 7), customer: "Marc Aubry", scenario: "Récompense à portée", status: "Rebond" },
];

// --- Diagnostic ------------------------------------------------------------------

export const demoDiagnostic = {
  score: 82,
  axes: {
    "Google Business Profile": { score: 36, max: 40 },
    "Site internet": { score: 30, max: 40 },
    "Présence sociale": { score: 16, max: 20 },
  } as Record<string, { score: number; max: number }>,
  criteria: {
    "Complétude de la fiche": "Complète",
    "Horaires renseignés": "À jour",
    Photos: "38 photos",
    "Note moyenne": "4,7 / 5",
    "Taux de réponse aux avis": "71 %",
    Performance: "68 / 100",
    "Expérience mobile": "91 / 100",
    "SEO technique": "88 / 100",
    Accessibilité: "79 / 100",
    "Rythme de publication": "3 / semaine",
    Régularité: "Bonne",
  } as Record<string, string>,
};

// --- Concurrents, équipe, facturation, notifications ------------------------------

export const demoCompetitors = [
  { id: "p1", name: "Maison Lefèvre — République (vous)", rating: 4.7, reviews: 312, delta: "+0,1", distance: "—", you: true },
  { id: "p2", name: "Boulangerie du Parc", rating: 4.5, reviews: 198, delta: "0", distance: "350 m", you: false },
  { id: "p3", name: "Le Fournil des Cordeliers", rating: 4.3, reviews: 421, delta: "−0,1", distance: "600 m", you: false },
  { id: "p4", name: "Pain & Partage", rating: 4.8, reviews: 87, delta: "+0,2", distance: "900 m", you: false },
];

export const demoTeam = [
  { id: "m1", name: "Camille Lefèvre", email: "camille@maison-lefevre.fr", role: "owner", establishment: "Tous les établissements", status: "Actif" },
  { id: "m2", name: "Hugo Bernard", email: "hugo@maison-lefevre.fr", role: "manager", establishment: "République", status: "Actif" },
  { id: "m3", name: "Léa Fontaine", email: "lea@maison-lefevre.fr", role: "staff", establishment: "Croix-Rousse", status: "Actif" },
  { id: "m4", name: "Samir Haddad", email: "samir@maison-lefevre.fr", role: "staff", establishment: "République", status: "Invitation envoyée" },
];

export const demoInvoices = [
  { id: "i1", date: daysAgo(16), number: "LB-2026-0011", plan: "Pro × 2 établissements", amount: "178,00 €", status: "Payée" },
  { id: "i2", date: daysAgo(46), number: "LB-2026-0010", plan: "Pro × 2 établissements", amount: "178,00 €", status: "Payée" },
  { id: "i3", date: daysAgo(77), number: "LB-2026-0009", plan: "Pro × 1 établissement", amount: "89,00 €", status: "Payée" },
];

export const demoNotifications = [
  { id: "n1", title: "Nouvel avis 2 étoiles", detail: "Julien M. — République", when: "il y a 3 j" },
  { id: "n2", title: "Échec de publication", detail: "« Fermeture exceptionnelle lundi » sur Google", when: "hier" },
  { id: "n3", title: "37 clients inactifs détectés", detail: "Relance d'inactivité prête à partir", when: "aujourd'hui" },
];

// --- Formatage ---------------------------------------------------------------------

export const frDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
export const frDateTime = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
export const frNumber = (n: number) => n.toLocaleString("fr-FR");
