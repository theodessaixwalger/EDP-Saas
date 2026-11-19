import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/effects/border-beam";
import type { RecommendedAction } from "./setup-rules";
import { cn } from "@/lib/utils";

export function RecommendedActionCard({
  action,
  highlighted = false,
  className,
}: {
  action: RecommendedAction;
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("relative isolate overflow-hidden p-5 sm:p-6", className)}>
      {highlighted && <BorderBeam size={120} duration={9} />}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs font-medium text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                highlighted ? "bg-primary-soft text-primary" : "bg-secondary"
              )}
            >
              <Sparkle className="h-3 w-3" aria-hidden />
              Action recommandée
            </span>
            <span>{action.difficulty}</span>
            <span aria-hidden>·</span>
            <code className="font-mono" title="Règle déterministe à l'origine de la recommandation">
              {action.code}
            </code>
          </p>
          <h2 className="mt-2.5 text-balance font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">
            {action.title}
          </h2>
          <p className="mt-1 max-w-[42rem] text-pretty text-13 leading-relaxed text-muted-foreground">
            {action.justification}
          </p>
        </div>
        <Button size="sm" variant={highlighted ? "default" : "outline"} asChild className="group shrink-0 self-start md:self-center">
          <Link href={action.href}>
            {action.cta}
            <ArrowRight className="transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
