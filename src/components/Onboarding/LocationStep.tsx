import { MapPin, Navigation, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../Theme/themeContext";

interface LocationStepProps {
  city: string;
  setCity: (city: string) => void;
  detectLocation: () => void;
  loadingLocation: boolean;
}

const popularCities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Accra",
  "Cape Town",
  "London",
  "Dubai",
];

export default function LocationStep({
  city,
  setCity,
  detectLocation,
  loadingLocation,
}: LocationStepProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div
          className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl ${
            darkMode
              ? "bg-emerald-500/15"
              : "bg-emerald-100"
          }`}
        >
          <MapPin
            className="text-emerald-500"
            size={34}
          />
        </div>

        <h2 className="text-3xl font-bold">
          Where are you exploring?
        </h2>

        <p
          className={`mt-3 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Skyline uses your location to recommend
          nearby places, hidden gems and events.
        </p>
      </div>

      {/* Detect Location */}

      <button
        type="button"
        onClick={detectLocation}
        disabled={loadingLocation}
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-white font-semibold transition hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-3"
      >
        <Navigation size={20} />

        {loadingLocation
          ? "Detecting..."
          : "Use Current Location"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div
            className={`w-full border-t ${
              darkMode
                ? "border-slate-700"
                : "border-slate-200"
            }`}
          />
        </div>

        <div className="relative flex justify-center">
          <span
            className={`px-4 text-sm ${
              darkMode
                ? "bg-slate-900 text-slate-400"
                : "bg-white text-slate-500"
            }`}
          >
            or choose manually
          </span>
        </div>
      </div>

      {/* Manual */}

      <div className="space-y-3">
        <label
          className={`text-sm font-medium ${
            darkMode
              ? "text-slate-300"
              : "text-slate-700"
          }`}
        >
          City
        </label>

        <div className="relative">
          <Globe
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className={`w-full rounded-2xl border py-4 pl-12 pr-4 transition focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white border-slate-200"
            }`}
          />
        </div>
      </div>

      {/* Popular Cities */}

      <div>
        <p
          className={`mb-3 text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Popular destinations
        </p>

        <div className="flex flex-wrap gap-3">
          {popularCities.map((place) => (
            <button
              key={place}
              type="button"
              onClick={() =>
                setCity(place)
              }
              className={`rounded-full px-4 py-2 transition ${
                city === place
                  ? "bg-emerald-500 text-white"
                  : darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {place}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "border-slate-800 bg-slate-900/40"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <h4 className="font-semibold mb-2">
          Why do we ask?
        </h4>

        <p
          className={`text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Your location helps Skyline recommend
          attractions, restaurants, events and
          scenic spots near you. You can change it
          anytime later.
        </p>
      </div>
    </motion.div>
  );
}