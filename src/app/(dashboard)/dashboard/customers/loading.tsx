import {
  FeatureCardSkeleton,
  MetricStripSkeleton,
  PageHeaderSkeleton,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Clients : segments, fichier clients, consentements RGPD. */
export default function CustomersLoading() {
  return (
    <SkeletonPage label="Chargement des clients…">
      <PageHeaderSkeleton actions={2} />
      <MetricStripSkeleton count={5} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCardSkeleton columns={5} rows={6} className="xl:col-span-2" />
        <FeatureCardSkeleton items={4} />
      </div>
    </SkeletonPage>
  );
}
