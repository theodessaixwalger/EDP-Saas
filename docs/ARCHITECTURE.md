# LocalBoost — Architecture Technique

## 1. Vue d'Ensemble du Système

L'architecture de LocalBoost est conçue selon les principes de modularité, de sécurité stricte, de haute performance et d'isolation multi-tenant.

```
                              ┌───────────────────────────────────┐
                              │     Navigateur Web / PWA Mobile   │
                              │ (Desktop Commerçant / App Mobile) │
                              └─────────────────┬─────────────────┘
                                                │ HTTPS / WSS
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           Next.js App Router (Vercel)                           │
│                                                                                 │
│   ┌─────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐   │
│   │  Server Components  │  │    Server Actions    │  │    Route Handlers    │   │
│   │   (Data Fetching)   │  │ (Mutations Sécurisées│  │ (Webhooks & API Jobs)│   │
│   └──────────┬──────────┘  └──────────┬───────────┘  └──────────┬───────────┘   │
│              │                        │                         │               │
│              ▼                        ▼                         ▼               │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │     Couche d'Accès & Sécurité (RBAC + Isolation Tenant + Zod)            │   │
│   └───────────────────────────────────┬─────────────────────────────────────┘   │
└───────────────────────────────────────┼─────────────────────────────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
┌───────────────────────────────────────┐   ┌─────────────────────────────────────┐
│          Supabase Backend             │   │         Services Externes           │
│                                       │   │                                     │
│  - PostgreSQL 15+ (RLS Multi-Tenant)  │   │  - Stripe (Facturation & Abonnements│
│  - Supabase Auth (Sessions & Cookies) │   │  - Brevo (Emails transactionnels)   │
│  - Supabase Storage (Médias / Assets) │   │  - Google Business & Places API     │
│  - Realtime / Webhooks internes       │   │  - Meta / Instagram Graph API       │
│                                       │   │  - Open-Meteo & OpenAgenda APIs     │
└───────────────────────────────────────┘   └─────────────────────────────────────┘
```

---

## 2. Architecture Multi-Tenant (3 Niveaux)

L'architecture sépare rigoureusement la gouvernance en 3 niveaux :

```
┌────────────────────────────────────────────────────────┐
│                        PLATEFORME                      │
│     (Super-Administrateurs LocalBoost, Plans SaaS)     │
└───────────────────────────┬────────────────────────────┘
                            │ 1:N
                            ▼
┌────────────────────────────────────────────────────────┐
│                       ORGANISATION                     │
│    (Entreprise / Société cliente, Compte de facturation)│
└───────────────────────────┬────────────────────────────┘
                            │ 1:N
                            ▼
┌────────────────────────────────────────────────────────┐
│                      ÉTABLISSEMENT                     │
│       (Point de vente physique, Boutique, Salon...)    │
│      - Données marketing, CRM clients, fidélité        │
│      - Réseaux sociaux & intégrations connectées        │
└────────────────────────────────────────────────────────┘
```

### Modèle d'appartenance et rôles

1. **Super Administrateur** (`super_admin`) : Personnel LocalBoost accédant à l'espace `/admin` pour la maintenance, facturation globale et flags de déploiement.
2. **Propriétaire** (`owner`) : Créateur de l'organisation. Gère les abonnements Stripe, les établissements, invite les responsables et dispose de tous les droits.
3. **Responsable** (`manager`) : Rattaché à un ou plusieurs établissements. Pilote les contenus, les campagnes, le CRM et les statistiques.
4. **Employé** (`staff`) : Accès restreint à l'interface de caisse/point de vente pour scanner les QR codes de fidélité et valider les transactions de points en moins de 3 secondes.

---

## 3. Déterminisme et Absence Totale d'IA Générative

Conformément à la directive maîtresse, aucune API de modèle de langage (LLM) ni aucun algorithme probabiliste n'est utilisé pour générer du contenu ou des décisions.

### Moteur de Recommandations (`src/features/marketing-actions/engine.ts`)
- Repose sur une matrice de conditions déterministes évaluant :
  - **Météo** (pluviométrie > seuil, température anormale).
  - **Calendrier civil** (vacances scolaires zone A/B/C, jours fériés, marronniers).
  - **Métriques réelles** (baisse de fréquentation CRM > 20%, volume d'avis non répondus > 3, inactivité réseaux > 7 jours).
- Chaque règle produit une action structurée avec :
  - Code règle unique (ex: `RULE_WEATHER_RAIN_PROMO`).
  - Justification factuelle claire exposée au commerçant.
  - Template d'offre pré-rédigé paramétrable.

### Moteur de Diagnostic (`src/features/diagnostics/calculator.ts`)
- Calcul de score sur 100 basé sur une grille de pondération standardisée :
  - **Google Business Profile (40 pts)** : Fiche vérifiée (10), horaires renseignés (5), photos récentes (5), note >= 4.2 (10), taux de réponse aux avis >= 80% (10).
  - **Performance Web (30 pts)** : Données réelles PageSpeed (FCP, LCP, CLS, score mobile).
  - **Cohérence Sociale (30 pts)** : Présence de comptes officiels, récurrence hebdomadaire des publications.
- Règle de transparence : si une API externe n'est pas encore connectée, le diagnostic affiche `Non évalué` plutôt que de pénaliser arbitrairement la note.

---

## 4. Gestion des Flux Asynchrones et Intégrations

Les intégrations externes (Stripe, Brevo, Google, Meta) sont isolées :

1. **Idempotence & Files d'attente** :
   - Table `scheduled_jobs` stockant le statut (`pending`, `processing`, `completed`, `failed`), le nombre d'essais et l'erreur éventuelle.
   - Webhooks Stripe et Brevo vérifient l'unicité de l'identifiant d'événement via `webhook_events` pour prévenir tout double traitement.
2. **Mode Dégradé (Manual Fallback)** :
   - Si les autorisations Meta/Google ne permettent pas l'écriture directe, LocalBoost bascule en mode « Export & Rappel » : le contenu est validé, les médias optimisés et téléchargeables en 1 clic avec notification au commerçant.
