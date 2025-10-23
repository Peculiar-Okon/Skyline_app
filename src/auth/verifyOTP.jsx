

// export default VerifyOTP;

// import React, { useEffect, useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";

// function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Helper: get email from localStorage
//   const getPendingEmail = () => {
//     return localStorage.getItem("pendingEmail") || "";
//   };

//   useEffect(() => {
//     const email = getPendingEmail();
//     if (!email) {
//       setError("No email found. Please request reset again.");
//     }
//   }, []);

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       setError("");

//       // Auto-focus next input
//       if (value && index < otp.length - 1) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     const email = getPendingEmail();

//     if (otpCode.length !== 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     if (!email) {
//       setError("No email found. Please request reset again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const { error: otpError } = await supabase.auth.verifyOtp({
//         email,
//         token: otpCode,
//         type: "recovery", // <-- use "signup" for signup verification, "recovery" for forgot password flow
//       });

//       if (otpError) throw otpError;

//       // ✅ Success → clear and redirect to reset password
//       localStorage.removeItem("pendingEmail");
//       navigate("/reset-password");
//     } catch (err) {
//       setError(err.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setError("");
//     const email = getPendingEmail();

//     if (!email) {
//       setError("No email found. Please request reset again.");
//       return;
//     }

//     try {
//       const { error } = await supabase.auth.resend({
//         type: "recovery", // <-- "signup" if verifying signup
//         email,
//         options: { emailRedirectTo: window.location.origin + "/reset-password" },
//       });

//       if (error) throw error;

//       alert("Verification code resent to " + email);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify OTP
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           Enter the 6-digit code we sent to your email to continue.
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col items-center">
//           <div className="flex space-x-3 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 value={digit}
//                 maxLength="1"
//                 onChange={(e) => handleChange(e.target.value, index)}
//                 className="w-12 h-12 text-center text-lg border border-slate-300 rounded-lg focus:border-emerald-500 outline-none"
//               />
//             ))}
//           </div>

//           {error && <p className="text-red-500 mb-4">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8H4z"
//                 ></path>
//               </svg>
//             ) : (
//               "Verify"
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center text-slate-500 mt-4">
//           Didn’t get the code?{" "}
//           <button
//             type="button"
//             onClick={handleResend}
//             className="text-emerald-500 hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default VerifyOtp;


// import React, { useState } from "react";
// import { supabase } from "../services/supabaseClient";
// import { useNavigate } from "react-router-dom";

// function VerifyOTP() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const email = localStorage.getItem("resetEmail");
//   const navigate = useNavigate();

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       setError(""); // clear error when typing

//       // Auto-focus next field
//       if (value && index < otp.length - 1) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");

//     if (otpCode.length !== 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     if (!email) {
//       setError("No email found. Please restart reset process.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const { error } = await supabase.auth.verifyOtp({
//         email,
//         token: otpCode,
//         type: "email_change", // or "email" depending on config
//       });

//       if (error) throw error;

//       navigate("/resetpswd");
//     } catch (err) {
//       setError(err.message || "Invalid OTP code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setError("");

//     if (!email) {
//       setError("No email found. Please restart reset process.");
//       return;
//     }

//     try {
//       const { error } = await supabase.auth.resend({
//         type: "email_change", // or "email"
//         email,
//         options: { emailRedirectTo: window.location.origin + "/resetpswd" },
//       });

//       if (error) throw error;

//       alert("Verification code resent to " + email);
//     } catch (err) {
//       setError(err.message || "Failed to resend code.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify OTP
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           We’ve sent a 6-digit code to your email. Please enter it below to continue.
//         </p>

//         <form onSubmit={handleVerify} className="flex flex-col items-center">
//           <div className="flex space-x-3 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 value={digit}
//                 maxLength="1"
//                 onChange={(e) => handleChange(e.target.value, index)}
//                 className="w-12 h-12 text-center text-lg border border-slate-300 rounded-lg focus:border-emerald-500 outline-none"
//               />
//             ))}
//           </div>

//           {error && <p className="text-red-500 mb-4">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8H4z"
//                 ></path>
//               </svg>
//             ) : (
//               "Verify"
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center text-slate-500 mt-4">
//           Didn’t get the code?{" "}
//           <button
//             type="button"
//             onClick={handleResend}
//             className="text-emerald-500 hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default VerifyOTP;

import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = localStorage.getItem("resetEmail"); // must be set in ForgotPassword.jsx
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      // Auto-focus next field
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    if (!email) {
      setError("No email found. Please restart reset process.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "recovery", // ✅ correct type for password reset
      });

      if (error) throw error;

      navigate("/resetpswd"); // go to reset password page
    } catch (err) {
      setError(err.message || "Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setError("");

    if (!email) {
      setError("No email found. Please restart reset process.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/resetpswd",
      });

      if (error) throw error;

      alert("A new reset code has been sent to " + email);
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
          Verify OTP
        </h2>
        <p className="text-center text-slate-600 mb-6">
          We’ve sent a 6-digit code to your email. Please enter it below to continue.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <div className="flex space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-lg border border-slate-300 rounded-lg focus:border-emerald-500 outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
              "Verify"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-4">
          Didn’t get the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-emerald-500 hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;



