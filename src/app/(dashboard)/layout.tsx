import React from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { createClient } from "@/lib/supabase/server";
import { Organization, Establishment, Profile } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Load real profile from DB or user metadata
  let profile: Profile | null = null;
  let currentOrg: Organization | null = null;
  let establishments: Establishment[] = [];

  if (user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    profile = profileData || {
      id: user.id,
      email: user.email || "",
      full_name: (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Mon Compte",
      avatar_url: null,
      phone: null,
      is_super_admin: false,
      created_at: user.created_at,
      updated_at: user.created_at,
    };

    // Load user's actual organizations from organization_members
    const { data: members } = await supabase
      .from("organization_members")
      .select("organization_id, role, organizations(*)")
      .eq("user_id", user.id);

    if (members && members.length > 0 && members[0].organizations) {
      currentOrg = members[0].organizations as unknown as Organization;
      const { data: ests } = await supabase
        .from("establishments")
        .select("*")
        .eq("organization_id", currentOrg.id);

      if (ests) {
        establishments = ests as Establishment[];
      }
    }
  }

  // Pure zero-data initial fallback:
  const activeOrg: Organization = currentOrg || {
    id: "org-init",
    name: (user?.user_metadata?.organization_name as string) || "Mon Entreprise",
    slug: "mon-entreprise",
    billing_email: user?.email || null,
    stripe_customer_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const activeProfile: Profile = profile || {
    id: user?.id || "usr-init",
    email: user?.email || "",
    full_name: (user?.user_metadata?.full_name as string) || "Commerçant",
    avatar_url: null,
    phone: null,
    is_super_admin: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="flex min-h-screen bg-surface-bg text-slate-900">
      <DashboardSidebar
        currentOrganization={activeOrg}
        organizations={[activeOrg]}
        establishments={establishments}
        currentEstablishment={establishments[0]}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader user={activeProfile} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
