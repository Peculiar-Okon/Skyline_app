// import React, { useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (password !== confirmPassword) {
//     setError("Passwords do not match");
//     return;
//   }

//   setLoading(true);

//   try {
//     // 1️⃣ Send OTP & create account if new
//     const { error: otpError } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         shouldCreateUser: true,
//          emailRedirectTo: null,
//         data: { username, fullName, password }, // store password in metadata if you want to set later
//       },
//     });

//     if (otpError) {
//       setError(otpError.message);
//       return;
//     }

//     // Save email for OTP verification page
//     localStorage.setItem("pendingEmail", email);

//     // Redirect to OTP verification page
//     navigate("/verifyEmail");

//   } catch (err) {
//     setError("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//     return (
//         <>
//     <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 px-4">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-jade-600 mb-6">
//           Welcome To Skyline!
//         </h2>

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Full Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               required
//               placeholder="John Doe"
//                value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>

//              <div>
//             <label className="block text-sm text-jade-600 mb-1">Username</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="Username"
//               required
//                  value={username}
//           onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="you@example.com"
//               required
//                    value={email}
//           onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="••••••••"
//               required
//                 value={password}
//           onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="••••••••"
//               required
//                value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>

//           {error && <p className="text-red-500">{error}</p>}

//           <button
//   type="button"
//   className="w-full flex items-center justify-center gap-2 bg-emerald-200 rounded-lg py-2 px-4 hover:bg-emerald-400 transition duration-300"
  
// >
//   <svg
//     className="w-5 h-5"
//     viewBox="0 0 533.5 544.3"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.7c-6.3 34.2-25.2 63.2-53.7 82.7v68h86.8c50.8-46.8 81.7-115.8 81.7-195.6z"
//       fill="#4285F4"
//     />
//     <path
//       d="M272 544.3c72.6 0 133.6-24.1 178.1-65.2l-86.8-68c-24.1 16.2-55 25.6-91.3 25.6-70.2 0-129.7-47.4-151-111.1h-89.6v69.9C84.9 475.7 172.8 544.3 272 544.3z"
//       fill="#34A853"
//     />
//     <path
//       d="M121 325.6c-5.7-16.8-9-34.8-9-53.2s3.2-36.4 9-53.2v-70H31.3C11.3 182.7 0 225.4 0 272.4s11.3 89.7 31.3 123.2l89.7-70z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M272 107.7c39.5 0 75 13.6 102.9 40.3l77.4-77.4C405.6 26.3 344.6 0 272 0 172.8 0 84.9 68.6 31.3 179.2l89.7 69.9C142.3 155.1 201.8 107.7 272 107.7z"
//       fill="#EA4335"
//     />
//   </svg>
//   <span className="text-gray-700 font-medium">Sign up with Google</span>
// </button>


//           <button
//           disabled={loading}
//             type="submit"
//             className="w-full bg-emerald-200 hover:bg-emerald-400 text-gray-500 font-semibold py-2 rounded-lg transition duration-300"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4 text-slate-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-jade-600 hover:underline">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//     </>
//   );
// }

    


// export default Signup;

// import React, { useState } from "react";
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1️⃣ Create user in Supabase (email + password)
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: "http://localhost:3000/login",
//           data: {
//             username,
//             full_name: fullName,
//           },
//         },
//       });

//       if (signUpError) {
//         setError(signUpError.message);
//         return;
//       }

      
//     // ✅ Save email in localStorage before redirect
//     localStorage.setItem("pendingEmail", email);

//       // 2️⃣ Redirect to login (or verification page if confirm email is enabled)
//       navigate("/verifyEmail");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 px-4">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-jade-600 mb-6">
//           Welcome To Skyline!
//         </h2>

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Full Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               required
//               placeholder="John Doe"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Username</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="Username"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="you@example.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="••••••••"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="••••••••"
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>

//           {error && <p className="text-red-500">{error}</p>}

//             <button
//   type="button"
//   className="w-full flex items-center justify-center gap-2 bg-emerald-200 rounded-lg py-2 px-4 hover:bg-emerald-400 transition duration-300"
  
