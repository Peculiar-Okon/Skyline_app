import { motion } from "framer-motion";
import { useTheme } from "../../Theme/themeContext";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  title,
  subtitle,
}: ProgressBarProps) {
  const { darkMode } = useTheme();

  const progress =
    ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-10">

      {/* Step Number */}

      <div className="flex items-center justify-between mb-3">

        <div>

          <p
            className={`text-sm font-medium ${
              darkMode
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            Step {currentStep + 1} of {totalSteps}
          </p>

          <h1
            className={`text-3xl font-bold mt-1 ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-2 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`text-sm font-semibold ${
            darkMode
              ? "text-emerald-400"
              : "text-emerald-600"
          }`}
        >
          {Math.round(progress)}%
        </div>
      </div>

      {/* Progress Track */}

      <div
        className={`relative h-2 rounded-full overflow-hidden ${
          darkMode
            ? "bg-slate-800"
            : "bg-slate-200"
        }`}
      >
        <motion.div
          initial={false}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
        />
      </div>
    </div>
  );
}