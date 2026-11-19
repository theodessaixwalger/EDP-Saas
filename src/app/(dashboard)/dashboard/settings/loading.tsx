import {
  Bone,
  CardHeaderSkeleton,
  ListRowsSkeleton,
  PageHeaderSkeleton,
  SkeletonCard,
  SkeletonPage,
} from "@/components/shared/skeletons";

/** Paramètres : secteur d'activité, liste des modules activables. */
export default function SettingsLoading() {
  return (
    <SkeletonPage label="Chargement des paramètres…">
      <PageHeaderSkeleton actions={1} />
      <SkeletonCard>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Bone className="h-10 w-10 shrink-0 rounded-lg" />
            <div>
              <Bone className="h-4 w-36" />
              <Bone className="mt-2 h-3.5 w-56" />
            </div>
          </div>
          <Bone className="h-9 w-full rounded-lg sm:w-[22rem]" />
        </div>
      </SkeletonCard>
      <SkeletonCard className="overflow-hidden">
        <CardHeaderSkeleton className="p-5" aside={<Bone className="h-5 w-24 rounded-full" />} />
        <ListRowsSkeleton rows={6} icon={false} action={false} sw />
      </SkeletonCard>
    </SkeletonPage>
  );
}
