# LocalBoost — Feuille de Route & Avancement (ROADMAP)

## Statut Global du Projet

- **Phase Active** : **PHASE 1 — Fondations Techniques & Socle Multi-Tenant**
- **Date de début** : 15 Novembre 2026
- **Environnement** : Next.js 15+ (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, pnpm.

---

## Les 7 Phases de Développement

### 🟢 PHASE 1 — Fondations Techniques & Socle Multi-Tenant [EN COURS]
**Objectif** : Mettre en place l'architecture socle, la sécurité, l'isolation multi-tenant, le design system et la première expérience utilisateur.
- [x] Audit de l'environnement et initialisation de la documentation (`AGENTS.md`, `docs/*`, `.cursor/rules/`).
- [ ] Initialisation du projet Next.js avec TypeScript strict, Tailwind CSS et configuration pnpm.
- [ ] Mise en place du Design System B2B Premium (palette `#F7F8FA`, `#111827`, `#4F46E5`, composants shadcn/ui).
- [ ] Schéma PostgreSQL Supabase des fondations : profils, organisations, membres, établissements, rôles et RLS stricte.
- [ ] Utilitaires d'authentification Supabase SSR (client, serveur, middleware).
- [ ] Logique RBAC de permissions et validation de contexte multi-tenant côté serveur.
- [ ] Landing page commerciale complète et responsive (Hero, Problème, Solution, Fonctionnalités, Secteurs, Tarifs, FAQ, Footer).
- [ ] Interface du Dashboard avec sélecteur d'organisation et d'établissement, sidebar sobre et navigation.
- [ ] Suite de tests unitaires et d'intégration validant l'étanchéité multi-tenant.
- **Critère de validation** : Deux organisations distinctes peuvent coexister dans le système sans aucune fuite de données, vérifié par tests automatisés.

---

### ⚪ PHASE 2 — Produit Cœur : Fidélité, CRM & Contenus [À VENIR]
- [ ] Module 1 : Gestion des contenus marketing (création, médias, statuts, historique).
- [ ] Module 2 : Calendrier éditorial interactif FullCalendar.
- [ ] Module 3 : Programme de fidélité QR code anti-fraude (PWA mobile client + interface rapide employé).
- [ ] CRM commerçant : fiches clients, historique de transactions, gestion des consentements RGPD.
- **Critère de validation** : Un commerçant peut créer du contenu, planifier sur son calendrier, et attribuer des points de fidélité via scan sécurisé à de vrais clients.

---

### ⚪ PHASE 3 — Moteur Marketing & Relances [À VENIR]
- [ ] Module 4 : Moteur de recommandations déterministe (météo Open-Meteo, vacances, fréquentation).
- [ ] Module 5 : Campagnes commerciales multi-secteurs et segmentation automatique (inactifs, VIP, anniversaires).
- [ ] Module 6 : Relances automatiques d'inactivité avec intégration Brevo et désinscription légale.
- **Critère de validation** : Déclenchement automatique et déterministe d'une relance par email conforme aux consentements.

---

### ⚪ PHASE 4 — Analytics, Diagnostic & E-Réputation [À VENIR]
- [ ] Module 7 : Diagnostic de présence locale noté sur 100 (Google Business Profile + PageSpeed Insights).
- [ ] Module 8 : Tableau de bord analytique et génération du rapport mensuel exportable en PDF.
- [ ] Module 9 : Surveillance des concurrents locaux via Google Places.
- [ ] Module 11 : Suivi et réponse aux avis Google avec modèles paramétrables.
- **Critère de validation** : Métriques fiables, réelles, sans aucun chiffre inventé.

---

### ⚪ PHASE 5 — Intégrations Réseaux Sociaux & File d'Attente [À VENIR]
- [ ] Module 10 : Connexions OAuth officielles (Meta Graph API, Google Business Profile).
- [ ] File d'attente de publication asynchrone avec retries et fallback manuel guidé.
- **Critère de validation** : Publication effective ou export assisté opérationnel sans simulation.

---

### ⚪ PHASE 6 — Facturation Stripe, Admin & Commercialisation [À VENIR]
- [ ] Intégration Stripe Billing (Checkout, Portail client, Webhooks idempotents).
- [ ] Gestion des abonnements (`starter`, `pro`, `business`) et contrôle des quotas.
- [ ] Espace super-administrateur `/admin` pour l'équipe LocalBoost.
- [ ] Parcours d'onboarding commerçant en 5 étapes.
- **Critère de validation** : Parcours d'inscription complet avec souscription et paiement Stripe en mode test validé.

---

### ⚪ PHASE 7 — Extensions & Générateur de Sites Vitrines [À VENIR]
- [ ] Module 12 : Générateur de sites vitrines locaux avec SEO Schema.org LocalBusiness.
- [ ] Domaines personnalisés et sous-domaines automatiques.
- [ ] Nouveaux secteurs d'activité et optimisations de performance.
