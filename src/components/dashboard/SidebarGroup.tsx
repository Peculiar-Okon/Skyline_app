

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import type { LucideIcon } from "lucide-react";
// import type { ReactNode } from "react";
// import { useTheme } from "../../Theme/themeContext";

// interface SidebarGroupProps {
//   title: string;
//   icon: LucideIcon;
//   collapsed: boolean;
//   children: ReactNode;
// }

// export default function SidebarGroup({
//   title,
//   icon: Icon,
//   collapsed,
//   children,
// }: SidebarGroupProps) {
//   const { darkMode } = useTheme();

//   const [open, setOpen] = useState(true);

//   return (
//     <div className="space-y-2">
//       {/* Group Header */}

//       <button
//         type="button"
//         onClick={() => {
//           if (!collapsed) {
//             setOpen((prev) => !prev);
//           }
//         }}
//         className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition-all
//         ${
//           darkMode
//             ? "text-slate-300 hover:bg-slate-800"
//             : "text-slate-700 hover:bg-slate-100"
//         }`}
//       >
//         <Icon size={20} />

//         {!collapsed && (
//           <>
//             <span className="flex-1 text-left font-medium">
//               {title}
//             </span>

//             <motion.div
//               animate={{
//                 rotate: open ? 180 : 0,
//               }}
//               transition={{
//                 duration: 0.2,
//               }}
//             >
//               <ChevronDown size={18} />
//             </motion.div>
//           </>
//         )}
//       </button>

//       {/* Nested Items */}

//       <AnimatePresence initial={false}>
//         {!collapsed && open && (
//           <motion.div
//             initial={{
//               height: 0,
//               opacity: 0,
//             }}
//             animate={{
//               height: "auto",
//               opacity: 1,
//             }}
//             exit={{
//               height: 0,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.25,
//             }}
//             className="overflow-hidden"
//           >
//             <div
//               className={`ml-5 space-y-1 border-l pl-5 ${
//                 darkMode
//                   ? "border-slate-700/40"
//                   : "border-slate-200"
//               }`}
//             >
//               {children}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useTheme } from "../../Theme/themeContext";

interface SidebarGroupProps {
  title: string;
  icon: LucideIcon;
  collapsed: boolean;
  children: ReactNode;
}

export default function SidebarGroup({
  title,
  icon: Icon,
  collapsed,
  children,
}: SidebarGroupProps) {
  const { darkMode } = useTheme();

  const [open, setOpen] = useState(true);

  if (collapsed) {
    return (
      <div
        className={`flex h-12 w-12 mx-auto items-center justify-center rounded-xl transition-colors cursor-pointer
        ${
          darkMode
            ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
        title={title}
      >
        <Icon size={19} />
      </div>
    );
  }

  return (
    <div className="mb-5">
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
        ${
          darkMode
            ? "hover:bg-white/[0.04]"
            : "hover:bg-slate-100"
        }`}
      >
        <Icon
          size={18}
          className={`transition-colors
          ${
            darkMode
              ? "text-slate-400 group-hover:text-white"
              : "text-slate-500"
          }`}
        />

        <span
          className={`flex-1 text-left text-[15px] font-semibold
          ${
            darkMode
              ? "text-slate-200"
              : "text-slate-700"
          }`}
        >
          {title}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown
            size={16}
            className={
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }
          />
        </motion.div>
      </button>

      {/* Children */}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}