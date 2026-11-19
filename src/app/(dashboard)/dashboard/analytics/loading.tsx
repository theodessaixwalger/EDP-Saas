import {
  Bone,
  CardHeaderSkeleton,
  MetricStripSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TrendChartSkeleton,
} from "@/components/shared/skeletons";

function StatGridCard() {
  return (
    <SkeletonCard>
      <CardHeaderSkeleton />
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-card p-3.5">
              <Bone className="h-3.5 w-24" />
              <Bone className="mt-2.5 h-6 w-14" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonCard>
  );
}

/** Analytics : indicateurs fidélité, fréquentation, deux grilles de statistiques. */
export default function AnalyticsLoading() {
  return (
    <SkeletonPage label="Chargement des statistiques…">
      <PageHeaderSkeleton actions={1} />
      <section className="space-y-3">
        <Bone className="h-4 w-28" />
        <MetricStripSkeleton count={4} />
      </section>
      <TrendChartSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatGridCard />
        <StatGridCard />
      </div>
    </SkeletonPage>
  );
}
