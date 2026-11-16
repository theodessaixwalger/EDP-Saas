"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { dashboardNav } from "./nav-config";
import { cn } from "@/lib/utils";

const entries = dashboardNav.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label })));

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Recherche de navigation : filtre les modules de l'espace commerçant
 * et y accède au clavier (Ctrl/⌘ + K pour focaliser).
 */
export function PageSearch({ className }: { className?: string }) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const results = React.useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return entries;
    return entries.filter((e) => normalize(`${e.label} ${e.group}`).includes(q));
  }, [query]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Aller à un module"
        placeholder="Aller à un module…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        className="h-8 w-full rounded-lg border border-input bg-muted/40 pl-9 pr-14 text-13 text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:bg-card focus:outline-none focus:ring-2 focus:ring-ring/20 [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-card px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:block">
        Ctrl K
      </kbd>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-80 overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">Aucun module trouvé</li>
          ) : (
            results.map((r, i) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.href}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    go(r.href);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm",
                    i === active && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <span className="flex-1 truncate">{r.label}</span>
                  <span className="text-xs text-muted-foreground">{r.group}</span>
                  {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
