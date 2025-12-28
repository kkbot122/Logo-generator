/* src/components/MockupGallery.tsx */
import Image from "next/image";

export default function MockupGallery({ 
  logoUrl, 
  palette 
}: { 
  logoUrl: string; 
  palette: string[]; 
}) {
  const [primary, secondary, accent] = palette;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
      
      {/* 1. APP ICON (iOS Style) */}
      <div className="col-span-1 bg-neutral-50 border border-black/10 rounded-sm p-8 flex flex-col items-center justify-center gap-4 group overflow-hidden relative">
        <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">App Icon</div>
        
        {/* The Icon */}
        <div 
          className="w-32 h-32 rounded-[28px] shadow-xl flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105 duration-500"
          style={{ backgroundColor: primary }}
        >
          {/* Gloss Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
          
          <div className="relative w-16 h-16">
             <Image src={logoUrl} alt="App Icon" fill className="object-contain invert brightness-0" />
          </div>
        </div>
      </div>

      {/* 2. BUSINESS CARD (Perspective Tilt) */}
      <div className="col-span-1 lg:col-span-2 bg-[#e0e0e0] rounded-sm relative overflow-hidden flex items-center justify-center perspective-1000 group">
         <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 z-10">Stationery</div>
         
         {/* Card Container */}
         <div className="relative w-80 h-48 bg-white shadow-2xl rounded-lg overflow-hidden transform transition-all duration-700 group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:-translate-y-4">
            
            {/* Pattern Background using palette */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: `radial-gradient(${secondary} 1px, transparent 1px)`, backgroundSize: '10px 10px' }}>
            </div>

            {/* Logo Center */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-24 h-24">
                 <Image src={logoUrl} alt="Card Logo" fill className="object-contain" />
               </div>
            </div>

            {/* Fake Text Details */}
            <div className="absolute bottom-6 left-6 space-y-1">
               <div className="h-1.5 w-24 bg-neutral-200 rounded-full"></div>
               <div className="h-1.5 w-16 bg-neutral-200 rounded-full"></div>
            </div>
         </div>
      </div>

      {/* 3. TOTE BAG / MERCH (CSS Simulation) */}
      <div className="col-span-1 bg-white border border-black/10 rounded-sm relative flex items-center justify-center group overflow-hidden">
         <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Merchandise</div>
         
         {/* Bag Shape */}
         <div className="w-48 h-56 bg-[#f0f0f0] rounded-sm relative shadow-inner flex items-center justify-center transform group-hover:-translate-y-2 transition-transform">
            {/* Handles */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-12 border-4 border-[#f0f0f0] rounded-t-full"></div>
            
            {/* Logo Print */}
            <div className="relative w-28 h-28 opacity-90 mix-blend-multiply">
               <Image src={logoUrl} alt="Merch Logo" fill className="object-contain" />
            </div>
         </div>
      </div>

      {/* 4. WEBSITE HERO HEADER (Browser Mockup) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-black rounded-sm relative overflow-hidden flex items-center justify-center p-12">
         <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Web Interface</div>
         
         {/* Browser Window */}
         <div className="w-full max-w-3xl aspect-[16/9] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Browser Bar */}
            <div className="h-8 bg-neutral-100 flex items-center gap-2 px-4 border-b border-neutral-200">
               <div className="w-2 h-2 rounded-full bg-red-400"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
               <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            
            {/* Website Content */}
            <div className="flex-1 relative flex items-center justify-center" style={{ backgroundColor: secondary }}>
               <div className="text-center space-y-6 z-10">
                  <div className="relative w-20 h-20 mx-auto">
                     <Image src={logoUrl} alt="Web Logo" fill className="object-contain" />
                  </div>
                  <h1 className="text-4xl font-bold text-white tracking-tighter">Welcome to the Future.</h1>
                  <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">
                    Get Started
                  </button>
               </div>
               
               {/* Abstract BG Shapes */}
               <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full mix-blend-overlay opacity-50 blur-3xl" style={{ backgroundColor: primary }}></div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full mix-blend-overlay opacity-50 blur-3xl" style={{ backgroundColor: accent }}></div>
            </div>
         </div>
      </div>

    </section>
  )
}