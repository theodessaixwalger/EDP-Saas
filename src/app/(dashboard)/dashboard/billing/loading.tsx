import {
  Bone,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Facturation : abonnement actuel, trois offres, historique des factures. */
export default function BillingLoading() {
  return (
    <SkeletonPage label="Chargement de la facturation…">
      <PageHeaderSkeleton actions={1} />

      <SkeletonCard className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Bone className="h-11 w-11 shrink-0 rounded-lg" />
            <div>
              <Bone className="h-4 w-40" />
              <Bone className="mt-2 h-3.5 w-56" />
            </div>
          </div>
          <Bone className="h-4 w-48" />
        </div>
      </SkeletonCard>

      <section className="space-y-3">
        <Bone className="h-4 w-32" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} className="flex flex-col">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <Bone className="h-4 w-24" />
                  {i === 1 && <Bone className="h-5 w-20 rounded-full" />}
                </div>
                <Bone className="mt-3 h-8 w-28" />
                <Bone className="mt-2 h-3.5 w-full" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-5 p-5 pt-0">
                <div className="space-y-2.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Bone className="h-4 w-4 shrink-0 rounded-full" />
                      <Bone className="h-3.5 w-4/5" />
                    </div>
                  ))}
                </div>
                <Bone className="h-9 w-full rounded-lg" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>

      <TableCardSkeleton columns={5} rows={3} />
    </SkeletonPage>
  );
}
