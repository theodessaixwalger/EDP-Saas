import {
  Bone,
  CardHeaderSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
} from "@/components/shared/skeletons";

/** Équipe : rôles disponibles, tableau des membres. */
export default function TeamLoading() {
  return (
    <SkeletonPage label="Chargement de l'équipe…">
      <PageHeaderSkeleton actions={1} />
      <SkeletonCard className="overflow-hidden">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="bg-card p-5">
              <Bone className="h-4 w-28" />
              <Bone className="mt-2.5 h-3 w-full" />
              <Bone className="mt-1.5 h-3 w-2/3" />
            </div>
          ))}
        </div>
      </SkeletonCard>
      <SkeletonCard className="overflow-hidden">
        <CardHeaderSkeleton className="p-5" titleWidth="w-32" />
        <div className="border-t">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b px-4 py-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Bone key={i} className="h-3 w-16" />
            ))}
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 border-b px-4 py-3 last:border-b-0">
              <div className="flex items-center gap-3">
                <Bone className="h-8 w-8 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <Bone className="h-3.5 w-32" />
                  <Bone className="mt-1.5 h-3 w-44 max-w-full" />
                </div>
              </div>
              <Bone className="h-5 w-24 rounded-full" />
              <Bone className="h-3.5 w-20" />
            </div>
          ))}
        </div>
      </SkeletonCard>
    </SkeletonPage>
  );
}