// >
//   <svg
//     className="w-5 h-5"
//     viewBox="0 0 533.5 544.3"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.7c-6.3 34.2-25.2 63.2-53.7 82.7v68h86.8c50.8-46.8 81.7-115.8 81.7-195.6z"
//       fill="#4285F4"
//     />
//     <path
//       d="M272 544.3c72.6 0 133.6-24.1 178.1-65.2l-86.8-68c-24.1 16.2-55 25.6-91.3 25.6-70.2 0-129.7-47.4-151-111.1h-89.6v69.9C84.9 475.7 172.8 544.3 272 544.3z"
//       fill="#34A853"
//     />
//     <path
//       d="M121 325.6c-5.7-16.8-9-34.8-9-53.2s3.2-36.4 9-53.2v-70H31.3C11.3 182.7 0 225.4 0 272.4s11.3 89.7 31.3 123.2l89.7-70z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M272 107.7c39.5 0 75 13.6 102.9 40.3l77.4-77.4C405.6 26.3 344.6 0 272 0 172.8 0 84.9 68.6 31.3 179.2l89.7 69.9C142.3 155.1 201.8 107.7 272 107.7z"
//       fill="#EA4335"
//     />
//   </svg>
//   <span className="text-gray-700 font-medium">Sign up with Google</span>
// </button>

//           <button
//             disabled={loading}
//             type="submit"
//             className="w-full bg-emerald-200 hover:bg-emerald-400 text-gray-500 font-semibold py-2 rounded-lg transition duration-300"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4 text-slate-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-jade-600 hover:underline">
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
//   const [usernameAvailable, setUsernameAvailable] = useState(true);
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

//   const handleUsernameBlur = async () => {
//     if (!username) return;
//     const { data } = await supabase
//       .from("profiles")
//       .select("username")
//       .eq("username", username)
//       .single();

//     setUsernameAvailable(!data);
//   };

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
//     if (score >= 4) {
//       isStrong = "strong";
//     } else if (score >= 2) {
//       isStrong = "medium";
//     }

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

//     if (!usernameAvailable) {
//       setError("Username already taken, please choose another.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: "http://localhost:3000/login",
//           data: {
//             username,
//             full_name: fullName,
//           },
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
//     <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 min-h-screen">
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-jade-600 mb-6">
//           Welcome To Skyline!
//         </h2>

//         <form onSubmit={handleSignUp} className="space-y-6">
//           {/* Full Name */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="fullName"
//               className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               required
//               placeholder=" "
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <label
//               htmlFor="fullName"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Full Name
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Username */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="username"
//               className={`peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 ${
//                 usernameAvailable ? "border-slate-200" : "border-red-400"
//               } bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 ${
//                 usernameAvailable ? "focus:ring-emerald-500" : "focus:ring-red-500"
//               } transition-all duration-300 placeholder-transparent`}
//               placeholder=" "
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onBlur={handleUsernameBlur}
//             />
//             <label
//               htmlFor="username"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Username
//             </label>
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//             {!usernameAvailable && (
//               <p className="text-red-500 text-sm mt-1">
//                 Username already exists, try another.
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="relative group">
//             <input
//               type="email"
//               id="email"
//               className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               placeholder=" "
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label
//               htmlFor="email"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Email
//             </label>
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               placeholder=" "
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <label
//               htmlFor="password"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5" />
//               ) : (
//                 <Eye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Password Strength Indicator */}
//           <div className="mt-2 space-y-2">
//             <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
//               <div
//                 className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
//                 style={{ width: getPasswordStrengthWidth() }}
//               ></div>
//             </div>
//             <ul className="text-sm text-slate-600 space-y-1">
//               <li className="flex items-center gap-2">
//                 {passwordStrength.length ? (
//                   <CheckCircle className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-500" />
//                 )}
//                 <span>At least 8 characters</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 {passwordStrength.uppercase ? (
//                   <CheckCircle className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-500" />
//                 )}
//                 <span>An uppercase letter (A-Z)</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 {passwordStrength.lowercase ? (
//                   <CheckCircle className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-500" />
//                 )}
//                 <span>A lowercase letter (a-z)</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 {passwordStrength.number ? (
//                   <CheckCircle className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-500" />
//                 )}
//                 <span>A number (0-9)</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 {passwordStrength.specialChar ? (
//                   <CheckCircle className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-500" />
//                 )}
//                 <span>A special character (!@#$%)</span>
//               </li>
//             </ul>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               className="peer floating-label-input w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               placeholder=" "
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-100 peer-focus:-translate-y-3 peer-not-placeholder-shown:scale-100 peer-not-placeholder-shown:-translate-y-3"
//             >
//               Confirm Password
//             </label>
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//           </div>

