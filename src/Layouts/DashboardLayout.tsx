import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import TopAppBar from "../components/dashboard/TopAppbar";

import { useTheme } from "../Theme/themeContext";

export default function DashboardLayout() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Desktop Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-[280px] border-r backdrop-blur-3xl transition-all duration-300 flex flex-col md:hidden transform
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${
          darkMode
            ? "bg-slate-950/80 border-slate-800 shadow-2xl"
            : "bg-white/70 border-emerald-100 shadow-xl"
        }`}
      >
        {/* Mobile Sidebar Content */}
        <div className="px-8 pt-8 flex items-center justify-between pb-6 border-b border-inherit">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>

            <div>
              <h1
                className={`text-2xl font-bold tracking-tight ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Skyline
              </h1>

              <p
                className={`text-xs ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Lagos, Nigeria
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className={`p-2 rounded-lg transition-all ${
              darkMode
                ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="mt-6 flex-1 px-2 space-y-2">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Discover", path: "/discover" },
            { name: "Trips", path: "/trips" },
            { name: "Live Here", path: "/live-here" },
            { name: "Map", path: "/map" },
            { name: "Community", path: "/community" },
            { name: "Profile", path: "/profile" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`block px-6 py-3 rounded-lg transition ${
                darkMode
                  ? "text-slate-400 hover:bg-slate-900 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${
        sidebarOpen ? "md:ml-[280px]" : "md:ml-20"
      }`}>
        <TopAppBar
          onToggleSidebar={toggleMobileSidebar}
          sidebarOpen={mobileSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}