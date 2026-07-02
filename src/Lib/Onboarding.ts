// src/lib/onboarding.ts

export const TOTAL_STEPS = 7;

export const GOALS = [
  {
    id: "explore",
    title: "Explore Hidden Gems",
    description:
      "Discover places most tourists never find.",
    icon: "🧭",
  },
  {
    id: "food",
    title: "Food Adventures",
    description:
      "Restaurants, cafés and local cuisine.",
    icon: "🍜",
  },
  {
    id: "events",
    title: "Events & Nightlife",
    description:
      "Concerts, festivals and exciting events.",
    icon: "🎉",
  },
  {
    id: "nature",
    title: "Nature Escapes",
    description:
      "Parks, mountains and beautiful scenery.",
    icon: "🌿",
  },
  {
    id: "photography",
    title: "Photography",
    description:
      "Instagram-worthy locations.",
    icon: "📷",
  },
  {
    id: "weekend",
    title: "Weekend Trips",
    description:
      "Perfect short getaways.",
    icon: "🏖️",
  },
];

export const VIBES = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Romantic",
  "Modern",
  "Family",
];

export const DURATIONS = [
  "30-60 Minutes",
  "Half Day",
  "Full Day",
  "Weekend",
];

export const SOCIALS = [
  "Solo",
  "Friends",
  "Partner",
  "Family",
];

export const POPULAR_CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Accra",
  "Cape Town",
  "Nairobi",
  "London",
  "Paris",
  "New York",
];

// export interface OnboardingData {
//   goals: string[];

//   vibe: string;

//   duration: string;

//   social: string;

//   city: string;

//   coords: {
//     lat: number;
//     lng: number;
//   } | null;

//   username: string;

//   bio: string;

//   avatar_url: string;
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

