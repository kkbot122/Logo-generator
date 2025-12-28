/* src/app/projects/[id]/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Calendar, Hash } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props){
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }
  
  const { id } = await params;
  
  const brand = await prisma.brandIdentity.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!brand) {
    return notFound();
  }

  const colors = brand.colors as any;
  const fonts = brand.fonts as any;

  return (
    // Note: No outer div needed here as Layout handles the container
    <div className="min-h-full">
      
      {/* HEADER (Sticky inside the scroll view if desired, or just top of page) */}
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-[#F3F2ED]/95 backdrop-blur-sm px-8 py-6 flex items-center justify-between border-b border-black/10 relative">
        
        {/* Left: Back Link */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors z-20"
        >
          <ArrowLeft size={12} />
          <span className="hidden sm:inline">Back to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Center: Brand Name (Absolutely Positioned) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <h1 className="text-2xl font-black uppercase tracking-tighter whitespace-nowrap">
            {brand.brandName}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-3 z-20">
          <button className="h-10 px-4 border border-black/10 bg-white hover:border-black transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Share2 size={14} /> 
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="h-10 px-4 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Download size={14} /> 
            <span className="hidden sm:inline">Export Assets</span>
          </button>
        </div>
      </header>

      {/* CONTENT GRID */}
      <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Visuals */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Logo Showcase */}
          <section>
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">Logo</h2>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                   <Calendar size={12}/>
                   {new Date(brand.createdAt).toLocaleDateString()}
                </div>
             </div>
             
             <div className="aspect-video bg-white border border-black/10 rounded-sm flex items-center justify-center p-12 relative overflow-hidden group">
               {/* Checkerboard pattern for transparency indication */}
               <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
               </div>
               
               <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                 <Image 
                   src={brand.logoUrl} 
                   alt={`${brand.brandName} Logo`}
                   fill
                   className="object-contain"
                   priority
                 />
               </div>
             </div>
          </section>

          {/* Color Palette */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Color Palette</h2>
            <div className="grid grid-cols-5 h-32 rounded-sm overflow-hidden border border-black/10">
              {/* Base Color */}
              <div 
                className="col-span-2 flex items-end p-4 relative group"
                style={{ backgroundColor: colors.base }}
              >
                <div className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  Base <span className="opacity-50 ml-1">{colors.base}</span>
                </div>
              </div>
              
              {/* Palette Colors */}
              {colors.palette.map((hex: string, i: number) => (
                <div 
                  key={i} 
                  className="flex items-end p-4 relative group hover:flex-[1.2] transition-all duration-300"
                  style={{ backgroundColor: hex }}
                >
                  <div className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {hex}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Metadata & Details */}
        <div className="lg:col-span-4 flex flex-col gap-6 ">
            
            {/* Fonts Card */}
            <div className="bg-white p-6 border border-black/10 rounded-sm">
                <div className="flex items-center gap-2 mb-6 text-neutral-400">
                   <span className="text-4xl font-serif italic">Aa</span>
                   <span className="text-4xl font-sans font-black">Bb</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Primary Font</span>
                    <div className="text-xl font-bold">{fonts.selected}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Style Category</span>
                    <div className="text-sm font-medium border border-black/10 inline-block px-2 py-1 rounded-sm mt-1 uppercase tracking-wider text-xs">
                      {fonts.category}
                    </div>
                  </div>
                </div>
            </div>

            {/* AI Analysis Card */}
            <div className="bg-[#1a1a1a] text-[#F3F2ED] p-6 rounded-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Hash size={12} /> AI Rationale
                </h3>
                <p className="text-sm leading-relaxed opacity-80 font-medium">
                    This brand identity was designed to convey a <strong className="text-white underline decoration-white/30">{fonts.category}</strong> vibe. 
                    The color palette utilizes an <strong className="text-white underline decoration-white/30">{colors.harmony}</strong> harmony to ensure visual balance.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 text-[10px] uppercase tracking-widest opacity-50">
                   Generated by Aura Engine v2
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}