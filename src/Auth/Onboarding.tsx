

import WelcomeStep from "../components/Onboarding/WelcomeStep";
import InterestsStep from "../components/Onboarding/InterestStep";
import PreferencesStep from "../components/Onboarding/PreferenceStep";
import LocationStep from "../components/Onboarding/LocationStep";
import ProfileStep from "../components/Onboarding/ProfileStep";
import ReviewStep from "../components/Onboarding/ReviewStep";
import ProgressBar from "../components/Onboarding/ProgressBar";
import Navigation from "../components/Onboarding/Navigation";
import GoalsStep from "../components/Onboarding/GoalsStep";

import { useTheme } from "../Theme/themeContext";
import useOnboarding from "../hooks/useOnboarding";

const TOTAL_STEPS = 7;

const titles = [
  "Welcome to Skyline",
  "What brings you here?",
    "Your interests",
  "Your travel style",
  "Choose your location",
  "Create your profile",
  "Review & Finish",
];

const subtitles = [
  "Let's build a personalized travel experience.",
    "Tell us your goals.",
  "We'll recommend places you'll actually love.",
  "Help Skyline understand how you explore.",
  "Find amazing places around you.",
  "Tell other explorers who you are.",
  "Everything looks good. Ready to explore?",
];

export default function Onboarding() {
  const { darkMode } = useTheme();

  const {
    step,
    data,

    saving,
    stepValid,
    toggleGoal,

    nextStep,
    previousStep,
    finishOnboarding,
    skipOnboarding,
    uploadingAvatar,

      checkingUsername,
  usernameAvailable,
  usernameSuggestions,


    toggleInterest,

    setVibe,
    setDuration,
    setSocial,

    setLocation,
    detectLocation,
    loadingLocation,

    setUsername,
    setFullName,
    setBio,
    uploadAvatar,
  } = useOnboarding();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Progress */}
        <ProgressBar
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          title={titles[step]}
          subtitle={subtitles[step]}
        />

        {/* Step Card */}
        <div
          className={`mt-10 rounded-3xl border p-8 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900/40 border-slate-800"
              : "bg-white border-slate-200 shadow-xl"
          }`}
        >
          {step === 0 && (
            <WelcomeStep />
          )}

          {step === 1 && (
            <GoalsStep
                goals={data.goals}
                toggleGoal={toggleGoal}
            />
            )}

          {step === 2 && (
            <InterestsStep
              interests={data.interests}
              toggleInterest={toggleInterest}
            />
          )}

          {step === 3 && (
            <PreferencesStep
              vibe={data.vibe}
              duration={data.duration}
              companion={data.social}
              setVibe={setVibe}
              setDuration={setDuration}
              setCompanion={setSocial}
            />
          )}

          {step === 4 && (
            <LocationStep
              location={data.location}
              setLocation={setLocation}
              detectLocation={detectLocation}
              loadingLocation={loadingLocation}
            />
          )}

          {step === 5 && (
            <ProfileStep
              username={data.username}
              fullName={data.fullName}
              bio={data.bio}
              avatar_url={data.avatar_url}
              setUsername={setUsername}
              setFullName={setFullName}
              setBio={setBio}
              uploadAvatar={uploadAvatar}
                checkingUsername={checkingUsername}
                usernameAvailable={usernameAvailable}
                usernameSuggestions={usernameSuggestions}
                 uploadingAvatar={uploadingAvatar}
            />
          )}

          {step === 6 && (
            <ReviewStep
              fullName={data.fullName}
              username={data.username}
              bio={data.bio}
              avatarUrl={data.avatar_url}
              goals={data.goals}
              interests={data.interests}
              vibe={data.vibe}
              duration={data.duration}
              social={data.social}
              location={data.location}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <Navigation
          step={step}
          totalSteps={TOTAL_STEPS}
          canProceed={stepValid}
          loading={saving}
          onBack={previousStep}
          onNext={nextStep}
          onSkip={skipOnboarding}
          onFinish={finishOnboarding}
        />
      </div>
    </div>
  );
}

