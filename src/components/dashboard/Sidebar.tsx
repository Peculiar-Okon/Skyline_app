import {
  LayoutDashboard,
  Compass,
  BriefcaseBusiness,
  Building2,
  Map,
  Users,
  User,
  Settings,
  CircleHelp,
  Moon,
  MapPinned,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useTheme } from "../../Theme/themeContext";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    name: "Trips",
    icon: BriefcaseBusiness,
    path: "/trips",
  },
  {
    name: "Live Here",
    icon: Building2,
    path: "/live-here",
  },
  {
    name: "Map",
    icon: Map,
    path: "/map",
  },
  {
    name: "Community",
    icon: Users,
    path: "/community",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r backdrop-blur-3xl transition-all duration-300 flex flex-col hidden md:flex
        ${isOpen ? "w-[280px]" : "w-20"}
        ${
          darkMode
            ? "bg-slate-950/80 border-slate-800 shadow-2xl"
            : "bg-white/70 border-emerald-100 shadow-xl"
        }`}
      >
      {/* Logo and Toggle Button */}
      <div className="px-8 pt-8 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <MapPinned
                size={22}
                className="text-white"
              />
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
        )}

        {!isOpen && (
          <div className="h-11 w-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto">
            <MapPinned
              size={22}
              className="text-white"
            />
          </div>
        )}

        {/* Toggle Button - Hidden on Mobile */}
        <button
          onClick={onToggle}
          className={`hidden lg:flex p-1.5 rounded-lg transition-all
          ${
            darkMode
              ? "hover:bg-slate-800 text-slate-400 hover:text-white"
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
        >
          <ChevronLeft
            size={20}
            className={`transition-transform ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex-1 px-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={!isOpen ? item.name : ""}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-r-full border-l-4 px-6 py-3 transition-all duration-300 ${
                  isOpen ? "" : "justify-center px-0"
                }
                ${
                  isActive
                    ? darkMode
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-400"
                      : "border-emerald-600 bg-emerald-100 text-emerald-700"
                    : darkMode
                    ? "border-transparent text-slate-400 hover:bg-slate-900 hover:text-white"
                    : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              {isOpen && (
                <span className="text-[16px] whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`border-t border-inherit px-2 py-5 space-y-1 ${!isOpen && "flex flex-col items-center"}`}>
        <NavLink
          to="/settings"
          title={!isOpen ? "Settings" : ""}
          className={`flex items-center gap-3 rounded-xl px-6 py-2 transition ${
            !isOpen ? "justify-center px-0" : ""
          }
          ${
            darkMode
              ? "text-slate-400 hover:bg-slate-900 hover:text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Settings size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm">Settings</span>}
        </NavLink>

        <NavLink
          to="/help"
          title={!isOpen ? "Help" : ""}
          className={`flex items-center gap-3 rounded-xl px-6 py-2 transition ${
            !isOpen ? "justify-center px-0" : ""
          }
          ${
            darkMode
              ? "text-slate-400 hover:bg-slate-900 hover:text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <CircleHelp size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm">Help</span>}
        </NavLink>

        <button
          onClick={toggleDarkMode}
          title={!isOpen ? "Dark Mode" : ""}
          className={`w-full flex items-center gap-3 rounded-xl px-6 py-2 transition ${
            !isOpen ? "justify-center px-0" : ""
          }
          ${
            darkMode
              ? "text-slate-400 hover:bg-slate-900 hover:text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Moon size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm">Dark Mode</span>}
        </button>
      </div>
    </aside>
    </>
  );
}