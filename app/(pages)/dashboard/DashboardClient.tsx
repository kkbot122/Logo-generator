/* src/app/dashboard/DashboardClient.tsx */
"use client";

import { useState } from "react";
import CreateBrandModal from "@/components/CreateBrandModal"; // Make sure this path is correct
import {
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  Search,
  Filter,
  Zap,
  Clock,
  Layout,
} from "lucide-react";
import Link from "next/link"; // Added for navigation

// Define the shape of the data we expect from the server
type BrandProject = {
  id: string;
  brandName: string;
  createdAt: Date;
  logoUrl: string;
};

export default function DashboardClient({ projects }: { projects: BrandProject[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search
  const filteredProjects = projects.filter((p) =>
    p.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full w-full bg-[#F3F2ED] text-black font-sans selection:bg-black selection:text-[#F3F2ED]">
      {/* 1. MOUNT THE MODAL */}
      <CreateBrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 1. HEADER SECTION */}
      <header className="px-8 py-10 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">
            <span>Workspace</span>
            <span className="text-black">/</span>
            <span>Overview</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Ready to <br /> Create.
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xs font-bold uppercase tracking-widest">
              Credits
            </span>
            <span className="text-xl font-black tracking-tighter">
              {/* Dynamic Credit Calculation could go here */}
              850 / 1000
            </span>
          </div>
          <button 
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-6 bg-black text-[#F3F2ED] flex items-center gap-3 hover:bg-neutral-800 transition-colors rounded-sm group">
            <span className="text-xs font-bold uppercase tracking-widest">
              New Project
            </span>
            <Plus
              size={16}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>
        </div>
      </header>

      {/* 2. STATS GRID (Dynamic) */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10">
        <StatCard
          label="Total Projects"
          value={projects.length.toString()}
          change="Lifetime"
          icon={<Layout size={20} />}
        />
        <StatCard
          label="Avg Generation Time"
          value="4s" // Static estimate for now
          change="Fast (Flux Model)"
          icon={<Zap size={20} />}
        />
        <StatCard
          label="Hours Saved"
          value={(projects.length * 2.5).toFixed(1)} // Estimate 2.5hrs saved per project
          change="vs Manual Design"
          icon={<Clock size={20} />}
        />
      </section>

      {/* 3. RECENT PROJECTS AREA */}
      <section className="flex-1 p-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter self-start md:self-auto">
            Recent Designs
          </h2>

          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-black/10 pl-10 pr-4 py-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-colors rounded-sm placeholder:text-gray-300"
              />
            </div>
            <button className="px-4 py-2 border border-black/10 bg-white hover:border-black transition-colors rounded-sm flex items-center justify-center">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Custom Table Layout */}
        <div className="border border-black/10 bg-white rounded-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-black/10 bg-[#F3F2ED]/50 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            <div className="col-span-6 md:col-span-5">Project Name</div>
            <div className="col-span-3 hidden md:block">Status</div>
            <div className="col-span-3 hidden md:block">Last Edited</div>
            <div className="col-span-6 md:col-span-1 text-right">Actions</div>
          </div>

          {/* Table Rows - MAPPED FROM REAL DATA */}
          <div className="flex flex-col">
            {filteredProjects.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm uppercase tracking-widest">
                    No projects found. Create one to get started.
                </div>
            ) : (
                filteredProjects.map((project) => (
                    <ProjectRow
                      key={project.id}
                      name={project.brandName}
                      type="Brand Identity"
                      status="Completed" // Assuming generated = success
                      date={new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    />
                ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- LOCAL SUBCOMPONENTS ---

function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-8 border-r border-black/10 last:border-r-0 hover:bg-white transition-colors group cursor-default">
      <div className="flex justify-between items-start mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-bold uppercase tracking-widest">
          {label}
        </span>
        {icon}
      </div>
      <div className="text-4xl font-black tracking-tighter uppercase mb-2">
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        {change}
      </div>
    </div>
  );
}

function ProjectRow({
  name,
  type,
  status,
  date,
}: {
  name: string;
  type: string;
  status: string;
  date: string;
}) {
  const getStatusStyle = (s: string) => {
    switch (s) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Processing":
        return "bg-blue-100 text-blue-700 border-blue-200 animate-pulse";
      case "Failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-black/5 last:border-b-0 hover:bg-neutral-50 items-center group transition-colors">
      {/* Name Column */}
      <div className="col-span-6 md:col-span-5 flex flex-col justify-center">
        <span className="font-bold text-sm uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4 cursor-pointer truncate">
          {name}
        </span>
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
          {type}
        </span>
      </div>

      {/* Status Column */}
      <div className="col-span-3 hidden md:flex items-center">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border rounded-sm ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {/* Date Column */}
      <div className="col-span-3 hidden md:flex items-center text-xs font-medium text-gray-500 uppercase tracking-wide">
        {date}
      </div>

      {/* Action Column */}
      <div className="col-span-6 md:col-span-1 flex justify-end gap-2">
        <button
          className="p-2 hover:bg-black hover:text-white transition-colors rounded-sm"
          title="Open Project"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}