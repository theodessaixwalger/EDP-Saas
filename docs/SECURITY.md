# LocalBoost — Sécurité & Conformité RGPD

## 1. Principes de Sécurité Non-Négociables

La sécurité de LocalBoost est bâtie selon les principes de **défense en profondeur** et de **moindre privilège**.

1. **Isolation Multi-Tenant par Défaut** :
   - PostgreSQL Row Level Security (RLS) est actif sur 100% des tables exposées.
   - Les requêtes ne peuvent jamais se contenter d'un filtre `WHERE organization_id = ...` injecté côté client sans validation cryptographique de la session par Supabase Auth.
   - Les fonctions stockées `get_user_organizations()` et `has_org_permission()` s'exécutent avec `SECURITY DEFINER` et un `search_path` strict.

2. **Protection de la Clé Service Role** :
   - La clé secrète `SUPABASE_SERVICE_ROLE_KEY` n'est JAMAIS importée ni référencée dans le code client ou les composants Next.js non-serveur (`'use client'`).
   - Seuls les webhooks (Stripe, Brevo) et les jobs d'arrière-plan sécurisés utilisent le client d'administration privilégié.

3. **Validation Schématique Exhaustive (Zod)** :
   - Tout payload entrant (requête API, Server Action, webhook) est validé par un schéma Zod strict.
   - Rejet automatique des champs inattendus (`.strict()`).
   - Assainissement contre les injections XSS et SQL (échappement via l'ORM Supabase / requêtes paramétrées).

---

## 2. Politiques Row Level Security (RLS)

### Fonctions d'aide SQL
```sql
-- Récupération sécurisée des organisations de l'utilisateur courant
CREATE OR REPLACE FUNCTION public.get_user_organizations()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id 
  FROM public.organization_members 
  WHERE user_id = auth.uid();
$$;

-- Vérification de rôle au sein d'une organisation
CREATE OR REPLACE FUNCTION public.has_org_role(org_id UUID, required_roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.organization_members
    WHERE organization_id = org_id 
      AND user_id = auth.uid() 
      AND role = ANY(required_roles)
  );
$$;
```

### Exemple de politique sur les établissements
```sql
CREATE POLICY "Les membres de l'organisation peuvent lire les établissements"
  ON public.establishments
  FOR SELECT
  USING (organization_id IN (SELECT get_user_organizations()));

CREATE POLICY "Seuls les propriétaires et responsables peuvent modifier un établissement"
  ON public.establishments
  FOR UPDATE
  USING (has_org_role(organization_id, ARRAY['owner', 'manager']));
```

---

## 3. Mécanismes Anti-Fraude Fidélité

Le programme de fidélité par QR code est soumis à des règles de sécurité strictes :
1. **Interdiction du scan public passif** :
   - Un client scannant un QR code de boutique ne peut PAS s'auto-attribuer de points.
   - L'attribution de points nécessite la validation par un membre authentifié du personnel (`staff`, `manager` ou `owner`).
2. **QR Code Client Dynamique & Temporisé** :
   - Le QR code affiché sur le téléphone du client intègre un jeton cryptographique à courte durée de vie (TOTP / nonce régénéré toutes les 60 secondes).
3. **Idempotence des Transactions** :
   - Chaque transaction de points génère un `idempotency_token` unique côté client employé pour interdire la double validation accidentelle en cas de double clic ou de latence réseau.
4. **Plafonds & Alertes** :
   - Seuil maximal de points attribuables par transaction (configurable selon le secteur).
   - Journalisation complète (`loyalty_transactions`) avec identifiant de l'employé ayant validé l'opération.

---

## 4. Conformité RGPD & Protection des Données Personnelles

1. **Séparation Stricte des Finalités** :
   - Finalité Fidélité (Gestion du compte client, historique d'achats) : Base contractuelle / Intérêt légitime.
   - Finalité Marketing (Envoi d'offres promotionnelles, relances par email) : **Consentement explicite et positif (Opt-in)**.
   - Aucun pré-cochage de case d'acceptation publicitaire.
2. **Preuve et Traçabilité du Consentement** :
   - Table `customer_consents` enregistrant : date/heure, canal de collecte, version textuelle de la mention RGPD, empreinte de traçabilité.
3. **Droit au Retrait & Liste d'Opposition** :
   - Lien de désinscription automatique dans tous les emails marketing envoyés via Brevo.
   - La table `customer_preferences` est mise à jour immédiatement en cas de désabonnement, interdisant tout futur envoi de campagne.
4. **Droit à l'Oubli & Export** :
   - Procédure de purge ou d'anonymisation des données clients sur simple demande.
   - Possibilité d'exporter l'intégralité des données d'un client au format JSON.
