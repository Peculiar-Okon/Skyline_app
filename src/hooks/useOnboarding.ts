import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../Lib/Supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const TOTAL_STEPS = 6;

const LOCAL_STORAGE_KEY = "skyline_onboarding";

// export interface Coords {
//   latitude: number;
//   longitude: number;
// }

export interface OnboardingData {
  goals: string[];

  interests: string[];

  vibe: string;

  duration: string;

  social: string;

  city: string;

      coords: {
    lat: number;
    lng: number;
  } | null;

  username: string;

  fullName: string;

  bio: string;

  avatar_url: string;
}

const defaultData: OnboardingData = {
  goals: [],

  interests: [],

  vibe: "",

  duration: "",

  social: "",

  city: "",

  coords: null,

  username: "",

  fullName: "",

  bio: "",

  avatar_url: "",
};

export default function useOnboarding() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
const [loadingLocation, setLoadingLocation] = useState(false);
  const [userId, setUserId] =
    useState<string>("");

    const [uploadingAvatar, setUploadingAvatar] =
  useState(false);

  const [step, setStep] =
    useState<number>(0);

  const [data, setData] =
    useState<OnboardingData>(
      defaultData
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

    const [checkingUsername, setCheckingUsername] =
  useState(false);

const [usernameAvailable, setUsernameAvailable] =
  useState<boolean | null>(null);

const [usernameSuggestions, setUsernameSuggestions] =
  useState<string[]>([]);

//   const usernameTimeout =
//   useRef<NodeJS.Timeout | null>(null);

const debounceRef =
  useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    setLoading(true);

    try {
      const {
        data: authData,
      } =
        await supabase.auth.getUser();
        

      const user =
        authData.user;

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: profile } =
        await supabase
          .from("profiles")
          .select(
            `
              full_name,
              username,
              bio,
              avatar_url,
              onboarding_data,
              onboarding_step,
              onboarding_completed
            `
          )
          .eq("id", user.id)
          .single();

      if (profile) {
        setStep(
          profile.onboarding_step ??
            0
        );

        setData({
          ...defaultData,

          ...profile
            .onboarding_data,

          username:
            profile.username ??
            "",

          fullName:
            profile.full_name ??
            "",

          bio:
            profile.bio ??
            "",

          avatarUrl:
            profile.avatar_url ??
            "",
        });
      } else {
        restoreFromLocalStorage();
      }
    } catch (err) {
      console.error(err);

      restoreFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  getUser();
}, []);

useEffect(() => {
  console.log(user);
}, [user]);

  function restoreFromLocalStorage() {
    const saved =
      localStorage.getItem(
        LOCAL_STORAGE_KEY
      );

    if (!saved) return;

    try {
      const parsed =
        JSON.parse(saved);

      setStep(
        parsed.step ?? 0
      );

      setData({
        ...defaultData,
        ...parsed.data,
      });
    } catch {
      console.log(
        "Failed to restore onboarding."
      );
    }
  }

  useEffect(() => {
    if (loading) return;

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        step,
        data,
      })
    );
  }, [
    step,
    data,
    loading,
  ]);

  const stepValid =
    useMemo(() => {
    //   switch (step) {
    //     case 0:
    //       return true;

    //     case 1:
    //       return (
    //         data.goals.length >
    //           0 ||
    //         data.interests
    //           .length > 0
    //       );

    //     case 2:
    //       return (
    //         !!data.vibe &&
    //         !!data.duration
    //       );

    //     case 3:
    //       return (
    //         data.city.trim()
    //           .length > 0
    //       );

    //     case 4:
    //       return (
    //         data.username.trim()
    //           .length >= 3
    //       );

    //     case 5:
    //       return true;

    //     default:
    //       return false;
    //   }

    switch (step) {
  case 0:
    // Welcome
    return true;

  case 1:
    // Goals
    return data.goals.length > 0;

  case 2:
    // Interests
    return data.interests.length > 0;

  case 3:
    // Preferences
    return (
      !!data.vibe &&
      !!data.duration &&
      !!data.social
    );

  case 4:
    // Location
    return data.city.trim().length > 0;

  case 5:
    // Profile
    return true;
    // return (
    //   data.username.trim().length >= 1 &&
    //   data.fullName.trim().length > 0 &&
    //   usernameAvailable === true
    // );

  case 6:
    // Review
    return true;

  default:
    return false;
}
    }, [
      step,
      data,
    ]);

  // ------------------------------------
  // Part 2 starts below this line...
  // ------------------------------------

    // ============================
  // Navigation
  // ============================

  const nextStep = () => {
    if (!stepValid) return;

    setStep((prev) => Math.min(prev + 1, 6));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const skipOnboarding = () => {
    setStep(6);
  };

  // ============================
  // Goals
  // ============================

//   const toggleGoal = (
//     goal: string
//   ) => {
//     setData((prev) => ({
//       ...prev,
//       goals: prev.goals.includes(goal)
//         ? prev.goals.filter(
//             (g) => g !== goal
//           )
//         : [...prev.goals, goal],
//     }));
//   };

  // ============================
  // Interests
  // ============================

  const toggleInterest = (
    interest: string
  ) => {
    setData((prev) => ({
      ...prev,
      interests:
        prev.interests.includes(
          interest
        )
          ? prev.interests.filter(
              (i) =>
                i !== interest
            )
          : [
              ...prev.interests,
              interest,
            ],
    }));
  };

  // ============================
  // Preferences
  // ============================

  const setVibe = (
    vibe: string
  ) => {
    setData((prev) => ({
      ...prev,
      vibe,
    }));
  };

  const setDuration = (
    duration: string
  ) => {
    setData((prev) => ({
      ...prev,
      duration,
    }));
  };

  const setSocial = (
    social: string
  ) => {
    setData((prev) => ({
      ...prev,
      social,
    }));
  };

  // ============================
  // Location
  // ============================

  const setCity = (
    city: string
  ) => {
    setData((prev) => ({
      ...prev,
      city,
    }));
  };

//   const detectLocation =
//     () => {
//       if (
//         !navigator.geolocation
//       ) {
//         setError(
//           "Your browser doesn't support location."
//         );

//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setData((prev) => ({
//             ...prev,

//             coordinates: {
//               latitude:
//                 position.coords
//                   .latitude,

//               longitude:
//                 position.coords
//                   .longitude,
//             },
//           }));
//         },

//         () => {
//           setError(
//             "Unable to detect your location."
//           );
//         }
//       );
//     };

const detectLocation = () => {
  if (!navigator.geolocation) return;

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );

        const location = await response.json();

        const city =
          location.address.city ||
          location.address.town ||
          location.address.village ||
          location.address.state ||
          "";

        updateData({
          city,
          coords: {
            lat,
            lng,
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLocation(false);
      }
    },
    () => {
      setLoadingLocation(false);
    }
  );
};

  // ============================
  // Profile
  // ============================

  const setUsername = (
    username: string
  ) => {
    setData((prev) => ({
      ...prev,
      username,
    }));
  };

  const setFullName = (
    fullName: string
  ) => {
    setData((prev) => ({
      ...prev,
      fullName,
    }));
  };

  const setBio = (
    bio: string
  ) => {
    setData((prev) => ({
      ...prev,
      bio,
    }));
  };

  // ============================
  // Avatar Upload
  // ============================
  

