import { Skeleton } from "@/components/ui/skeleton";
export function CustomerCardSkeleton() {
  return (
    <div>
      <div className="w-full rounded-md p-4 bg-background cursor-pointer mb-2 md:mb-4 hover:bg-secondary/80">
        <div className="flex items-center justify-between gap-1">
          <div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerCardTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <CustomerCardSkeleton></CustomerCardSkeleton>
          <CustomerCardSkeleton></CustomerCardSkeleton>
          <CustomerCardSkeleton></CustomerCardSkeleton>
          <CustomerCardSkeleton></CustomerCardSkeleton>
        </div>
      </div>
    </div>
  );
}
