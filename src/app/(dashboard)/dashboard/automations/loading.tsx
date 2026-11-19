import {
  CardHeaderSkeleton,
  ConnectorRowSkeleton,
  Bone,
  FeatureCardSkeleton,
  ListRowsSkeleton,
  MetricStripSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Automatisations : indicateurs, scénarios, journal d'envoi, connexion Brevo, conformité. */
export default function AutomationsLoading() {
  return (
    <SkeletonPage label="Chargement des automatisations…">
      <PageHeaderSkeleton />
      <MetricStripSkeleton count={4} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SkeletonCard>
            <CardHeaderSkeleton />
            <ListRowsSkeleton rows={4} icon={false} badge />
          </SkeletonCard>
          <TableCardSkeleton columns={4} rows={4} />
        </div>
        <div className="space-y-6">
          <SkeletonCard>
            <CardHeaderSkeleton titleWidth="w-32" />
            <div className="space-y-3 px-5 pb-5">
              <ConnectorRowSkeleton />
              <Bone className="h-8 w-full rounded-lg" />
            </div>
          </SkeletonCard>
          <FeatureCardSkeleton items={4} />
        </div>
      </div>
    </SkeletonPage>
  );
}
