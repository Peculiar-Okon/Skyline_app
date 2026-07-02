import { motion } from "framer-motion";
import {
  MapPin,
  Heart,
  Compass,
  CheckCircle2,
  Sparkles,
  User2,
} from "lucide-react";
import { useTheme } from "../../Theme/themeContext";

interface ReviewStepProps {
  fullName: string;
  username: string;
  bio: string;
  avatarUrl: string;

  goals: string[];
  interests: string[];

  vibe: string;
  duration: string;
  social: string;

  city: string;
}

export default function ReviewStep({
  fullName,
  username,
  bio,
  avatarUrl,
  goals,
  interests,
  vibe,
  duration,
  social,
  city,
}: ReviewStepProps) {
  const { darkMode } = useTheme();

  const card = darkMode
    ? "bg-slate-900/60 border-slate-800"
    : "bg-white border-slate-200";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-8"
    >
      {/* Header */}

      <div className="text-center">
        <div
          className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl ${
            darkMode
              ? "bg-emerald-500/15"
              : "bg-emerald-100"
          }`}
        >
          <Sparkles
            size={34}
            className="text-emerald-500"
          />
        </div>

        <h2 className="text-3xl font-bold">
          Your Skyline is ready 
        </h2>

        <p
          className={`mt-3 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Review your personalized
          experience before we launch you
          into Skyline.
        </p>
      </div>

      {/* Profile Card */}

      <div
        className={`rounded-3xl border p-6 ${card}`}
      >
        <div className="flex items-center gap-5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-emerald-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-4 border-emerald-500 bg-gray-100 flex items-center justify-center">
              <User2 className="w-10 h-10 text-gray-500" />
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold">
              {fullName}
            </h3>

            <p className="text-emerald-500">
              @{username}
            </p>

            {bio && (
              <p
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Goals */}

        <div
          className={`rounded-3xl border p-5 ${card}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Compass
              className="text-emerald-500"
              size={20}
            />

            <h4 className="font-semibold">
              Your Goals
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => (
              <span
                key={goal}
                className="px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}

        <div
          className={`rounded-3xl border p-5 ${card}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart
              className="text-emerald-500"
              size={20}
            />

            <h4 className="font-semibold">
              Interests
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trip Style */}

      <div
        className={`rounded-3xl border p-6 ${card}`}
      >
        <h4 className="font-semibold mb-5">
          Travel Style
        </h4>

        <div className="grid sm:grid-cols-2 gap-5">

          <div>
            <p className="text-xs uppercase text-slate-400">
              Vibe
            </p>

            <p className="mt-1 font-medium">
              {vibe}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Duration
            </p>

            <p className="mt-1 font-medium">
              {duration}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Usually Exploring With
            </p>

            <p className="mt-1 font-medium">
              {social || "Solo"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Home City
            </p>

            <div className="flex items-center gap-2 mt-1">
              <MapPin
                size={16}
                className="text-emerald-500"
              />

              <span>{city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline Prediction */}

      <div
        className={`rounded-3xl border p-6 ${card}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2
            className="text-emerald-500"
            size={22}
          />

          <h4 className="font-semibold">
            What Skyline will personalize
          </h4>
        </div>

        <ul
          className={`space-y-3 text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          <li>
            ✓ Places matching your travel
            style.
          </li>

          <li>
            ✓ Hidden gems around{" "}
            <strong>{city}</strong>.
          </li>

          <li>
            ✓ Restaurants, viewpoints and
            experiences you'll probably
            love.
          </li>

          <li>
            ✓ Recommendations that improve
            as you use Skyline.
          </li>
        </ul>
      </div>

      {/* Footer */}

      <div
        className={`rounded-3xl border p-6 text-center ${
          darkMode
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-emerald-50 border-emerald-100"
        }`}
      >
        <h3 className="text-xl font-bold">
          Ready for takeoff? 
        </h3>

        <p
          className={`mt-2 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Click <strong>Finish</strong> and
          Skyline will build your personal
          travel experience instantly.
        </p>
      </div>
    </motion.div>
  );
}