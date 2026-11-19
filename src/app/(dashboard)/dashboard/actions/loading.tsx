import {
  Bone,
  ConnectorCardSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/** Actions recommandées : cartes d'actions, règles du moteur, signaux utilisés. */
export default function ActionsLoading() {
  return (
    <SkeletonPage label="Chargement des actions recommandées…">
      <PageHeaderSkeleton />

      <section className="space-y-3">
        <Bone className="h-4 w-36" />
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Bone className="h-5 w-36 rounded-full" />
                    <Bone className="h-3 w-16" />
                    <Bone className="h-3 w-20" />
                  </div>
                  <Bone className="mt-3 h-5 w-80 max-w-full" />
                  <Bone className="mt-2 h-3.5 w-full max-w-[42rem]" />
                </div>
                <Bone className="h-8 w-32 shrink-0 rounded-lg" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCardSkeleton columns={4} rows={5} className="xl:col-span-2" />
        <ConnectorCardSkeleton rows={4} className="h-fit" />
      </div>
    </SkeletonPage>
  );
}
