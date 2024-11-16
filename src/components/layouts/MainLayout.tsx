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
        <div>{children}</div>
      </div>
    </div>
  );
}
