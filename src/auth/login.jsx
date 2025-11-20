


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






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

// function Login() {
//   const [identifier, setIdentifier] = useState("");
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
//       let userEmail = identifier;

//       if (!identifier.includes("@")) {
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

//         userEmail = emailData;
//       }

//       const {
//         data: { user },
//         error: loginError,
//       } = await supabase.auth.signInWithPassword({
//         email: userEmail,
//         password,
//       });

//       if (loginError || !user) {
//         setError("Invalid login credentials");
//         setLoading(false);
//         return;
//       }

//       const { data: profile, error: profileErr } = await supabase
//         .from("profiles")
//         .select("id, onboarding_complete")
//         .eq("id", user.id)
//         .maybeSingle();

//       if (profileErr) {
//         setError("Something went wrong. Try again.");
//         setLoading(false);
//         return;
//       }

//       if (!profile) navigate("/onboarding");
//       else navigate("/DashboardLayout");
//     } catch (err) {
//       setError("Login failed. Please try again.");
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
//           Welcome Back 🌆
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* Identifier */}
//           <div className="relative group">
//             <input
//               type="text"
//               id="identifier"
//               className="peer w-full p-3 pl-11 rounded-xl 
//               border-2 border-slate-200 dark:border-gray-700 
//               bg-slate-50/80 dark:bg-gray-800/60 
//               text-slate-800 dark:text-gray-100 
//               focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50
//               shadow-inner dark:shadow-[inset_0_0_6px_rgba(0,0,0,0.4)]
//               transition-all duration-300 placeholder-transparent backdrop-blur-md"
//               placeholder=" "
//               required
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//             />
//             <label
//               htmlFor="identifier"
//               className="absolute left-[42px] top-[17px] text-sm 
//               text-slate-400 dark:text-gray-500 
//               transition-all duration-300 transform origin-left 
//               peer-focus:text-emerald-500 peer-focus:scale-75 peer-focus:-translate-y-9
//               peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:-translate-y-9"
//             >
//               Email or Username
//             </label>
//             {identifier.includes("@") ? (
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//             ) : (
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
//               text-slate-400 dark:text-gray-500 peer-focus:text-emerald-500 transition-all duration-300" />
//             )}
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
//               onChange={(e) => setPassword(e.target.value)}
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

//           <p className="text-right text-sm">
//             <a href="/forgotpswd" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
//               Forgot password?
//             </a>
//           </p>

//           {error && (
//             <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 
//             text-red-700 dark:text-red-300 p-4 rounded-lg" role="alert">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Google Sign In */}
//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-2 
//             bg-gradient-to-r from-emerald-500 to-teal-600 
//             hover:from-emerald-600 hover:to-teal-700 
//             dark:from-emerald-600 dark:to-teal-700
//             text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
//               <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3..." />
//             </svg>
//             Sign in with Google
//           </button>

//           {/* Login Button */}
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
//               "Log In"
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6 text-slate-600 dark:text-gray-400">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;





