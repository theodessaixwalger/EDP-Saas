import { Check, CreditCard, Receipt, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { PRICING_PLANS } from "@/features/billing/plans";
import { cn } from "@/lib/utils";

import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/shared/data-cells";
import { demoInvoices, frDate } from "@/features/demo/demo-data";

export const metadata = { title: "Abonnement — LocalBoost" };

export default async function BillingPage() {
  const { organization, establishments, demo } = await getDashboardContext();
  const invoices = demo ? demoInvoices : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Abonnement & facturation"
        description="Gérez votre offre, vos moyens de paiement et vos factures via le portail sécurisé Stripe."
        actions={
          <PendingAction phase="Phase 6" variant="outline">
            <CreditCard className="h-4 w-4" />
            Portail de facturation
          </PendingAction>
        }
      />

      <Card className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <CreditCard className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-base font-semibold">{demo ? "Offre Pro" : "Aucun abonnement actif"}</p>
                {demo ? <Badge variant="success">Actif · 178 € / mois</Badge> : <Badge variant="secondary">Gratuit</Badge>}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {organization.name} · {establishments.length} établissement{establishments.length > 1 ? "s" : ""}
                {organization.billing_email ? ` · Facturation : ${organization.billing_email}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Store className="h-4 w-4" aria-hidden />
            Facturation par établissement
          </div>
        </div>
      </Card>

      <section aria-labelledby="plans-title" className="space-y-3">
        <h2 id="plans-title" className="font-display text-base font-semibold">
          Choisir une offre
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col",
                plan.highlighted && "border-primary/40 shadow-md ring-1 ring-primary/20"
              )}
            >
              <CardHeader className="px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.badge && <Badge>{plan.badge}</Badge>}
                </div>
                <p className="pt-2">
                  <span className="font-display text-3xl font-bold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
                </p>
                <CardDescription>{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-5 p-5 pt-0">
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <PendingAction phase="Phase 6" variant={plan.highlighted ? "default" : "outline"} className="w-full">
                  Choisir {plan.name}
                </PendingAction>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <TableCard
        title="Factures"
        columns={["Date", "Numéro", "Offre", "Montant", "Statut"]}
        isEmpty={invoices.length === 0}
        empty={{
          icon: Receipt,
          title: "Aucune facture",
          description: "Vos factures Stripe seront disponibles ici dès votre premier paiement.",
        }}
      >
        {invoices.map((i) => (
          <TableRow key={i.id}>
            <TableCell className="whitespace-nowrap text-muted-foreground">{frDate(i.date)}</TableCell>
            <TableCell className="font-mono text-2xs">{i.number}</TableCell>
            <TableCell>{i.plan}</TableCell>
            <TableCell className="tabular-nums font-medium">{i.amount}</TableCell>
            <TableCell>
              <StatusPill tone="success">{i.status}</StatusPill>
            </TableCell>
          </TableRow>
        ))}
      </TableCard>
    </div>
  );
}
