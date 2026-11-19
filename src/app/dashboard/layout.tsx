import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSideBar } from "../components/DashboardSideBar";

const DashboardLayoutPages = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="relative h-[calc(100svh-71px)] min-h-0! overflow-hidden sm:h-[calc(100svh-79px)]">
      <DashboardSideBar />

      <div className="flex min-w-0 flex-1 flex-col bg-[#fff8ee]">
        {/* Dashboard header - only the sidebar toggle button */}
        <header className="relative flex h-16 shrink-0 items-center px-4 sm:px-6">

          {/* Sidebar toggle button */}
          <SidebarTrigger className="relative z-10 size-10 shrink-0 rounded-xl border border-[#a4161a]/15 bg-white text-[#a4161a] shadow-[0_6px_16px_-12px_rgba(164,22,26,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a4161a]/30 hover:text-[#8f1116] hover:shadow-[0_10px_20px_-12px_rgba(164,22,26,0.9)] focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf2]" />

        </header>

        {/* Dashboard content area */}
        <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayoutPages;
