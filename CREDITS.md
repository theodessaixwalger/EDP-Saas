# Crédits — composants tiers

Le design system du dashboard LocalBoost intègre des composants et tokens issus du registre **Component Atlas**. Tous sont sous licence ouverte ; les notices ci-dessous doivent être conservées.

| Élément | Source | Fichiers | Licence |
| :--- | :--- | :--- | :--- |
| Button, Card, Input, Select, Switch, Tabs, Dropdown Menu, Sheet, Chart | shadcn/ui | `src/components/ui/*` | MIT — Copyright (c) 2023 shadcn |
| Chart Area Interactive (adapté : données en props, libellés FR, état vide) | shadcn/ui | `src/components/charts/trend-chart.tsx` | MIT — Copyright (c) 2023 shadcn |
| Table | Origin UI | `src/components/ui/table.tsx` | MIT — Copyright (c) 2025 coss.com |
| Structure des tokens de thème (rayons, conventions shadcn) | Origin UI, Easy UI | `src/app/globals.css`, `tailwind.config.ts` | MIT — Copyright (c) 2025 coss.com ; Copyright (c) 2026 Suraj Maurya |
| Magic Card, Border Beam, Animated Grid Pattern, Ripple, Orbiting Circles, Animated Theme Toggler (adaptés Tailwind v3, versions monochromes) | Magic UI | `src/components/effects/*` | MIT — Copyright (c) Magic UI |
| Polices Geist et Geist Mono | Vercel (Google Fonts) | `src/app/layout.tsx` | OFL-1.1 |
| Courbes d'easing (`out-quint`, `in-out-cubic`) | Component Atlas — easings standard | `tailwind.config.ts` | BSD-3-Clause — Easing Equations © 2001 Robert Penner |
