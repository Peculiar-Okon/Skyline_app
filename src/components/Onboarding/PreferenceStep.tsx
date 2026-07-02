import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Clock3,
  Check,
} from "lucide-react";
import { useTheme } from "../../Theme/themeContext";

interface PreferencesStepProps {
  vibe: string;
  duration: string;
  companion: string;

  setVibe: (value: string) => void;
  setDuration: (value: string) => void;
  setCompanion: (value: string) => void;
}

const vibes = [
  "Relaxed",
  "Adventure",
  "Luxury",
  "Romantic",
  "Family",
  "Budget",
];

const durations = [
  "30 mins",
  "1 - 2 hours",
  "Half Day",
  "Full Day",
  "Weekend",
];

const companions = [
  "Solo",
  "Friends",
  "Partner",
  "Family",
];

function ChoiceCard({
  title,
  selected,
  onClick,
  icon: Icon,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
  icon: any;
}) {
  const { darkMode } = useTheme();

  return (
    <motion.button
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      whileTap={{
        scale: .98,
      }}
      onClick={onClick}
      className={`
        relative
        rounded-2xl
        border
        p-4
        text-left
        transition-all

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
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check
            size={14}
            className="text-white"
          />
        </div>
      )}

      <Icon
        size={22}
        className="text-emerald-500"
      />

      <p
        className={`mt-4 font-medium ${
          darkMode
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        {title}
      </p>
    </motion.button>
  );
}

export default function PreferencesStep({
  vibe,
  duration,
  companion,

  setVibe,
  setDuration,
  setCompanion,
}: PreferencesStepProps) {

  const { darkMode } =
    useTheme();

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
      className="space-y-10"
    >

      <div>

        <h2
          className={`text-3xl font-bold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Tell us your travel style
        </h2>

        <p
          className={`mt-3 text-lg ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Skyline will use these preferences
          to recommend places that match
          your personality.
        </p>

      </div>

      {/* VIBE */}

      <section>

        <h3
          className={`mb-4 text-lg font-semibold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          What's your vibe?
        </h3>

        <div className="grid gap-4 md:grid-cols-3">

          {vibes.map((item) => (

            <ChoiceCard
              key={item}
              title={item}
              selected={vibe === item}
              onClick={() =>
                setVibe(item)
              }
              icon={Heart}
            />

          ))}

        </div>

      </section>

      {/* DURATION */}

      <section>

        <h3
          className={`mb-4 text-lg font-semibold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Typical outing length
        </h3>

        <div className="grid gap-4 md:grid-cols-3">

          {durations.map((item) => (

            <ChoiceCard
              key={item}
              title={item}
              selected={
                duration === item
              }
              onClick={() =>
                setDuration(item)
              }
              icon={Clock3}
            />

          ))}

        </div>

      </section>

      {/* COMPANION */}

      <section>

        <h3
          className={`mb-4 text-lg font-semibold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Who do you usually explore with?
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          {companions.map((item) => (

            <ChoiceCard
              key={item}
              title={item}
              selected={
                companion === item
              }
              onClick={() =>
                setCompanion(item)
              }
              icon={Users}
            />

          ))}

        </div>

      </section>

    </motion.div>

  );
}