"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Plus, Settings2, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/page-header";
import { useDemo } from "@/features/demo/demo-context";
import { demoEstablishments } from "@/features/demo/demo-data";

export default function EstablishmentsPage() {
  const demo = useDemo();
  const [showAddModal, setShowAddModal] = useState(false);
  const [establishments, setEstablishments] = useState<
    Array<{
      id: string;
      name: string;
      category: string;
      address: string;
      phone: string;
      email: string;
      isActive: boolean;
      activeModulesCount: number;
    }>
  >(() =>
    demo
      ? demoEstablishments.map((e) => ({
          id: e.id,
          name: e.name,
          category: "Boulangerie & pâtisserie",
          address: `${e.address}, ${e.postal_code} ${e.city}`,
          phone: e.phone ?? "Non renseigné",
          email: e.email ?? "Non renseigné",
          isActive: true,
          activeModulesCount: 8,
        }))
      : []
  );

  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    setEstablishments([
      ...establishments,
      {
        id: `est-${Date.now()}`,
        name: newName,
        category: "Commerce de proximité",
        address: `${newAddress}, ${newPostalCode} ${newCity}`,
        phone: "Non renseigné",
        email: "Non renseigné",
        isActive: true,
        activeModulesCount: 5,
      },
    ]);

    setNewName("");
    setNewCity("");
    setNewAddress("");
    setNewPostalCode("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Établissements"
        description="Gérez vos points de vente physiques et les modules marketing actifs sur chacun."
        actions={
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="h-4 w-4" />
            Ajouter un établissement
          </Button>
        }
      />

      {establishments.length === 0 ? (
        <EmptyState
          icon={Store}
          title="Aucun établissement configuré"
          description="Ajoutez votre premier point de vente pour activer la fidélité, les avis Google et les campagnes."
        >
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="h-4 w-4" />
            Ajouter mon premier établissement
          </Button>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {establishments.map((est) => (
            <Card key={est.id}>
              <CardHeader className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Store className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <CardTitle>{est.name}</CardTitle>
                      <CardDescription>{est.category}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={est.isActive ? "success" : "secondary"}>
                    {est.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-1">
                <dl className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                    <dt className="sr-only">Adresse</dt>
                    <dd className="text-foreground">{est.address}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" aria-hidden />
                    <dt className="sr-only">Téléphone</dt>
                    <dd>{est.phone}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />
                    <dt className="sr-only">Email</dt>
                    <dd>{est.email}</dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-muted-foreground">
                    {est.activeModulesCount} modules marketing actifs
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/settings">
                      <Settings2 className="h-3.5 w-3.5" />
                      Modules
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={showAddModal} onOpenChange={setShowAddModal}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Nouvel établissement</SheetTitle>
            <SheetDescription>Renseignez les coordonnées de votre point de vente.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleCreate} className="flex flex-1 flex-col gap-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nom du commerce</Label>
              <Input
                id="name"
                placeholder="Ex : Boulangerie du Marché — République"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                placeholder="Ex : 8 place de la République"
                required
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  placeholder="69002"
                  inputMode="numeric"
                  required
                  value={newPostalCode}
                  onChange={(e) => setNewPostalCode(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  placeholder="Lyon"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </div>
            </div>

            <SheetFooter className="mt-auto gap-2 border-t pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                Annuler
              </Button>
              <Button type="submit" size="sm">
                Enregistrer l&apos;établissement
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
