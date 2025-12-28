/* src/components/CreateBrandModal.tsx */
'use client';

import { useState } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateBrandModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [vibe, setVibe] = useState<'tame' | 'wild'>('tame');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, vibe }),
      });

      const data = await res.json();

      // UPDATED CHECK: Look for success flag and brand object
      if (data.success && data.brand?.id) {
        
        // OPTIONAL: Prefetch the page for instant navigation
        router.prefetch(`/projects/${data.brand.id}`);
        
        // Redirect to the new Project Page
        router.push(`/projects/${data.brand.id}`);
        
        // Close modal
        onClose();
      } else {
        console.error("API Error:", data);
        alert('Failed to generate brand. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong generating your brand.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="w-full max-w-lg bg-white border border-black shadow-2xl p-8 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          disabled={loading}
          className="absolute top-4 right-4 hover:bg-neutral-100 p-2 transition-colors disabled:opacity-50"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
            <Sparkles size={12} />
            <span>New Generation</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Describe your<br/>Dream Brand.</h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          
          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest">The Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic sushi restaurant in Tokyo run by robots..."
              className="w-full h-32 bg-[#F3F2ED] border border-black/10 p-4 text-sm font-medium focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
            />
          </div>

          {/* Vibe Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest">The Vibe</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setVibe('tame')}
                className={`h-12 border text-xs font-bold uppercase tracking-widest transition-all
                  ${vibe === 'tame' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
              >
                Tame (Clean)
              </button>
              <button 
                onClick={() => setVibe('wild')}
                className={`h-12 border text-xs font-bold uppercase tracking-widest transition-all
                  ${vibe === 'wild' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
              >
                Wild (Creative)
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full h-14 bg-black text-[#F3F2ED] font-bold uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Crafting Brand Identity...</span>
              </>
            ) : (
              <span>Generate Assets</span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}