/* src/components/ProjectInterface.tsx */
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Loader2, Copy } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import BrandBook from "./BrandBook";

type Props = {
  brand: {
    id: string;
    brandName: string;
    logoUrl: string;
    colors: any; // We typecast strictly inside the component
    fonts: any;
    rationale?: string | null; // Handle optional/null rationale
  };
};

export default function ProjectInterface({ brand }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  // 1. Safe Data Parsing
  const colors = brand.colors as { base: string, harmony: string, palette: string[] };
  const fonts = brand.fonts as { selected: string, category: string };
  
  // Fallback for older projects that might not have a rationale
  const safeRationale = brand.rationale || "Innovation Design Future";
  const slogan = "Redefining the future of " + safeRationale.split(" ").slice(0, 3).join(" ");

  // --- EXPORT FUNCTION ---
  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Initialize PDF (A4 size, Portrait, Millimeters)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Find all "Pages" inside our hidden BrandBook component
      // These are divs with className="pdf-page" defined in BrandBook.tsx
      const pages = document.querySelectorAll(".pdf-page");

      if (pages.length === 0) {
        console.error("No pages found to export.");
        alert("Export error: Could not find pages.");
        return;
      }

      // Loop through each page and capture it
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        // Render the DOM element to a canvas image
        const canvas = await html2canvas(page, {
          scale: 2, // 2x scale for crisp text resolution
          useCORS: true, // Vital for loading remote images (UploadThing)
          logging: false,
          windowWidth: 794, // Force A4 width simulation
        });

        const imgData = canvas.toDataURL("image/png");

        // If it's not the first page, add a new blank page to the PDF
        if (i > 0) pdf.addPage();

        // Add the image to the current PDF page
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

  return (
    <div className="min-h-screen bg-[#F3F2ED] text-black font-sans pb-20">
      
      {/* --- HIDDEN PDF RENDERER --- */}
      {/* This renders the A4 layout off-screen so we can capture it */}
      <BrandBook 
        brandName={brand.brandName}
        logoUrl={brand.logoUrl}
        colors={colors}
        fonts={fonts}
        tagline={slogan}
      />

      {/* --- VISIBLE WEB INTERFACE --- */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-black/10 bg-white sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50 shadow-lg"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
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
            style={{ fontFamily: fonts.selected }} // Custom Font Here
          >
            {brand.brandName}
          </h1>
          <p className="max-w-lg mx-auto text-lg opacity-60">
            A {fonts.category} visual identity system crafted by AI.
          </p>
        </section>

        {/* 2. CORE ASSETS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Logo Card */}
            <div className="lg:col-span-8 aspect-video bg-white border border-black/10 rounded-sm flex items-center justify-center p-12 shadow-sm relative group">
                <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Primary Logomark</div>
                <div className="relative w-full h-full">
                    <Image 
                        src={brand.logoUrl} 
                        alt={`${brand.brandName} Logo`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Typography Card */}
            <div className="lg:col-span-4 bg-black text-[#F3F2ED] p-8 rounded-sm flex flex-col justify-between group">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-8">Typography</div>
                    {/* Custom Font applied only to the preview text */}
                    <div className="text-5xl leading-none mb-2" style={{ fontFamily: fonts.selected }}>Aa Bb Cc</div>
                    <div className="text-5xl leading-none opacity-50" style={{ fontFamily: fonts.selected }}>123 456</div>
                </div>
                <div className="border-t border-white/20 pt-4 mt-8">
                    <div className="text-2xl font-bold">{fonts.selected}</div>
                    <div className="text-xs opacity-50 uppercase tracking-widest">{fonts.category} Typeface</div>
                </div>
            </div>
        </section>

        {/* 3. COLOR PALETTE */}
        <section>
            <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tight">System Palette</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{colors.harmony} Harmony</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 h-40 rounded-sm overflow-hidden border border-black/10">
              {colors.palette.map((hex: string, i: number) => (
                <div 
                    key={i} 
                    className="flex flex-col justify-end p-4 group relative"
                    style={{ backgroundColor: hex }}
                >
                    <div className="bg-white/90 p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center cursor-pointer">
                        <Copy size={20} className="text-black" />
                    </div>
                    <span className="bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit">{hex}</span>
                </div>
              ))}
            </div>
        </section>

        {/* MOCKUPS REMOVED FROM WEB VIEW (They will only appear in the exported PDF) */}

      </main>
    </div>
  );
}