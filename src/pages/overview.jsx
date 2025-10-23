import React from "react";
import {
  Search,
  CloudSun,
  Clock,
  User,
  CalendarDays,
  MapPin,
  Camera,
  TrendingUp,
  Utensils,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-50 text-slate-800 relative pb-24">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200 gap-4">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-full px-4 py-2 gap-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search city, event, or spot..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {/* Weather & Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CloudSun className="w-5 h-5 text-emerald-500" />
            <span>27°C</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-5 h-5 text-emerald-500" />
            <span>12:30 PM</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition">
          <User className="w-6 h-6" />
          <span className="font-semibold">My Profile</span>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="w-full h-56 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center relative mt-4 rounded-2xl mx-auto max-w-6xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/40 to-slate-800/30" />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Jazz Festival Tonight in Lagos 
          </h2>
          <p className="text-sm mt-1">Don’t miss the vibes and energy </p>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 mt-10 px-4">
        {[
          { title: "Events", value: "5", icon: <CalendarDays className="w-5 h-5" /> },
          { title: "Saved Spots", value: "12", icon: <MapPin className="w-5 h-5" /> },
          { title: "New Snaps", value: "7", icon: <Camera className="w-5 h-5" /> },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="text-emerald-600 mb-2">{stat.icon}</div>
            <h3 className="font-bold text-lg">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* MINI PREVIEW - RECENT SNAPS */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h3 className="text-xl font-bold mb-4">Recent Snaps </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((snap) => (
            <Link
              to="/my-views"
              key={snap}
              className="h-32 bg-gray-200 rounded-xl overflow-hidden group relative shadow-md hover:shadow-lg transition"
              style={{
                backgroundImage: `url(https://source.unsplash.com/random/300x300?city,${snap})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
            </Link>
          ))}
        </div>
      </div>



      {/* TRENDING / EVENTS / FOOD / HIDDEN GEMS */}
<div className="max-w-6xl mx-auto mt-16 px-4">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {[
      {
        title: "Trending",
        img: "https://images.unsplash.com/photo-1526481280690-9d7d2a74de47?auto=format&fit=crop&w=600&q=80",
        link: "/explore",
      },
      {
        title: "Upcoming Events",
        img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=600&q=80",
        link: "/explore",
      },
      {
        title: "Food & Nightlife",
        img: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=600&q=80",
        link: "/explore",
      },
      {
        title: "Hidden Gems",
        img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",
        link: "/explore",
      },
    ].map((card, i) => (
      <Link
        to={card.link}
        key={i}
        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
      >
        {/* Background image */}
        <div
          className="h-44 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.img})` }}
        ></div>

        {/* Dark overlay + text */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-4 text-white">
          <h3 className="font-semibold text-sm sm:text-base">{card.title}</h3>
          <span className="opacity-0 group-hover:opacity-100 text-emerald-300 text-xs font-medium mt-1 transition">
            See More →
          </span>
        </div>
      </Link>
    ))}
  </div>
</div>

      {/* NATIONWIDE HIGHLIGHTS */}
<div className="max-w-6xl mx-auto mt-16 px-4 space-y-8">

  {/* FEATURED FESTIVAL HERO CARD */}
  <div
    className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-lg group"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1573508295120-9053812c6a3e?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>
    <div className="absolute bottom-0 p-6 text-white z-10">
      <h4 className="text-2xl font-bold">Independence Festival in Abuja 🇳🇬</h4>
      <p className="text-sm text-gray-100 mt-2">
        Join the celebration — music, parades, fireworks, and more 
      </p>
      <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
        Learn More
      </button>
    </div>
  </div>

  {/* BEACHES CARDS SECTION */}
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Top Beaches in Nigeria this Season 
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {[
        {
          name: "Elegushi Beach, Lagos",
          img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Atican Beach, Lekki",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Ibeno Beach, Akwa Ibom",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Bar Beach, Victoria Island",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
      ].map((beach, i) => (
        <div
          key={i}
          className="relative h-40 rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition"
        >
          <img
            src={beach.img}
            alt={beach.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>
          <p className="absolute bottom-2 left-3 text-white text-sm font-medium">
            {beach.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* MAP SNAPSHOT */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h3 className="text-xl font-bold mb-4">City Map Snapshot </h3>
        <div className="h-64 bg-gray-200 rounded-2xl shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764b43?auto=format&fit=crop&w=1400&q=80"
            alt="Map Snapshot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition">
        <Camera className="w-6 h-6" />
      </button>
    </div>
  );
}

