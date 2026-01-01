/* src/components/ProjectInterface.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Loader2, Copy } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import BrandBook from "./BrandBook";
import { verifyAndTrackDownload } from "@/app/actions/download";

type Props = {
  brand: {
    id: string;
    brandName: string;
    logoUrl: string;
    colors: any; // We typecast strictly inside the component
    fonts: any;
    slogan?: string | null; // Added slogan field
    keywords?: string[] | null; // Added keywords field
  };
};

export default function ProjectInterface({ brand }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 1. Safe Data Parsing
  // Check if colors is an array (new format) or object with palette (old format)
  const getColorPalette = () => {
    if (Array.isArray(brand.colors)) {
      // New format: colors is directly the palette array
      return brand.colors as string[];
    } else if (brand.colors && typeof brand.colors === 'object' && 'palette' in brand.colors) {
      // Old format: colors.palette is the array
      return (brand.colors as any).palette as string[];
    } else {
      // Fallback to empty array or default palette
      console.warn("Invalid colors format:", brand.colors);
      return ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"] as string[];
    }
  };

  const getHarmonyType = () => {
    if (brand.colors && typeof brand.colors === 'object' && 'harmony' in brand.colors) {
      return (brand.colors as any).harmony as string;
    }
    return "complementary"; // Default fallback
  };

  const getBaseColor = () => {
    if (brand.colors && typeof brand.colors === 'object' && 'base' in brand.colors) {
      return (brand.colors as any).base as string;
    }
    return "#3B82F6"; // Default fallback
  };

  const colors = {
    palette: getColorPalette(),
    harmony: getHarmonyType(),
    base: getBaseColor()
  };

  const fonts = brand.fonts as { selected: string; category: string };

  // Use actual slogan if available, otherwise create a fallback
  const slogan = brand.slogan || `Redefining the future of ${brand.brandName}`;

  // Copy hex code to clipboard
  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // --- EXPORT FUNCTION ---
  const handleExport = async () => {
    setIsExporting(true);

    try {
      const check = await verifyAndTrackDownload();

      if (!check.success) {
        alert(
          "You have reached your free download limit (2/2). Please upgrade to Pro."
        );
        setIsExporting(false);
        return;
      }

      // Initialize PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Find all "Pages" inside our hidden BrandBook component
      const pages = document.querySelectorAll(".pdf-page");

      if (pages.length === 0) {
        console.error("No pages found to export.");
        alert("Export error: Could not find pages.");
        return;
      }

      // Loop through each page and capture it
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 794,
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      // Save the file
      pdf.save(`${brand.brandName}-BrandBook.pdf`);
    } catch (error) {
      console.error("Export failed", error);
      alert("Could not generate PDF. Please check your internet connection.");
    } finally {
      setIsExporting(false);
    }
  };

  // Don't render if colors are invalid
  if (!colors.palette || colors.palette.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3F2ED] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Brand Data</h1>
          <p className="text-gray-600 mb-4">The brand color data is corrupted.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:underline"
          >
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F2ED] text-black font-sans pb-20">
      {/* --- HIDDEN PDF RENDERER --- */}
      <BrandBook
        brandName={brand.brandName}
        logoUrl={brand.logoUrl}
        colors={colors}
        fonts={fonts}
        tagline={slogan}
        keywords={brand.keywords || []}
      />

      {/* --- VISIBLE WEB INTERFACE --- */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-black/10 bg-white sticky top-0 z-50">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft size={16} />
          Projects
        </Link>
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50 shadow-lg"
          >
            {isExporting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            {isExporting ? "Compiling PDF..." : "Export Brand Kit"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-20">
        {/* 1. HERO - Font applied ONLY to the Title */}
        <section className="text-center py-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white">
            Generated Identity
          </div>
          <h1
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9]"
            style={{ fontFamily: fonts.selected }}
          >
            {brand.brandName}
          </h1>
          <p className="max-w-lg mx-auto text-lg opacity-60">
            {slogan}
          </p>
          {brand.keywords && brand.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {brand.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/50 text-xs font-medium rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* 2. CORE ASSETS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Logo Card */}
          <div className="lg:col-span-8 aspect-video bg-white border border-black/10 rounded-sm flex items-center justify-center p-12 shadow-sm relative group">
            <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Primary Logomark
            </div>
            <div className="relative w-full h-full">
              <Image
                src={brand.logoUrl}
                alt={`${brand.brandName} Logo`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </div>

          {/* Typography Card */}
          <div className="lg:col-span-4 bg-black text-[#F3F2ED] p-8 rounded-sm flex flex-col justify-between group">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-8">
                Typography
              </div>
              <div
                className="text-5xl leading-none mb-2"
                style={{ fontFamily: fonts.selected }}
              >
                Aa Bb Cc
              </div>
              <div
                className="text-5xl leading-none opacity-50"
                style={{ fontFamily: fonts.selected }}
              >
                123 456
              </div>
            </div>
            <div className="border-t border-white/20 pt-4 mt-8">
              <div className="text-2xl font-bold">{fonts.selected}</div>
              <div className="text-xs opacity-50 uppercase tracking-widest">
                {fonts.category} Typeface
              </div>
            </div>
          </div>
        </section>

        {/* 3. COLOR PALETTE */}
        <section>
          <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              System Palette
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              {colors.harmony} Harmony
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 h-40 rounded-sm overflow-hidden border border-black/10">
            {colors.palette.map((hex: string, i: number) => (
              <button
                key={i}
                onClick={() => copyToClipboard(hex, i)}
                className="flex flex-col justify-end p-4 group relative transition-all hover:scale-[1.02] focus:outline-none"
                style={{ backgroundColor: hex }}
              >
                <div className={`bg-white/90 p-3 backdrop-blur-sm absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${copiedIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {copiedIndex === i ? (
                    <span className="text-xs font-bold">Copied!</span>
                  ) : (
                    <Copy size={20} className="text-black" />
                  )}
                </div>
                <span className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit">
                  {hex}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. SLOGAN SECTION (if available) */}
        {brand.slogan && (
          <section className="text-center py-12 border-t border-black/10">
            <div className="max-w-2xl mx-auto">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-4">
                Brand Tagline
              </div>
              <blockquote className="text-3xl md:text-4xl font-light italic">
                "{brand.slogan}"
              </blockquote>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}