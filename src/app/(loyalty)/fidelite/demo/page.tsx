"use client";

import React, { useState } from "react";
import { QrCode, Gift, Sparkles, CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LoyaltyClientDemoPage() {
  const [points, setPoints] = useState(140);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const rewards = [
    {
      id: "rew-1",
      title: "Croissant au beurre offert",
      cost: 50,
      description: "Valable dès 3€ d'achat en boutique",
    },
    {
      id: "rew-2",
      title: "Café ou thé au choix",
      cost: 70,
      description: "À emporter ou sur place",
    },
    {
      id: "rew-3",
      title: "Formule Déjeuner Midi -50%",
      cost: 150,
      description: "Sandwich + Boisson + Pâtisserie",
    },
  ];

  const handleRedeem = (rewardId: string, cost: number) => {
    if (points >= cost) {
      setPoints(points - cost);
      setRedeemed(rewardId);
      setTimeout(() => setRedeemed(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Mobile Frame Simulation */}
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-brand-600 p-6 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium mb-3">
            <Sparkles className="h-3 w-3" />
            Programme Fidélité
          </div>
          <h2 className="text-xl font-bold">Boulangerie du Marché</h2>
          <p className="text-xs text-brand-100 mt-0.5">Lyon — Centre Historique</p>

          {/* Points Bubble */}
          <div className="mt-5 inline-flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-md text-slate-900 w-48 mx-auto">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Votre Solde
            </span>
            <span className="text-3xl font-extrabold text-brand-600 mt-0.5">
              {points} <span className="text-xs font-medium text-slate-500">pts</span>
            </span>
          </div>
        </div>

        {/* Dynamic QR Code Card */}
        <div className="p-6 text-center border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Présentez ce QR Code en caisse
          </p>

          <div className="inline-flex p-3 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40">
            {/* Visual simulation of QR */}
            <div className="h-40 w-40 bg-slate-900 rounded-xl p-2 flex items-center justify-center text-white">
              <QrCode className="h-32 w-32" />
            </div>
          </div>

          <p className="text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            Code temporisé sécurisé (Anti-fraude)
          </p>
        </div>

        {/* Rewards Section */}
        <div className="p-5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Gift className="h-4 w-4 text-brand-600" />
            Récompenses disponibles
          </h3>

          {redeemed && (
            <div className="mb-3 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 text-center font-medium">
              Récompense débloquée ! Présentez votre écran à l&apos;employé.
            </div>
          )}

          <div className="space-y-2.5">
            {rewards.map((r) => {
              const canAfford = points >= r.cost;
              return (
                <div
                  key={r.id}
                  className={`rounded-xl border p-3 flex items-center justify-between gap-2 ${
                    canAfford
                      ? "border-slate-200 bg-white"
                      : "border-slate-100 bg-slate-50/60 opacity-60"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {r.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{r.description}</p>
                    <span className="text-[10px] font-bold text-brand-600">
                      {r.cost} points
                    </span>
                  </div>

                  <Button
                    size="sm"
                    disabled={!canAfford}
                    onClick={() => handleRedeem(r.id, r.cost)}
                    className="h-7 text-xs px-2.5 shrink-0"
                  >
                    Utiliser
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* GDPR & Privacy Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Offres par email
            </span>
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="h-3.5 w-3.5 rounded text-brand-600"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Conformité RGPD : vous pouvez retirer votre consentement à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
}
