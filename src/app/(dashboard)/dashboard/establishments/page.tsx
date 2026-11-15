"use client";

import React, { useState } from "react";
import { Store, Plus, MapPin, Phone, Mail, ExternalLink, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EstablishmentsPage() {
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
  >([]);

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
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Établissements & Points de Vente
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez vos différents commerces physiques et leurs modules marketing respectifs
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          size="sm"
          className="gap-1.5 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Ajouter un établissement
        </Button>
      </div>

      {/* Grid of establishments */}
      {establishments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-3">
            <Store className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Aucun établissement configuré</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            Vous n&apos;avez pas encore créé de point de vente. Ajoutez votre premier commerce physique pour activer vos outils marketing.
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="mt-4 gap-1.5 shadow-sm text-xs"
          >
            <Plus className="h-4 w-4" />
            Ajouter mon premier établissement
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {establishments.map((est) => (
            <Card key={est.id} className="border-slate-200">
              <CardHeader className="p-6 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{est.name}</CardTitle>
                      <CardDescription className="text-xs">{est.category}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={est.isActive ? "success" : "secondary"} className="text-[11px]">
                    {est.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-3">
                <div className="text-xs text-slate-600 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{est.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{est.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{est.email}</span>
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {est.activeModulesCount} modules marketing actifs
                  </span>
                  <div className="flex items-center gap-2">
                    <a href="/dashboard/settings">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-slate-700">
                        <Settings2 className="h-3.5 w-3.5" />
                        Modules
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal / Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Nouvel Établissement
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Renseignez les coordonnées de votre nouveau point de vente
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du commerce</Label>
                <Input
                  id="name"
                  placeholder="Ex: Boulangerie du Marché — République"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  placeholder="Ex: 8 Place de la République"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="postalCode">Code Postal</Label>
                  <Input
                    id="postalCode"
                    placeholder="69002"
                    required
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    placeholder="Lyon"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" size="sm">
                  Enregistrer l&apos;établissement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
