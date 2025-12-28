'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Folder, 
  PieChart, 
  Settings, 
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutGrid },
    { label: 'Projects', href: '/projects', icon: Folder },
    { label: 'Brand Kits', href: '/dashboard/brandkits', icon: PieChart },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-72 h-screen flex-col bg-[#1a1a1a] text-[#F3F2ED] border-r border-black/10 shrink-0 sticky top-0">
      
      {/* 1. LOGO AREA */}
      <div className="p-8 border-b border-[#F3F2ED]/10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="font-black uppercase tracking-tighter text-xl">Aura</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-8">
        
        {/* Main Group */}
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold uppercase tracking-widest text-[#F3F2ED]/40">
            Platform
          </div>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 border border-transparent
                    ${isActive 
                      ? 'bg-[#F3F2ED] text-black font-bold' 
                      : 'hover:bg-[#F3F2ED]/10 text-[#F3F2ED]/80 hover:text-white'
                    }`}
                >
                  <item.icon size={18} strokeWidth={2} />
                  <span className="text-xs uppercase tracking-widest">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Secondary Group */}
        {/* <div>
          <div className="px-4 mb-3 text-[10px] font-bold uppercase tracking-widest text-[#F3F2ED]/40">
            Actions
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#F3F2ED]/80 hover:bg-[#F3F2ED]/10 rounded-sm transition-all group">
             <div className="p-1 border border-[#F3F2ED]/40 rounded-sm group-hover:border-white">
               <Plus size={12} />
             </div>
             <span className="text-xs uppercase tracking-widest">New Project</span>
          </button>
        </div> */}
      </nav>

      {/* 3. FOOTER / PROFILE */}
      <div className="p-4 border-t border-[#F3F2ED]/10">
        <div className="flex items-center gap-3 p-3 rounded-sm hover:bg-[#F3F2ED]/5 transition-colors cursor-pointer">
          <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-sm" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest truncate">John Doe</span>
            <span className="text-[10px] text-neutral-500 truncate">Pro Plan</span>
          </div>
          <LogOut size={16} className="text-neutral-500 hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}