/* src/components/BrandBook.tsx */
import Image from "next/image";
import MockupGallery from "./MockupGallery";

type BrandBookProps = {
  // We remove the ref from here, we will access via ID
  brandName: string;
  logoUrl: string;
  colors: { base: string; palette: string[] };
  fonts: { selected: string; category: string };
  tagline: string;
};

export default function BrandBook({ 
  brandName, 
  logoUrl, 
  colors, 
  fonts,
  tagline 
}: BrandBookProps) {
  
  return (
    // Off-screen container
    <div style={{ position: "fixed", top: 0, left: "-9999px", zIndex: -1 }}>
      {/* Give this a specific ID to find it easily */}
      <div id="brand-book-container" className="w-[794px] text-black font-sans bg-white">
        
        {/* --- PAGE 1: COVER --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col justify-between relative overflow-hidden bg-white">
           <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20" style={{ backgroundColor: colors.base }} />
           
           <div className="mt-20">
             <div className="w-32 h-32 relative mb-8">
                {/* Use unoptimized to ensure html2canvas can capture it quickly */}
                <Image src={logoUrl} alt="Logo" fill className="object-contain" unoptimized />
             </div>
             <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4" style={{ fontFamily: fonts.selected }}>
               {brandName}
             </h1>
             <p className="text-2xl text-gray-500 font-light">{tagline}</p>
           </div>

           <div className="text-sm font-bold uppercase tracking-widest text-gray-400">
             Brand Identity Guidelines <br/> v1.0
           </div>
        </div>

        {/* --- PAGE 2: ASSETS --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-12 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">01. Core Assets</h2>
           
           <div className="grid grid-cols-5 h-24 rounded-lg overflow-hidden border border-black/10">
              {colors.palette.map((hex, i) => (
                <div key={i} style={{ backgroundColor: hex }} className="flex items-end p-2">
                  <span className="bg-white/80 px-1 text-[8px] font-bold">{hex}</span>
                </div>
              ))}
           </div>

           <div className="p-8 bg-neutral-50 rounded-lg border border-neutral-100">
              <h3 className="text-sm font-bold mb-4">Primary Typeface</h3>
              <div className="text-6xl mb-4" style={{ fontFamily: fonts.selected }}>
                {fonts.selected}
              </div>
              <div className="text-lg text-gray-500 leading-relaxed">
                The quick brown fox jumps over the lazy dog. <br/>
                1234567890 !@#$%^&*()
              </div>
           </div>
        </div>

        {/* --- PAGE 3: MOCKUPS --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-8 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">02. Applications</h2>
           <div className="scale-75 origin-top-left w-[130%]"> 
              <MockupGallery logoUrl={logoUrl} palette={colors.palette} />
           </div>
        </div>

      </div>
    </div>
  );
}