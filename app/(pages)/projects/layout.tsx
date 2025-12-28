/* src/app/projects/layout.tsx */
import Sidebar from '@/components/Sidebar';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#F3F2ED] text-black selection:bg-black selection:text-[#F3F2ED]">
      {/* Sidebar is fixed width */}
      <Sidebar />
      
      {/* Main Content takes remaining width */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
           {children}
        </div>
      </main>
    </div>
  );
}