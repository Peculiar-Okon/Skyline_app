// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   LayoutDashboard,
//   Compass,
//   CalendarDays,
//   Map,
//   Bookmark,
//   Route,
//   Hotel,
//   Bus,
//   ClipboardList,
//   History,
//   ChartColumn,
//   Hospital,
//   GraduationCap,
//   Home,
//   Building2,
//   Camera,
//   Settings,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   MapPinned,
// } from "lucide-react";

// import SidebarItem from "./SideBarItem";
// import SidebarGroup from "./SidebarGroup";

// import { useTheme } from "../../Theme/themeContext";

// export default function Sidebar() {
//   const { darkMode } = useTheme();

//   const [collapsed, setCollapsed] =
//     useState(false);

//   return (
//     <motion.aside
//       animate={{
//         width: collapsed ? 90 : 290,
//       }}
//       transition={{
//         duration: 0.25,
//       }}
//       className={`hidden lg:flex flex-col border-r
//       ${
//         darkMode
//           ? "bg-slate-950 border-slate-800"
//           : "bg-white border-slate-200"
//       }`}
//     >
//       {/* Logo */}

//       <div
//         className={`h-24 px-6 flex items-center justify-between border-b
//         ${
//           darkMode
//             ? "border-slate-800"
//             : "border-slate-200"
//         }`}
//       >
//         <NavLink
//           to="/dashboard"
//           className="flex items-center gap-3"
//         >
//           <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
//             <MapPinned className="text-white" />
//           </div>

//           <AnimatePresence>
//             {!collapsed && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   x: -10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   x: -10,
//                 }}
//               >
//                 <h1 className="font-bold text-lg">
//                   Skyline
//                 </h1>

//                 <p className="text-xs text-slate-500">
//                   Explore beautifully
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </NavLink>

//         <button
//           onClick={() =>
//             setCollapsed(!collapsed)
//           }
//           className="rounded-xl p-2 hover:bg-slate-200/20 transition"
//         >
//           {collapsed ? (
//             <ChevronRight size={18} />
//           ) : (
//             <ChevronLeft size={18} />
//           )}
//         </button>
//       </div>

//       {/* Location */}

//       {!collapsed && (
//         <div
//           className={`mx-5 mt-5 rounded-2xl p-4
//           ${
//             darkMode
//               ? "bg-slate-900"
//               : "bg-slate-100"
//           }`}
//         >
//           <p className="text-xs text-slate-500">
//             Current Location
//           </p>

//           <h3 className="font-semibold mt-1">
//             Lagos, Nigeria
//           </h3>
//         </div>
//       )}

//       {/* Navigation */}

//       <div className="flex-1 overflow-y-auto mt-6 px-3 space-y-2">

//         <SidebarItem
//           icon={LayoutDashboard}
//           label="Overview"
//           to="/dashboard"
//           collapsed={collapsed}
//         />

//         <SidebarItem
//           icon={Compass}
//           label="Explore"
//           to="/dashboard/explore"
//           collapsed={collapsed}
//         />

//         <SidebarItem
//           icon={CalendarDays}
//           label="Events"
//           to="/dashboard/events"
//           collapsed={collapsed}
//         />

//         <SidebarItem
//           icon={Map}
//           label="Map View"
//           to="/dashboard/map"
//           collapsed={collapsed}
//         />

//         <SidebarGroup
//         icon={MapPinned}
//           title="Traveller's Hub"
//           collapsed={collapsed}
//         >
//           <SidebarItem
//             icon={Bookmark}
//             label="Saved Spots"
//             to="/dashboard/saved"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={Route}
//             label="Trip Plans"
//             to="/dashboard/trips"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={Hotel}
//             label="Hotels"
//             to="/dashboard/hotels"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={Bus}
//             label="Transport"
//             to="/dashboard/transport"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={ClipboardList}
//             label="Bookings"
//             to="/dashboard/bookings"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={History}
//             label="Visited History"
//             to="/dashboard/history"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={ChartColumn}
//             label="Travel Stats"
//             to="/dashboard/stats"
//             collapsed={collapsed}
//           />
//         </SidebarGroup>

//         <SidebarGroup
//         icon={Building2}
//           title="Living Essentials"
//           collapsed={collapsed}
//         >
//           <SidebarItem
//             icon={Hospital}
//             label="Healthcare"
//             to="/dashboard/health"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={GraduationCap}
//             label="Schools"
//             to="/dashboard/schools"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={Home}
//             label="Housing"
//             to="/dashboard/housing"
//             collapsed={collapsed}
//           />

//           <SidebarItem
//             icon={Building2}
//             label="Public Services"
//             to="/dashboard/services"
//             collapsed={collapsed}
//           />
//         </SidebarGroup>

//         <SidebarItem
//           icon={Camera}
//           label="My Views"
//           to="/dashboard/views"
//           collapsed={collapsed}
//         />
//       </div>

//       {/* Footer */}

