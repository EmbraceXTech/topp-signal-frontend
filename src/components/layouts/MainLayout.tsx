import React from "react";
import MainNavbar from "./MainNavbar";
import MainSidebar from "./MainSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <div className="flex flex-1">
        <MainSidebar />
        <div className="flex-1 overflow-x-auto max-h-[calc(100vh-70px)] overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
