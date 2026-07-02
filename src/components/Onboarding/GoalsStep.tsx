// import { GOALS } from "../../Lib/Onboarding";
// import { useTheme } from "../../Theme/themeContext";

// interface GoalsStepProps {
//   goals: string[];
//   toggleGoal: (goal: string) => void;
// }

// export default function GoalsStep({
//   goals,
//   toggleGoal,
// }: GoalsStepProps) {
//   const { darkMode } = useTheme();

//   return (
//     <div>
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold">
//           What brings you to Skyline?
//         </h2>

//         <p
//           className={`mt-2 ${
//             darkMode
//               ? "text-slate-400"
//               : "text-slate-600"
//           }`}
//         >
//           Select one or more goals. We'll personalize your travel experience.
//         </p>
//       </div>

//       <div className="grid gap-5 md:grid-cols-2">
//         {GOALS.map((goal) => {
//           const selected = goals.includes(goal.id);

//           return (
//             <button
//               key={goal.id}
//               type="button"
//               onClick={() =>
//                 toggleGoal(goal.id)
//               }
//               className={`rounded-3xl border p-6 text-left transition-all duration-300 hover:scale-[1.02]
//               ${
//                 selected
//                   ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500"
//                   : darkMode
//                   ? "border-slate-700 bg-slate-900 hover:border-slate-500"
//                   : "border-slate-200 bg-white hover:border-emerald-300"
//               }`}
//             >
//               <div className="text-4xl mb-4">
//                 {goal.icon}
//               </div>

//               <h3 className="font-semibold text-lg">
//                 {goal.title}
//               </h3>

//               <p
//                 className={`mt-2 text-sm ${
//                   darkMode
//                     ? "text-slate-400"
//                     : "text-slate-600"
//                 }`}
//               >
//                 {goal.description}
//               </p>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import {
  Compass,
  Map,
  Gem,
  Bookmark,
  CalendarDays,
  Users,
  Camera,
  UtensilsCrossed,
} from "lucide-react";

import { useTheme } from "../../Theme/themeContext";

interface GoalsStepProps {
  goals: string[];
  toggleGoal: (goal: string) => void;
}

const GOALS = [
  {
    id: "nearby",
    title: "Discover Nearby Places",
    description:
      "Restaurants, attractions and experiences around you.",
    icon: Compass,
    featured: true,
  },
  {
    id: "trip",
    title: "Plan My Next Trip",
    description:
      "Build itineraries and organize future adventures.",
    icon: Map,
  },
  {
    id: "hidden",
    title: "Find Hidden Gems",
    description:
      "Discover places most travelers never notice.",
    icon: Gem,
  },
  {
    id: "bucket",
    title: "Build My Bucket List",
    description:
      "Save amazing destinations for later.",
    icon: Bookmark,
  },
  {
    id: "events",
    title: "Attend Local Events",
    description:
      "Concerts, festivals and activities nearby.",
    icon: CalendarDays,
  },
  {
    id: "food",
    title: "Find Great Food",
    description:
      "Discover cafés, restaurants and local favorites.",
    icon: UtensilsCrossed,
  },
  {
    id: "friends",
    title: "Meet Other Travelers",
    description:
      "Connect with explorers sharing similar interests.",
    icon: Users,
  },
  {
    id: "photos",
    title: "Capture Great Photos",
    description:
      "Find beautiful and Instagram-worthy locations.",
    icon: Camera,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function GoalsStep({
  goals,
  toggleGoal,
}: GoalsStepProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-10"
    >
      {/* Header */}

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">
          What would you like Skyline to help you with?
        </h2>

        <p
          className={`mt-4 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Select one or more goals. We'll personalize your
          recommendations, notifications and home feed.
        </p>
      </div>

      {/* Cards */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-5 md:grid-cols-2"
      >
        {GOALS.map((goal) => {
          const selected = goals.includes(goal.id);

          const Icon = goal.icon;

          return (
            <motion.button
              key={goal.id}
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => toggleGoal(goal.id)}
              className={`relative rounded-3xl border p-6 text-left transition-all ${
                selected
                  ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20"
                  : darkMode
                  ? "border-slate-800 bg-slate-900 hover:border-slate-700"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg"
              }`}
            >
              {goal.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Popular
                </span>
              )}

              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${
                  selected
                    ? "bg-emerald-500 text-white"
                    : darkMode
                    ? "bg-slate-800 text-slate-300"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-semibold">
                {goal.title}
              </h3>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                {goal.description}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "border-slate-800 bg-slate-900/40"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <p
          className={`text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
           You can choose multiple goals. Skyline will continuously
          personalize recommendations as you explore and save places.
        </p>
      </div>
    </motion.div>
  );
}