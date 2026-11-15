import React from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Organization, Establishment, Profile } from "@/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initial default tenant context (for demonstration and initial onboarding)
  const defaultOrg: Organization = {
    id: "org-demo-1",
    name: "Groupe Artisan & Co",
    slug: "artisan-and-co",
    billing_email: "direction@artisan-co.fr",
    stripe_customer_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const defaultEstablishments: Establishment[] = [
    {
      id: "est-demo-1",
      organization_id: "org-demo-1",
      category_id: "cat-boulangerie",
      name: "Boulangerie du Marché — Centre",
      slug: "boulangerie-du-marche-centre",
      address: "14 Rue du Commerce",
      city: "Lyon",
      postal_code: "69002",
      country: "FR",
      latitude: 45.764043,
      longitude: 4.835659,
      phone: "04 78 00 12 34",
      email: "lyon-centre@boulangeriedumarche.fr",
      website_url: "https://boulangeriedumarche.fr",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "est-demo-2",
      organization_id: "org-demo-1",
      category_id: "cat-boulangerie",
      name: "Boulangerie du Marché — Gare",
      slug: "boulangerie-du-marche-gare",
      address: "2 Boulevard des Brotteaux",
      city: "Lyon",
      postal_code: "69006",
      country: "FR",
      latitude: 45.768123,
      longitude: 4.859231,
      phone: "04 78 00 56 78",
      email: "lyon-gare@boulangeriedumarche.fr",
      website_url: "https://boulangeriedumarche.fr",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const defaultProfile: Profile = {
    id: "usr-demo-1",
    email: "alexandre.martin@artisan-co.fr",
    full_name: "Alexandre Martin",
    avatar_url: null,
    phone: "06 12 34 56 78",
    is_super_admin: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="flex min-h-screen bg-surface-bg text-slate-900">
      <DashboardSidebar
        currentOrganization={defaultOrg}
        organizations={[defaultOrg]}
        establishments={defaultEstablishments}
        currentEstablishment={defaultEstablishments[0]}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader user={defaultProfile} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
