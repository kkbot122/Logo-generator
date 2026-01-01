import { ArrowRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-hidden bg-white text-black">
      {/* NAVIGATION (Minimal) */}
      <nav className="w-full h-20 flex justify-between items-stretch border-b border-black/10 bg-white">
        {/* LEFT SIDE: Brand Assets (Scribble + Name) */}
        <div className="flex items-center gap-4 px-6 md:px-8">
          {/* 1. The Scribble/Icon */}
          <div className="relative h-12 w-12 md:h-16 md:w-16">
            <Image
              src="/aura_logo.png" // Replace with your scribble file
              alt="Aura Icon"
              fill
              className="object-contain"
            />
          </div>

          {/* 2. The App Name (AURA) */}
          <div className="relative h-8 w-24 md:h-10 md:w-20">
            <Image
              src="/aura_text1.png" // Replace with your text logo file
              alt="AURA"
              fill
              className="object-contain object-left" // object-left keeps it anchored near the scribble
            />
          </div>
        </div>

        {/* 3. The Button (Rectangular & Full Height) */}
        <Link
          href="/auth/login"
          className="flex items-center justify-center px-8 md:px-12 border-l border-black/10 bg-white hover:bg-black hover:text-[#F3F2ED] transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Get Started
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-8xl text-black font-black tracking-tighter uppercase leading-[0.9] mb-8">
          An Impact First <br className="hidden md:block" />
          Creative Engine.
        </h1>

        {/* Hero Image Container */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-black/5 mt-12 overflow-hidden rounded-sm group">
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a3a2a] text-[#F3F2ED]">
            {/* Placeholder for AI Dashboard UI */}
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest mb-4 opacity-70">
                Prompt Input
              </p>
              <p className="text-2xl md:text-4xl font-serif italic">
                "Minimalist coffee shop in Tokyo"
              </p>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 mt-12 border-t border-black border-b py-8">
          <StatItem label="Logos Generated" value="100+" />
          <StatItem label="Typographys" value="20+" />
          <StatItem label="Avg Generation Time" value="2 SECONDS" />
          <StatItem label="Brand Assets" value="UNLIMITED" />
        </div>
      </section>

      {/* SHOWCASE SECTION ("Partners in meaningful change") */}
      <section className="px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-16 max-w-4xl">
          Partners in <br />
          Visual Identity.
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
          {/* Card 1 */}
          <ShowcaseCard
            title="The Abstract Series"
            category="Vector Geometry"
            description="Complex geometric shapes generated from simple text prompts."
            imageSrc="/abstract.png"
          />
          <ShowcaseCard
            title="Modern Typography"
            category="Font Pairing"
            description="AI-curated font combinations that pass accessibility standards."
            imageSrc="/typo3.png"
          />
          <ShowcaseCard
            title="Eco & Organic"
            category="Natural Motifs"
            description="Sustainable branding identities with earthy color palettes."
            // TODO: Replace with your actual image path
            imageSrc="/eco.png"
          />
          <ShowcaseCard
            title="Tech Minimalist"
            category="App Icons"
            description="Clean, scalable symbols optimized for digital products."
            // TODO: Replace with your actual image path
            imageSrc="/tech.png"
          />
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-8">
          An Approach to <br />
          Strategic Clarity.
        </h2>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#f4f2ee] mt-8 overflow-hidden">
          {/* Placeholder for Process Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-1/2 opacity-100">
              <Image
                // TODO: Replace with an image representing your process/strategy
                src="/brand_kit.png"
                alt="Our Strategic Approach Diagram"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureItem
            title="Context Aware"
            desc="Our AI understands industry nuances, not just keywords."
          />
          <FeatureItem
            title="Vector First"
            desc="Download SVGs ready for print, web, and embroidery."
          />
          <FeatureItem
            title="Brand Kits"
            desc="Get color palettes, fonts, and social covers instantly."
          />
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
              Invest in <br />
              Identity. <br />
              Start Today.
            </h2>
            <p className="text-gray-400 max-w-md text-lg">
              Join thousands of founders building their brand with our
              generative engine. Free to try.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full md:w-auto bg-[#F3F2ED] text-black px-8 py-4 text-xl font-bold uppercase tracking-tight hover:bg-neutral-300 transition-colors flex items-center justify-between group">
              <Link href="/auth/login">Start Designing</Link>
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
      <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">
        {value}
      </h3>
      <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
    </div>
  );
}

function ShowcaseCard({
  title,
  category,
  description,
  imageSrc,
}: {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full aspect-square bg-neutral-100 mb-6 overflow-hidden relative rounded-sm">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-2 border-t border-black pt-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight">
            {title}
          </h3>
          <ArrowRight
            className="-rotate-45 opacity-0 group-hover:opacity-100 transition-opacity"
            size={20}
          />
        </div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
          {category}
        </p>
        <p className="text-xs text-gray-600 mt-2 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-t border-black pt-4">
      <h4 className="text-xl font-bold uppercase tracking-tight mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function BlogCard({
  imageColor,
  title,
  tag,
}: {
  imageColor: string;
  title: string;
  tag: string;
}) {
  return (
    <div className="group cursor-pointer">
      <div className={`w-full aspect-[4/3] ${imageColor} mb-4`}></div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 self-start px-2 py-1 mb-2">
          {tag}
        </span>
        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
          {title}
        </h3>
      </div>
    </div>
  );
}
