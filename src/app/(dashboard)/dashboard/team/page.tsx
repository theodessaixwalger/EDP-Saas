"use client";

import React, { useState } from "react";
import { Users, UserPlus, Shield, Check, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [members, setMembers] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      establishment: string;
      status: string;
    }>
  >([
    {
      id: "m-1",
      name: "Administrateur principal",
      email: "propriétaire",
      role: "owner",
      establishment: "Tous les établissements",
      status: "Actif",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("staff");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setMembers([
      ...members,
      {
        id: `m-${Date.now()}`,
        name: inviteEmail.split("@")[0] || "Collaborateur",
        email: inviteEmail,
        role: inviteRole,
        establishment: "Tous les établissements",
        status: "Invitation envoyée",
      },
    ]);

    setInviteEmail("");
    setShowInviteModal(false);
  };

  const roleLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "success" }> = {
    owner: { label: "Propriétaire", variant: "default" },
    manager: { label: "Responsable", variant: "secondary" },
    staff: { label: "Employé (Caisse)", variant: "outline" },
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Équipe & Permissions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les collaborateurs ayant accès aux outils marketing et à l&apos;encaissement fidélité
          </p>
        </div>

        <Button
          onClick={() => setShowInviteModal(true)}
          size="sm"
          className="gap-1.5 shadow-sm"
        >
          <UserPlus className="h-4 w-4" />
          Inviter un collaborateur
        </Button>
      </div>

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <Badge variant="default" className="text-[10px] mb-2">
            Propriétaire
          </Badge>
          <p className="text-xs font-semibold text-slate-900">Contrôle total</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Facturation Stripe, ajout d&apos;établissements, gestion de l&apos;équipe et de tous les modules.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <Badge variant="secondary" className="text-[10px] mb-2">
            Responsable
          </Badge>
          <p className="text-xs font-semibold text-slate-900">Pilotage marketing</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Création de campagnes, validation des contenus, réponses aux avis et analyse des statistiques.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <Badge variant="outline" className="text-[10px] mb-2">
            Employé
          </Badge>
          <p className="text-xs font-semibold text-slate-900">Opérations caisse & fidélité</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Scan ultra-rapide des QR codes clients et validation de l&apos;attribution de points en boutique.
          </p>
        </div>
      </div>

      {/* Members Table */}
      <Card className="border-slate-200">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base">Membres Actifs ({members.length})</CardTitle>
          <CardDescription className="text-xs">
            Comptes rattachés à votre organisation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 hover:bg-slate-50/50 transition-colors gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{member.name}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Mail className="h-3 w-3 inline" />
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500 hidden md:inline">
                    {member.establishment}
                  </span>
                  <Badge variant={roleLabels[member.role]?.variant || "outline"} className="text-[10px]">
                    {roleLabels[member.role]?.label || member.role}
                  </Badge>
                  <span className="text-[11px] text-slate-400">
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Inviter un collaborateur
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Un email d&apos;invitation contenant un lien sécurisé lui sera adressé
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <Label htmlFor="inviteEmail">Adresse email du collaborateur</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="collaborateur@artisan-co.fr"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="role">Rôle attribué</Label>
                <select
                  id="role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <option value="staff">Employé (Scan fidélité en caisse)</option>
                  <option value="manager">Responsable (Marketing & Campagnes)</option>
                  <option value="owner">Propriétaire (Tous les droits)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInviteModal(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" size="sm">
                  Envoyer l&apos;invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