const uploadAvatar = async (file: File) => {
  if (!user) {
    toast.error("You must be signed in to upload an avatar.");
    return;
  }

  setUploadingAvatar(true);

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const avatarUrl = publicUrlData.publicUrl;

    // Update local onboarding state
    updateData({
      avatar_url: avatarUrl,
    });

    // Save avatar to profile immediately
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);

    if (profileError) throw profileError;

    toast.success("Profile photo updated!");
  } catch (error: any) {
    console.error("Avatar upload failed:", error);
    toast.error(error.message || "Failed to upload avatar.");
  } finally {
    setUploadingAvatar(false);
  }
};

//   const uploadAvatar =
//   async (
//     file: File
//   ) => {
//     if (
//       !user ||
//       !file
//     )
//       return;

//     const path = `${user.id}/${Date.now()}-${
//       file.name
//     }`;

//     const { error } =
//       await supabase.storage
//         .from("avatars")
//         .upload(path, file, {
//           upsert: true,
//         });

//     if (error) {
//       toast.error(
//         error.message
//       );

//       return;
//     }

//     const { data: url } =
//       supabase.storage
//         .from("avatars")
//         .getPublicUrl(path);

//     updateData({
//       avatar_url:
//         url.publicUrl,
//     });
// };

//   const uploadAvatar =
//     async (
//       file: File
//     ) => {
//       if (
//         !file ||
//         !userId
//       )
//         return;

//       try {
//         setSaving(true);

//         const extension =
//           file.name.split(".").pop();

//         const fileName = `${userId}/${Date.now()}.${extension}`;

//         const {
//           error: uploadError,
//         } =
//           await supabase.storage
//             .from("avatars")
//             .upload(
//               fileName,
//               file,
//               {
//                 upsert: true,
//               }
//             );

//         if (
//           uploadError
//         )
//           throw uploadError;

//         const {
//           data: publicUrl,
//         } =
//           supabase.storage
//             .from("avatars")
//             .getPublicUrl(
//               fileName
//             );

//         setData((prev) => ({
//           ...prev,

