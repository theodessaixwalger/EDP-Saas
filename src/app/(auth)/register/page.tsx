"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { registerSchema } from "@/lib/validation/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const isConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate with Zod
    const validation = registerSchema.safeParse({
      fullName,
      organizationName,
      email,
      password,
      acceptTerms,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Veuillez vérifier les informations");
      return;
    }

    setLoading(true);

    // If Supabase credentials are not configured in .env.local, seamless local preview
    if (!isConfigured) {
      setTimeout(() => {
        setIsSubmitted(true);
      }, 500);
      return;
    }

    try {
      const supabase = createClient();
      const callbackUrl = typeof window !== "undefined" 
        ? `${window.location.origin}/auth/callback` 
        : undefined;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: callbackUrl,
          data: {
            full_name: fullName,
            organization_name: organizationName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // If email confirmation is enabled (default in Supabase), show confirmation screen
      if (data?.session) {
        router.push("/dashboard");
      } else {
        setIsSubmitted(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    try {
      if (isConfigured) {
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
      }
      setResendSuccess(true);
    } catch {
      // Ignored
    } finally {
      setResendLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-sm">
          <MailCheck className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Validez votre compte par email
        </h2>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
          Un email contenant un lien sécurisé d&apos;activation a été envoyé à l&apos;adresse :
        </p>
        <div className="my-3 inline-block rounded-lg bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200">
          {email}
        </div>

        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left text-xs text-slate-600 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-[10px]">
              1
            </span>
            <span>Consultez la boîte de réception de votre messagerie.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-[10px]">
              2
            </span>
            <span>
              Cliquez sur le lien <strong>« Confirm your email »</strong> reçu pour valider votre compte.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-[10px]">
              3
            </span>
            <span>Vous serez automatiquement redirigé vers votre tableau de bord LocalBoost.</span>
          </div>
        </div>

        {resendSuccess && (
          <div className="mt-4 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-700 border border-emerald-200">
            Un nouvel email d&apos;activation vient de vous être adressé.
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="w-full text-xs font-medium"
          >
            {resendLoading ? "Envoi en cours..." : "Renvoyer l'email de validation"}
          </Button>

          <Link href="/login">
            <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500">
              Retour à la page de connexion
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Vous n&apos;avez rien reçu ? Vérifiez votre dossier de courriers indésirables (Spams).
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Créer votre compte LocalBoost
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          14 jours d&apos;essai gratuit — Sans engagement
        </p>
      </div>

      {!isConfigured && (
        <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
          <p className="font-semibold">Mode Démonstration Local</p>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Supabase n&apos;est pas encore lié dans <code>.env.local</code>. Le formulaire vous permet d&apos;accéder directement au tableau de bord pour tester l&apos;interface.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nom & Prénom</Label>
          <Input
            id="fullName"
            type="text"
            required
            placeholder="Alexandre Martin"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="organizationName">Nom de votre entreprise / enseigne</Label>
          <Input
            id="organizationName"
            type="text"
            required
            placeholder="Boulangerie du Marché"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email professionnel</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="contact@moncommerce.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Mot de passe (8 caractères min.)</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="terms" className="text-xs text-slate-600 leading-snug">
            J&apos;accepte les{" "}
            <Link href="/cgu" className="text-brand-600 hover:underline">
              Conditions Générales d&apos;Utilisation
            </Link>{" "}
            et la{" "}
            <Link href="/confidentialite" className="text-brand-600 hover:underline">
              Politique de Confidentialité (RGPD)
            </Link>
            .
          </label>
        </div>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Création en cours..." : "Créer mon compte commerçant"}
        </Button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-500">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