//       <div
//         className={`border-t p-3
//         ${
//           darkMode
//             ? "border-slate-800"
//             : "border-slate-200"
//         }`}
//       >
//         <SidebarItem
//           icon={Settings}
//           label="Settings"
//           to="/dashboard/settings"
//           collapsed={collapsed}
//         />
//       </div>
//     </motion.aside>
//   );
// }

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  LayoutDashboard,
  Compass,
  CalendarDays,
  Map,
  Bookmark,
  Route,
  Hotel,
  Bus,
  ClipboardList,
  History,
  ChartColumn,
  Hospital,
  GraduationCap,
  Home,
  Building2,
  Camera,
  Settings,
  ChevronLeft,
  ChevronRight,
  MapPinned,
} from "lucide-react";

import SidebarItem from "./SideBarItem";
import SidebarGroup from "./SidebarGroup";
import { useTheme } from "../../Theme/themeContext";

export default function Sidebar() {
  const { darkMode } = useTheme();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 88 : 300,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`hidden lg:flex h-screen flex-col border-r backdrop-blur-xl
      ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800/60"
          : "bg-white border-slate-200"
      }`}
    >
      {/* ---------------- LOGO ---------------- */}

      <div
        className={`flex items-center justify-between px-6 py-6 border-b
        ${
          darkMode
            ? "border-slate-800/60"
            : "border-slate-200"
        }`}
      >
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F95738] to-[#EE964B] shadow-lg shadow-orange-500/20">
            <MapPinned
              size={20}
              className="text-white"
            />
          </div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -8,
                }}
              >
                <h1
                  className={`font-semibold text-lg ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  Skyline
                </h1>

                <p className="text-xs text-slate-500">
                  Travel beautifully
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>

        {!collapsed && (
          <button
            onClick={() =>
              setCollapsed(true)
            }
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition
            ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-slate-100"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {collapsed && (
          <button
            onClick={() =>
              setCollapsed(false)
            }
            className={`absolute left-[72px] top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full border shadow-lg
            ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* ---------------- LOCATION ---------------- */}

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="px-5 pt-5"
          >
            <div
              className={`rounded-2xl border p-4
              ${
                darkMode
                  ? "bg-white/[0.03] border-white/5"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Current Location
              </p>

              <h3
                className={`mt-2 font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                Lagos, Nigeria
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- NAVIGATION ---------------- */}

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">

        {!collapsed && (
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            General
          </p>
        )}

        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          to="/dashboard"
          collapsed={collapsed}
        />

        <SidebarItem
          icon={Compass}
          label="Explore"
          to="/dashboard/explore"
          collapsed={collapsed}
        />

        <SidebarItem
          icon={CalendarDays}
          label="Events"
          to="/dashboard/events"
          collapsed={collapsed}
        />

        <SidebarItem
          icon={Map}
          label="Map View"
          to="/dashboard/map"
          collapsed={collapsed}
        />

        {!collapsed && (
          <div className="my-6 border-t border-slate-800/60" />
        )}

        <SidebarGroup
          title="Traveller's Hub"
          icon={MapPinned}
          collapsed={collapsed}
        >
          <SidebarItem
            nested
            icon={Bookmark}
            label="Saved Spots"
            to="/dashboard/saved"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={Route}
            label="Trip Plans"
            to="/dashboard/trips"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={Hotel}
            label="Hotels"
            to="/dashboard/hotels"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={Bus}
            label="Transport"
            to="/dashboard/transport"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={ClipboardList}
            label="Bookings"
            to="/dashboard/bookings"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={History}
            label="History"
            to="/dashboard/history"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={ChartColumn}
            label="Travel Stats"
            to="/dashboard/stats"
            collapsed={collapsed}
          />
        </SidebarGroup>

        {!collapsed && (
          <div className="my-6 border-t border-slate-800/60" />
        )}

        <SidebarGroup
          title="Living Essentials"
          icon={Building2}
          collapsed={collapsed}
        >
          <SidebarItem
            nested
            icon={Hospital}
            label="Healthcare"
            to="/dashboard/health"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={GraduationCap}
            label="Schools"
            to="/dashboard/schools"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={Home}
            label="Housing"
            to="/dashboard/housing"
            collapsed={collapsed}
          />

          <SidebarItem
            nested
            icon={Building2}
            label="Public Services"
            to="/dashboard/services"
            collapsed={collapsed}
          />
        </SidebarGroup>

        {!collapsed && (
          <div className="my-6 border-t border-slate-800/60" />
        )}

        <SidebarItem
          icon={Camera}
          label="My Memories"
          to="/dashboard/views"
          collapsed={collapsed}
        />
      </div>

      {/* ---------------- FOOTER ---------------- */}

      <div
        className={`border-t p-4
        ${
          darkMode
            ? "border-slate-800/60"
            : "border-slate-200"
        }`}
      >
        <SidebarItem
          icon={Settings}
          label="Settings"
          to="/dashboard/settings"
          collapsed={collapsed}
        />

        {!collapsed && (
          <div
            className={`mt-5 rounded-2xl border p-4
            ${
              darkMode
                ? "bg-white/[0.03] border-white/5"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="font-medium text-sm">
              Pearl
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Premium Explorer
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}