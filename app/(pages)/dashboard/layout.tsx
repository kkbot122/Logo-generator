import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#F3F2ED] text-black">
      {/* Sidebar is fixed width */}
      <Sidebar />
      
      {/* Main Content takes remaining width */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* We wrap children in a scrollable div so the whole page doesn't scroll, just the content area */}
        <div className="flex-1 overflow-y-auto">
           {children}
        </div>
      </main>
    </div>
  );
}