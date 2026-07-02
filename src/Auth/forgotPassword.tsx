import React, { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/themeContext";
import { supabase } from "../Lib/Supabase";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (
    e: React.FormEvent
  ) => {
    console.log("Reset password clicked");
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Enter your email address");
      return;
    }

    try {
      setLoading(true);
        console.log(email);
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
              {
      redirectTo:
        "http://localhost:5173/reset-password",
                }
        );

//         console.log("DATA:", data);
// console.log("ERROR:", error);

      if (error) {
        toast.error(error.message);
        return;
      }

      localStorage.setItem(
        "resetEmail",
        email
      );

      toast.success(
        "Verification code sent."
      );

      navigate(
        "/reset-password-verify",
        {
          state: { email },
        }
      );
    } catch (err) {
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
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 mb-6"
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
          Forgot Password
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Enter your email and we'll send a secure
          verification code.
        </p>

        <form
          onSubmit={handleSendCode}
          className="mt-8"
        >
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-11 py-3 rounded-xl border ${
                darkMode
                  ? "bg-slate-900/60 border-slate-700"
                  : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center gap-2"
          >
            {loading
              ? "Sending..."
              : "Send Code"}

            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}