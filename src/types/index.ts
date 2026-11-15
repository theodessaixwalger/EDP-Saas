// ==============================================================================
// LOCALBOOST — Typages Métier et Base de Données
// ==============================================================================

export type UserRole = "super_admin" | "owner" | "manager" | "staff";

export type Permission =
  | "org:manage"
  | "org:billing"
  | "org:members"
  | "establishment:create"
  | "establishment:update"
  | "establishment:delete"
  | "establishment:settings"
  | "content:create"
  | "content:publish"
  | "content:delete"
  | "campaigns:manage"
  | "loyalty:scan"
  | "loyalty:reward_redeem"
  | "loyalty:settings"
  | "analytics:view"
  | "reviews:reply"
  | "audit:view";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  billing_email: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: "owner" | "manager" | "staff";
  created_at: string;
  profile?: Profile;
}

export interface BusinessCategory {
  id: string;
  code: string;
  name: string;
  icon: string | null;
  description: string | null;
  default_modules: string[];
  settings_schema: Record<string, unknown>;
  created_at: string;
}

export interface Establishment {
  id: string;
  organization_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: BusinessCategory;
}

export interface BusinessSetting {
  id: string;
  establishment_id: string;
  module_key: string;
  is_enabled: boolean;
  config_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  organization_id: string | null;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface SubscriptionPlan {
  id: "starter" | "pro" | "business";
  name: string;
  priceMonthly: number;
  description: string;
  features: string[];
  maxEstablishments: number;
  highlighted?: boolean;
}
