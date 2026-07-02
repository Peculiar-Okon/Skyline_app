import { motion } from "framer-motion";
import {
  Camera,
  User,
  FileText,
  UserCircle2
} from "lucide-react";
import { useTheme } from "../../Theme/themeContext";

interface ProfileStepProps {
  username: string;
  fullName: string;
  bio: string;
  avatar_url: string;
  uploadingAvatar: boolean;

  setUsername: (value: string) => void;
  setFullName: (value: string) => void;
  setBio: (value: string) => void;
  checkingUsername: boolean;

  usernameAvailable: boolean | null;

  usernameSuggestions: string[];

  uploadAvatar: (
    file: File
  ) => Promise<void>;
}

export default function ProfileStep({
  username,
  fullName,
  bio,
  avatar_url,
  uploadingAvatar,
  setUsername,
  setFullName,
  setBio,
    checkingUsername,
  usernameAvailable,
  usernameSuggestions,
  uploadAvatar,
}: ProfileStepProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-8"
    >
      {/* Header */}

      <div className="text-center">
        <div
          className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl ${
            darkMode
              ? "bg-emerald-500/15"
              : "bg-emerald-100"
          }`}
        >
          <User
            size={34}
            className="text-emerald-500"
          />
        </div>

        <h2 className="text-3xl font-bold">
          Build your profile (Optional)
        </h2>

        <p
          className={`mt-3 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Give other explorers something
          memorable to see.
        </p>
      </div>

      {/* Avatar */}

      <div className="flex flex-col items-center">
  <label className="relative group cursor-pointer">
    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-500 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      {avatar_url ? (
        <img
          src={avatar_url}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <UserCircle2
          size={80}
          className="text-slate-400"
        />
      )}
    </div>

    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
      <Camera
        className="text-white"
        size={28}
      />
    </div>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={async (e) => {
        if (e.target.files?.[0]) {
          await uploadAvatar(e.target.files[0]);
        }
      }}
    />
  </label>

  {uploadingAvatar && (
    <p className="mt-3 text-sm text-emerald-500">
      Uploading your photo...
    </p>
  )}
</div>

      {/* <div className="flex justify-center">
        <label className="relative cursor-pointer group">

            {avatar_url ? (
              <img
                src={avatar_url}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle2
                size={90}
                className="text-slate-400"
              />
            )}
          {/* <img
            src={
              avatar_url ||
              "https://placehold.co/200x200?text=%F0%9F%91%A4"
            }
            alt="Avatar"
            className="h-28 w-28 rounded-full object-cover border-4 border-emerald-500 shadow-xl"
          /> */}

          {/* <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Camera
              className="text-white"
              size={26}
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              if (
                e.target.files?.[0]
              ) {
                await uploadAvatar(
                  e.target.files[0]
                );
              }
            }}
          />
        </label>
      </div>
      {uploadingAvatar && (
        <p className="mt-3 text-center text-sm text-emerald-500">
          Uploading your photo...
        </p>
      )} */} 

      {/* Inputs */}

      <div className="space-y-5">
        {/* Full Name */}

        <div>
          <label
            className={`mb-2 block text-sm font-medium ${
              darkMode
                ? "text-slate-300"
                : "text-slate-700"
            }`}
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              placeholder="Pearl Johnson"
              className={`w-full rounded-2xl border py-4 pl-12 pr-4 transition focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 ${
                darkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-white border-slate-200"
              }`}
            />
          </div>
        </div>

        {/* Username */}

                 <div>
          <label
            className={`mb-2 block text-sm font-medium ${
              darkMode
                ? "text-slate-300"
                : "text-slate-700"
            }`}
          >
            Username
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              @
            </span>

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="pearlcodes"
              className={`w-full rounded-2xl border py-4 pl-10 pr-4 transition focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 ${
                darkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-white border-slate-200"
              }`}
            />
          </div>
          

        <div className="mt-2 space-y-2">
  {checkingUsername && (
    <p className="text-xs text-amber-500">
      Checking username availability...
    </p>
  )}

  {!checkingUsername &&
    username.length >= 3 &&
    usernameAvailable === true && (
      <p className="text-xs text-emerald-500">
        ✓ @{username} is available
      </p>
    )}

  {!checkingUsername &&
    username.length >= 3 &&
    usernameAvailable === false && (
      <>
        <p className="text-xs text-red-500">
          @{username} is already taken.
        </p>

        {usernameSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {usernameSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setUsername(suggestion)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                @{suggestion}
              </button>
            ))}
          </div>
          
        )}
      </>
    )}

  <p
    className={`text-xs ${
      darkMode
        ? "text-slate-500"
        : "text-slate-500"
    }`}
  >
    This is how people will find you on Skyline.
  </p>
</div>
</div>


        {/* Bio */}

        <div>
          <label
            className={`mb-2 block text-sm font-medium ${
              darkMode
                ? "text-slate-300"
                : "text-slate-700"
            }`}
          >
            Bio
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-5 text-slate-400"
            />

            <textarea
              rows={4}
              value={bio}
              maxLength={180}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
              placeholder="Explorer • Coffee lover • Always searching for hidden gems ✨"
              className={`w-full rounded-2xl border pl-12 pr-4 pt-4 pb-4 resize-none transition focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 ${
                darkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-white border-slate-200"
              }`}
            />

            <div
              className={`mt-2 text-right text-xs ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-500"
              }`}
            >
              {bio.length}/180
            </div>
          </div>
        </div>
      </div>

      {/* Tip */}

      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "border-slate-800 bg-slate-900/40"
            : "border-slate-100 bg-slate-50"
        }`}
      >
        <h4 className="font-semibold mb-2">
          Pro Tip
        </h4>

        <p
          className={`text-sm ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Profiles with a picture and short
          bio are more likely to be followed
          by other travelers and appear more
          trustworthy when sharing places.
        </p>
      </div>
    </motion.div>
  );
}