import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
