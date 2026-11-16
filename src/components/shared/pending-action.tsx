import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PendingActionProps extends Omit<ButtonProps, "disabled" | "onClick"> {
  /** Phase de la roadmap dans laquelle l'action sera branchée, ex. « Phase 2 ». */
  phase: string;
  /** Masque l'étiquette de phase quand elle est déjà indiquée par le conteneur. */
  showPhase?: boolean;
}

/**
 * Action dont le backend n'est pas encore livré. Rendue désactivée et
 * explicitement étiquetée : aucune simulation silencieuse (cf. AGENTS.md).
 */
export function PendingAction({
  phase,
  showPhase = true,
  children,
  size = "sm",
  className,
  ...props
}: PendingActionProps) {
  return (
    <Button
      {...props}
      size={size}
      disabled
      aria-disabled
      title={`Disponible en ${phase}`}
      className={cn("disabled:opacity-60", className)}
    >
      {children}
      {showPhase && (
        <Badge
          variant="outline"
          className="ml-0.5 border-transparent bg-foreground/10 px-1.5 py-0 text-[10px] font-medium text-inherit"
        >
          {phase}
        </Badge>
      )}
    </Button>
  );
}
