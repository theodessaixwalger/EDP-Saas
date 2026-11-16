"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, X } from "lucide-react";
import { setDemoCookie } from "./demo-toggle";

/** Bandeau permanent tant que le mode démo est actif : les données affichées sont fictives. */
export function DemoBanner() {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  return (
    <div
      role="status"
      className="flex shrink-0 items-center justify-center gap-2 border-b border-warning/30 bg-warning-soft px-4 py-1.5 text-center text-13 text-warning"
    >
      <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>
        <strong className="font-semibold">Mode démo</strong> : toutes les données affichées sont fictives.
      </span>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setDemoCookie(false);
          startTransition(() => router.refresh());
        }}
        className="ml-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
      >
        <X className="h-3 w-3" aria-hidden />
        Quitter
      </button>
    </div>
  );
}
