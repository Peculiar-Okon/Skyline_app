import React, { useRef, useState } from "react";
import { useTheme } from "../Theme/themeContext";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../Lib/Supabase";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("pendingEmail") || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

useEffect(() => {
  inputsRef.current[0]?.focus();
}, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

useEffect(() => {
  if (resendTimer <= 0) return;

  const timer = setInterval(() => {
    setResendTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [resendTimer]);

const handleResend = async () => {
  const { error } =
    await supabase.auth.resend({
      type: "signup",
      email,
    });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success(
    "Verification code sent again"
  );

  setResendTimer(60);
};

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (paste.some((v) => isNaN(Number(v)))) return;

    setOtp(paste.concat(new Array(6 - paste.length).fill("")));
  };

  const handleEnter = (
  e: React.KeyboardEvent
) => {
  if (e.key === "Enter") {
    verifyOtp();
  }
};

  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Enter full verification code");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    setLoading(false);

    if (error) {
      // setError(error.message || "Verification failed");
      toast.error(
        error.message ||
        "Verification failed"
      );
      return;
    }

    // success → redirect into app
    localStorage.removeItem("pendingEmail");
    toast.success(
      "Email verified successfully!"
    );
    navigate("/onboarding", {
      state: { email },
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 border backdrop-blur-xl shadow-xl ${
          darkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
        }`}
      >
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Mail className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center">
          Verify your email
        </h2>

        {/* <p className="text-center text-slate-400 mt-2 text-sm">
          Enter the 6-digit code sent to {email}
        </p> */}

        <p className="text-center text-slate-400 mt-2 text-sm">
          We've sent a verification code to
        </p>

        <div
          className={`mt-4 rounded-xl p-3 text-center border ${
            darkMode
              ? "bg-slate-900/50 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <span className="font-medium">
            {email}
          </span>
        </div>

        {/* OTP */}
        <div className="flex justify-center gap-2 mt-8" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
            //   ref={(el) => (inputsRef.current[i] = el)}
            ref={(el) => {
                inputsRef.current[i] = el;
                }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              // onKeyDown={(e) => handleKeyDown(e, i)}
              onKeyDown={(e) => {
                handleKeyDown(e, i);
                handleEnter(e);
              }}
              maxLength={1}
              inputMode="numeric"
              className={`w-11 h-14 text-center font-semibold rounded-xl border transition
                ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-700 text-white"
                    : "bg-white border-slate-300"
                }
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
            />
          ))}
        </div>

        {/* error */}
        {error && (
          <p className="text-red-400 text-sm text-center mt-4">{error}</p>
        )}

        {/* button */}
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Verifying...
          </>: "Verify Account"}
          <ArrowRight size={18} />
        </button>

        <div className="mt-6 text-center">
  {resendTimer > 0 ? (
    <p className="text-sm text-slate-400">
      Resend code in {resendTimer}s
    </p>
  ) : (
    <button
      onClick={handleResend}
      className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
    >
      Resend code
    </button>
  )}
</div>

      </div>
    </div>
  );
}

