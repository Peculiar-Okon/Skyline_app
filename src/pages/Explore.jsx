import React, { useState } from "react";
import { Search, Sun, User, MapPin, CalendarDays, Utensils, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [viewToggle, setViewToggle] = useState("browse");

  const scenicViews = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  ];

  const gridSections = [
    {
      title: "Trending Spots",
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      images: [
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      title: "Upcoming Events",
      icon: <CalendarDays className="w-5 h-5 text-emerald-600" />,
      images: [
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      title: "Food & Nightlife",
      icon: <Utensils className="w-5 h-5 text-emerald-600" />,
      images: [
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      title: "Hidden Gems",
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      
      {/* HEADER BAR */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full w-1/3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search spots, events, or restaurants..."
            className="bg-transparent outline-none w-full text-sm text-gray-700"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center text-gray-700 gap-1">
            <Sun className="w-5 h-5 text-yellow-400" /> <span>28°C | 3:45 PM</span>
          </div>
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </header>

      {/* PAGE TITLE */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Discover All Spots & Events Around You 🌆
        </h1>
      </div>

      {/* SCENIC VIEWS TOGGLE */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setViewToggle("browse")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            viewToggle === "browse"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Browse All Views
        </button>
        <button
          onClick={() => setViewToggle("snaps")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            viewToggle === "snaps"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          My Snaps
        </button>
      </div>

      {/* SCENIC VIEW GRID */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {scenicViews.map((img, i) => (
          <div key={i} className="relative group rounded-xl overflow-hidden shadow-md">
            <img
              src={img}
              alt=""
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
            <p className="absolute bottom-2 left-3 text-white text-sm opacity-0 group-hover:opacity-100 transition">
              Scenic View {i + 1}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRIDS */}
      {gridSections.map((section, idx) => (
        <div key={idx} className="max-w-6xl mx-auto mt-16 px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {section.images.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer">
                <img
                  src={img}
                  alt={section.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <Link
                    to="/explore"
                    className="text-white text-sm bg-emerald-500 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* NATIONWIDE HIGHLIGHTS */}
      <div className="max-w-6xl mx-auto mt-16 px-4 space-y-8">
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
              Join the celebration — music, parades, fireworks, and more 🎉
            </p>
            <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
              Learn More
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Top Beaches in Nigeria this Season 🏖️
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

      {/* OPTIONAL MAP VIEW */}
      <div className="max-w-6xl mx-auto mt-20 mb-16 px-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">City Map Snapshot 🗺️</h3>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764b43?auto=format&fit=crop&w=1200&q=80"
            alt="Map view"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
