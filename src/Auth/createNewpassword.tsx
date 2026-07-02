
import React, { useState } from "react";
import {
  Compass,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/themeContext";
import { supabase } from "../Lib/Supabase";
import toast from "react-hot-toast";

export default function CreateNewPassword() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    passwordErrors,
    setPasswordErrors,
  ] = useState<string[]>([]);

  const [
    formSubmitted,
    setFormSubmitted,
  ] = useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const validatePassword = (
    password: string
  ) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push(
        "Must be at least 8 characters"
      );
    }

    if (!/[A-Z]/.test(password)) {
      errors.push(
        "Must contain an uppercase letter"
      );
    }

    if (!/[a-z]/.test(password)) {
      errors.push(
        "Must contain a lowercase letter"
      );
    }

    if (!/[0-9]/.test(password)) {
      errors.push(
        "Must contain a number"
      );
    }

    if (
      !/[!@#$%^&*(),.?":{}|<>]/.test(
        password
      )
    ) {
      errors.push(
        "Must contain a special character"
      );
    }

    return errors;
  };

  const handleUpdatePassword =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setFormSubmitted(true);

      const errors =
        validatePassword(
          password
        );

      setPasswordErrors(
        errors
      );

      if (
        errors.length > 0
      ) {
        toast.error(
          "Please meet password requirements."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match."
        );

        return;
      }

      try {
        setLoading(true);

        const { error } =
          await supabase.auth.updateUser(
            {
              password,
            }
          );

        if (error) {
          toast.error(
            error.message
          );

          return;
        }

        toast.success(
          "Password updated successfully."
        );

        navigate("/login");
      } catch (error) {
        console.error(error);

        toast.error(
          "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 border backdrop-blur-xl ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-slate-200 shadow-xl"
        }`}
      >
        <button
          onClick={() =>
            navigate(-1)
          }
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Compass />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center">
          Create New Password
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Your identity has been verified.
          Choose a strong new password.
        </p>

        <form
          onSubmit={
            handleUpdatePassword
          }
          className="mt-8 space-y-5"
        >
          {/* Password */}

          <div>
            <label className="text-sm font-medium text-slate-500 mb-2 block">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );

                  if (
                    formSubmitted
                  ) {
                    setPasswordErrors(
                      validatePassword(
                        e.target.value
                      )
                    );
                  }
                }}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200

                            ${
                            darkMode
                                ? "bg-slate-900/50 text-white"
                                : "bg-slate-50 text-slate-900"
                            }

                            ${
                            passwordErrors.length > 0 &&
                            formSubmitted
                                ? "border-red-500"
                                : darkMode
                                ? "border-slate-800"
                                : "border-slate-200"
                            }
                            `}
                // className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200
                // ${
                //   passwordErrors.length >
                //     0 &&
                //   formSubmitted
                //     ? "border-red-500"
                //     : darkMode
                //     ? "border-slate-800 bg-slate-900/50 text-white"
                //     : "border-slate-200 bg-slate-50 text-slate-900"
                // }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {passwordErrors.length >
              0 &&
            formSubmitted ? (
              <ul className="mt-2 text-xs text-red-500 space-y-1">
                {passwordErrors.map(
                  (error) => (
                    <li
                      key={error}
                    >
                      • {error}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-slate-400">
                Minimum 8 characters,
                uppercase, lowercase,
                number and special
                character.
              </p>
            )}
          </div>

          {/* Confirm Password */}

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
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200

                ${
                    darkMode
                        ? "bg-slate-900/50 text-white"
                        : "bg-slate-50 text-slate-900"
                    }

                    ${
                    formSubmitted &&
                    confirmPassword &&
                    password !== confirmPassword
                        ? "border-red-500"
                        : darkMode
                        ? "border-slate-800"
                        : "border-slate-200"
                    } `}
                        />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {formSubmitted &&
              confirmPassword &&
              password !==
                confirmPassword && (
                <p className="mt-2 text-xs text-red-500">
                  Passwords do not
                  match
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-200"
          >
            {loading
              ? "Updating..."
              : "Update Password"}

            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

