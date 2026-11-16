import {
  Activity,
  BarChart3,
  CalendarDays,
  Contact,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  QrCode,
  Settings,
  Share2,
  Star,
  Store,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * Navigation de l'espace commerçant, structurée selon le cycle marketing
 * LocalBoost : Organiser → Attirer → Convertir → Fidéliser → Mesurer.
 */
export const dashboardNav: NavGroup[] = [
  {
    label: "Pilotage",
    items: [
      { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
      { label: "Plan d'actions", href: "/dashboard/actions", icon: Target },
    ],
  },
  {
    label: "Organiser",
    items: [
      { label: "Contenus", href: "/dashboard/content", icon: FileText },
      { label: "Calendrier", href: "/dashboard/calendar", icon: CalendarDays },
      { label: "Réseaux connectés", href: "/dashboard/channels", icon: Share2 },
    ],
  },
  {
    label: "Attirer",
    items: [
      { label: "Diagnostic", href: "/dashboard/diagnostic", icon: Activity },
      { label: "Avis clients", href: "/dashboard/reviews", icon: Star },
      { label: "Site vitrine", href: "/dashboard/website", icon: Globe },
    ],
  },
  {
    label: "Convertir & Fidéliser",
    items: [
      { label: "Campagnes", href: "/dashboard/campaigns", icon: Megaphone },
      { label: "Fidélité QR", href: "/dashboard/loyalty", icon: QrCode },
      { label: "Clients", href: "/dashboard/customers", icon: Contact },
      { label: "Relances", href: "/dashboard/automations", icon: MailCheck },
    ],
  },
  {
    label: "Mesurer",
    items: [
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Concurrents", href: "/dashboard/competitors", icon: TrendingUp },
    ],
  },
  {
    label: "Organisation",
    items: [
      { label: "Établissements", href: "/dashboard/establishments", icon: Store },
      { label: "Équipe & rôles", href: "/dashboard/team", icon: Users },
      { label: "Abonnement", href: "/dashboard/billing", icon: CreditCard },
      { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

const allItems = dashboardNav.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label }))
);

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function findNavItem(pathname: string) {
  return allItems.find((item) => isNavItemActive(pathname, item.href));
}
