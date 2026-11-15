-- ==============================================================================
-- LOCALBOOST — Migration Initiale (Phase 1 : Fondations Multi-Tenant)
-- Version : 20261115000000_phase1_foundations.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. SCHÉMAS & TYPES
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('owner', 'manager', 'staff');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 3. PROFILES (Extension des utilisateurs Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ORGANIZATIONS (Comptes entreprises / entités de facturation)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  billing_email TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ORGANIZATION_MEMBERS (Rattachement Utilisateur <-> Organisation)
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'staff',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_org_user UNIQUE (organization_id, user_id)
);

-- 6. BUSINESS_CATEGORIES (Référentiel des 10 secteurs de commerces locaux)
CREATE TABLE IF NOT EXISTS public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  default_modules TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  settings_schema JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ESTABLISHMENTS (Points de vente physiques)
CREATE TABLE IF NOT EXISTS public.establishments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.business_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT NOT NULL DEFAULT 'FR',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  phone TEXT,
  email TEXT,
  website_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_org_establishment_slug UNIQUE (organization_id, slug)
);

-- 8. ESTABLISHMENT_MEMBERS (Affectation fine à un établissement précis)
CREATE TABLE IF NOT EXISTS public.establishment_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'staff',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_est_user UNIQUE (establishment_id, user_id)
);

-- 9. INVITATIONS (Invitations d'utilisateurs par email)
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  establishment_id UUID REFERENCES public.establishments(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'staff',
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BUSINESS_SETTINGS (Activation modulaire par établissement)
CREATE TABLE IF NOT EXISTS public.business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  config_json JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_est_module UNIQUE (establishment_id, module_key)
);

-- 11. AUDIT_LOGS (Journalisation des actions sensibles)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB NOT NULL DEFAULT '{}'::JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEX DE PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_establishments_org ON public.establishments(organization_id);
CREATE INDEX IF NOT EXISTS idx_establishments_category ON public.establishments(category_id);
CREATE INDEX IF NOT EXISTS idx_est_members_user ON public.establishment_members(user_id);
CREATE INDEX IF NOT EXISTS idx_est_members_est ON public.establishment_members(establishment_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id);

-- ==============================================================================
-- FONCTIONS D'AIDE ET SÉCURITÉ RLS
-- ==============================================================================

-- Récupérer les identifiants d'organisations de l'utilisateur actif
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

-- Vérifier si l'utilisateur possède un rôle requis dans l'organisation
CREATE OR REPLACE FUNCTION public.has_org_role(target_org_id UUID, required_roles user_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.organization_members
    WHERE organization_id = target_org_id 
      AND user_id = auth.uid() 
      AND role = ANY(required_roles)
  );
$$;

-- Vérifier si l'utilisateur est super-administrateur
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_super_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- Trigger automatique de création de profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger automatique de mise à jour de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_establishments_updated_at BEFORE UPDATE ON public.establishments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_business_settings_updated_at BEFORE UPDATE ON public.business_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- POLITIQUES ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Les utilisateurs peuvent lire leur propre profil"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR is_super_admin());

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- 2. BUSINESS_CATEGORIES (Référentiel public en lecture pour tous les authentifiés)
CREATE POLICY "Catégories lisibles par tout utilisateur connecté"
  ON public.business_categories FOR SELECT
  USING (auth.role() = 'authenticated');

-- 3. ORGANIZATIONS
CREATE POLICY "Membres lisent leur organisation"
  ON public.organizations FOR SELECT
  USING (id IN (SELECT get_user_organizations()) OR is_super_admin());

CREATE POLICY "Propriétaires modifient leur organisation"
  ON public.organizations FOR UPDATE
  USING (has_org_role(id, ARRAY['owner'::user_role]) OR is_super_admin());

-- 4. ORGANIZATION_MEMBERS
CREATE POLICY "Membres lisent la liste des membres de leur organisation"
  ON public.organization_members FOR SELECT
  USING (organization_id IN (SELECT get_user_organizations()) OR is_super_admin());

CREATE POLICY "Propriétaires gèrent les membres de l'organisation"
  ON public.organization_members FOR ALL
  USING (has_org_role(organization_id, ARRAY['owner'::user_role]) OR is_super_admin());

-- 5. ESTABLISHMENTS
CREATE POLICY "Membres lisent les établissements de leur organisation"
  ON public.establishments FOR SELECT
  USING (organization_id IN (SELECT get_user_organizations()) OR is_super_admin());

CREATE POLICY "Propriétaires et managers créent et modifient les établissements"
  ON public.establishments FOR ALL
  USING (has_org_role(organization_id, ARRAY['owner'::user_role, 'manager'::user_role]) OR is_super_admin());

-- 6. ESTABLISHMENT_MEMBERS
CREATE POLICY "Membres lisent les affectations d'établissement"
  ON public.establishment_members FOR SELECT
  USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE organization_id IN (SELECT get_user_organizations())
    ) OR is_super_admin()
  );

CREATE POLICY "Propriétaires et managers gèrent les affectations d'établissement"
  ON public.establishment_members FOR ALL
  USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE has_org_role(organization_id, ARRAY['owner'::user_role, 'manager'::user_role])
    ) OR is_super_admin()
  );

-- 7. BUSINESS_SETTINGS
CREATE POLICY "Membres lisent les paramètres de leurs établissements"
  ON public.business_settings FOR SELECT
  USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE organization_id IN (SELECT get_user_organizations())
    ) OR is_super_admin()
  );

CREATE POLICY "Propriétaires et managers modifient les paramètres d'établissement"
  ON public.business_settings FOR ALL
  USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE has_org_role(organization_id, ARRAY['owner'::user_role, 'manager'::user_role])
    ) OR is_super_admin()
  );

-- 8. AUDIT_LOGS
CREATE POLICY "Propriétaires lisent les logs de leur organisation"
  ON public.audit_logs FOR SELECT
  USING (has_org_role(organization_id, ARRAY['owner'::user_role]) OR is_super_admin());
