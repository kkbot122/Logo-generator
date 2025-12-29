/* src/components/BrandBook.tsx */
import Image from "next/image";
import MockupGallery from "./MockupGallery";

type BrandBookProps = {
  brandName: string;
  logoUrl: string;
  colors: { 
    base: string; 
    palette: string[];
    harmony?: string;
  };
  fonts: { selected: string; category: string };
  tagline: string;
  keywords?: string[];
};

export default function BrandBook({ 
  brandName, 
  logoUrl, 
  colors, 
  fonts,
  tagline,
  keywords = []
}: BrandBookProps) {
  
  return (
    // Off-screen container
    <div style={{ position: "fixed", top: 0, left: "-9999px", zIndex: -1 }}>
      {/* Give this a specific ID to find it easily */}
      <div id="brand-book-container" className="w-[794px] text-black font-sans bg-white">
        
        {/* --- PAGE 1: COVER --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col justify-between relative overflow-hidden bg-white">
           <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20" style={{ backgroundColor: colors.base || colors.palette[0] }} />
           
           <div className="mt-20">
             <div className="w-32 h-32 relative mb-8">
                {/* Use unoptimized to ensure html2canvas can capture it quickly */}
                <Image 
                  src={logoUrl} 
                  alt="Logo" 
                  fill 
                  className="object-contain" 
                  unoptimized 
                  priority
                />
             </div>
             <h1 
               className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4" 
               style={{ fontFamily: fonts.selected }}
             >
               {brandName}
             </h1>
             <p className="text-2xl text-gray-500 font-light max-w-xl">{tagline}</p>
             
             {keywords.length > 0 && (
               <div className="flex flex-wrap gap-2 mt-6">
                 {keywords.map((keyword, index) => (
                   <span 
                     key={index}
                     className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full"
                   >
                     {keyword}
                   </span>
                 ))}
               </div>
             )}
           </div>

           <div className="text-sm font-bold uppercase tracking-widest text-gray-400">
             Brand Identity Guidelines <br/> v1.0
           </div>
        </div>

        {/* --- PAGE 2: LOGO & TYPOGRAPHY --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-12 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">01. Logo & Typography</h2>
           
           {/* Logo Section */}
           <div className="border border-black/10 rounded-lg p-8">
             <h3 className="text-sm font-bold mb-6 text-gray-700">Primary Logomark</h3>
             <div className="flex items-center justify-center h-48 mb-6">
               <div className="relative w-48 h-48">
                 <Image 
                   src={logoUrl} 
                   alt={`${brandName} Logo`}
                   fill
                   className="object-contain"
                   unoptimized
                 />
               </div>
             </div>
             <div className="text-xs text-gray-500 text-center">
               Always maintain clear space around the logo. Minimum clear space is 50% of logo height.
             </div>
           </div>
           
           {/* Typography Section */}
           <div className="border border-black/10 rounded-lg p-8">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h3 className="text-sm font-bold mb-2 text-gray-700">Primary Typeface</h3>
                 <p className="text-xs text-gray-500">{fonts.category} Family</p>
               </div>
               <div className="text-right">
                 <div className="text-sm font-bold" style={{ fontFamily: fonts.selected }}>
                   {fonts.selected}
                 </div>
                 <div className="text-xs text-gray-500">Font Weight: 400–900</div>
               </div>
             </div>
             
             {/* Font Scale */}
             <div className="space-y-4">
               <div>
                 <div className="text-xs text-gray-500 mb-1">Display 1</div>
                 <div className="text-6xl leading-tight" style={{ fontFamily: fonts.selected }}>
                   Aa Bb Cc
                 </div>
               </div>
               <div>
                 <div className="text-xs text-gray-500 mb-1">Display 2</div>
                 <div className="text-4xl leading-tight" style={{ fontFamily: fonts.selected }}>
                   The quick brown fox jumps
                 </div>
               </div>
               <div>
                 <div className="text-xs text-gray-500 mb-1">Body</div>
                 <div className="text-lg leading-relaxed text-gray-700" style={{ fontFamily: fonts.selected }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                 </div>
               </div>
               <div>
                 <div className="text-xs text-gray-500 mb-1">Numbers & Symbols</div>
                 <div className="text-xl" style={{ fontFamily: fonts.selected }}>
                   1234567890 !@#$%^&*()
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* --- PAGE 3: COLOR SYSTEM --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-12 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">02. Color System</h2>
           
           {colors.harmony && (
             <div className="mb-4">
               <div className="text-sm font-bold text-gray-700 mb-2">Harmony Type</div>
               <div className="text-lg capitalize">{colors.harmony}</div>
             </div>
           )}
           
           {/* Color Palette */}
           <div className="grid grid-cols-5 gap-4 mb-12">
             {colors.palette.map((hex, index) => (
               <div key={index} className="space-y-2">
                 <div 
                   className="h-32 rounded-lg shadow-sm border border-black/10"
                   style={{ backgroundColor: hex }}
                 />
                 <div className="text-center">
                   <div className="text-xs font-bold mb-1">Color {index + 1}</div>
                   <div className="text-xs font-mono bg-black/5 px-2 py-1 rounded">
                     {hex}
                   </div>
                 </div>
               </div>
             ))}
           </div>
           
           {/* Color Usage Guidelines */}
           <div className="border border-black/10 rounded-lg p-8">
             <h3 className="text-sm font-bold mb-4 text-gray-700">Usage Guidelines</h3>
             <div className="grid grid-cols-2 gap-8">
               <div>
                 <div className="text-xs text-gray-500 mb-2">Primary Color</div>
                 <div 
                   className="h-20 rounded-lg mb-2 flex items-center justify-center"
                   style={{ backgroundColor: colors.base || colors.palette[0] }}
                 >
                   <span className="bg-white/90 px-3 py-1 text-xs font-bold">
                     {colors.base || colors.palette[0]}
                   </span>
                 </div>
                 <p className="text-xs text-gray-600">
                   Used for primary actions, buttons, and key brand elements.
                 </p>
               </div>
               <div>
                 <div className="text-xs text-gray-500 mb-2">Accent Colors</div>
                 <div className="grid grid-cols-4 gap-2">
                   {colors.palette.slice(1, 5).map((hex, index) => (
                     <div 
                       key={index}
                       className="h-10 rounded flex items-center justify-center"
                       style={{ backgroundColor: hex }}
                     >
                       <span className="text-[10px] font-bold text-white mix-blend-difference">
                         {index + 2}
                       </span>
                     </div>
                   ))}
                 </div>
                 <p className="text-xs text-gray-600 mt-2">
                   Supporting colors for accents, backgrounds, and secondary elements.
                 </p>
               </div>
             </div>
           </div>
        </div>

        {/* --- PAGE 4: MOCKUPS & APPLICATIONS --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-8 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">03. Applications</h2>
           <p className="text-gray-600 mb-6">
             The following mockups demonstrate how the brand identity can be applied across various media and formats.
           </p>
           <div className="scale-75 origin-top-left w-[130%]"> 
              <MockupGallery 
                logoUrl={logoUrl} 
                palette={colors.palette} 
                brandName={brandName}
              />
           </div>
        </div>

        {/* --- PAGE 5: BRAND VOICE & MESSAGING --- */}
        <div className="pdf-page h-[1123px] w-full p-20 flex flex-col gap-12 bg-white">
           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">04. Brand Voice</h2>
           
           <div>
             <h3 className="text-lg font-bold mb-4">Brand Tagline</h3>
             <div className="text-3xl font-light italic text-gray-800 border-l-4 border-black/20 pl-6 py-4">
               "{tagline}"
             </div>
           </div>
           
           {keywords.length > 0 && (
             <div>
               <h3 className="text-lg font-bold mb-4">Core Keywords</h3>
               <div className="flex flex-wrap gap-3">
                 {keywords.map((keyword, index) => (
                   <div 
                     key={index}
                     className="px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-full"
                   >
                     {keyword}
                   </div>
                 ))}
               </div>
             </div>
           )}
           
           <div className="grid grid-cols-2 gap-8">
             <div className="border border-black/10 rounded-lg p-6">
               <h4 className="text-sm font-bold mb-3 text-gray-700">Brand Personality</h4>
               <ul className="space-y-2">
                 <li className="flex items-center text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                   {fonts.category === 'modern' && 'Clean & Innovative'}
                   {fonts.category === 'playful' && 'Fun & Engaging'}
                   {fonts.category === 'elegant' && 'Sophisticated & Refined'}
                   {fonts.category === 'bold' && 'Confident & Impactful'}
                 </li>
                 <li className="flex items-center text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                   Professional yet Approachable
                 </li>
                 <li className="flex items-center text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                   Future-Focused
                 </li>
               </ul>
             </div>
             
             <div className="border border-black/10 rounded-lg p-6">
               <h4 className="text-sm font-bold mb-3 text-gray-700">Communication Principles</h4>
               <ul className="space-y-2">
                 <li className="flex items-start text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2 mt-1.5"></div>
                   Be clear and concise in all messaging
                 </li>
                 <li className="flex items-start text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2 mt-1.5"></div>
                   Maintain consistent tone across platforms
                 </li>
                 <li className="flex items-start text-sm">
                   <div className="w-2 h-2 rounded-full bg-black mr-2 mt-1.5"></div>
                   Focus on value and benefits
                 </li>
               </ul>
             </div>
           </div>
           
           {/* Final Page Note */}
           <div className="mt-auto pt-8 border-t border-black/10">
             <div className="text-xs text-gray-500">
               <div className="font-bold mb-1">Document Information</div>
               <div>Generated by AI Brand Generator</div>
               <div>Version 1.0 • {new Date().toLocaleDateString()}</div>
               <div className="mt-2">This document is for internal use only.</div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}