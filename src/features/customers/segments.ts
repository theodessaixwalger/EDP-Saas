import { Gift, Moon, Repeat, Sparkle, UserCheck, type LucideIcon } from "lucide-react";

/** Segments déterministes du Module 5 (docs/PRODUCT.md). */
export type SegmentKey = "new" | "active" | "regular" | "inactive" | "near_reward";

export interface SegmentDefinition {
  key: SegmentKey;
  label: string;
  rule: string;
  icon: LucideIcon;
}

export const SEGMENTS: SegmentDefinition[] = [
  { key: "new", label: "Nouveaux", rule: "Premier passage enregistré récemment", icon: Sparkle },
  { key: "active", label: "Actifs", rule: "Au moins une transaction sur la période", icon: UserCheck },
  { key: "regular", label: "Réguliers", rule: "Passages répétés et fréquents", icon: Repeat },
  { key: "inactive", label: "Inactifs", rule: "Plus de 30 jours sans transaction", icon: Moon },
  { key: "near_reward", label: "Proches d'une récompense", rule: "Solde de points proche d'un palier", icon: Gift },
];
