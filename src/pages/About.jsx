import React from "react";
import Navbar from "../components/Navbar";
import '../styles/index.css';

function About() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-500 to-slate-400 text-transparent bg-clip-text">
          About Skyline
        </h1>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Skyline is your ultimate city guide, designed to help you explore urban spaces with ease, insight, and enjoyment. Our goal is simple: to make every city feel familiar and every adventure effortless.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          With Skyline, you can discover hidden gems, scenic spots, local favorites, and must-visit attractions. We curate the best locations, events, and experiences to ensure that whether you're a local or a visitor, your city exploration is seamless and exciting.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Our mission is to connect people with the heart of their cities. From interactive maps and detailed guides to real-time updates on events and local happenings, Skyline empowers you to navigate, discover, and enjoy your surroundings in ways that are both meaningful and memorable.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Skyline started as a vision to make urban life more accessible and enjoyable. We noticed that cities are full of hidden stories, experiences, and spots that most people miss. Our platform exists to reveal these treasures, helping users experience their cities fully and authentically.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Every feature of Skyline is designed with simplicity and clarity in mind. From intuitive navigation to curated recommendations, we prioritize user experience so you can focus on what matters most—exploring and enjoying the city.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          We believe that every city has a story, and every person has a journey. Skyline bridges the gap between the two, offering tools, insights, and inspiration to make your city adventures extraordinary. Whether it's a quiet cafe tucked away in an alley, a stunning park with panoramic views, or an exciting local event, Skyline ensures you never miss out.
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Our vision for the future is to continuously enhance the way people experience cities, integrating innovative features, real-time updates, and community insights, all while maintaining a sleek, modern, and user-friendly platform.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Skyline isn’t just an app—it’s your companion for discovery, exploration, and meaningful city experiences. Wherever you are, Skyline helps you connect with your surroundings, uncover hidden treasures, and truly experience the essence of your city.
        </p>
      </section>

      <footer className="bg-gray-100 text-gray-600 py-10 px-6 text-center border-t border-gray-200">
        &copy; {new Date().getFullYear()} Skyline. All rights reserved.
      </footer>
    </div>
  );
}

export default About;


