import Link from "next/link";
import { Sparkles } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Local<span className="text-brand-600">Boost</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Le copilote marketing tout-en-un conçu pour les commerçants, artisans et indépendants locaux.
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} LocalBoost SAS. Tous droits réservés.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Produit
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/#modules" className="hover:text-brand-600 transition-colors">
                  Gestion des contenus
                </Link>
              </li>
              <li>
                <Link href="/#modules" className="hover:text-brand-600 transition-colors">
                  Fidélité QR Code
                </Link>
              </li>
              <li>
                <Link href="/#modules" className="hover:text-brand-600 transition-colors">
                  Campagnes & Relances
                </Link>
              </li>
              <li>
                <Link href="/#modules" className="hover:text-brand-600 transition-colors">
                  Diagnostic local
                </Link>
              </li>
              <li>
                <Link href="/#tarifs" className="hover:text-brand-600 transition-colors">
                  Tarification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Secteurs
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Restaurants & Bars</li>
              <li>Boulangeries & Artisans</li>
              <li>Coiffure & Beauté</li>
              <li>Boutiques & Mode</li>
              <li>Salles de sport & Loisirs</li>
              <li>Services de proximité</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Légal & Conformité
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/confidentialite" className="hover:text-brand-600 transition-colors">
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="hover:text-brand-600 transition-colors">
                  Conditions Générales d&apos;Utilisation
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-brand-600 transition-colors">
                  Conditions Générales de Vente
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-brand-600 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400">
                  Données hébergées en Union Européenne
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
