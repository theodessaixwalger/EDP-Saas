import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Establishment, Organization, Profile } from "@/types";
import { isDemoMode } from "@/features/demo/demo-mode";
import { demoEstablishments, demoOrganization, demoProfile } from "@/features/demo/demo-data";

export interface DashboardContext {
  profile: Profile;
  organization: Organization;
  /** false tant que l'organisation n'existe qu'en métadonnées (inscription non finalisée). */
  organizationPersisted: boolean;
  role: "owner" | "manager" | "staff" | null;
  establishments: Establishment[];
  /** Mode démo actif : données fictives, signalées par un bandeau. */
  demo: boolean;
}

/**
 * Contexte multi-tenant de l'espace commerçant, chargé une fois par requête
 * (dédupliqué via React.cache entre le layout et les pages).
 * Les lectures passent par le client Supabase de l'utilisateur : la RLS
 * garantit qu'aucune donnée d'une autre organisation n'est renvoyée.
 */
export const getDashboardContext = cache(async (): Promise<DashboardContext> => {
  if (await isDemoMode()) {
    return {
      profile: demoProfile,
      organization: demoOrganization,
      organizationPersisted: true,
      role: "owner",
      establishments: demoEstablishments,
      demo: true,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const now = new Date().toISOString();
  let profile: Profile | null = null;
  let organization: Organization | null = null;
  let role: DashboardContext["role"] = null;
  let establishments: Establishment[] = [];

  if (user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    profile = (profileData as Profile | null) ?? {
      id: user.id,
      email: user.email ?? "",
      full_name:
        (user.user_metadata?.full_name as string | undefined) ??
        user.email?.split("@")[0] ??
        "Mon compte",
      avatar_url: null,
      phone: null,
      is_super_admin: false,
      created_at: user.created_at,
      updated_at: user.created_at,
    };

    const { data: members } = await supabase
      .from("organization_members")
      .select("organization_id, role, organizations(*)")
      .eq("user_id", user.id);

    const membership = members?.[0];
    if (membership?.organizations) {
      organization = membership.organizations as unknown as Organization;
      role = membership.role as DashboardContext["role"];

      const { data: ests } = await supabase
        .from("establishments")
        .select("*")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: true });

      establishments = (ests as Establishment[] | null) ?? [];
    }
  }

  return {
    profile: profile ?? {
      id: user?.id ?? "usr-init",
      email: user?.email ?? "",
      full_name: (user?.user_metadata?.full_name as string | undefined) ?? "Commerçant",
      avatar_url: null,
      phone: null,
      is_super_admin: false,
      created_at: now,
      updated_at: now,
    },
    organization: organization ?? {
      id: "org-init",
      name: (user?.user_metadata?.organization_name as string | undefined) ?? "Mon entreprise",
      slug: "mon-entreprise",
      billing_email: user?.email ?? null,
      stripe_customer_id: null,
      created_at: now,
      updated_at: now,
    },
    organizationPersisted: organization !== null,
    role,
    establishments,
    demo: false,
  };
});
