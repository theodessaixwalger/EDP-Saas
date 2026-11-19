import {
  FeatureCardSkeleton,
  PageHeaderSkeleton,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Concurrents : tableau de veille, méthodologie. */
export default function CompetitorsLoading() {
  return (
    <SkeletonPage label="Chargement de la veille concurrentielle…">
      <PageHeaderSkeleton actions={1} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCardSkeleton columns={5} rows={6} className="xl:col-span-2" />
        <FeatureCardSkeleton items={4} />
      </div>
    </SkeletonPage>
  );
}
