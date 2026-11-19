"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { updatePasswordSchema } from "@/lib/validation/auth";

/** Atteinte via le lien reçu par email (/auth/callback?next=/reset-password) : la session est déjà ouverte. */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = updatePasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Veuillez vérifier le mot de passe");
      return;
    }

    setLoading(true);
    try {
      if (isConfigured) {
        const supabase = createClient();
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
      }
      router.push("/dashboard");
    } catch {
      setError("Le lien a expiré ou n'est plus valide. Demandez un nouvel email de réinitialisation.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Nouveau mot de passe</h1>
        <p className="mt-1 text-xs text-slate-500">Choisissez un mot de passe d&apos;au moins 8 caractères</p>
      </div>

      {error && (
        <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
          <p>{error}</p>
          <Link href="/forgot-password" className="mt-2 block text-xs font-semibold text-brand-700 underline hover:text-brand-800">
            Recevoir un nouveau lien
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer le mot de passe"}
        </Button>
      </form>
    </div>
  );
}
