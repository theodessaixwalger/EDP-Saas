import {
  CardHeaderSkeleton,
  FeatureCardSkeleton,
  ListRowsSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Canaux : comptes connectés, file de publication, garanties. */
export default function ChannelsLoading() {
  return (
    <SkeletonPage label="Chargement des canaux…">
      <PageHeaderSkeleton />
      <SkeletonCard className="overflow-hidden">
        <CardHeaderSkeleton titleWidth="w-24" />
        <ListRowsSkeleton rows={3} icon="large" />
      </SkeletonCard>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCardSkeleton columns={5} rows={4} className="xl:col-span-2" />
        <FeatureCardSkeleton items={4} />
      </div>
    </SkeletonPage>
  );
}
