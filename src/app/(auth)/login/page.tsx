"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const isConfigured = isSupabaseConfigured();

  // Paramètres lus après hydratation : la page reste pré-rendue en statique (formulaire
  // présent dès le HTML, sans écran de chargement ni décalage de mise en page).
  const [isConfirmedParam, setIsConfirmedParam] = useState<string | null>(null);
  const [authErrorParam, setAuthErrorParam] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsConfirmedParam(params.get("confirmed"));
    setAuthErrorParam(params.get("error"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNeedsConfirmation(false);
    setLoading(true);

    if (!isConfigured) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
      return;
    }

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (
          signInError.message.toLowerCase().includes("email not confirmed") ||
          signInError.message.toLowerCase().includes("non confirmé")
        ) {
          setNeedsConfirmation(true);
          setError(
            "Votre compte n'est pas encore activé. Veuillez cliquer sur le lien de validation reçu par email."
          );
        } else {
          setError(signInError.message || "Identifiants invalides");
        }
        return;
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError("Veuillez renseigner votre email ci-dessous pour renvoyer la confirmation");
      return;
    }

    try {
      const supabase = createClient();
      const callbackUrl = typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

      await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: callbackUrl,
        },
      });
      setResendSuccess(true);
      setError(null);
    } catch {
      setError("Impossible de renvoyer l'email pour le moment");
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Connexion à votre espace
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Accédez à la gestion marketing de vos établissements
        </p>
      </div>

      {!isConfigured && (
        <div role="status" className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
          <p className="font-semibold">Mode Démonstration Local</p>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Supabase n&apos;est pas encore lié dans <code>.env.local</code>. Le formulaire vous permet d&apos;accéder directement au tableau de bord pour tester l&apos;interface.
          </p>
        </div>
      )}

      {isConfirmedParam && (
        <div role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
          Votre adresse email a été confirmée avec succès ! Vous pouvez maintenant vous connecter.
        </div>
      )}

      {authErrorParam === "confirmation_failed" && (
        <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
          Le lien de validation d&apos;email a expiré ou est invalide. Veuillez demander un nouvel email ci-dessous.
        </div>
      )}

      {resendSuccess && (
        <div role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
          Un nouvel email de validation vient d&apos;être envoyé. Vérifiez votre boîte de réception.
        </div>
      )}

      {error && (
        <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
          <p>{error}</p>
          {needsConfirmation && (
            <button
              type="button"
              onClick={handleResendConfirmation}
              className="mt-2 text-xs font-semibold text-brand-700 underline block hover:text-brand-800"
            >
              Renvoyer l&apos;email de validation
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-500">
          Vous n&apos;avez pas encore de compte ?{" "}
          <Link href="/register" className="font-semibold text-brand-600 hover:underline">
            Essai gratuit 14 jours
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}

