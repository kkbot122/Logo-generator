/* src/app/dashboard/prompts/page.tsx */
'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// --- DATA: THE "RECIPES" ---
// Each recipe is engineered to trigger a specific font from your system.
const PROMPT_RECIPES = [
  // --- TAME PROMPTS ---
  {
    id: 101,
    title: "Modern Fintech",
    vibe: "tame",
    description: "High-end financial technology.",
    prompt: "A premium logo for a neobank called 'Vault'. The design should look expensive, trustworthy, and cutting-edge. Deep navy blue and gold palette. Minimalist geometric icon of a keyhole. Clean, structural typography, isolated on white."
  },
  {
    id: 102,
    title: "Hypebeast Fashion",
    vibe: "tame",
    description: "Aggressive, wide streetwear aesthetic.",
    prompt: "A bold streetwear logo for a brand called 'Riot Division'. The vibe is aggressive, extended, and loud. Black and safety yellow color scheme. Industrial aesthetic, brutalist design elements, isolated on white background."
  },
  {
    id: 103,
    title: "SaaS Dashboard",
    vibe: "tame",
    description: "Clean, geometric, perfectly readable.",
    prompt: "A minimalist logo for an AI analytics tool called 'Metric'. The icon should be a stylized data graph or wave. Electric purple and white palette. Friendly, geometric, highly legible modern sans-serif typography, flat design."
  },
  {
    id: 104,
    title: "Luxury Editorial",
    vibe: "tame",
    description: "Retro-futuristic fashion magazine.",
    prompt: "A high-fashion logo for a magazine called 'Velvet'. The vibe is 70s chic meets modern luxury. Deep burgundy and cream colors. The typography should have flair and unique curves. Elegant, serif-inspired, isolated on white."
  },
  {
    id: 105,
    title: "Artisanal Lifestyle",
    vibe: "tame",
    description: "Curvy, full of character, organic.",
    prompt: "A playful logo for a ceramic pottery studio called 'Clay & Co'. The design should feel organic, curvy, and full of personality. Terracotta orange and sage green palette. Soft shapes, warm and inviting aesthetic."
  },
  {
    id: 106,
    title: "Chic Boutique",
    vibe: "tame",
    description: "Stylish, unique, personal brand.",
    prompt: "A personal branding logo for a fashion stylist named 'Bella'. The vibe is unique, stylish, and slightly handwritten but polished. Rose gold and charcoal grey. Feminine, fluid, and chic design."
  },
  {
    id: 107,
    title: "Modern Corporate",
    vibe: "tame",
    description: "Grotesque sans with a professional edge.",
    prompt: "A professional logo for an architecture firm called 'Structure'. The design should imply stability and precision. Slate grey and concrete colors. Grotesque sans-serif typography with distinct personality, minimalist vector icon."
  },
  {
    id: 108,
    title: "Social App",
    vibe: "tame",
    description: "Friendly, rounded, tech-forward.",
    prompt: "A friendly logo for a social connection app named 'Gather'. The icon should be two interlocking chat bubbles. Bright coral and white palette. Rounded geometric typography that feels approachable and kind."
  },
  {
    id: 109,
    title: "High Jewelry",
    vibe: "tame",
    description: "Ultra-thin, delicate, expensive.",
    prompt: "An ultra-luxury logo for a diamond jewelry brand called 'Eternity'. The aesthetic is ethereal, thin, and delicate. Silver and midnight blue colors. High-contrast editorial typography, refined and graceful."
  },
  {
    id: 110,
    title: "Industrial Gym",
    vibe: "tame",
    description: "Heavy, condensed, masculine power.",
    prompt: "A powerful logo for a CrossFit gym called 'Ironworks'. The vibe is heavy, industrial, and condensed. Black and rust orange palette. Typography should be tall, thick, and imposing. Grunge texture accents."
  },

  // --- WILD PROMPTS ---
  {
    id: 201,
    title: "Medieval Fantasy",
    vibe: "wild",
    description: "Old-world storytelling and magic.",
    prompt: "A fantasy-inspired logo for a board game shop called 'The Dragon's Tankard'. The vibe is medieval, magical, and soft-edged. Forest green and gold colors. Typography should feel like old scripture or fantasy lettering. Vector illustration of a tankard."
  },
  {
    id: 202,
    title: "Y2K Vaporwave",
    vibe: "wild",
    description: "Cloud-like, bubbly, nostalgic.",
    prompt: "A Y2K retro logo for a bubble tea shop called 'Cloud 9'. The aesthetic is vaporwave, bubbly, and nostalgic. Pastel pink and sky blue gradients. Typography should look like fluffy clouds or bubbles. Dreamy aesthetic."
  },
  {
    id: 203,
    title: "Cyber Dystopia",
    vibe: "wild",
    description: "Glitchy, distorted, tech-horror.",
    prompt: "A cyberpunk logo for a hacking collective called 'Zero Day'. The design must be glitchy, distorted, and aggressive. Neon green and black. Typography should look broken or encrypted. Digital noise effects."
  },
  {
    id: 204,
    title: "Alien Bio-Lab",
    vibe: "wild",
    description: "Organic, cellular, weird science.",
    prompt: "A sci-fi logo for a biology lab called 'Xeno'. The design should feel organic, cellular, and slightly alien. Bioluminescent blue and purple colors. Typography should look like living organisms or cells under a microscope."
  },
  {
    id: 205,
    title: "Skate Grunge",
    vibe: "wild",
    description: "Chaotic, scratchy, rebellious.",
    prompt: "A grunge logo for a skateboard deck brand called 'Thrasher'. The vibe is chaotic, scratchy, and rebellious. Black, white, and blood red. Typography should look like messy handwriting or scratched etching. DIY punk aesthetic."
  },
  {
    id: 206,
    title: "Dark Metal",
    vibe: "wild",
    description: "Sharp, aggressive, occult.",
    prompt: "A heavy metal band logo for 'Obsidian'. The vibe is sharp, aggressive, and alien. Black on black with silver outlines. Typography should be spiky, illegible, and wicked. Dark fantasy aesthetic."
  },
  {
    id: 207,
    title: "Tribal Eco",
    vibe: "wild",
    description: "Cultural, nature-bound, distinct.",
    prompt: "A cultural logo for an eco-resort in Bali named 'Roots'. The design should feel tribal, earthy, and hand-carved. Earth tones and deep greens. Typography should mimic bamboo or wood carving textures."
  },
  {
    id: 208,
    title: "Vampire Goth",
    vibe: "wild",
    description: "Elegant but twisted, dark beauty.",
    prompt: "A gothic logo for a candle brand called 'Midnight Manor'. The vibe is romantic, dark, and Victorian. Deep purple and black. Typography should be elegant but with twisted, thorny elements. Haunted mansion aesthetic."
  }
];

export default function PromptsPage() {
  return (
    <div className="min-h-full flex flex-col bg-[#F3F2ED] text-black animate-in fade-in duration-500">
      
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-[#F3F2ED]/80 backdrop-blur-md px-8 py-8 border-b border-black/10 transition-all">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
          <span>Resources</span>
          <span className="text-black">/</span>
          <span>Inspiration</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
          Prompt Library
        </h1>
        <p className="text-neutral-500 max-w-xl">
          Stuck on what to create? These "recipes" are engineered to unlock specific styles in the Aura Engine.
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