# LocalBoost — Déploiement & Configuration

## 1. Variables d'Environnement

Un fichier `.env.example` doit être maintenu à la racine du projet.

### Variables Requises

```ini
# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_ENV="development" # development | staging | production

# Supabase (Public & SSR)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Supabase (Serveur uniquement - JAMAIS exposé au client)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Stripe (Paiements & Abonnements)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PRO="price_..."
STRIPE_PRICE_BUSINESS="price_..."

# Brevo (Sendinblue)
BREVO_API_KEY="xkeysib-..."
BREVO_SENDER_EMAIL="contact@localboost.fr"
BREVO_SENDER_NAME="LocalBoost"
BREVO_WEBHOOK_SECRET="secret_..."

# Google APIs (Business Profile, Places, PageSpeed)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_PLACES_API_KEY="..."
GOOGLE_PAGESPEED_API_KEY="..."

# Meta Graph API (Instagram / Facebook)
META_APP_ID="..."
META_APP_SECRET="..."
```

---

## 2. Déploiement Local

```bash
# 1. Cloner le projet et installer les dépendances
pnpm install

# 2. Configurer l'environnement local
cp .env.example .env.local

# 3. Lancer les migrations Supabase en local (si Supabase CLI installé) ou sur un projet Supabase distant
supabase db push

# 4. Lancer le serveur de développement
pnpm dev

# 5. Exécuter la suite de tests
pnpm test
pnpm typecheck
```

---

## 3. Déploiement en Production

- **Frontend & API Routes** : Vercel ou conteneur Docker Node.js 22.
- **Base de Données & Stockage** : Instance Supabase Cloud Pro avec sauvegardes quotidiennes automatisées (PITR recommandé).
- **Contrôles Pré-Déploiement (CI/CD)** :
  1. `pnpm lint` : Zéro warning bloquant.
  2. `pnpm typecheck` : Zéro erreur TypeScript.
  3. `pnpm test` : 100% des tests unitaires et multi-tenant au vert.
  4. `pnpm build` : Compilation Next.js réussie.
