import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../Theme/themeContext";
import { supabase } from "../Lib/Supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [nameError, setNameError] = useState(false);

  const [emailError, setEmailError] = useState(false);

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [termsError, setTermsError] = useState(false);

  const validatePassword = (password: string) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Must contain an uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Must contain a lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must contain a number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Must contain a special character");
    }

    return errors;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setConfirmPasswordError(false);
    setTermsError(false);

    if (!name.trim()) {
      setNameError(true);

      toast.error("Full name is required");

      return;
    }

    if (!email.trim()) {
      setEmailError(true);

      toast.error("Email address is required");

      return;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError(true);

      toast.error("Please confirm your password");

      return;
    }

    setFormSubmitted(true);

    const errors = validatePassword(password);

    setPasswordErrors(errors);

    if (errors.length > 0) {
      toast.error("Please fix the password requirements.");

      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);

      toast.error("Passwords do not match");

      return;
    }

    if (!acceptedTerms) {
      setTermsError(true);

      toast.error("Please accept the Terms and Conditions");

      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName: name,
          },
        },
      });
      console.log("DATA:", data);
      console.log("ERROR:", error);

      // if (error) throw error;
      if (error) {
        console.error(error);

        toast.error(error.message);

        return;
      }

      // Supabase decides success, not your imagination
      if (data?.user) {
        toast.success("Account created successfully!");
        navigate("/verify-email", {
          state: { email },
        });
      }
    } catch (err: any) {
      console.error(err);

      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center px-12">
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full top-10 left-10" />
        <div className="absolute w-[400px] h-[400px] bg-teal-400/20 blur-[120px] rounded-full bottom-0 right-0" />

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <Compass />
            </div>

            <span className="text-2xl font-bold">Skyline</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Discover your city differently.
          </h1>

          <p className="mt-6 text-slate-400 text-lg">
            Explore hidden gems, scenic locations, local experiences, and
            unforgettable places curated for explorers.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              "Hidden Gems",
              "Events Near You",
              "Curated Routes",
              "Local Favorites",
            ].map((item) => (
              <div
                key={item}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className={`w-full max-w-md rounded-3xl p-8 border backdrop-blur-xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-slate-200 shadow-xl"
          }`}
        >
          {/* Mobile Branding */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <Compass />
            </div>

            <h2 className="mt-4 text-2xl font-bold">Skyline</h2>

            <p className="mt-2 text-slate-400">
              Discover your city differently.
            </p>
          </div>

          <h2 className="text-3xl font-bold">Create Account</h2>

          <p className="text-slate-400 mt-2">Start exploring with Skyline.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSignup}>
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-slate-500 mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    if (nameError) {
                      setNameError(false);
                    }
                  }}
                  type="text"
                  placeholder="Pearl Johnson"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-200 border
${
  nameError
    ? "border-red-500"
    : darkMode
      ? "border-slate-800"
      : "border-slate-200"
}
${
  darkMode
    ? "bg-slate-900/50 text-white placeholder:text-slate-500"
    : "bg-slate-50 text-slate-900 placeholder:text-slate-400"
}
focus:outline-none
focus:border-emerald-500
focus:ring-4
focus:ring-emerald-500/10`}
                />
              </div>
            </div>
            {nameError && (
              <p className="mt-2 text-xs text-red-500">Full name is required</p>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-500 mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (emailError) {
                      setEmailError(false);
                    }
                  }}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-200 border
${
  emailError
    ? "border-red-500"
    : darkMode
      ? "border-slate-800"
      : "border-slate-200"
}
${
  darkMode
    ? "bg-slate-900/50 text-white placeholder:text-slate-500"
    : "bg-slate-50 text-slate-900 placeholder:text-slate-400"
}
focus:outline-none
focus:border-emerald-500
focus:ring-4
focus:ring-emerald-500/10`}
                />
              </div>
            </div>
            {emailError && (
              <p className="mt-2 text-xs text-red-500">
                Email address is required
              </p>
            )}

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-500 mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (formSubmitted) {
                      setPasswordErrors(validatePassword(e.target.value));
                    }
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl transition-all duration-200
      ${
        passwordErrors.length > 0 && formSubmitted
          ? "border-red-500"
          : darkMode
            ? "border-slate-800"
            : "border-slate-200"
      }
      ${darkMode ? "bg-slate-900/50 text-white" : "bg-slate-50 text-slate-900"}
      border
      focus:outline-none
      focus:ring-4
      focus:ring-emerald-500/10
      focus:border-emerald-500`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {passwordErrors.length > 0 && formSubmitted ? (
                <ul className="mt-2 text-xs text-red-500 space-y-1">
                  {passwordErrors.map((error) => (
                    <li key={error}>• {error}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-slate-400">
                  Minimum 8 characters, uppercase, lowercase, number and special
                  character.
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-500 mb-2 block">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (confirmPasswordError) {
                      setConfirmPasswordError(false);
                    }
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200
      ${
        confirmPasswordError
          ? "border-red-500"
          : darkMode
            ? "border-slate-800 bg-slate-900/50 text-white"
            : "border-slate-200 bg-slate-50 text-slate-900"
      }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {confirmPasswordError && (
                <p className="mt-2 text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* <div className="flex items-start gap-3"> */}
            <div
              className={`flex items-start gap-3 rounded-lg p-2 transition
  ${termsError ? "border border-red-500" : ""}`}
            >
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);

                  if (termsError) {
                    setTermsError(false);
                  }
                }}
                className="mt-1 accent-emerald-500"
              />

              <p className="text-sm text-slate-400">
                I agree to the{" "}
                <span className="text-emerald-400 cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-emerald-400 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {termsError && (
              <p className="text-xs text-red-500 mt-1">
                You must accept the Terms & Conditions
              </p>
            )}

            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {/* Create Account */}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center mt-6 text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
