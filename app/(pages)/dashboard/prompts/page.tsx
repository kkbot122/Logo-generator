'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Tag } from 'lucide-react';
import { toast } from 'sonner';

// --- DATA: THE "RECIPES" ---
const PROMPT_RECIPES = [
  {
    id: 1,
    title: "Minimalist Tech",
    vibe: "tame",
    description: "Perfect for SaaS, startups, and software tools.",
    prompt: "A minimalist geometric logo for a cloud software company named 'Stratus'. The icon should be a stylized hexagon formed by negative space lines. Electric blue and white color palette. Flat design, vector style, no gradients, isolated on white background."
  },
  {
    id: 2,
    title: "Cyberpunk Coffee",
    vibe: "wild",
    description: "High energy branding for a late-night cafe.",
    prompt: "A futuristic neon logo for a coffee shop called 'Midnight Brew'. The icon is a robotic coffee cup with glowing circuitry lines. Cyberpunk aesthetic, hot pink and cyan blue colors on a dark background. Glitch art style, vector illustration, high contrast."
  },
  {
    id: 3,
    title: "Organic Skincare",
    vibe: "tame",
    description: "Clean, calming, and natural aesthetic.",
    prompt: "A refined line-art logo for a skincare brand named 'Flora'. A continuous single-line drawing of a lotus flower. Sage green and cream color palette. Elegant serif typography, minimal, organic shapes, isolated on white background."
  },
  {
    id: 4,
    title: "Retro Arcade",
    vibe: "wild",
    description: "Nostalgic 80s synthwave style.",
    prompt: "A retro 80s synthwave logo for an arcade bar named 'Pixel Palace'. Chrome metallic text effect with a setting sun grid in the background. Sunset orange, purple, and laser blue colors. Outrun style, vector graphics, bold and nostalgic."
  },
  {
    id: 5,
    title: "Modern Architecture",
    vibe: "tame",
    description: "Structural, solid, and trustworthy.",
    prompt: "A bold architectural logo for a firm named 'Apex'. A stylized letter 'A' that looks like a skyscraper or structural beam. Concrete grey and safety orange accents. Swiss style, heavy geometric lines, negative space, flat vector."
  },
  {
    id: 6,
    title: "Streetwear Brand",
    vibe: "wild",
    description: "Edgy, graffiti-inspired, and raw.",
    prompt: "An edgy streetwear logo for a clothing brand named 'Rogue'. Graffiti-style hand-lettering with paint drip effects. Black, red, and white high-contrast palette. Grunge texture, urban aesthetic, sticker art style, vector."
  }
];

export default function PromptsPage() {
  return (
    <div className="min-h-full flex flex-col bg-[#F3F2ED] text-black animate-in fade-in duration-500">
      
      {/* HEADER */}
      <header className="px-8 py-8 border-b border-black/10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
          <span>Resources</span>
          <span className="text-black">/</span>
          <span>Inspiration</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
          Prompt Library
        </h1>
        <p className="text-neutral-500 max-w-xl">
          Stuck on what to create? Copy these tried-and-tested "recipes" to generate professional results instantly.
        </p>
      </header>

      {/* GRID */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROMPT_RECIPES.map((recipe) => (
          <PromptCard key={recipe.id} recipe={recipe} />
        ))}
      </main>
    </div>
  );
}

// --- SUBCOMPONENT: CARD ---
function PromptCard({ recipe }: { recipe: typeof PROMPT_RECIPES[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(recipe.prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard!");
    
    // Reset icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-black/10 rounded-sm p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      
      {/* Tags */}
      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${
          recipe.vibe === 'wild' 
            ? 'bg-purple-100 text-purple-700 border-purple-200' 
            : 'bg-green-100 text-green-700 border-green-200'
        }`}>
          {recipe.vibe} Vibe
        </span>
        <Sparkles size={16} className="text-neutral-300 group-hover:text-[#FFC50F] transition-colors" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-black uppercase tracking-tight mb-1">{recipe.title}</h3>
        <p className="text-xs text-neutral-500 mb-4">{recipe.description}</p>
        
        {/* The Prompt Box */}
        <div className="bg-neutral-50 border border-black/5 p-3 rounded-sm text-xs font-medium text-neutral-600 leading-relaxed h-24 overflow-y-auto custom-scrollbar">
          "{recipe.prompt}"
        </div>
      </div>

      {/* Footer Actions */}
      <button 
        onClick={handleCopy}
        className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-white border border-black/10 hover:bg-black hover:text-white hover:border-black transition-colors rounded-sm text-[10px] font-bold uppercase tracking-widest"
      >
        {copied ? (
          <>
            <Check size={12} /> Copied
          </>
        ) : (
          <>
            <Copy size={12} /> Copy Recipe
          </>
        )}
      </button>

    </div>
  );
}