import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { useTheme } from "../Theme/themeContext";

export default function EmailVerified() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 relative overflow-hidden ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[140px] rounded-full top-0 left-0" />
      <div className="absolute w-[450px] h-[450px] bg-teal-500/20 blur-[140px] rounded-full bottom-0 right-0" />

      <div
        className={`relative z-10 w-full max-w-lg rounded-3xl p-10 border backdrop-blur-xl text-center ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-slate-200 shadow-xl"
        }`}
      >
        {/* Skyline Logo */}
        {/* <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Compass className="text-white" size={28} />
          </div>
        </div> */}

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full" />

            <CheckCircle2
              size={90}
              className="relative text-emerald-500"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold">
          Email Verified 
        </h1>

        <p
          className={`mt-4 text-lg ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Your Skyline account is ready.
        </p>

        <p
          className={`mt-3 text-sm leading-relaxed max-w-md mx-auto ${
            darkMode
              ? "text-slate-500"
              : "text-slate-500"
          }`}
        >
          You're all set to discover hidden gems,
          breathtaking locations, unforgettable
          experiences, and the best your city has
          to offer.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div
            className={`rounded-2xl p-4 border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="font-bold text-xl">
              100+
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Locations
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="font-bold text-xl">
              50+
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Events
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="font-bold text-xl">
              ∞
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Memories
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200"
        >
          Continue to Login
          <ArrowRight size={18} />
        </button>

        <p className="mt-5 text-xs text-slate-500">
          Welcome to Skyline.
        </p>
      </div>
    </div>
  );
}