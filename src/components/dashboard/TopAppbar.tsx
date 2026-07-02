// import {
//   Bell,
//   MapPin,
//   Search,
//   Plus,
//   Moon,
//   Sun,
// } from "lucide-react";

// import { useTheme } from "../../Theme/themeContext";

// interface TopAppBarProps {
//   city?: string;

//   userName?: string;

//   avatar?: string;
// }

// export default function TopAppBar({
//   city = "Lagos",

//   userName = "Pearl",

//   avatar,
// }: TopAppBarProps) {
//   const {
//     darkMode,
//     toggleDarkMode,
//   } = useTheme();

//   return (
//     <header
//       className={`sticky top-0 z-40 flex h-20 items-center justify-between border-b px-8 backdrop-blur-xl
//       ${
//         darkMode
//           ? "border-slate-800 bg-slate-950/80"
//           : "border-slate-200 bg-white/80"
//       }`}
//     >
//       {/* Left */}

//       <div className="flex items-center gap-8">
//         {/* Search */}

//         <div
//           className={`relative hidden md:block`}
//         >
//           <Search
//             size={18}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//           />

//           <input
//             placeholder="Search places, cities, restaurants..."
//             className={`w-[420px] rounded-2xl border py-3 pl-12 pr-4 outline-none transition
//             ${
//               darkMode
//                 ? "border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500"
//                 : "border-slate-200 bg-slate-50 focus:border-emerald-500"
//             }`}
//           />
//         </div>

//         {/* City */}

//         <div className="hidden lg:flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-emerald-500">
//           <MapPin size={18} />

//           <span className="font-medium">
//             {city}
//           </span>
//         </div>
//       </div>

//       {/* Right */}

//       <div className="flex items-center gap-4">

//         {/* Quick Add */}

//         <button
//           className="hidden md:flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-white transition hover:scale-105"
//         >
//           <Plus size={18} />

//           Add Place
//         </button>

//         {/* Theme */}

//         <button
//           onClick={toggleDarkMode}
//           className={`rounded-xl p-3 transition
//           ${
//             darkMode
//               ? "bg-slate-900 hover:bg-slate-800"
//               : "bg-slate-100 hover:bg-slate-200"
//           }`}
//         >
//           {darkMode ? (
//             <Sun size={18} />
//           ) : (
//             <Moon size={18} />
//           )}
//         </button>

//         {/* Notifications */}

//         <button
//           className={`relative rounded-xl p-3 transition
//           ${
//             darkMode
//               ? "bg-slate-900 hover:bg-slate-800"
//               : "bg-slate-100 hover:bg-slate-200"
//           }`}
//         >
//           <Bell size={18} />

//           <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
//         </button>

//         {/* Avatar */}

//         <button className="flex items-center gap-3 rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-900 p-2">
//           <img
//             src={
//               avatar ??
//               "https://ui-avatars.com/api/?name=Pearl"
//             }
//             alt={userName}
//             className="h-11 w-11 rounded-full object-cover"
//           />

//           <div className="hidden text-left lg:block">
//             <p className="font-semibold">
//               {userName}
//             </p>

//             <p className="text-sm text-slate-500">
//               Explorer
//             </p>
//           </div>
//         </button>

//       </div>
//     </header>
//   );
// }

import {
  Bell,
  Moon,
  Sun,
  Search,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";

import { useTheme } from "../../Theme/themeContext";

interface TopAppBarProps {
  city?: string;
  userName?: string;
  avatar?: string;
}

export default function TopAppBar({
  city = "Lagos, Nigeria",
  userName = "Pearl",
  avatar,
}: TopAppBarProps) {
  const {
    darkMode,
    toggleDarkMode,
  } = useTheme();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl
      ${
        darkMode
          ? "border-white/5 bg-slate-950/70"
          : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="px-8 py-6">

        {/* Top Row */}

        <div className="flex items-start justify-between">

          {/* Greeting */}

          <div>

            <h1
              className={`text-2xl font-semibold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {greeting},{" "}
              <span className="text-[#F95738]">
                {userName}
              </span>
              👋
            </h1>

            <p
              className={`mt-1 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Let's discover somewhere beautiful today.
            </p>

          </div>

          {/* Right Actions */}

          <div className="flex items-center gap-2">

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
              onClick={toggleDarkMode}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition
              ${
                darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-100"
              }`}
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition
              ${
                darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-100"
              }`}
            >
              <Bell size={19} />

              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#F95738]" />
            </motion.button>

            <button
              className={`ml-2 flex items-center gap-3 rounded-2xl px-2 py-2 transition
              ${
                darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-100"
              }`}
            >
              <img
                src={
                  avatar ??
                  "https://ui-avatars.com/api/?background=F95738&color=fff&name=Pearl"
                }
                alt={userName}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="hidden lg:block text-left">

                <p
                  className={`font-medium ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {userName}
                </p>

                <p className="text-xs text-slate-500">
                  Premium Explorer
                </p>

              </div>

            </button>

          </div>

        </div>

        {/* Search */}

        <div className="mt-8">

          <div
            className={`group flex h-16 items-center rounded-2xl border transition
            ${
              darkMode
                ? "border-white/5 bg-white/[0.03] hover:border-white/10"
                : "border-slate-200 bg-slate-50"
            }`}
          >

            <Search
              className="ml-6 text-slate-400"
              size={20}
            />

            <input
              placeholder="Search cities, restaurants, hotels, attractions..."
              className={`flex-1 bg-transparent px-4 text-[15px] outline-none
              ${
                darkMode
                  ? "placeholder:text-slate-500"
                  : "placeholder:text-slate-400"
              }`}
            />

            <div
              className={`mr-4 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs lg:flex
              ${
                darkMode
                  ? "bg-white/5 text-slate-400"
                  : "bg-white text-slate-500"
              }`}
            >
              ⌘ K
            </div>

          </div>

        </div>

        {/* Location */}

        <div className="mt-5 flex items-center gap-2">

          <MapPin
            size={16}
            className="text-[#F95738]"
          />

          <span className="text-sm text-slate-500">
            Currently exploring{" "}
            <span
              className={
                darkMode
                  ? "text-white"
                  : "text-slate-800"
              }
            >
              {city}
            </span>
          </span>

        </div>

      </div>
    </header>
  );
}