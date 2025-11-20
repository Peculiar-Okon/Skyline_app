


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";

function Signup() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [usernameAvailable, setUsernameAvailable] = useState(true);
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

  // const handleUsernameBlur = async () => {
  //   if (!username) return;
  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("username")
  //     .eq("username", username)
  //     .single();

  //   setUsernameAvailable(!data);
  // };

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength.isStrong !== "strong") {
      setError("Password is not strong enough.");
      return;
    }

    // if (!usernameAvailable) {
    //   setError("Username already taken, please choose another.");
    //   return;
    // }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/login",
          data: {
            username,
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      localStorage.setItem("pendingEmail", email);
      navigate("/verifyEmail");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/"
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
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

  return (
    <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-jade-600 mb-6">
          Welcome To Skyline!
        </h2>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Full Name */}
          <div className="relative group">
            <input
              type="text"
              id="fullName"
              className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              required
              placeholder=" "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label
              htmlFor="fullName"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
            >
              Full Name
            </label>
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
          </div>

          {/* Username */}
          {/* <div className="relative group">
            <input
              type="text"
              id="username"
              className={`peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 ${
                usernameAvailable ? "border-slate-200" : "border-red-400"
              } bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 ${
                usernameAvailable ? "focus:ring-emerald-500" : "focus:ring-red-500"
              } transition-all duration-300 placeholder-transparent`}
              placeholder=" "
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleUsernameBlur}
            />
            <label
              htmlFor="username"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
            >
              Username
            </label>
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
            {!usernameAvailable && (
              <p className="text-red-500 text-sm mt-1">
                Username already exists, try another.
              </p>
            )}
          </div> */}

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
              id="confirmPassword"
              className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label
              htmlFor="confirmPassword"
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

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.1-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.5 4 24 4 16.3 4 9.4 8.5 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.4 0 10.3-2.1 13.9-5.5l-6.4-5.4C29.6 34.1 26.9 35 24 35c-5.2 0-9.7-3.3-11.4-8.1l-6.5 5C9.4 39.3 16.1 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.3-3.7 6-7.1 7.1l6.4 5.4C38.6 37.1 44 31 44 24c0-1.3-.1-2.1-.4-3.5z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Sign Up Button */}
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
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-600 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import { Mail, User, Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

// function Signup() {
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//     isStrong: "weak",
//   });
//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     const length = newPassword.length >= 8;
//     const uppercase = /[A-Z]/.test(newPassword);
//     const lowercase = /[a-z]/.test(newPassword);
//     const number = /[0-9]/.test(newPassword);
//     const specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword);

//     const score = [length, uppercase, lowercase, number, specialChar].filter(Boolean).length;

//     let isStrong = "weak";
//     if (score >= 4) isStrong = "strong";
//     else if (score >= 2) isStrong = "medium";

//     setPasswordStrength({ length, uppercase, lowercase, number, specialChar, isStrong });
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength.isStrong === "strong") return "bg-emerald-500";
//     if (passwordStrength.isStrong === "medium") return "bg-amber-500";
//     return "bg-red-500";
//   };

