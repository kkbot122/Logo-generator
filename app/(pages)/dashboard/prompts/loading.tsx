export default function Loading() {
  return (
    <div className="min-h-full flex flex-col bg-[#F3F2ED] animate-in fade-in duration-500">
      
      {/* 1. HEADER SKELETON */}
      <header className="px-8 py-8 border-b border-black/10">
        <div className="flex flex-col gap-2">
           {/* Breadcrumb */}
           <div className="h-3 w-32 bg-neutral-200 rounded-sm animate-pulse" />
           {/* Title */}
           <div className="h-12 w-64 bg-neutral-300 rounded-sm animate-pulse" />
           {/* Description */}
           <div className="h-4 w-full max-w-md bg-neutral-200 rounded-sm animate-pulse mt-2" />
        </div>
      </header>

      {/* 2. GRID SKELETON */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Loop 6 times to fill the screen */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PromptCardSkeleton key={i} />
        ))}
      </main>
    </div>
  );
}

// --- LOCAL SUBCOMPONENT ---
function PromptCardSkeleton() {
  return (
    <div className="bg-white border border-black/5 rounded-sm p-6 flex flex-col gap-4 h-[300px]">
      
      {/* Top Row: Badge & Icon */}
      <div className="flex justify-between items-start">
        <div className="h-6 w-20 bg-neutral-100 rounded-sm animate-pulse" />
        <div className="h-4 w-4 bg-neutral-100 rounded-full animate-pulse" />
      </div>

      {/* Content Area */}
      <div className="space-y-3">
        {/* Title */}
        <div className="h-6 w-3/4 bg-neutral-200 rounded-sm animate-pulse" />
        {/* Description */}
        <div className="h-3 w-1/2 bg-neutral-100 rounded-sm animate-pulse" />
        
        {/* The Prompt Box Placeholder */}
        <div className="h-24 w-full bg-neutral-50 border border-black/5 rounded-sm mt-2 animate-pulse" />
      </div>

      {/* Footer Button */}
      <div className="mt-auto">
        <div className="h-10 w-full bg-neutral-100 rounded-sm animate-pulse" />
      </div>

    </div>
  );
}