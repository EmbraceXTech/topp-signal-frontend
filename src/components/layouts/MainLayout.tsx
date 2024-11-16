import React from "react";
import MainNavbar from "./MainNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      {children}
    </div>
  );
}
