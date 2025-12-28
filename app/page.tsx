import { ArrowRight, LayoutGrid } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-hidden bg-white text-black">
      
      {/* NAVIGATION (Minimal) */}
      <nav className="w-full px-6 py-6 flex justify-between items-center border-b border-black/10">
        
        {/* LOGO ADJUSTMENT START */}
        <div className="flex items-center">
          <Image
            src="/Aura-logo.png"
            alt="Aura Logo"

            width={180} 
            height={60}
            className="h-8 md:h-14 w-auto object-contain" 
            priority
          />
        </div>

        <button className="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-[#F3F2ED] transition-colors text-sm font-medium">
          <Link
            href="/auth/login"
          >Get Started</Link>
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-8xl text-black font-black tracking-tighter uppercase leading-[0.9] mb-8">
          An Impact First <br className="hidden md:block"/>
          Creative Engine.
        </h1>
        
        {/* Hero Image Container */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-black/5 mt-12 overflow-hidden rounded-sm group">
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a3a2a] text-[#F3F2ED]">
             {/* Placeholder for AI Dashboard UI */}
             <div className="text-center">
                <p className="text-sm uppercase tracking-widest mb-4 opacity-70">Prompt Input</p>
                <p className="text-2xl md:text-4xl font-serif italic">"Minimalist coffee shop in Tokyo"</p>
             </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 border-t border-black border-b py-8">
          <StatItem label="Logos Generated" value="2.5 MILLION" />
          <StatItem label="Active Users" value="80,000+" />
          <StatItem label="Avg Generation Time" value="0.4 SECONDS" />
          <StatItem label="Brand Assets" value="UNLIMITED" />
        </div>
      </section>

      {/* SHOWCASE SECTION ("Partners in meaningful change") */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-16 max-w-4xl">
          Partners in <br/>
          Visual Identity.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {/* Card 1 */}
          <ShowcaseCard 
            title="The Abstract Series"
            category="Vector Geometry"
            description="Complex geometric shapes generated from simple text prompts."
            color="bg-orange-600"
          />
          {/* Card 2 */}
          <ShowcaseCard 
            title="Modern Typography"
            category="Font Pairing"
            description="AI-curated font combinations that pass accessibility standards."
            color="bg-blue-700"
          />
           {/* Card 3 */}
           <ShowcaseCard 
            title="Eco Branding"
            category="Organic Shapes"
            description="Natural motifs generated for sustainable businesses."
            color="bg-green-800"
          />
          {/* Card 4 */}
          <ShowcaseCard 
            title="Tech Startups"
            category="Minimalism"
            description="Clean, scalable logos optimized for app icons and dark mode."
            color="bg-zinc-900"
          />
        </div>
      </section>

      {/* CLIENT LIST ("Who we're working with") */}
      <section className="px-4 md:px-8 py-16 border-t border-black/10 w-full">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-12">
            Who uses our engine?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            {['Vercel', 'Stripe', 'Acme Corp', 'Raycast'].map((name, i) => (
               <div key={i} className="h-24 border border-black/20 flex items-center justify-center font-bold text-xl uppercase tracking-widest hover:bg-black hover:text-[#F3F2ED] transition-all cursor-default">
                  {name}
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-8">
          An Approach to <br/>
          Strategic Clarity.
        </h2>
        
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-200 mt-8 overflow-hidden">
           {/* Placeholder for Process Image */}
           <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
             <div className="grid grid-cols-3 gap-4 w-1/2 opacity-50">
                <div className="h-24 bg-white rounded-sm"></div>
                <div className="h-24 bg-white rounded-sm"></div>
                <div className="h-24 bg-white rounded-sm"></div>
                <div className="h-24 bg-white rounded-sm col-span-2"></div>
                <div className="h-24 bg-white rounded-sm"></div>
             </div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
           <FeatureItem title="Context Aware" desc="Our AI understands industry nuances, not just keywords." />
           <FeatureItem title="Vector First" desc="Download SVGs ready for print, web, and embroidery." />
           <FeatureItem title="Brand Kits" desc="Get color palettes, fonts, and social covers instantly." />
        </div>
      </section>

      {/* BLOG / THINKING SECTION */}
      <section className="px-4 md:px-8 py-16 border-t border-black/10 w-full bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-12">
            Recent Thinking <br/>
            And Updates.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCard 
              imageColor="bg-purple-200"
              title="The Death of Flat Design?"
              tag="Design Theory"
            />
             <BlogCard 
              imageColor="bg-yellow-200"
              title="AI vs Human: The Collaboration"
              tag="Technology"
            />
             <BlogCard 
              imageColor="bg-pink-200"
              title="Color Psychology in 2025"
              tag="Guides"
            />
          </div>
        </div>
      </section>

      {/* FOOTER CTA ("Invest in tomorrow") */}
      <section className="w-full bg-[#1a1a1a] text-[#F3F2ED] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <div className="text-xs font-bold border border-[#F3F2ED] inline-block px-2 py-1 mb-6 uppercase">
              Beta Access
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
              Invest in <br/>
              Identity. <br/>
              Start Today.
            </h2>
            <p className="text-gray-400 max-w-md text-lg">
              Join thousands of founders building their brand with our generative engine. Free to try.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="w-full md:w-auto bg-[#F3F2ED] text-black px-8 py-4 text-xl font-bold uppercase tracking-tight hover:bg-neutral-300 transition-colors flex items-center justify-between group">
              Start Designing
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* BIG FOOTER LOGO */}
      <footer className="w-full py-12 px-4 md:px-8 border-t border-black/10 flex flex-col items-center justify-center">
         <div className="w-full flex justify-between text-xs font-bold uppercase tracking-widest mb-12 text-gray-500">
            <span>© 2025 AURA</span>
            <div className="flex gap-4">
              <span>Twitter</span>
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
         </div>
         <h1 className="text-[12vw] leading-none font-black tracking-tighter uppercase text-center select-none">
            AURA
         </h1>
      </footer>

    </main>
  );
}

// --- SUBCOMPONENTS ---

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">{value}</h3>
      <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">{label}</p>
    </div>
  );
}

function ShowcaseCard({ title, category, description, color }: { title: string; category: string; description: string, color: string }) {
  return (
    <div className="group cursor-pointer">
      <div className={`w-full aspect-square ${color} mb-6 overflow-hidden relative`}>
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20 group-hover:scale-105 transition-transform duration-500">
           <LayoutGrid size={64} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-black pt-4">
         <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold uppercase tracking-tight">{title}</h3>
            <ArrowRight className="-rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>
         <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{category}</p>
         <p className="text-sm text-gray-600 mt-2 max-w-sm">{description}</p>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
   return (
      <div className="border-t border-black pt-4">
         <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{title}</h4>
         <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
   )
}

function BlogCard({ imageColor, title, tag }: { imageColor: string, title: string, tag: string }) {
   return (
      <div className="group cursor-pointer">
         <div className={`w-full aspect-[4/3] ${imageColor} mb-4`}></div>
         <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 self-start px-2 py-1 mb-2">{tag}</span>
            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">{title}</h3>
         </div>
      </div>
   )
}