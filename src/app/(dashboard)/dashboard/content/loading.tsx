import {
  MetricStripSkeleton,
  PageHeaderSkeleton,
  SkeletonPage,
  TableCardSkeleton,
  TabsSkeleton,
} from "@/components/shared/skeletons";

/** Contenus : compteurs par statut, onglets publications / médiathèque, tableau. */
export default function ContentLoading() {
  return (
    <SkeletonPage label="Chargement des contenus…">
      <PageHeaderSkeleton actions={2} />
      <MetricStripSkeleton count={6} hint={false} />
      <div className="space-y-2">
        <TabsSkeleton tabs={2} />
        <TableCardSkeleton columns={5} rows={6} />
      </div>
    </SkeletonPage>
  );
}
