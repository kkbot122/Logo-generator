/* src/app/dashboard/loading.tsx */
export default function Loading() {
  return (
    <div className="flex flex-col min-h-full w-full bg-[#F3F2ED] animate-in fade-in duration-500">
      
      {/* 1. HEADER SKELETON */}
      <header className="px-8 py-10 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* Breadcrumb */}
          <div className="h-3 w-32 bg-neutral-200 rounded-sm mb-4 animate-pulse" />
          {/* Title Placeholder */}
          <div className="space-y-2">
            <div className="h-12 w-64 bg-neutral-300 rounded-sm animate-pulse" />
            <div className="h-12 w-48 bg-neutral-300 rounded-sm animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Credits Placeholder */}
          <div className="hidden md:flex flex-col items-end mr-4 gap-1">
             <div className="h-3 w-16 bg-neutral-200 rounded-sm animate-pulse" />
             <div className="h-6 w-24 bg-neutral-300 rounded-sm animate-pulse" />
          </div>
          {/* Button Placeholder */}
          <div className="h-12 w-40 bg-black/5 rounded-sm animate-pulse" />
        </div>
      </header>

      {/* 2. STATS GRID SKELETON */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 border-r border-black/10 last:border-r-0">
             <div className="flex justify-between mb-4">
               <div className="h-3 w-24 bg-neutral-200 rounded-sm animate-pulse" />
               <div className="h-5 w-5 bg-neutral-200 rounded-full animate-pulse" />
             </div>
             <div className="h-10 w-16 bg-neutral-300 rounded-sm mb-2 animate-pulse" />
             <div className="h-3 w-32 bg-neutral-100 rounded-sm animate-pulse" />
          </div>
        ))}
      </section>

      {/* 3. RECENT PROJECTS SKELETON */}
      <section className="flex-1 p-8">
        <div className="mb-8">
           <div className="h-8 w-48 bg-neutral-300 rounded-sm animate-pulse" />
        </div>

        <div className="border border-black/10 bg-white rounded-sm overflow-hidden">
           {/* Table Header */}
           <div className="h-10 bg-[#F3F2ED]/50 border-b border-black/10 w-full animate-pulse" />

           {/* Table Rows */}
           <div className="flex flex-col">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b border-black/5 last:border-b-0 items-center">
                  <div className="col-span-6 md:col-span-5 space-y-2">
                     <div className="h-4 w-48 bg-neutral-200 rounded-sm animate-pulse" />
                     <div className="h-3 w-24 bg-neutral-100 rounded-sm animate-pulse" />
                  </div>
                  <div className="col-span-3 hidden md:block">
                     <div className="h-6 w-20 bg-neutral-100 rounded-sm animate-pulse" />
                  </div>
                  <div className="col-span-3 hidden md:block">
                     <div className="h-3 w-24 bg-neutral-100 rounded-sm animate-pulse" />
                  </div>
                  <div className="col-span-6 md:col-span-1 flex justify-end">
                     <div className="h-8 w-8 bg-neutral-100 rounded-sm animate-pulse" />
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}