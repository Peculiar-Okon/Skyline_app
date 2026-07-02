// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ChevronRight } from "lucide-react";
// import type { LucideIcon } from "lucide-react";
// import { useTheme } from "../../Theme/themeContext";

// interface SidebarItemProps {
//   icon: LucideIcon;
//   label: string;
//   to?: string;

//   collapsed: boolean;

//   active?: boolean;

//   nested?: boolean;

//   onClick?: () => void;

//   rightIcon?: boolean;
// }

// export default function SidebarItem({
//   icon: Icon,
//   label,
//   to = "#",
//   collapsed,
//   nested = false,
//   onClick,
//   rightIcon = false,
// }: SidebarItemProps) {
//   const { darkMode } = useTheme();

//   return (
//     <NavLink to={to} onClick={onClick}>
//       {({ isActive }) => (
//         <motion.div
//           whileHover={{
//             x: collapsed ? 0 : 4,
//           }}
//           whileTap={{
//             scale: 0.98,
//           }}
//           className={`
//             relative
//             flex
//             items-center
//             gap-3
//             rounded-2xl
//             px-4
//             py-3
//             transition-all
//             duration-300
//             cursor-pointer

//             ${
//               nested
//                 ? "ml-5 text-[15px]"
//                 : ""
//             }

//             ${
//               isActive
//                 ? darkMode
//                   ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
//                   : "bg-emerald-500 text-white shadow-lg"
//                 : darkMode
//                 ? "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 : "text-slate-700 hover:bg-slate-100"
//             }
//           `}
//           title={collapsed ? label : ""}
//         >
//           {/* icon */}

//           <Icon
//             size={20}
//             className="flex-shrink-0"
//           />

//           {/* label */}

//           {!collapsed && (
//             <span className="flex-1 font-medium">
//               {label}
//             </span>
//           )}

//           {/* optional right chevron */}

//           {!collapsed && rightIcon && (
//             <ChevronRight
//               size={16}
//               className="opacity-60"
//             />
//           )}

//           {/* active indicator */}

//           {isActive && (
//             <motion.div
//               layoutId="sidebar-indicator"
//               className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white"
//             />
//           )}
//         </motion.div>
//       )}
//     </NavLink>
//   );
// }

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "../../Theme/themeContext";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to?: string;
  collapsed: boolean;
  nested?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon: Icon,
  label,
  to = "#",
  collapsed,
  nested = false,
  onClick,
}: SidebarItemProps) {
  const { darkMode } = useTheme();

  return (
    <NavLink to={to} onClick={onClick}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.18,
          }}
          title={collapsed ? label : ""}
          className={`
            relative
            flex
            items-center
            gap-3
            overflow-hidden
            rounded-xl
            transition-all
            duration-200

            ${
              collapsed
                ? "justify-center h-12 w-12 mx-auto"
                : nested
                ? "h-11 pl-12 pr-4"
                : "h-12 px-4"
            }

            ${
              isActive
                ? darkMode
                  ? "bg-white/[0.05]"
                  : "bg-slate-100"
                : darkMode
                ? "hover:bg-white/[0.035]"
                : "hover:bg-slate-100/80"
            }
          `}
        >
          {/* Active Indicator */}

          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#F95738]"
            />
          )}

          {/* Icon */}

          <Icon
            size={19}
            strokeWidth={2}
            className={`
              flex-shrink-0
              transition-all
              duration-200

              ${
                isActive
                  ? "text-[#F95738]"
                  : darkMode
                  ? "text-slate-400 group-hover:text-white"
                  : "text-slate-500"
              }
            `}
          />

          {/* Label */}

          {!collapsed && (
            <span
              className={`
                flex-1
                text-[15px]
                font-medium
                transition-colors
                duration-200

                ${
                  isActive
                    ? darkMode
                      ? "text-white"
                      : "text-slate-900"
                    : darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }
              `}
            >
              {label}
            </span>
          )}

          {/* Tiny glow for active item */}

          {isActive && darkMode && (
            <div className="absolute inset-0 rounded-xl bg-[#F95738]/5 pointer-events-none" />
          )}
        </motion.div>
      )}
    </NavLink>
  );
}