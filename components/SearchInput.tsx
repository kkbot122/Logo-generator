'use client';

import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // Optional: or use simple timeout

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce prevents database spam while typing (waits 300ms)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    // Updates URL: /dashboard/brand-kits?query=abc
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex-1 md:w-64 group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400" />
      <input
        type="text"
        placeholder="FIND ASSETS..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        className="w-full bg-white border border-black/10 pl-9 pr-4 h-10 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all rounded-sm"
      />
    </div>
  );
}