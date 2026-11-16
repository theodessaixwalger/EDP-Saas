"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { useDemo } from "./demo-context";
import { cn } from "@/lib/utils";

const COOKIE = "lb_demo";

export function setDemoCookie(on: boolean) {
  document.cookie = on
    ? `${COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
    : `${COOKIE}=; path=/; max-age=0; samesite=lax`;
}

/** Interrupteur du mode démo (données fictives) dans le header. */
export function DemoToggle({ className }: { className?: string }) {
  const demo = useDemo();
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const toggle = () => {
    setDemoCookie(!demo);
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={demo}
      onClick={toggle}
      disabled={pending}
      title={demo ? "Retirer les données de démonstration" : "Afficher des données de démonstration"}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-13 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
        demo
          ? "border-warning/40 bg-warning-soft text-warning hover:bg-warning-soft/70"
          : "border-input bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
        className
      )}
    >
      <FlaskConical className="h-3.5 w-3.5" aria-hidden />
      <span className="hidden sm:inline">Démo</span>
      <span
        aria-hidden
        className={cn(
          "relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors",
          demo ? "bg-warning" : "bg-input"
        )}
      >
        <span
          className={cn(
            "absolute h-3 w-3 rounded-full bg-card shadow-xs transition-transform duration-200 ease-out-quint",
            demo ? "translate-x-3.5" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}
