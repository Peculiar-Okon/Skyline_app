import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
      isStrong: "weak",
    });
  const navigate = useNavigate();

    const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const length = newPassword.length >= 8;
    const uppercase = /[A-Z]/.test(newPassword);
    const lowercase = /[a-z]/.test(newPassword);
    const number = /[0-9]/.test(newPassword);
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      newPassword
    );

    const score = [length, uppercase, lowercase, number, specialChar].filter(
      (valid) => valid
    ).length;

    let isStrong = "weak";
    if (score >= 4) {
      isStrong = "strong";
    } else if (score >= 2) {
      isStrong = "medium";
    }

    setPasswordStrength({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
      isStrong,
    });
  };

    const getPasswordStrengthColor = () => {
    if (passwordStrength.isStrong === "strong") return "bg-emerald-500";
    if (passwordStrength.isStrong === "medium") return "bg-amber-500";
    if (passwordStrength.isStrong === "weak") return "bg-red-500";
    return "bg-slate-200";
  };

  const getPasswordStrengthWidth = () => {
    const score = [
      passwordStrength.length,
      passwordStrength.uppercase,
      passwordStrength.lowercase,
      passwordStrength.number,
      passwordStrength.specialChar,
    ].filter(Boolean).length;
    return `${(score / 5) * 100}%`;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
        if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength.isStrong !== "strong") {
      setError("Password is not strong enough.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-jade-600 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
           {/* Password */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              placeholder=" "
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <label
              htmlFor="password"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
            >
              Password
            </label>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2 space-y-2">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                  style={{ width: getPasswordStrengthWidth() }}
                ></div>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  {passwordStrength.length ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>At least 8 characters</span>
                </li>
                <li className="flex items-center gap-2">
                  {passwordStrength.uppercase ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>An uppercase letter (A-Z)</span>
                </li>
                <li className="flex items-center gap-2">
                  {passwordStrength.lowercase ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>A lowercase letter (a-z)</span>
                </li>
                <li className="flex items-center gap-2">
                  {passwordStrength.number ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>A number (0-9)</span>
                </li>
                <li className="flex items-center gap-2">
                  {passwordStrength.specialChar ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>A special character (!@#$%)</span>
                </li>
              </ul>
            </div>
          )}
          {/* Confirm Password */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm"
              className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              placeholder=" "
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <label
              htmlFor="confirm"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
            >
              Confirm Password
            </label>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
          </div>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-emerald-200 hover:bg-emerald-400 text-gray-700 font-semibold py-2 rounded-lg transition"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
