import { useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { Menu, X, Compass, Sun, Moon } from "lucide-react";
import { useTheme } from "../../Theme/themeContext.tsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-300
        ${
          darkMode
            ? "bg-slate-900/70 border-slate-700/40"
            : "bg-white/60 border-slate-200/60"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <Compass size={18} className="text-white" />
          </div>

          {/* Text */}
          <span
            className={`text-xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Skyline
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10 text-slate-600 font-medium">
          <Link
            className={`transition ${darkMode ? "text-slate-300" : "text-slate-600"} hover:text-emerald-400`}
            to="/features"
          >
            Features
          </Link>
          <Link
            className={`transition ${darkMode ? "text-slate-300" : "text-slate-600"} hover:text-emerald-400`}
            to="/pricing"
          >
            Pricing
          </Link>
          <Link
            className={`transition ${darkMode ? "text-slate-300" : "text-slate-600"} hover:text-emerald-400`}
            to="/about"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* CTA Button */}
          <Link
            to="/signup"
            className="hidden md:inline relative px-5 py-2.5 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-emerald-500 to-teal-500
                       shadow-md hover:shadow-2xl hover:scale-[1.02]
                       active:scale-[0.98] transition-all duration-200
                       overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>

            {/* subtle glow effect */}
            <span className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/10" />
          </Link>

          {/* Mobile menu button */}
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-slate-800 text-white" : "hover:bg-slate-100"
            }`}
          >
            {darkMode ? <Sun size={26} /> : <Moon size={26} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-slate-800 text-white" : "hover:bg-slate-100"
            }`}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div
          className={`md:hidden px-6 py-5 space-y-4 border-t shadow-md transition-all duration-200 ease-out
    ${
      darkMode
        ? "bg-slate-900 border-slate-700 text-slate-200"
        : "bg-white border-slate-200 text-slate-700"
    }`}
        >
          <Link
            onClick={() => setOpen(false)}
            className={`block transition ${darkMode ? "text-slate-200" : "text-slate-700"}`}
            to="/features"
          >
            Features
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className={`block transition ${darkMode ? "text-slate-200" : "text-slate-700"}`}
            to="/pricing"
          >
            Pricing
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className={`block transition ${darkMode ? "text-slate-200" : "text-slate-700"}`}
            to="/about"
          >
            About
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/signup"
            className="block text-center mt-2 px-4 py-2.5 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
