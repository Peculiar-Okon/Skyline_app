// import React from "react";
// import Navbar from "../components/Home/Navbar.tsx";
// import { useState } from "react";
// import { MapPin, Sparkles, Compass, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useTheme } from "./../Theme/themeContext.tsx";
//   import { useTypewriter, Cursor } from "../components/Home/Typing.tsx";

// export default function LandingPage() {
//   const { darkMode } = useTheme();
//   const [hovered, setHovered] = useState<number | null>(null);

//   const cities = [
//     { name: "Lagos", desc: "Energy. Nightlife. Culture." },
//     { name: "Abuja", desc: "Clean. Calm. Modern architecture." },
//     { name: "Cape Town", desc: "Mountains meet ocean." },
//   ];

//     const text = "Your city. Reimagined.";
//     const typedText = useTypewriter(text, 70);

//     const isReimaginedStarted = typedText.includes("Reimagined");
//     const before = typedText.split("Reimagined")[0];
//     const after = isReimaginedStarted
//     ? typedText.slice(typedText.indexOf("Reimagined"))
//     : "";

//   return (
//     <div className={`${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"} transition-colors duration-300`}>
//         <Navbar />
//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

//         {/* glowing background blobs */}
//         <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
//         <div className="absolute w-[400px] h-[400px] bg-yellow-300/10 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />

//         <div className="text-center max-w-3xl z-10">

//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 mb-6">
//             <Sparkles size={16} className="text-emerald-400" />
//             <span className="text-sm">Discover cities like never before</span>
//           </div>

//             <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//                 {before}
//                 <span className="text-emerald-400">{after}</span>
//                 <Cursor />
//                 </h1>

//           {/* <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             {typedText}
//             <span className="text-emerald-400">
//                 {typedText === text ? "" : ""}
//             </span>
//             <Cursor />
//             </h1> */}

//           <p className="mt-6 text-slate-400 text-lg">
//             Skyline helps you explore hidden gems, curated places, and real experiences in cities around you.
//           </p>

//           <div className="mt-10 flex items-center justify-center gap-4">

//             <Link
//               to="/signup"
//               className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 transition transform hover:scale-105"
//             >
//               Get Started
//             </Link>

