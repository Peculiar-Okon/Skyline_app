// import react from "react";
// import '../styles/index.css';
// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { supabase } from "../services/supabaseClient";

// function Login () {
//   const [identifier, setIdentifier] = useState(""); // email or username
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//       e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const isEmail = identifier.includes("@");

//       if (isEmail) {
//         // Login with email directly
//         const { error } = await supabase.auth.signInWithPassword({
//           email: identifier,
//           password,
//         });

//         if (error) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }
//       } else {
//         // Lookup user id by username from profile table
//         const { data: profileData, error: profileError } = await supabase
//           .from("profiles")  // <-- replace with your actual profile table name if different
//           .select("id")
//           .eq("username", identifier)
//           .single();

//         if (profileError || !profileData) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }

//         // Use RPC to get email by user id
//         const { data: emailData, error: emailError } = await supabase.rpc(
//           "get_email_by_user_id",
//           { uid: profileData.id }
//         );

//         if (emailError || !emailData) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }

//         // Login with email retrieved from RPC
//         const { error: loginError } = await supabase.auth.signInWithPassword({
//           email: emailData,
//           password,
//         });

//         if (loginError) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }
//       }

//       // Successful login - redirect
//       navigate("/onboarding"); // change to your post-login page
//     } catch (err) {
//       setError("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };



  // const handleLogin = async (e) => {
  // e.preventDefault();
  // setError("");
  // setLoading(true);

  // try {
  //   const isEmail = identifier.includes("@");

  //   if (isEmail) {
  //     // Login with email directly
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: identifier,
  //       password,
  //     });

  //     if (error) {
  //       setError("Invalid login credentials");
  //       return;
  //     }
  //   } else {
  //     // Lookup user id by username
  //     const { data: profileData, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("id")
  //       .eq("username", identifier)
  //       .single();

  //     if (profileError || !profileData) {
  //       setError("Invalid login credentials");
  //       return;
  //     }

  //     // Use RPC to get the email for the user ID
  //     // NOTE: This assumes your RPC returns a single value or an object with an 'email' property
  //     const { data: emailData, error: emailError } = await supabase.rpc(
  //       "get_email_by_user_id",
  //       { uid: profileData.id }
  //     );

  //     if (emailError || !emailData) {
  //       setError("Invalid login credentials");
  //       return;
  //     }

      // The key fix: The RPC returns a value, so you need to check if the response is an array
      // and get the first element, or if it's a simple string.
      // Let's assume the RPC returns a simple email string.
  //     const userEmail = emailData; 

  //     // If your RPC returns an array like [{ email: 'user@example.com' }], use this instead:
  //     // const userEmail = emailData[0].email;

  //     // Login with the retrieved email and password
  //     const { error: loginError } = await supabase.auth.signInWithPassword({
  //       email: userEmail,
  //       password,
  //     });

  //     if (loginError) {
  //       setError("Invalid login credentials");
  //       return;
  //     }
  //   }

  //   // Successful login
  //   navigate("/dashboard");
  // } catch (err) {
  //   setError("An unexpected error occurred. Please try again.");
  // } finally {
  //   setLoading(false);
  // }


  // const handleLogin = async (e) => {
  // e.preventDefault();
  // setError("");
  // setLoading(true);

  // try {
  //   const isEmail = identifier.includes("@");

  //   if (isEmail) {
  //     // Login with email directly
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: identifier,
  //       password,
  //     });

  //     if (error) {
  //       setError("Invalid login credentials");
  //       setLoading(false);
  //       return;
  //     }
  //   } else {
  //     // Lookup user id by username
  //     const { data: profileData, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("id")
  //       .eq("username", identifier)
  //       .single();
        
  //       console.log("Profile:", profileData);

  //     if (profileError || !profileData) {
  //       setError("Invalid login credentials");
  //       setLoading(false);
  //       return;
  //     }

  //     // Use RPC to get email by user id
  //     const { data: emailData, error: emailError } = await supabase.rpc(
  //       "get_email_by_user_id",
  //       { uid: profileData.id }
  //     );
      
  //     console.log("Supabase RPC returned:", emailData);

  //     if (emailError || !emailData) {
  //       setError("Invalid login credentials");
  //       setLoading(false);
  //       return;
  //     }

  //     //  The corrected line: use emailData directly as it's a text value.
  //     const userEmail = emailData; 

  //     const { error: loginError } = await supabase.auth.signInWithPassword({
  //       email: userEmail,
  //       password,
  //     });

  //     if (loginError) {
  //       setError("Invalid login credentials");
  //       setLoading(false);
  //       return;
  //     }
  //   }

  //   // Successful login
  //   navigate("/dashboard");
  // } catch (err) {
  //   setError("An unexpected error occurred. Please try again.");
  // } finally {
  //   setLoading(false);
  // }

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     const isEmail = identifier.includes("@");
//     console.log (identifier)

