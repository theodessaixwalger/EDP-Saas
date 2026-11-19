import React from "react";
import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { DemoProvider } from "@/features/demo/demo-context";
import { DemoBanner } from "@/features/demo/demo-banner";
import { SkipLink } from "@/components/shared/skip-link";

// Espace privé : jamais indexé par les moteurs de recherche.
export const metadata: Metadata = {
  title: "Espace commerçant",
  description:
    "Espace commerçant LocalBoost : pilotez vos contenus, votre fidélité, vos campagnes et vos avis clients depuis un tableau de bord unique.",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, organization, establishments, demo } = await getDashboardContext();

  const sidebarProps = {
    currentOrganization: organization,
    organizations: [organization],
    establishments,
    currentEstablishment: establishments[0],
  };

  return (
    // Coque (sidebar) → canevas encastré (header + contenu défilant) → cartes.
    <DemoProvider demo={demo}>
    <SkipLink />
    <div className="flex h-dvh overflow-hidden bg-sidebar text-foreground">
      <DashboardSidebar {...sidebarProps} />

      <div className="flex min-w-0 flex-1 flex-col lg:py-2 lg:pr-2">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background lg:rounded-xl lg:border lg:border-sidebar-border">
          <DashboardHeader user={profile} sidebar={sidebarProps} />
          {demo && <DemoBanner />}
          <main id="contenu" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto focus:outline-none">
            <div
              key={demo ? "demo" : "reel"}
              className="mx-auto w-full max-w-[76rem] px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-9"
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
    </DemoProvider>
  );
}
