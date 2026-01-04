export default function Loading() {
  return (
    <div className="min-h-full flex flex-col animate-in fade-in duration-500">
      
      {/* 1. HEADER SKELETON */}
      <div className="sticky top-0 z-10 bg-[#F3F2ED]/95 backdrop-blur-sm px-8 py-8 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* Breadcrumb */}
          <div className="h-3 w-24 bg-neutral-200 rounded-sm mb-3 animate-pulse" />
          {/* Title */}
          <div className="h-10 w-48 bg-neutral-300 rounded-sm animate-pulse" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="h-10 flex-1 md:w-64 bg-white border border-black/5 rounded-sm animate-pulse" />
          {/* Button */}
          <div className="h-10 w-10 md:w-32 bg-black/5 rounded-sm animate-pulse" />
        </div>
      </div>

      {/* 2. GRID SKELETON */}
      <main className="p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Generate 8 skeleton cards */}
          {[...Array(8)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

// --- LOCAL SUBCOMPONENT: THE CARD SKELETON ---
function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-black/5 rounded-sm overflow-hidden h-full">
      
      {/* Image Area (Square Aspect Ratio) */}
      <div className="relative aspect-square bg-neutral-100 border-b border-black/5 p-8 flex items-center justify-center animate-pulse">
         {/* Fake Logo Placeholder */}
         <div className="h-16 w-16 rounded-full bg-neutral-200/50" />
      </div>

      {/* Footer Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title Line */}
        <div className="h-5 w-3/4 bg-neutral-200 rounded-sm animate-pulse" />
        
        {/* Date & Color Dot Line */}
        <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-1">
           <div className="h-3 w-20 bg-neutral-100 rounded-sm animate-pulse" />
           <div className="h-3 w-3 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}