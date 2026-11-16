"use client";

import React, { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";

const roleLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "success" }> = {
  owner: { label: "Propriétaire", variant: "default" },
  manager: { label: "Responsable", variant: "secondary" },
  staff: { label: "Employé (caisse)", variant: "outline" },
};

const ROLE_CARDS = [
  {
    role: "owner",
    title: "Contrôle total",
    description: "Facturation Stripe, ajout d'établissements, gestion de l'équipe et de tous les modules.",
  },
  {
    role: "manager",
    title: "Pilotage marketing",
    description: "Création de campagnes, validation des contenus, réponses aux avis et statistiques.",
  },
  {
    role: "staff",
    title: "Opérations caisse & fidélité",
    description: "Scan des QR codes clients et validation de l'attribution de points en boutique.",
  },
];

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Équipe & rôles"
        description="Gérez les collaborateurs ayant accès aux outils marketing et à l'encaissement fidélité."
        actions={
          <Button onClick={() => setShowInviteModal(true)} size="sm">
            <UserPlus className="h-4 w-4" />
            Inviter un collaborateur
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <dl className="grid gap-px bg-border md:grid-cols-3">
          {ROLE_CARDS.map((r) => (
            <div key={r.role} className="bg-card p-5">
              <dt className="flex items-center justify-between gap-2">
                <span className="text-13 font-semibold">{r.title}</span>
                <Badge variant={roleLabels[r.role].variant}>{roleLabels[r.role].label}</Badge>
              </dt>
              <dd className="mt-1.5 text-13 text-muted-foreground">{r.description}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-5">
          <CardTitle>Membres ({members.length})</CardTitle>
          <CardDescription>Comptes rattachés à votre organisation</CardDescription>
        </CardHeader>
        <div className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membre</TableHead>
                <TableHead className="hidden md:table-cell">Périmètre</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{member.name}</p>
                        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" aria-hidden />
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{member.establishment}</TableCell>
                  <TableCell>
                    <Badge variant={roleLabels[member.role]?.variant || "outline"}>
                      {roleLabels[member.role]?.label || member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{member.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Sheet open={showInviteModal} onOpenChange={setShowInviteModal}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Inviter un collaborateur</SheetTitle>
            <SheetDescription>Un email contenant un lien sécurisé lui sera adressé.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleInvite} className="flex flex-1 flex-col gap-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="inviteEmail">Adresse email</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="collaborateur@artisan-co.fr"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role">Rôle attribué</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="role" className="h-10 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Employé — scan fidélité en caisse</SelectItem>
                  <SelectItem value="manager">Responsable — marketing & campagnes</SelectItem>
                  <SelectItem value="owner">Propriétaire — tous les droits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SheetFooter className="mt-auto gap-2 border-t pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowInviteModal(false)}>
                Annuler
              </Button>
              <Button type="submit" size="sm">
                Envoyer l&apos;invitation
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
