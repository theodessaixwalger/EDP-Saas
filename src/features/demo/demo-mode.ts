import "server-only";
import { cookies } from "next/headers";

export const DEMO_COOKIE = "lb_demo";

/**
 * Mode démo : affiche un jeu de données fictives pour prévisualiser l'espace
 * commerçant « rempli ». Toujours signalé par un bandeau (cf. DemoBanner) :
 * aucune simulation non déclarée (AGENTS.md).
 */
export async function isDemoMode(): Promise<boolean> {
  const store = await cookies();
  return store.get(DEMO_COOKIE)?.value === "1";
}