//   const getPasswordStrengthWidth = () => {
//     const score = [
//       passwordStrength.length,
//       passwordStrength.uppercase,
//       passwordStrength.lowercase,
//       passwordStrength.number,
//       passwordStrength.specialChar,
//     ].filter(Boolean).length;
//     return `${(score / 5) * 100}%`;
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (passwordStrength.isStrong !== "strong") {
//       setError("Password is not strong enough");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data, error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (signUpError) {
//         setError(signUpError.message);
//         setLoading(false);
//         return;
//       }

//       const user = data.user;
//       if (user) {
//         await supabase.from("profiles").insert([
//           {
//             id: user.id,
//             username,
//             full_name: fullName,
//             onboarding_complete: false,
//           },
//         ]);

        
//       }localStorage.setItem("pendingEmail", email);
//       navigate("/verifyEmail");
//     } catch (err) {
//       setError("Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }



//   };
//       const handleGoogleSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: "http://localhost:3000/"
//         },
//       });
//       if (error) throw error;
//     } catch (err) {
//       setError(err.message || "Google sign-in failed.");
//     }
//   };



//   return (
//     <div className="mx-auto p-6 flex items-center justify-center min-h-screen 
//       bg-gradient-to-br from-emerald-100 via-gray-100 to-gray-200 
//       dark:from-[#0b1b17] dark:via-[#0f2023] dark:to-[#1a2b2e] 
//       transition-all duration-700 ease-in-out">

//       <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/60 
//         backdrop-blur-2xl rounded-2xl shadow-2xl p-8 
//         border border-slate-200 dark:border-gray-700
//         transition-all duration-500">

//         <h2 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-6 tracking-tight">
//           Welcome to Skyline
//         </h2>

//         <form onSubmit={handleSignup} className="space-y-6">
//           {/* Full Name */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="fullName"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <label
//               htmlFor="fullName"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Full Name
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Username */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="username"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <label
//               htmlFor="username"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Username
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Email */}
//           <div className="relative group">
//             <input
//               type="email"
//               id="email"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Email
//             </label>
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 -translate-y-1/2 
//               text-slate-400 dark:text-gray-500 hover:text-emerald-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Password Strength Indicator */}
//           {password && (
//             <div className="mt-2 space-y-2">
//               <div className="h-2 bg-slate-300 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
//                   style={{ width: getPasswordStrengthWidth() }}
//                 ></div>
//               </div>
//               <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
//                 <li className="flex items-center gap-2">
//                   {passwordStrength.length ? (
//                     <CheckCircle className="h-4 w-4 text-emerald-500" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-500" />
//                   )}
//                   <span>At least 8 characters</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   {passwordStrength.uppercase ? (
//                     <CheckCircle className="h-4 w-4 text-emerald-500" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-500" />
//                   )}
//                   <span>An uppercase letter (A–Z)</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   {passwordStrength.lowercase ? (
//                     <CheckCircle className="h-4 w-4 text-emerald-500" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-500" />
//                   )}
//                   <span>A lowercase letter (a–z)</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   {passwordStrength.number ? (
//                     <CheckCircle className="h-4 w-4 text-emerald-500" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-500" />
//                   )}
//                   <span>A number (0–9)</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   {passwordStrength.specialChar ? (
//                     <CheckCircle className="h-4 w-4 text-emerald-500" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-500" />
//                   )}
//                   <span>A special character (!@#$%)</span>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {/* Confirm Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Confirm Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 
//             text-red-700 dark:text-red-300 p-4 rounded-lg" role="alert">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Submit */}

//               <button
//       onClick={handleGoogleSignIn}
//       disabled={loading}
//       className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl
//       bg-white text-gray-800 font-semibold border border-gray-300
//       shadow-sm hover:shadow-md transition-all duration-300
//       hover:scale-[1.02] active:scale-[0.98]
//       dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700
//       dark:hover:bg-gray-800 dark:hover:shadow-emerald-500/20"
//     >
//       {loading ? "Signing in..." : "Sign in with Google"}
//     </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 
//             bg-gradient-to-r from-emerald-500 to-teal-600 
//             hover:from-emerald-600 hover:to-teal-700 
//             dark:from-emerald-600 dark:to-teal-700
//             text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//               </svg>
//             ) : (
//               "Sign Up"
//             )}
//           </button>

//         </form>

//         <p className="text-sm text-center mt-6 text-slate-600 dark:text-gray-400">
//           Already have an account?{" "}
//           <a href="/login" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//     isStrong: "weak",
//   });

//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     const length = newPassword.length >= 8;
//     const uppercase = /[A-Z]/.test(newPassword);
//     const lowercase = /[a-z]/.test(newPassword);
//     const number = /[0-9]/.test(newPassword);
//     const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
//       newPassword
//     );

//     const score = [length, uppercase, lowercase, number, specialChar].filter(
//       (valid) => valid
//     ).length;

//     let isStrong = "weak";
//     if (score >= 4) isStrong = "strong";
//     else if (score >= 2) isStrong = "medium";

//     setPasswordStrength({
//       length,
//       uppercase,
//       lowercase,
//       number,
//       specialChar,
//       isStrong,
//     });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (passwordStrength.isStrong !== "strong") {
//       setError("Password is not strong enough.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: "http://localhost:3000/login",
//           data: { username, full_name: fullName },
//         },
//       });

//       if (signUpError) {
//         setError(signUpError.message);
//         return;
//       }

//       localStorage.setItem("pendingEmail", email);
//       navigate("/verifyEmail");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: { redirectTo: "http://localhost:3000/" },
//       });
//       if (error) throw error;
//     } catch (err) {
//       setError(err.message || "Google sign-in failed.");
//     }
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength.isStrong === "strong") return "bg-emerald-500";
//     if (passwordStrength.isStrong === "medium") return "bg-amber-500";
//     if (passwordStrength.isStrong === "weak") return "bg-red-500";
//     return "bg-slate-200";
//   };

//   const getPasswordStrengthWidth = () => {
//     const score = [
//       passwordStrength.length,
//       passwordStrength.uppercase,
//       passwordStrength.lowercase,
//       passwordStrength.number,
//       passwordStrength.specialChar,
//     ].filter(Boolean).length;
//     return `${(score / 5) * 100}%`;
//   };

