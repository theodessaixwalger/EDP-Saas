import { Bone, PageHeaderSkeleton, SkeletonCard, SkeletonPage } from "@/components/shared/skeletons";

/** Établissements : une carte par point de vente (coordonnées, lien de gestion). */
export default function EstablishmentsLoading() {
  return (
    <SkeletonPage label="Chargement des établissements…">
      <PageHeaderSkeleton actions={1} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => (
          <SkeletonCard key={i}>
            <div className="flex items-start justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3">
                <Bone className="h-10 w-10 rounded-lg" />
                <div>
                  <Bone className="h-4 w-36" />
                  <Bone className="mt-2 h-3 w-24" />
                </div>
              </div>
              <Bone className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-4 p-5 pt-1">
              <div className="space-y-2.5">
                {["w-56", "w-32", "w-44"].map((w) => (
                  <div key={w} className="flex items-center gap-2">
                    <Bone className="h-4 w-4 shrink-0" />
                    <Bone className={`h-3.5 ${w}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <Bone className="h-3 w-28" />
                <Bone className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </SkeletonPage>
  );
}