//     if (isEmail) {
//       const { error } = await supabase.auth.signInWithPassword({
//         email: identifier,
//         password,
//       });
//       if (error) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }
//     } else {
//       // 1) Find user by username
//       const { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("id")
//         .ilike("username", identifier.trim())
//         .limit(1).maybeSingle();

//       console.log("Profile:", profileData);

//       if (profileError || !profileData) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }

//       // 2) Get email by user id via RPC
//       const { data: emailData, error: emailError } = await supabase.rpc(
//         "get_email_by_user_id",
//         { uid: profileData.id }
//       );

//       console.log("Supabase RPC returned:", emailData);

//       if (emailError || !emailData) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }

//       // 3) Normalize RPC return (string vs object/array)
//       const userEmail =
//         typeof emailData === "string"
//           ? emailData
//           : Array.isArray(emailData)
//           ? emailData[0]?.email
//           : emailData?.email;

//       if (!userEmail) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }

//       // 4) Try login with the resolved email
//       const { error: loginError } = await supabase.auth.signInWithPassword({
//         email: userEmail,
//         password,
//       });

//       if (loginError) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }
//     }

//     // success path (optional: navigate)
//     navigate("/dashboard");
//   } catch (err) {
//     console.error(err);
//     setError("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     // Debug log before sending to Supabase
//     console.log("🛠 Logging in with:", email, password ? "[HIDDEN]" : "[EMPTY]");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email.trim(),
//       password,
//     });

//     if (error) {
//       console.error("❌ Login error:", error);
//       setError("Invalid login credentials");
//       return;
//     }

//     console.log("✅ Login success:", data);

//     // Redirect to dashboard after login
//     navigate("/dashboard");
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     setError("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//     return (
//         <>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 px-4">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-jade-600 mb-6">
//           Sign into your account
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Email or Username</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder=""
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-jade-600 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-jade-500"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500">{error}</p>}

//     <button
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
//             type="submit"
//              disabled={loading}
//             className="w-full bg-emerald-200 hover:bg-emerald-400 text-gray-500 font-semibold py-2 rounded-lg transition duration-300"
//           >
//           {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         <p className="text-sm text-center mt-4 text-slate-600">
//           Dont have an account?{" "}
//           <a href="/signup" className="text-jade-600 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>

    
//     </>
//   );
// };

// export default Login

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

// function Login() {
//   const [identifier, setIdentifier] = useState(""); // email or username
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const isEmail = identifier.includes("@");

//       if (isEmail) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email: identifier,
//           password,
//         });

//         if (error) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }
//       } else {
//         const { data: profileData, error: profileError } = await supabase
//           .from("profiles")
//           .select("id")
//           .eq("username", identifier)
//           .single();

//         if (profileError || !profileData) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }

//         const { data: emailData, error: emailError } = await supabase.rpc(
//           "get_email_by_user_id",
//           { uid: profileData.id }
//         );

//         if (emailError || !emailData) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }

//         const { error: loginError } = await supabase.auth.signInWithPassword({
//           email: emailData,
//           password,
//         });

//         if (loginError) {
//           setError("Invalid login credentials");
//           setLoading(false);
//           return;
//         }
//       }

//       navigate("/onboarding");
//     } catch (err) {
//       setError("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//       const handleGoogleSignIn = async () => {
//       try {
//         const { error } = await supabase.auth.signInWithOAuth({
//           provider: "google",
//           options: {
//             redirectTo: "http://localhost:3000/"
//           },
//         });
//         if (error) throw error;
//       } catch (err) {
//         setError(err.message || "Google sign-in failed.");
//       }
//     };

