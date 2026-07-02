import { motion } from "framer-motion";
import {
  Trees,
  UtensilsCrossed,
  Building2,
  Camera,
  Waves,
  Music4,
  PartyPopper,
  Landmark,
  Check,
} from "lucide-react";

import { useTheme } from "../../Theme/themeContext";

interface InterestsStepProps {
  interests: string[];
  toggleInterest: (interest: string) => void;
}

const INTERESTS = [
  {
    id: "nature",
    title: "Nature & Parks",
    description: "Gardens, hiking, lakes and green escapes.",
    icon: Trees,
  },
  {
    id: "food",
    title: "Food & Restaurants",
    description: "Local cuisine, cafés and fine dining.",
    icon: UtensilsCrossed,
  },
  {
    id: "landmarks",
    title: "Landmarks",
    description: "Historic buildings and iconic attractions.",
    icon: Landmark,
  },
  {
    id: "city",
    title: "City Life",
    description: "Skylines, shopping and busy streets.",
    icon: Building2,
  },
  {
    id: "photography",
    title: "Photography",
    description: "Instagram-worthy locations.",
    icon: Camera,
  },
  {
    id: "beaches",
    title: "Beaches",
    description: "Coastlines, sunsets and waterfronts.",
    icon: Waves,
  },
  {
    id: "nightlife",
    title: "Nightlife",
    description: "Bars, clubs and evening experiences.",
    icon: Music4,
  },
  {
    id: "events",
    title: "Events",
    description: "Festivals, concerts and local happenings.",
    icon: PartyPopper,
  },
];

export default function InterestsStep({
  interests,
  toggleInterest,
}: InterestsStepProps) {
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
        duration: .4,
      }}
      className="space-y-8"
    >
      <div>

        <h2
          className={`text-3xl font-bold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          What interests you?
        </h2>

        <p
          className={`mt-3 text-lg ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Select everything that catches your attention.
          We'll personalize Skyline around these choices.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {INTERESTS.map((item) => {

          const selected =
            interests.includes(item.id);

          const Icon =
            item.icon;

          return (

            <motion.button
              key={item.id}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                toggleInterest(item.id)
              }
              className={`
                relative
                text-left
                rounded-3xl
                p-6
                border
                transition-all
                overflow-hidden

                ${
                  selected
                    ? "border-emerald-500 ring-2 ring-emerald-500/20"
                    : darkMode
                    ? "border-white/10"
                    : "border-slate-200"
                }

                ${
                  darkMode
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white hover:bg-slate-50"
                }
              `}
            >

              {selected && (

                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    w-7
                    h-7
                    rounded-full
                    bg-emerald-500
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Check
                    size={16}
                    className="text-white"
                  />
                </motion.div>

              )}

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={28}
                  className="text-emerald-500"
                />
              </div>

              <h3
                className={`mt-5 text-lg font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`mt-2 text-sm leading-relaxed ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {item.description}
              </p>

            </motion.button>

          );
        })}

      </div>

      <div
        className={`text-sm ${
          darkMode
            ? "text-slate-500"
            : "text-slate-400"
        }`}
      >
        Select as many as you like.
      </div>

    </motion.div>
  );
}