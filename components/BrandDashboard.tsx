'use client';

import { Download, ArrowLeft, Share2, Copy } from 'lucide-react';
import Link from 'next/link';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BrandPDF } from './BrandPDF';

export default function BrandDashboard({ brand }: { brand: any }) {
  
  return (
    <div className="min-h-screen bg-[#F3F2ED] text-black font-sans p-8">
      
      {/* Navbar */}
      <div className="flex justify-between items-center mb-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <div className="flex gap-4">
          {/* THE MAGIC DOWNLOAD BUTTON */}
          <PDFDownloadLink
            document={<BrandPDF brand={brand} />}
            fileName={`${brand.brandName.replace(/\s+/g, '-').toLowerCase()}-brand-kit.pdf`}
            className="h-10 px-6 bg-black text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-800 rounded-sm"
          >
            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Brand Kit')}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COL: Brand Name & Logo */}
        <div className="md:col-span-5 space-y-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Project Name</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight">{brand.brandName}</h1>
          </div>

          <div className="bg-white border border-black/10 aspect-square flex items-center justify-center p-12 rounded-sm shadow-sm">
            {/* The Logo Image */}
            <img 
              src={brand.logoUrl} 
              alt="Generated Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* RIGHT COL: Details */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Colors */}
          <div className="bg-white border border-black/10 p-8 rounded-sm shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"/> Color Palette
            </h3>
            <div className="grid grid-cols-5 h-24 w-full">
              {brand.colors.palette.map((hex: string) => (
                <div key={hex} className="group relative h-full w-full first:rounded-l-md last:rounded-r-md" style={{ backgroundColor: hex }}>
                   <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                      {hex}
                   </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
               <span>Base: {brand.colors.base}</span>
               <span>Harmony: {brand.colors.harmony}</span>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white border border-black/10 p-8 rounded-sm shadow-sm">
             <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"/> Typography
            </h3>
            <div className="border-l-4 border-black pl-6 py-2">
              <div className="text-4xl mb-2">{brand.fonts.selected}</div>
              <p className="text-neutral-500 text-sm leading-relaxed">
                A {brand.fonts.category} selection ideal for modern brands. 
                Use this typeface for headlines and primary messaging to communicate confidence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}