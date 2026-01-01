import { BrandCardSkeleton } from "@/components/BrandCardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-full flex flex-col bg-[#F3F2ED] p-8">
      {/* Header Skeleton */}
      <div className="h-20 mb-8 bg-neutral-200/50 rounded-sm w-full animate-pulse" />
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BrandCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}