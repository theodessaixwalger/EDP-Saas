import {
  Bone,
  CardHeaderSkeleton,
  MetricStripSkeleton,
  PageHeaderSkeleton,
  ReviewRowsSkeleton,
  SkeletonCard,
  SkeletonPage,
  TabsSkeleton,
} from "@/components/shared/skeletons";

/** Avis : indicateurs, onglets d'avis, modèles de réponse. */
export default function ReviewsLoading() {
  return (
    <SkeletonPage label="Chargement des avis…">
      <PageHeaderSkeleton />
      <MetricStripSkeleton count={4} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-2 xl:col-span-2">
          <TabsSkeleton tabs={3} />
          <SkeletonCard className="overflow-hidden">
            <ReviewRowsSkeleton rows={4} bordered={false} />
          </SkeletonCard>
        </div>
        <SkeletonCard className="h-fit">
          <CardHeaderSkeleton titleWidth="w-40" />
          <div className="divide-y border-t">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <Bone className="h-3.5 w-28" />
                  <Bone className="h-5 w-14 rounded-full" />
                </div>
                <Bone className="mt-2 h-3 w-full" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>
    </SkeletonPage>
  );
}