//   return (
//     <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 min-h-screen">
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-jade-600 mb-6">
//           Welcome Back!
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* Identifier (Email or Username) */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="identifier"
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               placeholder=" "
//               required
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//             />
//             <label
//               htmlFor="identifier"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:-translate-y-9 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Email or Username
//             </label>
//             {identifier.includes("@") ? (
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//             ) : (
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
//             )}
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
//               placeholder=" "
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <label
//               htmlFor="password"
//               className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:-translate-y-9 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
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

//           <p className="text-right text-sm">
//   <a
//     href="/forgotpswd"
//     className="text-emerald-600 hover:underline font-medium"
//   >
//     Forgot password?
//   </a>
// </p>


//           {error && (
//             <div
//               className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//               role="alert"
//             >
//               <p>{error}</p>
//             </div>
//           )}

//                     {/* Google Sign In Button */}
//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 48 48"
//             >
//               <path
//                 fill="#FFC107"
//                 d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.1-.4-3.5z"
//               />
//               <path
//                 fill="#FF3D00"
//                 d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.5 4 24 4 16.3 4 9.4 8.5 6.3 14.7z"
//               />
//               <path
//                 fill="#4CAF50"
//                 d="M24 44c5.4 0 10.3-2.1 13.9-5.5l-6.4-5.4C29.6 34.1 26.9 35 24 35c-5.2 0-9.7-3.3-11.4-8.1l-6.5 5C9.4 39.3 16.1 44 24 44z"
//               />
//               <path
//                 fill="#1976D2"
//                 d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.3-3.7 6-7.1 7.1l6.4 5.4C38.6 37.1 44 31 44 24c0-1.3-.1-2.1-.4-3.5z"
//               />
//             </svg>
//             Sign in with Google
//           </button>


//           {/* Login Button */}
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
//               "Log In"
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6 text-slate-600">
//           Don’t have an account?{" "}
//           <a
//             href="/signup"
//             className="text-emerald-600 hover:underline font-medium"
//           >
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    let userEmail = identifier;

    // 👇 If user entered a username, fetch their email from profiles
    if (!identifier.includes("@")) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", identifier)
        .single();

      if (profileError || !profileData) {
        setError("Invalid login credentials");
        setLoading(false);
        return;
      }

      const { data: emailData, error: emailError } = await supabase.rpc(
        "get_email_by_user_id",
        { uid: profileData.id }
      );

      if (emailError || !emailData) {
        setError("Invalid login credentials");
        setLoading(false);
        return;
      }

      userEmail = emailData;
    }

    console.log("🪪 Final email used to log in:", userEmail);
    console.log("🔑 Password entered:", password);

    // 👇 Attempt login with Supabase Auth
    const {
      data: { user },
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });

    if (loginError || !user) {
      console.error("Login Error:", loginError);
      setError("Invalid login credentials");
      setLoading(false);
      return;
    }

    // 👇 Check if profile exists
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("id, onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (profileErr) {
      console.error("Profile Fetch Error:", profileErr);
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    // 👇 Redirect based on profile existence
    if (!profile) {
      navigate("/onboarding");
    } else {
      navigate("/DashboardLayout");
    }
  } catch (err) {
    console.error(err);
    setError("Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


    const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/",
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
  }


  return (
    <div className="mx-auto p-6 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-jade-600 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Identifier (Email or Username) */}
          <div className="relative group">
            <input
              type="text"
              id="identifier"
              className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              placeholder=" "
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <label
              htmlFor="identifier"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:-translate-y-9 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
            >
              Email or Username
            </label>
            {identifier.includes("@") ? (
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
            ) : (
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-emerald-500 transition-all duration-300" />
            )}
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="peer w-full p-3 pl-10 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 placeholder-transparent"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="floating-label absolute left-[40px] top-[17px] text-sm text-slate-400 pointer-events-none transition-all duration-300 transform origin-left peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:-translate-y-9 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
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

          <p className="text-right text-sm">
            <a
              href="/forgotpswd"
              className="text-emerald-600 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </p>

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

          {/* Login Button */}
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
              "Log In"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-emerald-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}


export default Login;


