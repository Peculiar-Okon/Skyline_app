import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Mail,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../Theme/themeContext";
import { supabase } from "../Lib/Supabase";
import toast from "react-hot-toast";

export default function VerifyResetOTP() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem(
      "resetEmail"
    ) ||
    "";

  const [otp, setOtp] =
    useState(
      new Array(6).fill("")
    );

  const [loading, setLoading] =
    useState(false);

  const [resendTimer, setResendTimer] =
    useState(30);

  const inputsRef =
    useRef<
      (HTMLInputElement | null)[]
    >([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setTimeout(
      () =>
        setResendTimer(
          (prev) => prev - 1
        ),
      1000
    );

    return () =>
      clearTimeout(timer);
  }, [resendTimer]);

  const verifyOtp = async () => {
    const code =
      otp.join("");

    if (
      code.length !== 6
    ) {
      toast.error(
        "Enter all six digits"
      );
      return;
    }

    setLoading(true);

    const {
      error,
    } =
      await supabase.auth.verifyOtp(
        {
          email,
          token: code,
          type: "recovery",
        }
      );

    setLoading(false);

    if (error) {
      toast.error(
        error.message
      );
      return;
    }

    toast.success(
      "Verification successful."
    );

    navigate(
      "/create-new-password"
    );
  };

  const resendCode =
    async () => {
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email
        );

      if (error) {
        toast.error(
          error.message
        );
        return;
      }

      toast.success(
        "Code resent."
      );

      setResendTimer(
        30
      );
    };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-50 text-slate-900"
    }`}>
      <div className={`w-full max-w-md rounded-3xl p-8 border ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-slate-200 shadow-xl"
      }`}>
        <button
          onClick={() =>
            navigate(-1)
          }
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18}/>
          Back
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Mail />
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold">
          Verify Reset Code
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Sent to {email}
        </p>

        <div className="flex justify-center gap-2 mt-8">
          {otp.map(
            (
              digit,
              index
            ) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[
                    index
                  ] = el;
                }}
                value={digit}
                onChange={(e) => {
                  const value =
                    e.target.value;

                  if (
                    !/^\d*$/.test(
                      value
                    )
                  )
                    return;

                  const updated =
                    [...otp];

                  updated[
                    index
                  ] =
                    value.slice(
                      -1
                    );

                  setOtp(
                    updated
                  );

                  if (
                    value &&
                    index < 5
                  ) {
                    inputsRef.current[
                      index + 1
                    ]?.focus();
                  }
                }}
                maxLength={1}
                // className="w-12 h-14 text-center rounded-xl border"
                className={`w-12 h-14 text-center font-semibold rounded-xl border transition-all duration-200
                    ${
                    darkMode
                        ? "bg-slate-900/60 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500/20
                    focus:border-emerald-500`}
              />
            )
          )}
        </div>

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
        >
          {loading
            ? "Verifying..."
            : "Verify Code"}
        </button>

        <div className="text-center mt-6 text-sm">
          {resendTimer > 0 ? (
            <span>
              Resend in{" "}
              {resendTimer}s
            </span>
          ) : (
            <button
              onClick={
                resendCode
              }
              className="text-emerald-500"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}