import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import TopAppBar from "../components/dashboard/TopAppbar";

import { useTheme } from "../Theme/themeContext";

export default function DashboardLayout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopAppBar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}