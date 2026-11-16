"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Le mode sombre est disponible dans l'espace commerçant (/dashboard).
 * Les pages publiques (marketing, auth, portail fidélité) restent en clair :
 * leur charte est conçue pour un fond clair.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const themable = pathname?.startsWith("/dashboard") ?? false;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={themable ? undefined : "light"}
    >
      {children}
    </NextThemesProvider>
  );
}
