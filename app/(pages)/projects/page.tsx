/* src/app/projects/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Calendar, MoreHorizontal } from "lucide-react";
import { SearchInput } from "@/components/SearchInput"; // Check your specific path
import CreateProjectTrigger from "@/components/CreateProjectTrigger"; // <--- Import the new trigger

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const params = await searchParams;
  const query = params?.query || "";
  
  const projects = await prisma.brandIdentity.findMany({
    where: {
      userId: session.user.id,
      brandName: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-full flex flex-col">
      
      {/* 1. HEADER & CONTROLS */}
      <header className="sticky top-0 z-10 bg-[#F3F2ED]/95 backdrop-blur-sm px-8 py-8 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
            <span>Library</span>
            <span className="text-black">/</span>
            <span>Assets</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Projects
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <SearchInput />
        
        </div>
      </header>

      {/* 2. PROJECTS GRID */}
      <main className="p-6 md:p-8">
        
        {projects.length === 0 ? (
           <EmptyState query={query} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* "Add New" Ghost Card - Wrapped in Trigger */}
            <CreateProjectTrigger className="group border border-dashed border-black/20 rounded-sm flex flex-col items-center justify-center gap-4 min-h-[300px] hover:bg-black/5 transition-colors cursor-pointer">
               <div className="h-12 w-12 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Plus size={24} className="opacity-50" />
               </div>
               <span className="text-xs font-bold uppercase tracking-widest opacity-50">Create New Project</span>
            </CreateProjectTrigger>

            {/* Existing Projects */}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
          </div>
        )}

      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function ProjectCard({ project }: { project: any }) {
  const colors = project.colors as any; 
  
  // NORMALIZE COLORS (Defensive check like we did in Brand Kits)
  let baseColor = '#000';
  if (Array.isArray(colors)) {
     baseColor = colors[0] || '#000';
  } else if (colors?.base) {
     baseColor = colors.base;
  }

  return (
    <Link href={`/projects/${project.id}`} className="group flex flex-col bg-white border border-black/10 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:border-black">
      {/* ... (Keep your existing card design exactly the same) ... */}
      
      {/* Image Container */}
      <div className="relative aspect-square p-8 flex items-center justify-center bg-neutral-50/50 group-hover:bg-white transition-colors border-b border-black/5">
         <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
         </div>

         <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
            <Image 
              src={project.logoUrl} 
              alt={project.brandName}
              fill
              className="object-contain"
            />
         </div>

         <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-8 w-8 bg-white border border-black/10 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors">
               <MoreHorizontal size={14} />
            </div>
         </div>
      </div>

      {/* Info Footer */}
      <div className="p-4 flex flex-col gap-3">
         <div className="flex justify-between items-start">
            <h3 className="font-black uppercase tracking-tight text-lg leading-tight line-clamp-1 group-hover:underline decoration-2 underline-offset-4">
              {project.brandName}
            </h3>
         </div>
         
         <div className="flex items-center justify-between pt-2 border-t border-black/5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
               <Calendar size={10} />
               {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
            
            <div className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: baseColor }} />
         </div>
      </div>
    </Link>
  )
}

function EmptyState({ query }: { query: string }) {
  // If searching, show "No results", otherwise show "Create First Project"
  if (query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-xl font-bold uppercase mb-2">No results found for "{query}"</h2>
        <p className="text-neutral-500 text-sm">Try searching for a different brand name.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
       <div className="w-24 h-24 bg-white border border-black/10 rounded-sm flex items-center justify-center mb-6 shadow-sm rotate-3">
          <Plus size={32} className="opacity-20" />
       </div>
       <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">No Projects Yet</h2>
       <p className="text-neutral-500 max-w-sm mb-8">
         Start your first brand identity project. It only takes a few seconds to generate professional assets.
       </p>
       
       {/* REPLACED LINK WITH TRIGGER */}
       <CreateProjectTrigger className="px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm text-xs font-bold uppercase tracking-widest cursor-pointer">
          Generate Brand
       </CreateProjectTrigger>
    </div>
  )
}