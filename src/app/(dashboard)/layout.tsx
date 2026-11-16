import React from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { getDashboardContext } from "@/features/organizations/dashboard-context";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, organization, establishments } = await getDashboardContext();

  const sidebarProps = {
    currentOrganization: organization,
    organizations: [organization],
    establishments,
    currentEstablishment: establishments[0],
  };

  return (
    // Coque (sidebar) → canevas encastré (header + contenu défilant) → cartes.
    <div className="flex h-dvh overflow-hidden bg-sidebar text-foreground">
      <DashboardSidebar {...sidebarProps} />

      <div className="flex min-w-0 flex-1 flex-col lg:py-2 lg:pr-2">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background lg:rounded-xl lg:border lg:border-sidebar-border">
          <DashboardHeader user={profile} sidebar={sidebarProps} />
          <main id="contenu" className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[76rem] px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-9">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
