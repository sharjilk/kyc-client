import React from "react";
//import Header from "../components/Header";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Toaster />
    </>
  );
};

export default Layout;
