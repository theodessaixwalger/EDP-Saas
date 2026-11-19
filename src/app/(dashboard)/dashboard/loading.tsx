import {
  Bone,
  ConnectorCardSkeleton,
  MetricStripSkeleton,
  ReviewRowsSkeleton,
  SkeletonCard,
  SkeletonPage,
  TrendChartSkeleton,
} from "@/components/shared/skeletons";

/** Tableau de bord : accueil + étapes, indicateurs, fréquentation + intégrations, derniers avis. */
export default function DashboardLoading() {
  return (
    <SkeletonPage label="Chargement du tableau de bord…">
      <div className="rounded-2xl border bg-card">
        <div className="flex flex-col gap-5 px-5 pb-5 pt-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pt-9">
          <div className="min-w-0 flex-1">
            <Bone className="h-10 w-64 max-w-full" />
            <Bone className="mt-3 h-4 w-72 max-w-full" />
          </div>
          <div className="flex gap-2">
            <Bone className="h-9 w-40 rounded-lg" />
            <Bone className="h-9 w-32 rounded-lg" />
          </div>
        </div>
        <div className="border-t px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <Bone className="h-3.5 w-52" />
            <Bone className="h-3.5 w-44" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                <Bone className="h-1 w-full rounded-full" />
                <Bone className="mt-2 h-3 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <MetricStripSkeleton count={4} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TrendChartSkeleton className="xl:col-span-2" />
        <ConnectorCardSkeleton rows={3} />
      </div>

      <SkeletonCard>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <Bone className="h-4 w-32" />
            <Bone className="mt-2 h-3.5 w-56" />
          </div>
          <Bone className="h-8 w-24 rounded-lg" />
        </div>
        <ReviewRowsSkeleton rows={3} />
      </SkeletonCard>
    </SkeletonPage>
  );
}
