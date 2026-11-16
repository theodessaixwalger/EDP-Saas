import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { OrbitingCircles } from "@/components/effects/orbiting-circles";
import { BrandMark } from "@/components/layout/brand-mark";

/**
 * Illustration des intégrations officielles en orbite autour de LocalBoost.
 * Décorative : l'état réel de chaque connexion est listé juste en dessous.
 */
export function IntegrationsOrbit() {
  const node = "rounded-full border bg-card text-foreground shadow-raised dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)]";
  return (
    <div aria-hidden className="relative mx-auto flex h-[168px] w-full items-center justify-center overflow-hidden">
      <div className="relative z-10 rounded-[11px] shadow-raised">
        <BrandMark className="h-10 w-10" />
      </div>
      <OrbitingCircles radius={52} duration={22} iconSize={30}>
        <span className={`${node} flex h-full w-full items-center justify-center`}>
          <MapPin className="h-3.5 w-3.5" />
        </span>
        <span className={`${node} flex h-full w-full items-center justify-center`}>
          <Mail className="h-3.5 w-3.5" />
        </span>
      </OrbitingCircles>
      <OrbitingCircles radius={78} duration={30} iconSize={30} reverse>
        <span className={`${node} flex h-full w-full items-center justify-center`}>
          <Instagram className="h-3.5 w-3.5" />
        </span>
        <span className={`${node} flex h-full w-full items-center justify-center`}>
          <Facebook className="h-3.5 w-3.5" />
        </span>
      </OrbitingCircles>
    </div>
  );
}
