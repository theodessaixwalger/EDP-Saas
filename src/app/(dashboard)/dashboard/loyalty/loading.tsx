import {
  Bone,
  CardHeaderSkeleton,
  FeatureListSkeleton,
  MetricStripSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TabsSkeleton,
} from "@/components/shared/skeletons";

/** Fidélité : indicateurs, onglets, modes d'acquisition des points, règles RGPD. */
export default function LoyaltyLoading() {
  return (
    <SkeletonPage label="Chargement du programme de fidélité…">
      <PageHeaderSkeleton actions={2} />
      <MetricStripSkeleton count={4} />
      <div className="space-y-2">
        <TabsSkeleton tabs={3} />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <SkeletonCard className="xl:col-span-2">
            <CardHeaderSkeleton titleWidth="w-48" />
            <div className="grid gap-3 p-5 pt-0 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Bone className="h-9 w-9 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <Bone className="h-3.5 w-28" />
                      <Bone className="mt-1.5 h-3 w-20" />
                    </div>
                  </div>
                  <Bone className="mt-3 h-3 w-full" />
                </div>
              ))}
              <div className="flex justify-end sm:col-span-2">
                <Bone className="h-8 w-32 rounded-lg" />
              </div>
            </div>
          </SkeletonCard>
          <SkeletonCard>
            <CardHeaderSkeleton titleWidth="w-36" />
            <div className="px-5 pb-5">
              <FeatureListSkeleton items={4} />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </SkeletonPage>
  );
}