//           {error && (
//             <div
//               className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//               role="alert"
//             >
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Sign Up Button */}
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
//               "Sign Up"
//             )}
//           </button>
//         </form>
//         <p className="text-sm text-center mt-6 text-slate-600">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-emerald-600 hover:underline font-medium"
//           >
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


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
// import "../styles/index.css";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";

// function Signup() {
//     const [username, setUsername] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         setLoading(true);

//         try {
//             // 1️⃣ Send OTP & create account if new
//             const { error: otpError } = await supabase.auth.signInWithOtp({
//                 email,
//                 options: {
//                     shouldCreateUser: true,
//                     emailRedirectTo: null,
//                     data: { username, fullName, password }, // store password in metadata if you want to set later
//                 },
//             });

//             if (otpError) {
//                 setError(otpError.message);
//                 return;
//             }

//             // Save email for OTP verification page
//             localStorage.setItem("pendingEmail", email);

//             // Redirect to OTP verification page
//             navigate("/verifyEmail");

//         } catch (err) {
//             setError("Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <div className="mx-auto p-6 flex items-center justify-center min-h-screen bg-gray-950 px-4">
//                 <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8">
//                     <h2 className="text-2xl font-bold text-center text-emerald-400 mb-6">
//                         Welcome To Skyline!
//                     </h2>

//                     <form onSubmit={handleSignUp} className="space-y-4">
//                         <div>
//                             <label className="block text-sm text-emerald-400 mb-1">Full Name</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 required
//                                 placeholder="John Doe"
//                                 value={fullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-emerald-400 mb-1">Username</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 placeholder="Username"
//                                 required
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-emerald-400 mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 placeholder="you@example.com"
//                                 required
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-emerald-400 mb-1">Password</label>
//                             <input
//                                 type="password"
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 placeholder="••••••••"
//                                 required
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-emerald-400 mb-1">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 placeholder="••••••••"
//                                 required
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                         </div>

//                         {error && <p className="text-red-500">{error}</p>}

//                         <button
//                             type="button"
//                             className="w-full flex items-center justify-center gap-2 bg-gray-800 rounded-lg py-2 px-4 hover:bg-gray-700 transition duration-300 border border-gray-700"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 viewBox="0 0 533.5 544.3"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.7c-6.3 34.2-25.2 63.2-53.7 82.7v68h86.8c50.8-46.8 81.7-115.8 81.7-195.6z"
//                                     fill="#4285F4"
//                                 />
//                                 <path
//                                     d="M272 544.3c72.6 0 133.6-24.1 178.1-65.2l-86.8-68c-24.1 16.2-55 25.6-91.3 25.6-70.2 0-129.7-47.4-151-111.1h-89.6v69.9C84.9 475.7 172.8 544.3 272 544.3z"
//                                     fill="#34A853"
//                                 />
//                                 <path
//                                     d="M121 325.6c-5.7-16.8-9-34.8-9-53.2s3.2-36.4 9-53.2v-70H31.3C11.3 182.7 0 225.4 0 272.4s11.3 89.7 31.3 123.2l89.7-70z"
//                                     fill="#FBBC05"
//                                 />
//                                 <path
//                                     d="M272 107.7c39.5 0 75 13.6 102.9 40.3l77.4-77.4C405.6 26.3 344.6 0 272 0 172.8 0 84.9 68.6 31.3 179.2l89.7 69.9C142.3 155.1 201.8 107.7 272 107.7z"
//                                     fill="#EA4335"
//                                 />
//                             </svg>
//                             <span className="text-gray-200 font-medium">Sign up with Google</span>
//                         </button>


//                         <button
//                             disabled={loading}
//                             type="submit"
//                             className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition duration-300"
//                         >
//                             {loading ? "Signing Up..." : "Sign Up"}
//                         </button>
//                     </form>

//                     <p className="text-sm text-center mt-4 text-gray-400">
//                         Already have an account?{" "}
//                         <a href="/login" className="text-emerald-400 hover:underline">
//                             Log In
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Signup;