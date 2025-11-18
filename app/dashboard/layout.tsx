"use client";
import { AppSidebar } from "@/components/common/dashboard/AppSidebar";
import DashboardHeader from "@/components/common/dashboard/DashboardHeader";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        className={`${collapsed ? "w-16" : "w-[280px]"}`}
      />
      <main
        className={`ml-auto ${collapsed ? "w-[calc(100%-63px)]" : "w-[calc(100%-280px)]"}`}
      >
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="pt-7 pb-6">
          <div className="container-fluid">{children}</div>
        </div>
      </main>
    </div>
  );
}
