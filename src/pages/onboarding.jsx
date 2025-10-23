import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  Upload,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";



// ---- Brand helpers
const BRAND = {
  emerald: "emerald-500", // buttons
  emerald600: "emerald-600", // icons / accents
  emerald100: "emerald-100", // soft bg
  silverGrad: "from-emerald-100 to-slate-50", // page bg gradient
};

// ---- Wizard steps (indexes 0..4 == pages 1..4..6)
const TOTAL_STEPS = 5;

// Choices (Page 1 & 2)
const GOALS = [
  "Explore best spots in my city",
  "Find events & nightlife",
  "Discover scenic views",
  "Plan a getaway",
];

const PREFERENCES = [
  "Nature & parks",
  "Rooftop views",
  "Restaurants & food",
  "Art & culture",
  "Beaches / waterfront",
];

const VIBES = ["Chill & peaceful", "Adventurous", "Romantic", "Trendy / modern"];
const DURATIONS = ["Quick (30–60min)", "Half-day", "Full-day", "Weekend"];
const SOCIALS = ["Solo", "Friends", "Date", "Family"];
const POPULAR_CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Cape Town", "Accra"];

// ---- LocalStorage keys
const LS_KEY = "skyline_onboarding_state";

// ---- Small helpers
const slideVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

function StepCircle({ index, state }) {
  // state: "complete" | "active-valid" | "active-pending" | "future"
  const base =
    "relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all";
  const line =
    "absolute left-[calc(100%+0.5rem)] top-1/2 h-[2px] w-8 -translate-y-1/2 bg-gray-300";
  const amber = "bg-amber-100 ring-2 ring-amber-400 text-amber-700";
  const green = "bg-emerald-100 ring-2 ring-emerald-500 text-emerald-700";
  const gray = "bg-gray-100 ring-2 ring-gray-300 text-gray-500";

  return (
    <div className="relative flex items-center">
      <motion.div
        layout
        className={
          base +
          " " +
          (state === "complete"
            ? green
            : state === "active-valid"
            ? green
            : state === "active-pending"
            ? amber
            : gray)
        }
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {state === "complete" || state === "active-valid" ? (
          <Check className="h-5 w-5" />
        ) : state === "active-pending" ? (
          <Clock className="h-5 w-5" />
        ) : (
          <span>{index}</span>
        )}
      </motion.div>
      {/* connector line except last */}
      {index < TOTAL_STEPS && <div className={line} />}
    </div>
  );
}

