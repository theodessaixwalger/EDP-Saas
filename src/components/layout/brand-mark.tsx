import { cn } from "@/lib/utils";

/**
 * Monogramme LocalBoost : une épingle (le « local ») portant une flèche
 * montante (le « boost »), sur fond violet uni.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8", className)} aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke="white" strokeOpacity="0.22" />
      <path
        d="M16 6.75c-3.73 0-6.75 2.93-6.75 6.62 0 4.62 5.32 9.62 6.18 10.4a.84.84 0 0 0 1.14 0c.86-.78 6.18-5.78 6.18-10.4 0-3.69-3.02-6.62-6.75-6.62Z"
        fill="white"
      />
      <path d="M16 10.1 12.9 13.3h2.05v3.45h2.1V13.3h2.05L16 10.1Z" className="fill-primary" />
    </svg>
  );
}
