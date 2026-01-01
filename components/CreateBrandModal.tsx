'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, CheckCircle2, Paintbrush, Type, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // We will install this in step 3

// The steps the AI takes (for the UI animation)
const GENERATION_STEPS = [
  { label: 'Analyzing Brand Strategy...', icon: Sparkles },
  { label: 'Mixing Color Palette...', icon: Paintbrush },
  { label: 'Selecting Typography...', icon: Type },
  { label: 'Drawing Vector Logo...', icon: ImageIcon },
  { label: 'Finalizing Assets...', icon: CheckCircle2 },
];

export default function CreateBrandModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [vibe, setVibe] = useState<'tame' | 'wild'>('tame');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Reset state when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setCurrentStep(0);
      setPrompt('');
    }
  }, [isOpen]);

  // The "Fake" Progress Logic
  useEffect(() => {
    if (loading && currentStep < GENERATION_STEPS.length - 1) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < GENERATION_STEPS.length - 1 ? prev + 1 : prev));
      }, 2500); // Advance step every 2.5 seconds (total ~10-12s matches AI time)
      return () => clearInterval(interval);
    }
  }, [loading, currentStep]);

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    setCurrentStep(0);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, vibe }),
      });

      // Handle Rate Limits specifically
      if (res.status === 429) {
        toast.error("Whoa, slow down! Rate limit exceeded.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.brand?.id) {
        toast.success("Brand Identity Created!");
        router.push(`/brand/${data.brand.id}`);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      <div className="w-full max-w-lg bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        {!loading && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 hover:bg-neutral-100 p-2 transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* LOADING STATE UI */}
        {loading ? (
          <div className="py-12 flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse" />
              <Loader2 size={48} className="animate-spin relative z-10" />
            </div>
            
            <div className="space-y-4 w-full max-w-xs mx-auto">
              <h3 className="text-xl font-black uppercase tracking-tighter">
                Crafting Identity...
              </h3>
              
              {/* The Stepper */}
              <div className="flex flex-col gap-3 text-left">
                {GENERATION_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all duration-500
                        ${isActive ? 'text-black scale-105 ml-2' : ''}
                        ${isCompleted ? 'text-green-600' : ''}
                        ${!isActive && !isCompleted ? 'text-gray-300' : ''}
                      `}
                    >
                      <Icon size={14} className={isActive ? 'animate-bounce' : ''} />
                      <span>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* NORMAL FORM UI */
          <div className="space-y-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                <Sparkles size={12} />
                <span>New Generation</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Describe your<br/>Dream Brand.</h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">The Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A futuristic sushi restaurant in Tokyo run by robots..."
                className="w-full h-32 bg-[#F3F2ED] border border-black/10 p-4 text-sm font-medium focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">The Vibe</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setVibe('tame')}
                  className={`h-12 border text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
                    ${vibe === 'tame' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
                >
                  Tame
                </button>
                <button 
                  onClick={() => setVibe('wild')}
                  className={`h-12 border text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
                    ${vibe === 'wild' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
                >
                  Wild
                </button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!prompt}
              className="w-full h-14 bg-black text-[#F3F2ED] font-bold uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
            >
              <span>Generate Assets</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}