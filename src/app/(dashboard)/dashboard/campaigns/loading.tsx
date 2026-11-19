import {
  Bone,
  CardHeaderSkeleton,
  ListRowsSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Campagnes : modèles prêts à l'emploi, campagnes envoyées, segments. */
export default function CampaignsLoading() {
  return (
    <SkeletonPage label="Chargement des campagnes…">
      <PageHeaderSkeleton actions={1} />

      <SkeletonCard className="overflow-hidden">
        <CardHeaderSkeleton titleWidth="w-48" aside={<Bone className="h-5 w-40 rounded-full" />} />
        <ListRowsSkeleton rows={4} icon="square" badge />
      </SkeletonCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCardSkeleton columns={6} rows={4} className="xl:col-span-2" />
        <SkeletonCard className="h-fit">
          <CardHeaderSkeleton titleWidth="w-32" />
          <div className="space-y-4 px-5 pb-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <Bone className="h-3.5 w-32" />
                  <Bone className="mt-1.5 h-3 w-full" />
                </div>
                <Bone className="h-5 w-8" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>
    </SkeletonPage>
  );
}
