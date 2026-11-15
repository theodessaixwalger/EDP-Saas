# LocalBoost — Connecteurs & Intégrations Externes

## 1. Principes d'Intégration

- **Isolation Stricte** : Chaque service tiers possède un dossier isolé sous `src/services/` avec son client typé, ses schémas de réponse Zod et sa gestion d'exceptions.
- **Résilience** : Les pannes des services externes ne doivent JAMAIS bloquer l'interface commerçant.
- **Observabilité** : Tous les appels sont tracés dans `integration_logs` (durée, code HTTP, statut).
- **Mode Dégradé (Fallback Manuel)** : En l'absence de clé API ou en cas de quota dépassé, l'application reste utilisable en mode manuel assisté.

---

## 2. Dictionnaire des Connecteurs

### A. Stripe Billing & Payments
- **Rôle** : Gestion des abonnements SaaS LocalBoost (`starter`, `pro`, `business`), paiements sécurisés et portail de facturation.
- **Endpoints clés** :
  - `POST /api/billing/create-checkout-session`
  - `POST /api/billing/create-portal-session`
  - `POST /api/webhooks/stripe`
- **Sécurité** : Validation de la signature du webhook via `stripe.webhooks.constructEvent(body, signature, secret)`. Traitement idempotent basé sur l'ID d'événement Stripe.

### B. Brevo (Sendinblue)
- **Rôle** : Envoi des emails transactionnels (invitations, réinitialisation de mot de passe, alertes d'avis) et des campagnes marketing ciblées (Module 5 & 6).
- **Fonctionnalités** :
  - Synchronisation des contacts avec attributs sectoriels.
  - Gestion des listes de désinscriptions et de rebonds (bounces).
  - Webhook de suivi de délivrance : `POST /api/webhooks/brevo`.
- **Règles RGPD** : Blocage préventif de l'envoi si le client n'a pas de consentement marketing valide dans `customer_consents`.

### C. Google Business Profile & Places API
- **Rôle** : Récupération des informations d'établissement, des avis clients (Module 11) et publication de posts d'actualité.
- **Authentification** : Flux OAuth 2.0 avec scopes `https://www.googleapis.com/auth/business.manage`.
- **Politique de stockage** : Respect des conditions d'utilisation de Google concernant le cache et l'expiration des données.

### D. Google PageSpeed Insights API
- **Rôle** : Audit technique déterministe du site web du commerçant pour le Module 7 (Diagnostic Marketing).
- **Indicateurs mesurés** :
  - Score Mobile & Desktop (0 à 100).
  - Core Web Vitals : LCP (Largest Contentful Paint), FID/INP, CLS (Cumulative Layout Shift).
  - Audit SEO technique et accessibilité.

### E. Meta Graph API (Instagram & Facebook)
- **Rôle** : Analyse de la fréquence des publications, publication de photos/vidéos sur les comptes professionnels Instagram et pages Facebook.
- **Contraintes** :
  - Utilisation exclusive des comptes Instagram Professionnels ou Créateurs rattachés à une Page Facebook.
  - Respect strict des limites d'appel (Rate Limiting) avec temporisation automatique.
  - Mode manuel : si les permissions ne permettent pas l'auto-publication directe, LocalBoost propose le téléchargement des médias prêts au format avec le texte copiable en 1 clic.

### F. Open-Meteo API
- **Rôle** : Prévisions météorologiques locales à 7 jours (températures, précipitations, vent).
- **Usage Métier** : Déclenchement d'actions marketing déterministes (Module 4) :
  - Pluie prévue sur un commerce de restauration en terrasse -> Suggestion d'offre livraison / intérieur ou offre réconfortante.
  - Vague de chaleur -> Suggestion d'offres rafraîchissantes pour cafés/bars/glaciers.
- **Accès** : API publique sans authentification requise, requêtée par coordonnées géographiques (latitude/longitude de l'établissement).

### G. Données Publiques Événements & Vacances Scolaires
- **Rôle** : Détection des calendriers scolaires français (Zones A, B, C) et des jours fériés légaux.
- **Usage Métier** : Anticipation des campagnes promotionnelles (rentrée scolaire, fêtes de fin d'année, ponts de mai).
