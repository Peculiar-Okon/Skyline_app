import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("resetEmail", email);
    navigate("/verifyOTP");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-jade-600 mb-6">
          Forgot Password?
        </h2>
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="relative">
                      {/* Email */}
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
                          placeholder=" "
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          htmlFor="email"
                          className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
                        >
                          Email
                        </label>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
                      </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
                "Verify OTP")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
