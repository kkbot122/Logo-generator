/* src/app/projects/[id]/loading.tsx */
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F3F2ED] animate-in fade-in duration-500 pb-20">
      {/* 1. HEADER SKELETON */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-black/10 bg-white sticky top-0 z-50">
        {/* Back Link Placeholder */}
        <div className="h-4 w-24 bg-neutral-200 rounded-sm animate-pulse" />
        {/* Export Button Placeholder */}
        <div className="h-9 w-40 bg-neutral-900/10 rounded-sm animate-pulse" />
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-20">
        {/* 2. HERO SKELETON */}
        <section className="flex flex-col items-center py-10 space-y-6">
          {/* Badge */}
          <div className="h-6 w-32 bg-white border border-black/5 rounded-full animate-pulse" />

          {/* Title (Big) */}
          <div className="h-16 md:h-32 w-3/4 max-w-2xl bg-neutral-300 rounded-sm animate-pulse" />

          {/* Slogan Lines */}
          <div className="space-y-2 w-full max-w-lg flex flex-col items-center">
            <div className="h-4 w-full bg-neutral-200 rounded-sm animate-pulse" />
            <div className="h-4 w-2/3 bg-neutral-200 rounded-sm animate-pulse" />
          </div>

          {/* Keywords Chips */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-neutral-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </section>

        {/* 3. CORE ASSETS GRID SKELETON */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Logo Card (col-span-8) */}
          <div className="lg:col-span-8 aspect-video bg-white border border-black/10 rounded-sm flex items-center justify-center p-12">
            <div className="h-32 w-32 rounded-full bg-neutral-100 animate-pulse" />
          </div>

          {/* Typography Card (col-span-4) */}
          <div className="lg:col-span-4 bg-black/5 rounded-sm p-8 flex flex-col justify-between h-full min-h-[300px] animate-pulse">
            <div className="space-y-4">
              <div className="h-3 w-24 bg-neutral-300 rounded-sm" />
              <div className="h-16 w-3/4 bg-neutral-300 rounded-sm" />
            </div>
            <div className="border-t border-black/5 pt-4 mt-8 space-y-2">
              <div className="h-6 w-1/2 bg-neutral-300 rounded-sm" />
              <div className="h-3 w-1/3 bg-neutral-300 rounded-sm" />
            </div>
          </div>
        </section>

        {/* 4. PALETTE SKELETON */}
        <section>
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-4">
            <div className="h-8 w-48 bg-neutral-300 rounded-sm animate-pulse" />
            <div className="h-4 w-24 bg-neutral-200 rounded-sm animate-pulse" />
          </div>

          {/* Colors Grid */}
          <div className="grid grid-cols-5 h-40 rounded-sm overflow-hidden border border-black/10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-full bg-white border-r border-black/5 last:border-r-0 animate-pulse relative"
              >
                <div
                  className="absolute inset-0 bg-neutral-200/50"
                  style={{ opacity: i * 0.1 + 0.2 }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
