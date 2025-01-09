import { Icons } from "@/components/Icons";
import SidebarNav from "@/components/SidebarNav";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const sidebarNav = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "dashboard" as keyof typeof Icons,
    },
    {
      title: "KPI report",
      href: "/admin/kpi",
      icon: "report" as keyof typeof Icons,
    },
  ];

  return (
    <div className="bg-slate-100">
      <div className="flex min-h-screen flex-col space-y-6 pt-16">
        <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="w-[200px] flex-col md:flex pl-8">
            <SidebarNav items={sidebarNav} showLogout={true} />
          </aside>
          <main className="flex w-full flex-1 flex-col md:pr-8 overflow-hidden">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default AdminLayout;
