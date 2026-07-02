import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../Theme/themeContext";

interface NavigationProps {
  step: number;
  totalSteps: number;

  canProceed: boolean;
  loading?: boolean;

  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export default function Navigation({
  step,
  totalSteps,
  canProceed,
  loading = false,
  onBack,
  onNext,
  onSkip,
  onFinish,
}: NavigationProps) {
  const { darkMode } = useTheme();

  const isLastStep = step === totalSteps - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-10 flex items-center justify-between"
    >
      {/* Left */}

      <div>
        {step > 0 ? (
          <button
            onClick={onBack}
            disabled={loading}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 border transition ${
              darkMode
                ? "border-slate-700 bg-slate-900/40 hover:bg-slate-800 text-white"
                : "border-slate-200 bg-white hover:bg-slate-100 text-slate-800"
            }`}
          >
            <ArrowLeft size={18} />

            Back
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {!isLastStep && (
          <button
            onClick={onSkip}
            disabled={loading}
            className={`px-4 py-3 rounded-xl transition ${
              darkMode
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Skip
          </button>
        )}

        {!isLastStep ? (
          <button
            onClick={onNext}
            disabled={!canProceed || loading}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
              canProceed && !loading
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20"
                : darkMode
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Next"}

            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={onFinish}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-7 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            {loading ? "Finishing..." : "Finish"}

            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}