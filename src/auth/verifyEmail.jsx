// import react from "react";
// import '../styles/index.css';
// import { useState } from "react";

// function VerifyEmail() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next field if not last
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     console.log("OTP entered:", otpCode);
//     // Send to backend for verification here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify Your Email
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
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

//           <button
//             type="submit"
//             className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
//           >
//             Verify
//           </button>
//         </form>

//         <p className="text-sm text-center text-slate-500 mt-4">
//           Didn’t get the code?{" "}
//           <button className="text-emerald-500 hover:underline">Resend</button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;

// import React, { useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";

// function VerifyEmail() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next field if not last
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");

//     if (otpCode.length !== 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // Replace with your backend OTP verification endpoint
//       const res = await fetch("/api/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp: otpCode }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "OTP verification failed");
//       }

//       // ✅ If OTP is valid, redirect to login
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setError("");
//     try {
//       const res = await fetch("/api/resend-otp", {
//         method: "POST",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to resend OTP. Try again.");
//       }

//       alert("OTP resent to your email.");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify Your Email
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
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
//             className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
//           >
//             {loading ? "Verifying..." : "Verify"}
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

// export default VerifyEmail;


// import React, { useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient"; // ✅ import your Supabase client

// function VerifyEmail() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next field if not last
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     const email = localStorage.getItem("pendingEmail"); // ✅ retrieve stored email from signup

//     if (otpCode.length !== 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     if (!email) {
//       setError("No email found. Please sign up again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const { data, error: otpError } = await supabase.auth.verifyOtp({
//         email,
//         token: otpCode,
//         type: "email", // 'email' works for signup OTP in Supabase v2
//       });

//       if (otpError) throw otpError;

//       // ✅ Successfully verified, user is logged in
//       navigate("/login");
//     } catch (err) {
//       setError(err.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setError("");
//     const email = localStorage.getItem("pendingEmail");

//     if (!email) {
//       setError("No email found. Please sign up again.");
//       return;
//     }

//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email,
//          emailRedirectTo: null,
//         options: { shouldCreateUser: false }, // don't create new account
//       });

//       if (error) throw error;

//       alert("OTP resent to your email.");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify Your Email
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
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
//             className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
//           >
//             {loading ? "Verifying..." : "Verify"}
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

// export default VerifyEmail;




// import React, { useEffect, useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient"; // ✅ import your Supabase client

// function VerifyEmail() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//    // Helper: get email safely (session first, then localStorage)
//   const getPendingEmail = async () => {
//     try {
//       const { data: { user }, error: userErr } = await supabase.auth.getUser();
//       if (!userErr && user?.email) return user.email;
//     } catch {}
//     return localStorage.getItem("pendingEmail") || "";
//   };

//   // Optional: sync session email into localStorage to keep it fresh
//   useEffect(() => {
//     (async () => {
//       const email = await getPendingEmail();
//       if (email) localStorage.setItem("pendingEmail", email);
//     })();
//   }, []);

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next field if not last
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     const email = localStorage.getItem("pendingEmail"); // ✅ retrieve stored email from signup

//     if (otpCode.length !== 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     if (!email) {
//       setError("No email found. Please sign up again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const { error: otpError } = await supabase.auth.verifyOtp({
//         email,
//         token: otpCode,
//         type: "signup", // ✅ must be "signup" for email verification OTP
//       });

//       if (otpError) throw otpError;

//       // ✅ Successfully verified, redirect
//       navigate("/login");
//     } catch (err) {
//       setError(err.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setError("");
//     const email = localStorage.getItem("pendingEmail");

//     if (!email) {
//       setError("No email found. Please sign up again.");
//       return;
//     }

//     try {
//       const { error } = await supabase.auth.resend({
//         type: "signup", // ✅ correct resend type
//         email,
//         options: { emailRedirectTo: window.location.origin + "/login" },
//       });

//       if (error) throw error;

//       alert("Verification email resent to " + email);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
//           Verify Your Email
//         </h2>
//         <p className="text-center text-slate-600 mb-6">
//           We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
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
//             className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
//           >
//             {loading ? "Verifying..." : "Verify"}
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

// export default VerifyEmail;


import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Helper: get email from localStorage
  const getPendingEmail = () => {
    return localStorage.getItem("pendingEmail") || "";
  };

  useEffect(() => {
    const email = getPendingEmail();
    if (!email) {
      setError("No email found. Please sign up again.");
    }
  }, []);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(""); // clear error on input

      // Auto-focus next field if not last
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    const email = getPendingEmail();

    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    if (!email) {
      setError("No email found. Please sign up again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: otpError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "signup",
      });

      if (otpError) throw otpError;

      // Success → cleanup + redirect
      localStorage.removeItem("pendingEmail");
      navigate("/onboarding");
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    const email = getPendingEmail();

    if (!email) {
      setError("No email found. Please sign up again.");
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: window.location.origin + "/login" },
      });

      if (error) throw error;

      alert("Verification email resent to " + email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-slate-600 mb-6">
          We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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

export default VerifyEmail;






