import {
  Search,
  Bell,
  Settings,
  UserCircle2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import { useTheme } from "../../Theme/themeContext";
import { useProfile } from "../../Context/profileContext";

interface TopAppBarProps {
  userName?: string;
  avatar?: string;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}



export default function TopAppBar({
  userName = "Guest",
  avatar,
  onToggleSidebar,
  sidebarOpen,
}: TopAppBarProps) {
  const { darkMode } = useTheme();
const { profile } = useProfile();

  return (
    <header
      className={`sticky top-0 z-30 h-20 md:h-24 backdrop-blur-xl border-b transition-all ${
        darkMode
          ? "bg-slate-950/70 border-slate-800"
          : "bg-white/70 border-emerald-100"
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-8 lg:px-12 gap-4">
        {/* Hamburger Menu - Visible on Mobile Only */}
        <button
          onClick={onToggleSidebar}
          className={`md:hidden p-2 rounded-lg transition-all ${
            darkMode
              ? "hover:bg-slate-800 text-slate-400 hover:text-white"
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
        >
          <Menu size={24} />
        </button>

        {/* Search - Hide on small mobile, show full on larger screens */}
        <div className="relative flex-1 max-w-xs md:max-w-2xl">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className={`h-10 md:h-12 w-full rounded-full border pl-14 pr-6 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:scale-[1.01] text-sm md:text-base
            ${
              darkMode
                ? "bg-slate-900/70 border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white/60 border-emerald-100 placeholder:text-slate-500"
            }`}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Notifications */}
          <button
            className={`relative transition p-1.5 md:p-2
            ${
              darkMode
                ? "text-slate-400 hover:text-white"
                : "text-slate-700 hover:text-emerald-600"
            }`}
          >
            <Bell size={20} />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          </button>

          {/* Settings - Hidden on small mobile */}
          <button
            className={`transition p-1.5 md:p-2 hidden sm:block
            ${
              darkMode
                ? "text-slate-400 hover:text-white"
                : "text-slate-700 hover:text-emerald-600"
            }`}
          >
            <Settings size={20} />
          </button>

          <div
            className={`h-10 w-px hidden md:block
            ${
              darkMode
                ? "bg-slate-700"
                : "bg-emerald-100"
            }`}
          />

          {/* User Profile */}
          <button className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden sm:block">
              <p
                className={`text-xs md:text-sm font-semibold
                ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {profile?.username || "Explorer"}
              </p>

              <p
                className={`text-[8px] md:text-[10px] font-bold tracking-[1.5px] md:tracking-[2px]
                ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                PLATINUM
              </p>
            </div>

            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full ring-2 ring-emerald-500">
              {/* {avatar ? (
                <img
                  src={profile?.avatar_url}
                  alt={profile?.username}
                  className="h-full w-full object-cover"
                />
              ) : ( */}
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center
                  ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-slate-100"
                  }`}
                >
                  <UserCircle2
                    size={24}
                    className="text-slate-400"
                  />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}