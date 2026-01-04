"use client";

import { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { verifyAndTrackDownload } from "@/app/actions/download";
import BrandBook from "@/components/BrandBook"; // Ensure this path matches your project

export default function BrandKitExportButton({ brand }: { brand: any }) {
  const [isExporting, setIsExporting] = useState(false);
  const hiddenRef = useRef<HTMLDivElement>(null);

  // --- DATA NORMALIZATION (Same logic as ProjectInterface) ---
  const getColorPalette = () => {
    if (Array.isArray(brand.colors)) {
      return brand.colors as string[];
    } else if (brand.colors && typeof brand.colors === 'object' && 'palette' in brand.colors) {
      return (brand.colors as any).palette as string[];
    }
    return ["#cccccc"];
  };

  const fonts = brand.fonts as { selected: string; category: string };
  const colors = {
    palette: getColorPalette(),
    harmony: (brand.colors as any)?.harmony || "complementary",
    base: (brand.colors as any)?.base || getColorPalette()[0]
  };
  const slogan = brand.slogan || `Redefining the future of ${brand.brandName}`;

  // --- EXPORT LOGIC ---
  const handleExport = async () => {
    setIsExporting(true);

    try {
      // 1. Check Limits
      const check = await verifyAndTrackDownload();
      if (!check.success) {
        alert("Download limit reached. Please upgrade to Pro.");
        setIsExporting(false);
        return;
      }

      // 2. Initialize PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 3. Find Pages (SCOPED to this specific component via Ref)
      if (!hiddenRef.current) return;
      
      const pages = hiddenRef.current.querySelectorAll(".pdf-page");
      
      if (pages.length === 0) {
        console.error("No pages found");
        return;
      }

      // 4. Capture & Compile
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 794, // A4 width in pixels approx
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      // 5. Save
      pdf.save(`${brand.brandName}-BrandKit.pdf`);

    } catch (error) {
      console.error("Export failed", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* 1. THE BUTTON */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-neutral-800 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-wait"
      >
        {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
        {isExporting ? "Exporting..." : "Export"}
      </button>

      {/* 2. THE HIDDEN BRAND BOOK (Rendered only for capturing) */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }} ref={hiddenRef}>
         <BrandBook
            brandName={brand.brandName}
            logoUrl={brand.logoUrl}
            colors={colors}
            fonts={fonts}
            tagline={slogan}
            keywords={brand.keywords || []}
         />
      </div>
    </>
  );
}