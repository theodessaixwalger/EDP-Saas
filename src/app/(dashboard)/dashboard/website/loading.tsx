import {
  Bone,
  FeatureCardSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
} from "@/components/shared/skeletons";

/** Site web : aperçu navigateur du mini-site, fonctionnalités incluses. */
export default function WebsiteLoading() {
  return (
    <SkeletonPage label="Chargement du site web…">
      <PageHeaderSkeleton actions={1} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <SkeletonCard className="overflow-hidden lg:col-span-3">
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            ))}
            <div className="ml-2 h-6 flex-1 rounded-md border bg-card" />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Bone className="h-6 w-48" />
                <Bone className="mt-2 h-3.5 w-64 max-w-full" />
              </div>
              <Bone className="h-5 w-20 rounded-full" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="rounded-lg border border-dashed px-3 py-3">
                  <Bone className="h-3.5 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </SkeletonCard>
        <FeatureCardSkeleton items={5} className="h-auto lg:col-span-2" />
      </div>
    </SkeletonPage>
  );
}
