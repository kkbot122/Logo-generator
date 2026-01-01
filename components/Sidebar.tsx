'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; 
import { 
  LayoutGrid, 
  Folder, 
  PieChart, 
  Settings, 
  LogOut,
  Loader2 // Optional: for loading state
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // <--- 2. Get Session Data
  const user = session?.user;

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
              // Simple check: active if path starts with href (handles subpages)
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              
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
      </nav>

      {/* 3. FOOTER / PROFILE */}
      <div className="p-4 border-t border-[#F3F2ED]/10">
        
        {status === 'loading' ? (
           // Loading State
           <div className="flex items-center justify-center p-3">
             <Loader2 className="animate-spin text-neutral-500" size={20} />
           </div>
        ) : (
          // Authenticated State
          <div className="flex items-center gap-3 p-3 rounded-sm hover:bg-[#F3F2ED]/5 transition-colors group">
            
            {/* User Image or Fallback Gradient */}
            {user?.image ? (
               <img 
                 src={user.image} 
                 alt={user.name || 'User'} 
                 className="h-10 w-10 rounded-sm object-cover bg-neutral-800"
               />
            ) : (
               <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-sm flex items-center justify-center font-bold text-xs">
                 {user?.name?.[0] || 'U'}
               </div>
            )}

            {/* User Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-widest truncate">
                {user?.name || 'User'}
              </span>
              <span className="text-[10px] text-neutral-500 truncate group-hover:text-neutral-400 transition-colors">
                {user?.email}
              </span>
            </div>

            {/* Sign Out Button */}
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="p-2 hover:bg-white hover:text-black rounded-sm transition-all"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}

      </div>
    </aside>
  );
}