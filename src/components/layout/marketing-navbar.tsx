import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Local<span className="text-brand-600">Boost</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/#modules" className="hover:text-brand-600 transition-colors">
            Fonctionnalités
          </Link>
          <Link href="/#secteurs" className="hover:text-brand-600 transition-colors">
            Secteurs
          </Link>
          <Link href="/#demonstration" className="hover:text-brand-600 transition-colors">
            Démonstration
          </Link>
          <Link href="/#tarifs" className="hover:text-brand-600 transition-colors">
            Tarifs
          </Link>
          <Link href="/#faq" className="hover:text-brand-600 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium text-slate-700">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="gap-1.5 font-medium shadow-sm">
              Essai gratuit
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