//   return (
//     <div
//       className="mx-auto p-6 flex items-center justify-center min-h-screen 
//       bg-gradient-to-br from-emerald-100 via-gray-100 to-gray-200 
//       dark:from-[#0b1b17] dark:via-[#0f2023] dark:to-[#1a2b2e]
//       transition-all duration-700 ease-in-out"
//     >
//       <div
//         className="w-full max-w-md bg-white/90 dark:bg-gray-900/60 
//         backdrop-blur-2xl rounded-2xl shadow-2xl p-8 
//         border border-slate-200 dark:border-gray-700
//         transition-all duration-500"
//       >
//         <h2 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-6 tracking-tight">
//           Welcome To Skyline!
//         </h2>

//         <form onSubmit={handleSignUp} className="space-y-6">
//           {/* Full Name */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="fullName"
//               className="peer w-full p-3 pl-10 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               required
//               placeholder=" "
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <label
//               htmlFor="fullName"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Full Name
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//             text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Email */}
//           <div className="relative group">
//             <input
//               type="email"
//               id="email"
//               className="peer w-full p-3 pl-10 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Email
//             </label>
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//             text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="peer w-full p-3 pl-10 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//             text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 -translate-y-1/2 
//               text-slate-400 dark:text-gray-500 hover:text-emerald-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               className="peer w-full p-3 pl-10 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Confirm Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//             text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {error && (
//             <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-md">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Google Sign In Button */}
//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 
//             text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 48 48"
//             >
//               <path
//                 fill="#FFC107"
//                 d="M43.6 20.5H42V20H24v8h11.3..."
//               />
//             </svg>
//             Sign in with Google
//           </button>

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 
//             text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
//               "Sign Up"
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6 text-slate-600 dark:text-gray-400">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
//           >
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// function Signup() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//     isStrong: "weak",
//   });

//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     const length = newPassword.length >= 8;
//     const uppercase = /[A-Z]/.test(newPassword);
//     const lowercase = /[a-z]/.test(newPassword);
//     const number = /[0-9]/.test(newPassword);
//     const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
//       newPassword
//     );

//     const score = [length, uppercase, lowercase, number, specialChar].filter(
//       Boolean
//     ).length;

//     let isStrong = "weak";
//     if (score >= 4) isStrong = "strong";
//     else if (score >= 2) isStrong = "medium";

//     setPasswordStrength({
//       length,
//       uppercase,
//       lowercase,
//       number,
//       specialChar,
//       isStrong,
//     });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (passwordStrength.isStrong !== "strong") {
//       setError("Password is not strong enough.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: "http://localhost:3000/login",
//           data: { full_name: fullName },
//         },
//       });

//       if (signUpError) {
//         setError(signUpError.message);
//         return;
//       }

//       localStorage.setItem("pendingEmail", email);
//       navigate("/verifyEmail");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength.isStrong === "strong") return "bg-emerald-500";
//     if (passwordStrength.isStrong === "medium") return "bg-amber-500";
//     if (passwordStrength.isStrong === "weak") return "bg-red-500";
//     return "bg-slate-200";
//   };

//   const getPasswordStrengthWidth = () => {
//     const score = [
//       passwordStrength.length,
//       passwordStrength.uppercase,
//       passwordStrength.lowercase,
//       passwordStrength.number,
//       passwordStrength.specialChar,
//     ].filter(Boolean).length;
//     return `${(score / 5) * 100}%`;
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-all duration-500">
//       <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 p-8">
//         <h2 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-6">
//           Welcome to Skyline ✨
//         </h2>

//         <form onSubmit={handleSignUp} className="space-y-6">
//           {/* Full Name */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="fullName"
//               required
//               placeholder=" "
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//             />
//             <label
//               htmlFor="fullName"
//               className="absolute left-[40px] top-[17px] text-sm text-slate-400 dark:text-gray-400 transition-all duration-300 transform origin-left peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:-translate-y-3 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Full Name
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Email */}
//           <div className="relative group">
//             <input
//               type="email"
//               id="email"
//               required
//               placeholder=" "
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-[40px] top-[17px] text-sm text-slate-400 dark:text-gray-400 transition-all duration-300 transform origin-left peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:-translate-y-3 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Email
//             </label>
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               required
//               placeholder=" "
//               value={password}
//               onChange={handlePasswordChange}
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-[40px] top-[17px] text-sm text-slate-400 dark:text-gray-400 transition-all duration-300 transform origin-left peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:-translate-y-3 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-emerald-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* Password Strength */}
//           {password && (
//             <div className="mt-2 space-y-2">
//               <div className="h-2 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
//                   style={{ width: getPasswordStrengthWidth() }}
//                 ></div>
//               </div>
//             </div>
//           )}

//           {/* Confirm Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               required
//               placeholder=" "
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="absolute left-[40px] top-[17px] text-sm text-slate-400 dark:text-gray-400 transition-all duration-300 transform origin-left peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-focus:-translate-y-3 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Confirm Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {error && (
//             <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-50"
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6 text-slate-600 dark:text-gray-400">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
//           >
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;



