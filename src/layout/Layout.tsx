import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-slate-100">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
