/* src/app/projects/[id]/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Make sure this path is correct
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>; // Params is a Promise now
};

export default async function ProjectPage({ params }: Props){
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }
  
  const { id } = await params;
  // 1. Fetch the specific brand identity
  const brand = await prisma.brandIdentity.findUnique({
    where: {
      id: id,
      userId: session.user.id, // Ensure user owns this project
    },
  });

  if (!brand) {
    return notFound();
  }

  // Helper to safely parse JSON colors/fonts
  const colors = brand.colors as any;
  const fonts = brand.fonts as any;

  return (
    <div className="min-h-screen bg-[#F3F2ED] text-black font-sans">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-black/10 bg-white">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-black/10 hover:bg-black hover:text-white transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Share2 size={14} /> Share
          </button>
          <button className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Download size={14} /> Export
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Visuals */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Hero Section */}
          <div className="text-center py-10">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
              {brand.brandName}
            </h1>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">
              Generated on {new Date(brand.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Logo Showcase */}
          <div className="aspect-video bg-white border border-black/10 rounded-sm flex items-center justify-center p-12 shadow-sm">
             <div className="relative w-full h-full">
                <Image 
                    src={brand.logoUrl} 
                    alt={`${brand.brandName} Logo`}
                    fill
                    className="object-contain"
                />
             </div>
          </div>

          {/* Color Palette */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Color Palette</h2>
            <div className="grid grid-cols-5 h-32 rounded-sm overflow-hidden border border-black/10">
              {/* Base Color */}
              <div 
                className="col-span-2 flex items-end p-4"
                style={{ backgroundColor: colors.base }}
              >
                <span className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Base</span>
              </div>
              
              {/* Palette Colors */}
              {colors.palette.map((hex: string, i: number) => (
                <div 
                    key={i} 
                    className="flex items-end p-4"
                    style={{ backgroundColor: hex }}
                >
                    <span className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="lg:col-span-4 space-y-8">
            {/* Fonts Card */}
            <div className="bg-white p-8 border border-black/10 rounded-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Typography</h3>
                <div className="text-4xl mb-2" style={{ fontFamily: 'sans-serif' }}>Aa</div>
                <div className="text-xl font-bold">{fonts.selected}</div>
                <div className="text-sm text-gray-500 mt-1 capitalize">{fonts.category} Style</div>
            </div>

            {/* AI Analysis Card */}
            <div className="bg-white p-8 border border-black/10 rounded-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">AI Rationale</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                    This brand identity was designed to convey a <strong>{fonts.category}</strong> vibe. 
                    The color palette utilizes an <strong>{colors.harmony}</strong> harmony to ensure visual balance.
                </p>
            </div>
        </div>
      </main>
    </div>
  );
}