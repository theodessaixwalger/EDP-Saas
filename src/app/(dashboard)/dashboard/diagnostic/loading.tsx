import {
  Bone,
  CardHeaderSkeleton,
  ConnectorRowSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
} from "@/components/shared/skeletons";

/** Diagnostic : score global, sources, détail par axe. */
export default function DiagnosticLoading() {
  return (
    <SkeletonPage label="Chargement du diagnostic…">
      <PageHeaderSkeleton actions={1} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <SkeletonCard className="flex flex-col justify-between p-5 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between gap-3">
              <Bone className="h-4 w-28" />
              <Bone className="h-5 w-20 rounded-full" />
            </div>
            <Bone className="mt-4 h-12 w-24" />
            <Bone className="mt-3 h-3.5 w-full" />
          </div>
          <div className="mt-8">
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <Bone key={i} className="h-2 flex-1 rounded-full" />
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              {Array.from({ length: 3 }, (_, i) => (
                <Bone key={i} className="h-3 w-16" />
              ))}
            </div>
          </div>
        </SkeletonCard>
        <SkeletonCard className="lg:col-span-3">
          <CardHeaderSkeleton />
          <div className="space-y-2 px-5 pb-5">
            {Array.from({ length: 3 }, (_, i) => (
              <ConnectorRowSkeleton key={i} />
            ))}
          </div>
        </SkeletonCard>
      </div>

      <SkeletonCard className="overflow-hidden">
        <CardHeaderSkeleton titleWidth="w-44" />
        <div className="grid gap-px border-t bg-border lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="bg-card p-5">
              <div className="flex items-center gap-2.5">
                <Bone className="h-8 w-8 rounded-md" />
                <div>
                  <Bone className="h-3.5 w-28" />
                  <Bone className="mt-1.5 h-3 w-20" />
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {Array.from({ length: 4 }, (_, j) => (
                  <Bone key={j} className="h-3 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SkeletonCard>
    </SkeletonPage>
  );
}
