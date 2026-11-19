/**
 * État de chargement de l'espace commerçant, affiché instantanément au changement de page
 * pendant que le serveur prépare la suivante. Sa présence permet aussi à Next de précharger
 * ces routes dynamiques au survol des liens. Même gabarit que les pages : en-tête, indicateurs, cartes.
 */
export default function DashboardLoading() {
  const block = "rounded-md bg-muted motion-safe:animate-pulse";

  return (
    <div className="space-y-6" role="status" aria-live="polite">
      <span className="sr-only">Chargement de la page…</span>

      <div className="rounded-xl border bg-card px-5 py-6 sm:px-7 sm:py-7" aria-hidden>
        <div className={`${block} h-8 w-56`} />
        <div className={`${block} mt-3 h-4 w-full max-w-md`} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-hidden>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-xl border bg-card px-5 py-4">
            <div className={`${block} h-3.5 w-24`} />
            <div className={`${block} mt-3 h-8 w-16`} />
            <div className={`${block} mt-3 h-3 w-28`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3" aria-hidden>
        <div className="rounded-xl border bg-card p-5 xl:col-span-2">
          <div className={`${block} h-4 w-40`} />
          <div className={`${block} mt-2 h-3.5 w-64 max-w-full`} />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`${block} h-9 w-full`} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className={`${block} h-4 w-32`} />
          <div className={`${block} mt-2 h-3.5 w-48 max-w-full`} />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={`${block} h-12 w-full`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
