

// import React from "react";
// import { Link } from "react-router-dom";
// import { Compass, Mail, Lock, ArrowRight } from "lucide-react";
// import { useTheme } from "../Theme/themeContext";
// import { useState } from "react";
// import { supabase } from "../Lib/Supabase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { darkMode } = useTheme();
//   const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [loading, setLoading] = useState(false);
// const navigate = useNavigate();

// const handleLogin = async (
//   e: React.FormEvent
// ) => {
//   e.preventDefault();

//   try {
//     setLoading(true);

//     const { error } =
//       await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//     if (error) throw error;

//     navigate("/dashboard");

//   } catch (err: any) {
//     alert(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

// supabase.auth.onAuthStateChange(
//   (event, session) => {
//     console.log(event);
//     console.log(session);
//   }
// );

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../Theme/themeContext";
import { supabase } from "../Lib/Supabase";
import toast from "react-hot-toast";

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
  useState(false);

const [rememberMe, setRememberMe] =
  useState(false);

const [emailError, setEmailError] =
  useState(false);

const [passwordError, setPasswordError] =
  useState(false);

  useEffect(() => {
  const savedEmail =
    localStorage.getItem(
      "rememberedEmail"
    );

  if (savedEmail) {
    setEmail(savedEmail);
    setRememberMe(true);
  }
}, []);

const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setEmailError(false);
  setPasswordError(false);

  if (!email.trim()) {
    setEmailError(true);

    toast.error(
      "Email address is required"
    );

    return;
  }

  if (!password.trim()) {
    setPasswordError(true);

    toast.error(
      "Password is required"
    );

    return;
  }

  try {
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      toast.error(
        error.message
      );

      return;
    }

    if (rememberMe) {
      localStorage.setItem(
        "rememberedEmail",
        email
      );
    } else {
      localStorage.removeItem(
        "rememberedEmail"
      );
    }

    toast.success(
      "Welcome back!"
    );

    navigate("/dashboard");
  } catch (err: any) {
    console.error(err);

    toast.error(
      err?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);

  //     const { error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) throw error;

  //     navigate("/dashboard");
  //   } catch (err: any) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("SESSION:", session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  
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
        {/* Mobile Branding */}
        <div className="lg:hidden text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Compass className="text-white" />
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Skyline
          </h2>

          <p className="mt-2 text-slate-400">
            Discover your city differently.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold">
          Welcome Back
        </h2>

        <p className="text-slate-400 mt-2">
          Sign in to continue exploring.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              {/* <input
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
              /> */}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(
                    e.target.value
                  );

                  if (emailError) {
                    setEmailError(false);
                  }
                }}
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all duration-200
                ${
                  emailError
                    ? "border-red-500"
                    : darkMode
                    ? "border-slate-700"
                    : "border-slate-200"
                }
                ${
                  darkMode
                    ? "bg-slate-900/60 text-white placeholder:text-slate-500"
                    : "bg-slate-50 text-slate-900 placeholder:text-slate-400"
                }
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
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
            <label className="text-sm font-medium mb-2 block">
              Password
            </label>

            {/* <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
              />
            </div> */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );

                  if (passwordError) {
                    setPasswordError(false);
                  }
                }}
                placeholder="••••••••"
                className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200
                ${
                  passwordError
                    ? "border-red-500"
                    : darkMode
                    ? "border-slate-700"
                    : "border-slate-200"
                }
                ${
                  darkMode
                    ? "bg-slate-900/60 text-white placeholder:text-slate-500"
                    : "bg-slate-50 text-slate-900 placeholder:text-slate-400"
                }
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
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
          </div>
          {passwordError && (
            <p className="mt-2 text-xs text-red-500">
              Password is required
            </p>
          )}

          <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
              className="accent-emerald-500"
            />

            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-emerald-500 hover:text-emerald-400 transition"
          >
            Forgot Password?
          </Link>
        </div>

          {/* Forgot Password */}
          {/* <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-500 hover:text-emerald-400 transition"
            >
              Forgot Password?
            </Link>
          </div> */}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Sign In
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-500 hover:text-emerald-400 font-medium transition"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}