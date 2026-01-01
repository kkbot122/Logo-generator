export function BrandCardSkeleton() {
  return (
    <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col h-[300px] animate-pulse">
      {/* Header Skeleton */}
      <div className="h-48 border-b border-black/10 flex">
        <div className="w-1/2 border-r border-black/10 bg-neutral-100" />
        <div className="w-1/2 bg-neutral-50" />
      </div>
      
      {/* Body Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 w-3/4 bg-neutral-200 rounded-sm" />
        <div className="h-3 w-1/4 bg-neutral-100 rounded-sm" />
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-full bg-neutral-100 rounded-sm" />
          <div className="h-8 w-full bg-neutral-100 rounded-sm" />
        </div>
      </div>
    </div>
  );
}