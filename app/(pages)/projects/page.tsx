/* src/app/projects/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Filter, Calendar, MoreHorizontal } from "lucide-react";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  // Fetch all projects for the user, newest first
  const projects = await prisma.brandIdentity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-full flex flex-col">
      
      {/* 1. HEADER & CONTROLS */}
      <header className="sticky top-0 z-10 bg-[#F3F2ED]/95 backdrop-blur-sm px-6 py-6 border-b border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
             My Projects
           </h1>
           <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
             {projects.length} {projects.length === 1 ? 'Design' : 'Designs'} Created
           </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Search Input */}
           <div className="relative flex-1 md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH PROJECTS..." 
                className="w-full bg-white border border-black/10 pl-9 pr-4 h-10 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all rounded-sm placeholder:text-neutral-300"
              />
           </div>
           
           {/* Filter Button */}
           <button className="h-10 w-10 border border-black/10 bg-white hover:border-black transition-colors rounded-sm flex items-center justify-center">
             <Filter size={14} />
           </button>

           {/* Create Button */}
           <Link href="/generate" className="h-10 px-5 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-sm">
             <Plus size={14} /> 
             <span className="hidden sm:inline">New</span>
           </Link>
        </div>
      </header>

      {/* 2. PROJECTS GRID */}
      <main className="p-6 md:p-8">
        
        {projects.length === 0 ? (
           <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {/* "Add New" Ghost Card */}
            <Link href="/generate" className="group border border-dashed border-black/20 rounded-sm flex flex-col items-center justify-center gap-4 min-h-[300px] hover:bg-black/5 transition-colors cursor-pointer">
               <div className="h-12 w-12 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Plus size={24} className="opacity-50" />
               </div>
               <span className="text-xs font-bold uppercase tracking-widest opacity-50">Create New Project</span>
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function ProjectCard({ project }: { project: any }) {
  // Parse colors to get the base color for the badge
  const colors = project.colors as any; 
  
  return (
    <Link href={`/projects/${project.id}`} className="group flex flex-col bg-white border border-black/10 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:border-black">
      
      {/* Image Container */}
      <div className="relative aspect-square p-8 flex items-center justify-center bg-neutral-50/50 group-hover:bg-white transition-colors border-b border-black/5">
         {/* Grid Pattern Background */}
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

         {/* Status Badge (Absolute) */}
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
            
            {/* Small Color Dot */}
            <div className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: colors?.base || '#000' }} />
         </div>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
       <div className="w-24 h-24 bg-white border border-black/10 rounded-sm flex items-center justify-center mb-6 shadow-sm rotate-3">
          <Plus size={32} className="opacity-20" />
       </div>
       <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">No Projects Yet</h2>
       <p className="text-neutral-500 max-w-sm mb-8">
         Start your first brand identity project. It only takes a few seconds to generate professional assets.
       </p>
       <Link href="/generate" className="px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm text-xs font-bold uppercase tracking-widest">
          Generate Brand
       </Link>
    </div>
  )
}