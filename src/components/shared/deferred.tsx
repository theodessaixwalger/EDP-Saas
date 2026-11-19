"use client";

import * as React from "react";

/**
 * Chargement différé des composants interactifs lourds (menus, listes déroulantes, tiroirs Radix).
 *
 * Tant que l'utilisateur n'interagit pas, un déclencheur statique au rendu identique est affiché :
 * le code Radix (positionnement, focus, portails…) ne pèse plus sur le premier affichage.
 * - survol, focus ou toucher du déclencheur : le module est préchargé ;
 * - clic, Entrée, Espace ou flèche bas : le vrai composant remplace le déclencheur, déjà ouvert ;
 * - quelques secondes après le chargement de la page : préchargement en tâche de fond,
 *   pour que la première ouverture soit instantanée (sans remplacer le déclencheur).
 */

export interface DeferredTriggerProps {
  onPointerEnter: () => void;
  onFocus: () => void;
  onTouchStart: () => void;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export type WithDefaultOpen<P> = P & { defaultOpen?: boolean };
export type WithTrigger<P> = P & { trigger: DeferredTriggerProps };

const BACKGROUND_PRELOAD_DELAY_MS = 2500;

export function deferred<P extends object>(
  loader: () => Promise<React.ComponentType<WithDefaultOpen<P>>>,
  Placeholder: React.ComponentType<WithTrigger<P>>
) {
  let loaded: React.ComponentType<WithDefaultOpen<P>> | null = null;
  let pending: Promise<React.ComponentType<WithDefaultOpen<P>>> | null = null;

  const load = () => {
    pending ??= loader().then(
      (component) => (loaded = component),
      (error: unknown) => {
        // Échec réseau : on autorise une nouvelle tentative à la prochaine interaction.
        pending = null;
        throw error;
      }
    );
    return pending;
  };
  const preload = () => {
    load().catch(() => undefined);
  };

  function Deferred(props: P) {
    const [Component, setComponent] = React.useState(() => loaded);
    const [openOnMount, setOpenOnMount] = React.useState(false);

    React.useEffect(() => {
      if (Component) return;
      let timer: number | undefined;
      const schedule = () => {
        timer = window.setTimeout(preload, BACKGROUND_PRELOAD_DELAY_MS);
      };
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
      return () => {
        window.removeEventListener("load", schedule);
        window.clearTimeout(timer);
      };
    }, [Component]);

    const trigger = React.useMemo<DeferredTriggerProps>(() => {
      const open = () => {
        setOpenOnMount(true);
        load().then((component) => setComponent(() => component), () => setOpenOnMount(false));
      };
      return {
        onPointerEnter: preload,
        onFocus: preload,
        onTouchStart: preload,
        onClick: open,
        onKeyDown: (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            open();
          }
        },
      };
    }, []);

    if (Component) return <Component {...props} defaultOpen={openOnMount} />;
    return <Placeholder {...props} trigger={trigger} />;
  }

  return Deferred;
}
