/* src/app/dashboard/brand-kits/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Download,
  MoreHorizontal,
  Type,
  Palette,
  Copy,
} from "lucide-react";
import { SearchInput } from "@/components/SearchInput";
import BrandKitExportButton from "@/components/BrandKitExportButton";

export default async function BrandKitsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const params = await searchParams; // Await the params
  const query = params?.query || "";

  // Fetch projects to generate kits from
  const kits = await prisma.brandIdentity.findMany({
    where: {
      userId: session.user.id,
      // Add the filter logic:
      brandName: {
        contains: query,
        mode: "insensitive", // Case-insensitive search (e.g., "coffee" matches "Coffee")
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-full flex flex-col bg-[#F3F2ED] text-black">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-10 bg-[#F3F2ED]/95 backdrop-blur-sm px-8 py-8 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
            <span>Library</span>
            <span className="text-black">/</span>
            <span>Assets</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Brand Kits
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* 4. Replace the old input with your Client Component */}
          <SearchInput />
        </div>
      </header>

      {/* 2. MAIN GRID */}
      <main className="p-8">
        {kits.length === 0 ? (
          <EmptyState query={query}/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {kits.map((kit) => (
              <BrandKitCard key={kit.id} kit={kit} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function BrandKitCard({ kit }: { kit: any }) {
  // 1. DATA PARSING
  const rawColors = kit.colors;
  const fonts = (kit.fonts as any) || {};

  // 2. NORMALIZE COLORS
  let palette: string[] = [];
  let baseColor = "#CCCCCC"; // Fallback gray

  if (Array.isArray(rawColors)) {
    // SCENARIO A: The API saved it as a simple array (Your current code)
    palette = rawColors;
    baseColor = rawColors[0] || "#CCCCCC";
  } else if (typeof rawColors === "object" && rawColors !== null) {
    // SCENARIO B: It saved as an object (Legacy/Old data)
    palette = Array.isArray((rawColors as any).palette)
      ? (rawColors as any).palette
      : [];
    baseColor = (rawColors as any).base || palette[0] || "#CCCCCC";
  }

  return (
    <div className="bg-white border border-black/10 rounded-sm overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* CARD HEADER */}
      <div className="h-48 border-b border-black/10 flex relative">
        {/* Left: Typography */}
        <div className="w-1/2 p-6 flex flex-col justify-between border-r border-black/10 bg-neutral-50/50">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
            <Type size={12} /> Typography
          </div>
          <div className="text-center overflow-hidden">
            <span className="text-5xl font-serif italic block mb-[-10px] opacity-80 text-black">
              Aa
            </span>
            <span className="text-5xl font-black block z-10 text-black">
              Bb
            </span>
          </div>
          <div className="text-[10px] font-medium truncate text-center opacity-60">
            {fonts?.selected || "Default Sans"}
          </div>
        </div>

        {/* Right: Color Palette */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="p-3 border-b border-black/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
            <Palette size={12} /> Palette
          </div>
          <div className="flex-1 flex flex-col h-full">
            {/* Base Color (Dominant) */}
            <div
              className="flex-[2] w-full relative group/color"
              style={{ backgroundColor: baseColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity">
                <span className="bg-black/80 text-white text-[9px] px-1 py-0.5 rounded-sm uppercase tracking-widest">
                  {baseColor}
                </span>
              </div>
            </div>

            {/* Palette Strip (Remaining Colors) */}
            <div className="flex-1 flex w-full">
              {palette.length > 1 ? (
                // We slice from 1 because index 0 is already shown as the Base Color
                palette.slice(1, 4).map((hex: string, i: number) => (
                  <div
                    key={i}
                    className="flex-1 h-full relative group/color"
                    style={{ backgroundColor: hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity">
                      <span className="bg-black/80 text-white text-[8px] px-1 py-0.5 rounded-sm uppercase">
                        {hex}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-[8px] text-neutral-300">
                  NO PALETTE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="overflow-hidden">
            <h3 className="text-lg font-black uppercase tracking-tight mb-1 group-hover:underline decoration-2 underline-offset-4 cursor-pointer truncate">
              {kit.brandName || "Untitled Brand"}
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
              {new Date(kit.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button className="h-8 w-8 flex-shrink-0 flex items-center justify-center hover:bg-black hover:text-white rounded-sm transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button className="flex items-center justify-center gap-2 py-3 border border-black/10 hover:border-black rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-neutral-50">
            <Copy size={12} /> Hex
          </button>
          <BrandKitExportButton brand={kit} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] border-2 border-dashed border-black/10 rounded-sm p-12">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
        <Palette size={24} className="opacity-30" />
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight mb-2">
        {query ? `No results for "${query}"` : "No Brand Kits Found"}
      </h3>
      <p className="text-sm text-neutral-500 max-w-xs text-center mb-6">
        {query
          ? "Try a different search term."
          : "Create a project first. Brand kits are automatically generated from your design projects."}
      </p>
      {!query && (
        <Link
          href="/generate"
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800"
        >
          Generate New Brand
        </Link>
      )}
    </div>
  );
}