//           avatarUrl:
//             publicUrl.publicUrl,
//         }));
//       } catch (
//         err: any
//       ) {
//         setError(
//           err.message
//         );
//       } finally {
//         setSaving(false);
//       }
//     };

    const checkUsername =
  async (
    username: string
  ) => {
    if (
      username.length < 3
    ) {
      setUsernameAvailable(
        null
      );

      return;
    }

    setCheckingUsername(
      true
    );

    const { data: existing } =
      await supabase
        .from("profiles")
        .select("id")
        .eq(
          "username",
          username
        );

    setUsernameAvailable(
      existing?.length === 0
    );

    setCheckingUsername(
      false
    );
  };

  const generateSuggestions =
  async (
    username: string
  ) => {
    const options = [
      username + "01",
      username + "123",
      username + "_",
      username + "_dev",
      "its_" + username,
    ];

    const available: string[] =
      [];

    for (const option of options) {
      const { data } =
        await supabase
          .from("profiles")
          .select("id")
          .eq(
            "username",
            option
          );

      if (
        data?.length === 0
      ) {
        available.push(
          option
        );
      }
    }

    setUsernameSuggestions(
      available
    );
  };

  useEffect(() => {
  if (
    !data.username
  )
    return;

  if (
    debounceRef.current
  ) {
    clearTimeout(
      debounceRef.current
    );
  }

  debounceRef.current =
    setTimeout(async () => {
      await checkUsername(
        data.username
      );

      await generateSuggestions(
        data.username
      );
    }, 500);

  return () => {
    if (
      debounceRef.current
    ) {
      clearTimeout(
        debounceRef.current
      );
    }
  };
}, [data.username]);

  // ============================
  // Helpers
  // ============================

  const resetError = () =>
    setError("");

   const skipToReview = () => {
    setStep(TOTAL_STEPS - 1);
  };

  const updateData = (
  values: Partial<OnboardingData>
) => {
  setData((prev) => ({
    ...prev,
    ...values,
  }));
};

const saveProgress = async () => {
  if (!user) return;

  try {
    setSaving(true);

    const { error } =
      await supabase
        .from("profiles")
        .update({
          onboarding_step: step,

          onboarding_data: {
            goals: data.goals,
            interests: data.interests,

            vibe: data.vibe,
            duration: data.duration,
            social: data.social,

            city: data.city,
            coords: data.coords,
          },

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", user.id);

    if (error) throw error;
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setSaving(false);
  }
};

const restoreProgress =
  async () => {
    if (!user) return;

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) return;

    if (
      profile.onboarding_data
    ) {
      setData((prev) => ({
        ...prev,

        ...profile.onboarding_data,

        username:
          profile.username ?? "",

        fullName:
          profile.full_name ?? "",

        bio:
          profile.bio ?? "",

        avatar_url:
          profile.avatar_url ?? "",
      }));
    }

    setStep(
      profile.onboarding_step ??
        0
    );
  };

  useEffect(() => {
  restoreProgress();
}, [user]);

const toggleGoal = (goal: string) => {
  setData((prev) => ({
    ...prev,
    goals: prev.goals.includes(goal)
      ? prev.goals.filter(
          (g) => g !== goal
        )
      : [...prev.goals, goal],
  }));
};

const finishOnboarding = async () => {
  if (!user) return;

  try {
    setSaving(true);

    const updates: Record<string, any> = {
      onboarding_completed: true,

      onboarding_step: TOTAL_STEPS,

      onboarding_data: {
        goals: data.goals,

        interests: data.interests,

        vibe: data.vibe,

        duration: data.duration,

        social: data.social,

        city: data.city,

        coords: data.coords,
      },

      updated_at: new Date().toISOString(),
    };

    // Only save profile fields if the user filled them

    if (data.username.trim()) {
      updates.username = data.username.trim();
    }

    if (data.fullName.trim()) {
      updates.full_name = data.fullName.trim();
    }

    if (data.bio.trim()) {
      updates.bio = data.bio.trim();
    }

    if (data.avatar_url) {
      updates.avatar_url = data.avatar_url;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) throw error;

    toast.success("Welcome to Skyline ✨");

    navigate("/dashboard");
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setSaving(false);
  }
};


// const finishOnboarding =
//   async () => {
//     if (!user) return;

//     try {
//       setSaving(true);

//       const { error } =
//         await supabase
//           .from("profiles")
//           .update({
//             username:
//               data.username,

//             full_name:
//               data.fullName,

//             bio: data.bio,

//             avatar_url:
//               data.avatar_url,

//             onboarding_completed:
//               true,

//             onboarding_step:
//               TOTAL_STEPS,

//             onboarding_data: {
//               goals:
//                 data.goals,

//               interests:
//                 data.interests,

//               vibe:
//                 data.vibe,

//               duration:
//                 data.duration,

//               social:
//                 data.social,

//               city:
//                 data.city,

//               coords:
//                 data.coords,
//             },

//             updated_at:
//               new Date().toISOString(),
//           })
//           .eq("id", user.id);

//       if (error) throw error;

//       toast.success(
//         "Welcome to Skyline"
//       );

//       navigate ("/dashboard")
//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

      return {
    user,

    loading,

    step,

    TOTAL_STEPS,

    data,

    saving,

    stepValid,

    skipOnboarding,

    toggleGoal,

    setVibe,

    setSocial,

    setDuration,

    setCity,

    setBio,

    setFullName,

    setUsername,
    uploadingAvatar,

    checkingUsername,
        usernameAvailable,
        usernameSuggestions,

        userId,
        setUser,

    resetError,

    loadingLocation,

    setStep,

    updateData,

    toggleInterest,

    nextStep,

    previousStep,

    skipToReview,

    uploadAvatar,

    detectLocation,

    saveProgress,

    finishOnboarding,
  };
}