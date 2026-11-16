import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedGridPattern } from "@/components/effects/animated-grid-pattern";
import type { OnboardingStep } from "./setup-rules";
import { cn } from "@/lib/utils";

const gridMask = "radial-gradient(ellipse 70% 100% at 85% 0%, #000 0%, transparent 75%)";

/**
 * Accueil de la vue d'ensemble : salutation, actions, et progression
 * d'installation en jauge segmentée, sur une grille animée.
 */
export function WelcomeHero({
  title,
  subtitle,
  actions,
  steps,
}: {
  title: string;
  subtitle: React.ReactNode;
  actions?: React.ReactNode;
  steps: OnboardingStep[];
}) {
  const done = steps.filter((s) => s.done).length;
  const next = steps.find((s) => !s.done);

  return (
    <section
      aria-labelledby="welcome-title"
      className="relative isolate overflow-hidden rounded-2xl border bg-card dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05)]"
    >
      <AnimatedGridPattern
        numSquares={34}
        maxOpacity={0.32}
        className="-z-10 [mask-image:var(--grid-mask)]"
        style={{ "--grid-mask": gridMask } as React.CSSProperties}
      />

      <div className="flex flex-col gap-5 px-5 pb-5 pt-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pt-9">
        <div className="min-w-0">
          <h1
            id="welcome-title"
            className="text-balance font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[2.375rem]"
          >
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {next && (
        <div className="border-t bg-card/60 px-5 py-4 backdrop-blur-sm sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-13">
              <span className="font-medium text-foreground">Installation de votre commerce</span>
              <span className="ml-2 tabular-nums text-muted-foreground">
                {done}/{steps.length}
              </span>
            </p>
            <Link
              href={next.href}
              className="group inline-flex items-center gap-1.5 text-13 font-medium text-primary transition-colors hover:text-primary/80"
            >
              Étape suivante : {next.label.toLowerCase()}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <ol className="mt-3 grid grid-cols-5 gap-1.5" aria-label="Étapes d'installation">
            {steps.map((step, i) => {
              const isNext = step === next;
              return (
                <li key={step.label} className="min-w-0">
                  <Link href={step.href} className="group block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="relative block h-1 overflow-hidden rounded-full bg-foreground/10" aria-hidden>
                      {step.done && (
                        <span
                          className="absolute inset-0 origin-left animate-fill-x rounded-full bg-primary"
                          style={{ animationDelay: `${200 + i * 140}ms` }}
                        />
                      )}
                      {isNext && (
                        <span className="absolute inset-0 animate-pulse rounded-full bg-primary/35" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "mt-2 hidden items-center gap-1 text-2xs font-medium sm:flex",
                        step.done || isNext ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {step.done && <Check className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
                      <span className="truncate">{step.label}</span>
                      <span className="sr-only">{step.done ? " (terminé)" : " (à faire)"}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}
