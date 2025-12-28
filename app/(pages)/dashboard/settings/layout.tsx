'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper to ensure cleaner JSX
  const getTabClass = (path: string) => {
    const isActive = pathname === path;
    
    return `pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
      isActive 
        ? "border-black text-black" 
        : "border-transparent text-neutral-400 hover:text-black"
    }`;
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F3F2ED] text-black">
      
      {/* 1. SETTINGS HEADER */}
      <header className="px-8 py-12 border-b border-black/10">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-6">
          Settings
        </h1>
        
        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-8 border-b border-transparent">
          <Link 
            href="/dashboard/settings" 
            className={getTabClass("/dashboard/settings")}
          >
            General
          </Link>
          
          <Link 
            href="/dashboard/settings/billing" 
            className={getTabClass("/dashboard/settings/billing")}
          >
            Billing
          </Link>
        </nav>
      </header>

      {/* 2. SETTINGS CONTENT */}
      <main className="flex-1 p-8 max-w-4xl">
        {children}
      </main>
    </div>
  );
}