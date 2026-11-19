"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { resetPasswordSchema } from "@/lib/validation/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const isConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = resetPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Adresse email invalide");
      return;
    }

    setLoading(true);
    try {
      if (isConfigured) {
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });
        if (resetError) throw resetError;
      }
      // Même message que le compte existe ou non : aucune information divulguée.
      setSent(true);
    } catch {
      setError("Impossible d'envoyer l'email pour le moment. Réessayez dans quelques minutes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Mot de passe oublié</h1>
        <p className="mt-1 text-xs text-slate-500">
          Recevez un lien sécurisé pour choisir un nouveau mot de passe
        </p>
      </div>

      {sent ? (
        <div role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
          Si un compte existe pour <strong>{email}</strong>, un email de réinitialisation vient d&apos;être envoyé.
          Le lien est valable une heure.
        </div>
      ) : (
        <>
          {error && (
            <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="email">Email professionnel</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="contact@moncommerce.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
            </Button>
          </form>
        </>
      )}

      <div className="mt-6 border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-500">
          Vous vous souvenez de votre mot de passe ?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
