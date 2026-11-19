import { Bone, PageHeaderSkeleton, SkeletonPage } from "@/components/shared/skeletons";

/** Calendrier éditorial : filtres par réseau, grille mensuelle. */
export default function CalendarLoading() {
  return (
    <SkeletonPage label="Chargement du calendrier…">
      <PageHeaderSkeleton actions={1} />
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Bone className="mr-1 h-4 w-16" />
          {Array.from({ length: 3 }, (_, i) => (
            <Bone key={i} className="h-8 w-28 rounded-full" />
          ))}
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex gap-1">
              <Bone className="h-8 w-8 rounded-lg" />
              <Bone className="h-8 w-8 rounded-lg" />
              <Bone className="h-8 w-24 rounded-lg" />
            </div>
            <Bone className="h-6 w-40" />
            <Bone className="h-8 w-44 rounded-lg" />
          </div>
          <div className="grid grid-cols-7 overflow-hidden rounded-lg border">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="border-b px-2 py-2">
                <Bone className="mx-auto h-3 w-8" />
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="h-24 border-b border-r p-1.5 [&:nth-child(7n)]:border-r-0">
                <Bone className="ml-auto h-3 w-4" />
                {i % 4 === 1 && <Bone className="mt-2 h-4 w-full rounded" />}
                {i % 9 === 3 && <Bone className="mt-1 h-4 w-3/4 rounded" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