//             <button className="px-6 py-3 rounded-xl border border-slate-600 hover:border-emerald-400 transition">
//               Explore Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* CITIES */}
//       <section className="px-6 py-24 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Popular Cities
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           {cities.map((city, i) => (
//             <div
//               key={i}
//               onMouseEnter={() => setHovered(i)}
//               onMouseLeave={() => setHovered(null)}
//               className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer
//                 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}
//                 ${hovered === i ? "scale-105 shadow-xl border-emerald-400/40" : ""}`}
//             >
//               <div className="flex items-center gap-2 text-emerald-400">
//                 <MapPin size={18} />
//                 <span className="font-semibold">{city.name}</span>
//               </div>

//               <p className="mt-3 text-sm text-slate-400">{city.desc}</p>

//               <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
//                 Explore <ArrowRight size={14} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

    //   {/* WHY SKYLINE */}
    //   <section className="px-6 py-24 border-t border-slate-200/10">
    //     <div className="max-w-4xl mx-auto text-center">

    //       <Compass className="mx-auto text-emerald-400 mb-4" size={28} />

    //       <h2 className="text-3xl font-bold">
    //         More than maps. Real experiences.
    //       </h2>

    //       <p className="mt-4 text-slate-400">
    //         Skyline is built for discovery, not just navigation. We surface places you won’t find on Google Maps.
    //       </p>
    //     </div>
    //   </section>

    //   {/* PRICING TEASER */}
    //   <section className="px-6 py-24 max-w-5xl mx-auto">
    //     <div className="rounded-3xl p-10 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-yellow-300/5 text-center">

    //       <h3 className="text-2xl font-bold">
    //         Unlock premium city insights
    //       </h3>

    //       <p className="text-slate-400 mt-3">
    //         Personalized recommendations, hidden spots, and curated travel routes.
    //       </p>

    //       <Link
    //         to="/pricing"
    //         className="inline-block mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:scale-105 transition"
    //       >
    //         View Pricing
    //       </Link>
    //     </div>
    //   </section>

//       {/* CTA */}
//       <section className="px-6 py-24 text-center">
//         <h2 className="text-4xl font-bold">
//           Start exploring your city differently.
//         </h2>

//         <Link
//           to="/signup"
//           className="inline-block mt-8 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:scale-105 transition shadow-lg"
//         >
//           Get Started
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="px-6 py-10 border-t border-slate-800 text-center text-sm text-slate-500">
//         Skyline © {new Date().getFullYear()}
//       </footer>

//     </div>
//   );
// }

import React from "react";
import Navbar from "../components/Home/Navbar.tsx";
import { useState } from "react";
import { MapPin, Sparkles, Compass, ArrowRight, CalendarDays, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "./../Theme/themeContext.tsx";
import { useTypewriter, Cursor } from "../components/Home/Typing.tsx";
import lagosImage from "../assets/lagos img.jpg";
import abujaImage from "../assets/abuja img.jpg";
import capeTownImage from "../assets/cape town img.jpg";

export default function LandingPage() {
  const { darkMode } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);

  const cities = [
    {
      name: "Lagos",
      desc: "Beaches, nightlife, food & nonstop energy.",
      image: lagosImage
    },
    {
      name: "Abuja",
      desc: "Modern architecture, calm spaces, curated experiences.",
      image: abujaImage
    },
    {
      name: "Cape Town",
      desc: "Mountains, oceans, and breathtaking scenic routes.",
      image: capeTownImage
    },
  ];

  const text = "Your travel companion.";
  const typedText = useTypewriter(text, 70);

  const isReimaginedStarted = typedText.includes("companion.");
  const before = typedText.split("companion.")[0];
  const after = isReimaginedStarted
    ? typedText.slice(typedText.indexOf("companion."))
    : "";

  return (
    <div className={`${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"} transition-colors duration-300`}>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

        <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full top-10 left-10 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-300/10 blur-[120px] rounded-full bottom-10 right-10 animate-pulse" />

        <div className="text-center max-w-3xl z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 mb-6">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-sm">
              Explore top locations, scenic views, and hidden gems around you
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            {before}
            <span className="text-emerald-400">{after}</span>
            <Cursor />
          </h1>

          <p className="mt-6 text-slate-400 text-lg">
            Skyline helps you discover hidden gems, restaurants, events, and must-visit places in your city — all curated for real experiences, not random listings.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg transition transform hover:scale-105"
            >
              Explore Now
            </Link>

            <button className="px-6 py-3 rounded-xl border border-slate-600 hover:border-emerald-400 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES (from old cards, rewritten cleanly) */}
      <section className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

  {[
    {
      icon: <MapPin size={18} />,
      title: "Explore Your City",
      desc: "Find hidden gems, local favorites, and must-see spots around you.",
    },
    {
      icon: <Gem size={18} />,
      title: "Find Local Gems",
      desc: "Discover restaurants, hangouts, and unique experiences nearby.",
    },
    {
      icon: <CalendarDays size={18} />,
      title: "Events Near You",
      desc: "Stay updated with festivals, events, and city happenings.",
    },
    {
      icon: <Compass size={18} />,
      title: "Navigate Easily",
      desc: "Use smart discovery tools to reach places without stress.",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="group relative p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-xl
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                 hover:border-emerald-400/40"
    >
      {/* glow background */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-emerald-500/5 blur-xl" />

      {/* icon */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-xl
                      bg-emerald-500/10 text-emerald-400 mb-4
                      group-hover:scale-110 transition">
        {item.icon}
      </div>

      {/* title */}
      <h3 className="relative font-semibold text-lg mb-2 group-hover:text-emerald-400 transition">
        {item.title}
      </h3>

      {/* description */}
      <p className="relative text-sm text-slate-400 leading-relaxed">
        {item.desc}
      </p>

      {/* bottom glow line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400
                      group-hover:w-full transition-all duration-300" />
    </div>
  ))}
</section>

      {/* CITIES */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-12">
    Popular Cities to Explore
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {cities.map((city, i) => (
      <div
        key={i}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer
                   border border-slate-800/40 hover:border-emerald-400/40
                   transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >

        {/* image (you must pass image in cities array) */}
        <img
          src={city.image}
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition duration-700"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* content */}
        <div className="absolute bottom-0 p-5 z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin size={18} className="text-emerald-400" />
            {city.name}
          </h3>

          <p className="text-slate-300 text-sm mt-1">
            {city.desc}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-emerald-400 text-sm">
            Explore <ArrowRight size={14} />
          </div>
        </div>

        {/* hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-emerald-500/10 transition" />
      </div>
    ))}
  </div>
</section>
      {/* <section className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Cities to Explore
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer
                ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}
                ${hovered === i ? "scale-105 shadow-xl border-emerald-400/40" : ""}`}
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <MapPin size={18} />
                <span className="font-semibold">{city.name}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{city.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                Explore <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section> */}

            {/* WHY SKYLINE */}
      <section className="px-6 py-24 border-t border-slate-200/10">
        <div className="max-w-4xl mx-auto text-center">

          <Compass className="mx-auto text-emerald-400 mb-4" size={28} />

          <h2 className="text-3xl font-bold">
            More than maps. Real experiences.
          </h2>

          <p className="mt-4 text-slate-400">
            Skyline is built for discovery, not just navigation. We surface places you won’t find on Google Maps.
          </p>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="rounded-3xl p-10 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-yellow-300/5 text-center">

          <h3 className="text-2xl font-bold">
            Unlock premium city insights
          </h3>

          <p className="text-slate-400 mt-3">
            Personalized recommendations, hidden spots, and curated travel routes.
          </p>

          <Link
            to="/pricing"
            className="inline-block mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:scale-105 transition"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to explore your city like never before?
        </h2>

        <p className="mt-4 text-slate-400">
          Discover hidden places, curated experiences, and real-world adventures around you.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:scale-105 transition shadow-lg"
        >
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-20 bg-slate-950 text-sm relative overflow-hidden">

  {/* subtle glow background */}
  <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -top-40 -left-40" />
  <div className="absolute w-[400px] h-[400px] bg-emerald-300/5 blur-[120px] rounded-full bottom-0 right-0" />

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

    {/* Brand */}
    <div>
      <h3 className="text-2xl font-bold text-emerald-400 mb-4">Skyline</h3>
      <p className="text-slate-400 leading-relaxed max-w-sm">
        Discover cities through hidden gems, real experiences, and curated travel routes designed for exploration, not scrolling.
      </p>
    </div>

    {/* Explore */}
    <div>
      <h4 className="text-slate-200 font-semibold mb-4">Explore</h4>
      <ul className="space-y-3 text-slate-400">
        {["Features", "Popular Cities", "Pricing", "About"].map((item) => (
          <li
            key={item}
            className="hover:text-emerald-400 transition cursor-pointer w-fit"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* CTA */}
    <div>
      <h4 className="text-slate-200 font-semibold mb-4">Stay in the loop</h4>
      <p className="text-slate-400 mb-6">
        New cities, new experiences, no spam.
      </p>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300 transition">
          Twitter
        </button>

        <button className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300 transition">
          Instagram
        </button>
      </div>
    </div>

  </div>

  {/* bottom bar */}
  <div className="relative mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">

    <p>© {new Date().getFullYear()} Skyline</p>

    <div className="flex gap-6">
      <span className="hover:text-emerald-400 cursor-pointer transition">Privacy</span>
      <span className="hover:text-emerald-400 cursor-pointer transition">Terms</span>
      <span className="hover:text-emerald-400 cursor-pointer transition">Contact</span>
    </div>

  </div>
</footer>
      {/* <footer className="px-6 py-10 border-t border-slate-800 text-center text-sm text-slate-500">
        Skyline © {new Date().getFullYear()}
      </footer> */}
    </div>
  );
}