export default function OnboardingWizard() {
  // ---- global user & bootstrap
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ---- wizard state
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ---- form data
  const [data, setData] = useState({
    goals: [],
    preferences: [],
    vibe: "",
    duration: "",
    social: "",
    city: "",
    coords: null, // { lat, lng }
    username: "",
    bio: "",
    avatar_url: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  // load user & previous progress (Supabase first, then local fallback)
  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const u = auth?.user || null;
      setUser(u);
      setLoadingUser(false);

      // not logged in: do nothing else
      if (!u) return;

      // Profiles row (we store onboarding JSON here)
      const { data: prof } = await supabase
        .from("profiles")
        .select("username, bio, avatar_url, onboarding_step, onboarding_complete, onboarding_data")
        .eq("id", u.id)
        .maybeSingle();

      if (prof?.onboarding_complete) {
        // already done — up to you: navigate away or just show final page
        setStep(TOTAL_STEPS - 1);
      } else if (prof?.onboarding_data) {
        // hydrate from backend
        setData({
          ...data,
          ...prof.onboarding_data,
          username: prof.username || prof.onboarding_data?.username || "",
          bio: prof.bio || prof.onboarding_data?.bio || "",
          avatar_url: prof.avatar_url || prof.onboarding_data?.avatar_url || "",
        });
        setStep(Number(prof.onboarding_step ?? 0));
      } else {
        // fallback to localStorage
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            setData((d) => ({ ...d, ...parsed.data }));
            setStep(Number(parsed.step ?? 0));
          } catch {}
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist to localStorage on any change
  useEffect(() => {
    const payload = { step, data };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }, [step, data]);

  // ---- derived validation per step
  const stepValid = useMemo(() => {
    switch (step) {
      case 0: // Page 1 – Goals + Preferences (at least one selected overall)
        return data.goals.length > 0 || data.preferences.length > 0;
      case 1: // Page 2 – Vibe + Duration (+ social optional)
        return !!data.vibe && !!data.duration;
      case 2: // Page 3 – Location
        return !!data.city;
      case 3: // Page 4 – Profile (username required)
        return data.username.trim().length >= 3;
      case 4: // Page 6 – Tutorial + Completion
        return true;
      default:
        return false;
    }
  }, [step, data]);

  // ---- step circle state
  const circleState = (i) => {
    if (i < step) return "complete";
    if (i === step) return stepValid ? "active-valid" : "active-pending";
    return "future";
  };

  // ---- chip select helpers
  const toggleFromArray = (key, value) => {
    setData((prev) => {
      const arr = new Set(prev[key]);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  // ---- Supabase save (upsert to profiles)
  const saveProgress = async (opts = {}) => {
    if (!user) return;
    setSaving(true);
    setError("");

    try {
      // update avatar_url if changed is already in data
      const payload = {
        id: user.id,
        username: data.username ,
        bio: data.bio || null,
        avatar_url: data.avatar_url || null,
        onboarding_step: step,
        onboarding_complete: !!opts.complete || false,
        onboarding_data: data,
        updated_at: new Date().toISOString(),
      };
      console.log("payload:" , payload)

      const { error: upErr } = await supabase.from("profiles").upsert(payload);
      if (upErr) throw upErr;
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleFinishOnboarding = async () => {
  try {
    await saveProgress({ complete: true });  // ✅ marks onboarding as done
    navigate("/dashboard");                  // 🚀 send them to dashboard
  } catch (e) {
    console.error(e);
  }
};


  // ---- Navigation
  const handleNext = async () => {
    if (!stepValid) return;
    await saveProgress();
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };
  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleSkip = async () => {
    setStep(TOTAL_STEPS - 1);
    await saveProgress(); // save current before jump
  };
  // const handleFinish = async () => {
  //   await saveProgress({ complete: true });
  //   // optional: clear local storage so onboarding doesn't reappear
  //   localStorage.removeItem(LS_KEY);
  //   // optional: redirect — depends on your router
  //   // window.location.href = "/"; // or navigate("/explore")
  // };

  // ---- Geolocation
  const detectLocation = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setData((d) => ({ ...d, coords: { lat: latitude, lng: longitude } }));
        // keep manual city field for UX; you can reverse-geocode later server-side if you want
      },
      () => setError("Couldn’t detect location. You can type your city manually.")
    );
  };

  // ---- Avatar upload to Supabase Storage
  const handleAvatarSelect = async (file) => {
    if (!file || !user) return;
    setSaving(true);
    setError("");

    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });
      if (upErr) throw upErr;

      // const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      // const publicUrl = pub?.publicUrl;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
const publicUrl = data.publicUrl;

      setData((d) => ({ ...d, avatar_url: publicUrl }));
      setAvatarPreview(URL.createObjectURL(file));
    } catch (e) {
      setError(e.message || "Failed to upload avatar");
    } finally {
      setSaving(false);
    }

    console.log("🧪 User ID:", user.id);
console.log("🧪 File:", file);
console.log("🧪 Path:", `${user.id}/${Date.now()}.${file.name.split(".").pop()}`);

  };

if (loadingUser) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-100 to-slate-50">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-12 h-12 border-4 border-emerald-200 rounded-full"></div>
        {/* Inner animated spinner */}
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  );
}


  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-slate-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to set up your Skyline experience.
          </p>
          <a
            href="/Signup"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-5 py-2 hover:bg-emerald-600 transition"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${BRAND.silverGrad} px-4 py-8`}>
      <div className="mx-auto max-w-3xl">
        {/* Header: stepper + skip */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <StepCircle key={n} index={n} state={circleState(i)} />
            ))}
          </div>
          {step < TOTAL_STEPS - 1 && (
            <button
              onClick={handleSkip}
              className="text-sm text-gray-600 hover:text-gray-800 underline underline-offset-4"
            >
              Skip
            </button>
          )}
        </div>

        {/* Card container */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
          {/* Error toast */}
          {error && (
            <div className="mb-4 rounded-xl bg-amber-50 text-amber-800 px-4 py-2">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1 — Goals + Preferences */}
            {step === 0 && (
              <motion.div
                key="step-1"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  What brings you to Skyline?
                </h2>
                <p className="text-gray-600 mb-4">
                  Pick a few goals. We’ll personalize your feed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleFromArray("goals", g)}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        data.goals.includes(g)
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  What do you love seeing most?
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PREFERENCES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleFromArray("preferences", p)}
                      className={`rounded-full px-4 py-2 text-sm transition border ${
                        data.preferences.includes(p)
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Vibe + Duration + Social */}
            {step === 1 && (
              <motion.div
                key="step-2"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Tune your recommendations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Vibe</h4>
                    <div className="flex flex-col gap-2">
                      {VIBES.map((v) => (
                        <label
                          key={v}
                          className={`rounded-xl border px-4 py-2 cursor-pointer ${
                            data.vibe === v
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="vibe"
                            className="hidden"
                            checked={data.vibe === v}
                            onChange={() => setData((d) => ({ ...d, vibe: v }))}
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Duration</h4>
                    <div className="flex flex-col gap-2">
                      {DURATIONS.map((v) => (
                        <label
                          key={v}
                          className={`rounded-xl border px-4 py-2 cursor-pointer ${
                            data.duration === v
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="duration"
                            className="hidden"
                            checked={data.duration === v}
                            onChange={() => setData((d) => ({ ...d, duration: v }))}
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Who with?</h4>
                    <div className="flex flex-col gap-2">
                      {SOCIALS.map((v) => (
                        <label
                          key={v}
                          className={`rounded-xl border px-4 py-2 cursor-pointer ${
                            data.social === v
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="social"
                            className="hidden"
                            checked={data.social === v}
                            onChange={() => setData((d) => ({ ...d, social: v }))}
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Optional.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Location */}
            {step === 2 && (
              <motion.div
                key="step-3"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Where should we guide you?
                </h2>
                <p className="text-gray-600 mb-4">
                  Detect your location or pick a city.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={detectLocation}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-5 py-3 hover:bg-emerald-600 transition"
                  >
                    <MapPin className="h-5 w-5" />
                    Detect my location
                  </button>

                  <div>
                    <label className="text-sm text-gray-700">City</label>
                    <input
                      list="city-list"
                      value={data.city}
                      onChange={(e) =>
                        setData((d) => ({ ...d, city: e.target.value }))
                      }
                      placeholder="e.g., Lagos"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <datalist id="city-list">
                      {POPULAR_CITIES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    {data.coords && (
                      <p className="text-xs text-gray-500 mt-2">
                        Coordinates detected: {data.coords.lat.toFixed(4)},{" "}
                        {data.coords.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Profile Setup (with avatar) */}
            {step === 3 && (
              <motion.div
                key="step-4"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Let’s set up your profile
                </h2>
                <p className="text-gray-600 mb-4">
                  Add a username and (optionally) a picture.
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-emerald-100 overflow-hidden ring-2 ring-emerald-500">
                      {avatarPreview || data.avatar_url ? (
                        <img
                          src={avatarPreview || data.avatar_url}
                          alt="avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-emerald-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-50">
                    <Upload className="h-4 w-4" />
                    <span>Upload picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAvatarSelect(e.target.files?.[0])}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Username</label>
                    <input
                      value={data.username}
                      onChange={(e) =>
                        setData((d) => ({ ...d, username: e.target.value }))
                      }
                      placeholder="skyline_john"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Min 3 chars, letters/numbers/underscores.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Bio (optional)</label>
                    <input
                      value={data.bio}
                      onChange={(e) =>
                        setData((d) => ({ ...d, bio: e.target.value }))
                      }
                      placeholder="Foodie explorer"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5 — Tutorial + Completion */}
            {step === 4 && (
              <motion.div
                key="step-5"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  You’re all set 🎉
                </h2>
                <p className="text-gray-600 mb-6">
                  Discover views, save favorites, and share memories.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { title: "Discover", desc: "Best views in your city 🌆" },
                    { title: "Save", desc: "Collect your favorite spots 🌿" },
                    { title: "Share", desc: "Post photos & tips 📸" },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-4"
                    >
                      <h4 className="font-semibold text-gray-800">{c.title}</h4>
                      <p className="text-gray-600 text-sm">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS - 1 ? (
              <button
                disabled={!stepValid || saving}
                onClick={handleNext}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-white transition ${
                  stepValid && !saving
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-emerald-300 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled={saving}
                onClick={handleFinishOnboarding}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-600 transition"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
