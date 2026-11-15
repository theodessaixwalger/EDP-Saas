# AGENTS.md — Instructions Générales pour le Projet LocalBoost

Ce document définit les standards d'ingénierie, la gouvernance de code, et les directives opérationnelles pour tout agent ou développeur intervenant sur **LocalBoost**.

---

## 1. Identité et Mission du Projet

- **Nom du produit** : LocalBoost (B2B SaaS marketing pour commerces de proximité).
- **Proposition de valeur** : « Votre marketing local, centralisé et piloté depuis une seule application. »
- **Cycle marketing cible** : **Organiser → Attirer → Convertir → Fidéliser → Mesurer.**
- **Cible** : Commerçants et artisans locaux (restaurants, boulangeries, salons de coiffure, instituts de beauté, commerces alimentaires, boutiques, salles de sport, etc.).
- **Caractère impératif** : B2B SaaS de production commercialisable, multi-tenant strict, sans aucun composant factice ni simulation non déclarée.

---

## 2. Principes Fondamentaux et Non-Négociables

### A. Règle Zéro IA Générative (Strict No-LLM / No-GenAI)
- **Aucun LLM, aucun chatbot, aucune API générative (OpenAI, Gemini, Claude, etc.) ne doit être intégrée dans les fonctionnalités produit de LocalBoost.**
- Toutes les fonctionnalités reposent sur des **règles déterministes**, des **modèles paramétrables**, des **calculs mathématiques/statistiques**, des **arbres de décision**, et des **APIs officielles** (météo, agenda, Google, Meta).
- Tout moteur de recommandation (Module 4) et de diagnostic (Module 7) doit être 100% auditable, reproductible et explicable.

### B. Isolation Multi-Tenant Stricte
- L'architecture de données repose sur 3 niveaux : **Plateforme → Organisation → Établissement**.
- L'isolation est garantie à la source par **PostgreSQL Row Level Security (RLS)** sur toutes les tables de données.
- Ne **jamais** faire confiance à un `organization_id` ou `establishment_id` transmis par le client sans validation d'appartenance côté serveur.
- Chaque mutation et lecture sensible vérifie : Session active, Utilisateur authentifié, Organisation liée, Établissement rattaché, et Rôles/Permissions nécessaires.

### C. Fiabilité des Intégrations et Mode Dégradé
- Intégrations externes officielles uniquement : Stripe, Brevo, Google Business Profile API, Google Places API, Google PageSpeed Insights, Meta/Instagram Graph API.
- Aucun scraping web pour contourner les restrictions d'API (strictement prohibé).
- Chaque intégration externe est isolée dans un service dédié (`src/services/`) avec interface claire, gestion d'erreurs, journalisation (`integration_logs`) et **mode manuel de secours**.

### D. RGPD & Confidentialité « Privacy by Design »
- Séparation stricte des consentements : l'adhésion au programme de fidélité ne vaut JAMAIS consentement au démarchage commercial par email.
- Traçabilité complète des consentements : horodatage, canal de collecte, adresse IP/hash, version du texte légal accepté.
- Liste d'opposition persistante et désinscription en 1 clic obligatoire pour tout envoi commercial (Brevo).

---

## 3. Stack Technique et Conventions

| Couche | Technologie / Outil | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, React 19 / 18, Server Components) | SSR, streaming, Server Actions, performance SEO |
| **Langage** | TypeScript (mode `strict: true`) | Typage statique exhaustif, réduction des bugs runtime |
| **Styling** | Tailwind CSS v3/v4 + shadcn/ui | Design system B2B sobre, modulaire et accessible |
| **Icônes** | Lucide React | Cohérence iconographique |
| **Graphiques** | Recharts | Composants graphiques SVG réactifs |
| **Calendrier** | FullCalendar React | Calendrier éditorial multi-vues |
| **Formulaires** | React Hook Form + Zod | Validation schématique unifiée client & serveur |
| **Backend & DB** | Supabase (PostgreSQL 15+, Supabase Auth, Storage) | RLS natif, auth multi-facteur, migrations SQL propres |
| **Paiement** | Stripe Billing & Webhooks | Abonnements récurrents, portail client |
| **Emails** | Brevo API | Transactionnel et marketing avec gestion des bounces/désabonnements |
| **Tests** | Vitest, Testing Library, Playwright | Tests unitaires déterministes, intégration et E2E |
| **Gestionnaire** | pnpm | Performances, gestion stricte du lockfile |

---

## 4. Organisation du Répertoire

```
src/
├── app/
│   ├── (marketing)/         # Landing page, tarifs, secteurs, CGU/CGV, politique confidentialité
│   ├── (auth)/              # Connexion, inscription, réinitialisation mot de passe
│   ├── (dashboard)/         # Espace commerçant multi-tenant (établissements, modules)
│   ├── (loyalty)/           # Espace mobile client & scan employé
│   ├── admin/               # Back-office administration LocalBoost
│   └── api/                 # Webhooks (Stripe, Brevo), Cron jobs, endpoints publics
├── components/
│   ├── ui/                  # Primitives shadcn/ui
│   ├── layout/              # Navbar, Sidebar, Switchers, Footers
│   ├── shared/              # Composants réutilisables (EmptyStates, Badges, Modals)
│   └── charts/              # Visualisations Recharts
├── features/                # Domaines métier verticaux
│   ├── organizations/
│   ├── establishments/
│   ├── customers/
│   ├── loyalty/
│   ├── content/
│   ├── calendar/
│   ├── campaigns/
│   ├── marketing-actions/
│   ├── diagnostics/
│   ├── analytics/
│   ├── competitors/
│   ├── reviews/
│   ├── websites/
│   └── billing/
├── lib/
│   ├── supabase/            # Clients (browser, server, service-role admin, middleware)
│   ├── permissions/         # Contrôle d'accès RBAC (hasPermission, verifyOrgAccess)
│   ├── validation/          # Schémas Zod partagés
│   └── utils/               # Formatage date, monnaie, helpers
├── services/                # Clients API externes
│   ├── stripe/
│   ├── brevo/
│   ├── google/
│   ├── meta/
│   └── weather/
└── types/                   # Définitions TypeScript globales et de base de données
```

---

## 5. Workflow de Développement et Qualité

Pour chaque brique ou fonctionnalité :
1. **Schéma & Migration** : Définir les tables, clés étrangères, index et politiques RLS dans `supabase/migrations/`.
2. **Types & Validation** : Générer / écrire les interfaces TypeScript et schémas Zod stricts.
3. **Logique Métier Backend** : Service déterministe avec Server Actions ou Route Handlers sécurisés.
4. **Interface Utilisateur** : Composants accessibles, responsive, respectant la charte graphique et prévoyant tous les états (chargement, erreur, données vides).
5. **Tests Automatisés** : Tests unitaires de la logique métier et tests d'isolation multi-tenant.
6. **Vérification** : Lint, vérification TypeScript (`pnpm typecheck`), build sans warning bloquant.
