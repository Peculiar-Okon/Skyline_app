import React from "react";
import '../styles/index.css';
import Navbar from "../components/Navbar";
import bg from '../assets/rohit-tandon-qK6898jepEU-unsplash.jpg'
import { MapPin , CalendarDays , Gem , Compass ,  Twitter, Instagram, Facebook } from "lucide-react";
import CityCard from "../components/cityCard.jsx";
import lagosImg from "../assets/chromatograph-AKG-c-oDLvU-unsplash.jpg";
import abujaImg from "../assets/emmanuel-ikwuegbu-zsR1K2ZeZsI-unsplash.jpg";
import capeTownImg from "../assets/kyle-lakey-6ycah-J0X6A-unsplash.jpg";
import { Link } from "react-router-dom";


function HeroSection (){
    return(
        <>
        <Navbar/>
        <div className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat bg-zoom"
     style={{ backgroundImage: `url(${bg})` }}>
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/80 to-slate-100/50" />
  
  <div className="relative z-10 text-white text-center py-24">
    <h1 className="text-5xl mt-24 text-gray-800 font-bold">Discover Your City’s Hidden Gems</h1>
    <p className="text-2xl text-gray-800 mt-8">Explore top locations, scenic views, and more.</p>
    <Link to = "/Signup" >
    <button className="mt-8 bg-emerald-500 text-white px-6 py-2 rounded-xl top-10">Explore Now</button>
    </ Link>
  </div>
</div>

          <section className=" py-16 bg-gradient-to-b from-emerald-100 to-slate-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1 - Explore Your City */}
        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-200 via-gray-100 to-gray-300 shadow-lg">
          <div className="bg-white p-6 rounded-[inherit]">
          <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Explore Your City
          </h3>
          <p className="text-gray-600">
            Find hidden gems, local favorites, and must-see spots around you.
          </p>
          </div>
        </div>

        {/* Card 2 - You go drop am */}
                <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-200 via-gray-100 to-gray-300 shadow-lg">
          <div className="bg-white p-6 rounded-[inherit]">
          <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <Gem className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
             Find Local Gems
          </h3>
          <p className="text-gray-600">
            Discover restaurants, hangouts and parks near you or afar.
          </p>
          </div>
        </div>

        {/* Card 3 - Still empty for you */}
                        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-200 via-gray-100 to-gray-300 shadow-lg">
          <div className="bg-white p-6 rounded-[inherit]">
          <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <CalendarDays className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
             Events Near You
          </h3>
          <p className="text-gray-600">
            Stay in the loop with upcoming happenings, events and/or festivals.
          </p>
          </div>
        </div>

        {/* Card 4 - Do your magic */}
                        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-200 via-gray-100 to-gray-300 shadow-lg">
          <div className="bg-white p-6 rounded-[inherit]">
          <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <Compass className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
             Navigate Easily
          </h3>
          <p className="text-gray-600">
            Use interactive maps and directions to reach spots without stress.
          </p>
          </div>
        </div>

      </div>
    </section>

        </>
    );
};

function PopularCities () {
    const cities = [
    {
      city: "Lagos",
      image: lagosImg,
      description: "Beaches, nightlife, food & energy",
    },
    {
      city: "Abuja",
      image: abujaImg,
      description: "Modern markets, art, architecture",
    },
    {
      city: "Cape Town",
      image: capeTownImg,
      description: "Mountains, oceans, colorful scenes",
    },
  ];

  return(
        <section className="py-16 px-4 md:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
         Popular Cities to Explore
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {cities.map((c, i) => (
          <CityCard key={i} {...c} />
        ))}
      </div>
    </section>
  )
}

function Action (){
  return(
    <section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center text-grey-800">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00A86B] to-[#C0C0C0] text-transparent bg-clip-text">
      Ready to Explore Your City Like Never Before?
    </h2>
    <p className="text-[#A9A9A9]] text-lg md:text-xl mb-8">
      Discover hidden gems, events, and experiences waiting for you.
    </p>
    <div className="flex justify-center gap-4">
      <Link to= '/onboarding'>
      <button className="bg-white text-[#00A86B] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </Link>

    <Link to = '/forgotPswd'>
      <button className="border border-white font-semibold px-6 py-3 rounded-xl text-[#00A86B] shadow-md hover:bg-gray-200 transition-all">
        Learn More
      </button>
      </Link>
    </div>
  </div>
</section>

  )
}

function Footer (){
return (
  <footer className=  "bg-white text-gray-600 py-10 px-6 border-t border-gray-200">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Brand */}
    <div className="shadow-md rounded-lg p-4">
      <h3 className="text-2xl font-bold text-[#00A86B] mb-2">Skyline</h3>
      <p className="text-sm">
        Discover the beauty of your city. Find top locations, scenic views, and hidden gems — all in one place.
      </p>
    </div>

    {/* Links */}
    <div className="flex flex-col gap-2 shadow-md rounded-lg p-4">
      <h4 className="font-semibold text-gray-800 mb-2">Quick Links</h4>
      <a href="#" className="hover:text-[#00A86B] transition">Explore</a>
      <a href="#" className="hover:text-[#00A86B] transition">Events</a>
      <a href="#" className="hover:text-[#00A86B] transition">About</a>
      <a href="#" className="hover:text-[#00A86B] transition">Contact</a>
    </div>

    {/* Socials */}
<div className="shadow-md rounded-lg p-4">
  <h4 className="font-semibold text-gray-800 mb-2">Follow Us</h4>
  <div className="flex gap-4">
    <a href="#" className="text-gray-600 hover:text-[#00A86B] transition">
      <Twitter className="w-5 h-5" />
    </a>
    <a href="#" className="text-gray-600 hover:text-[#00A86B] transition">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="#" className="text-gray-600 hover:text-[#00A86B] transition">
      <Facebook className="w-5 h-5" />
    </a>
  </div>
</div>


  </div>

  {/* Bottom bar */}
  <div className="text-center text-xs text-gray-400 mt-8">
    &copy; {new Date().getFullYear()} Skyline. All rights reserved.
  </div>
</footer>

)

}

export default function Home(){
  return(
      <div>
      <HeroSection />
      <PopularCities />
      <Action />
      <Footer />
    </div>
  )
};



// import React from "react";
// import '../styles/index.css';
// import Navbar from "../components/Navbar";
// import bg from '../assets/rohit-tandon-qK6898jepEU-unsplash.jpg'
// import { MapPin , CalendarDays , Gem , Compass , Twitter, Instagram, Facebook } from "lucide-react";
// import CityCard from "../components/cityCard.jsx";
// import lagosImg from "../assets/chromatograph-AKG-c-oDLvU-unsplash.jpg";
// import abujaImg from "../assets/emmanuel-ikwuegbu-zsR1K2ZeZsI-unsplash.jpg";
// import capeTownImg from "../assets/kyle-lakey-6ycah-J0X6A-unsplash.jpg";
// import { Link } from "react-router-dom";


// function HeroSection (){
//     return(
//         <>
//         <Navbar/>
//         <div className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat"
//      style={{ backgroundImage: `url(${bg})` }}>
//   {/* Overlay gradient for nightlife feel */}
//   <div className="absolute inset-0 bg-gradient-to-r from-[#0B1210]/90 to-[#1A1A1A]/70" />
  
//   <div className="relative z-10 text-center py-24">
//     <h1 className="text-5xl mt-24 text-white font-bold drop-shadow-lg">
//       Discover Your City’s Hidden Gems
//     </h1>
//     <p className="text-2xl text-gray-300 mt-8">
//       Explore top locations, scenic views, and more.
//     </p>
//     <Link to = "/Signup" >
//     <button className="mt-8 bg-emerald-600 hover:bg-[#32FCA9] text-white px-6 py-2 rounded-xl shadow-md transition-all">
//       Explore Now
//     </button>
//     </ Link>
//   </div>
// </div>

//           <section className="py-16 bg-gradient-to-b from-[#0B1210] to-[#1A1A1A] pt-20">
//       <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        
//         {/* Card 1 */}
//         <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-700 via-[#1A1A1A] to-slate-700 shadow-lg">
//           <div className="bg-[#121212] p-6 rounded-[inherit]">
//           <div className="bg-emerald-900 w-12 h-12 flex items-center justify-center rounded-full mb-4">
//             <MapPin className="w-6 h-6 text-emerald-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-white mb-2">
//             Explore Your City
//           </h3>
//           <p className="text-gray-400">
//             Find hidden gems, local favorites, and must-see spots around you.
//           </p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-700 via-[#1A1A1A] to-slate-700 shadow-lg">
//           <div className="bg-[#121212] p-6 rounded-[inherit]">
//           <div className="bg-emerald-900 w-12 h-12 flex items-center justify-center rounded-full mb-4">
//             <Gem className="w-6 h-6 text-emerald-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-white mb-2">
//              Find Local Gems
//           </h3>
//           <p className="text-gray-400">
//             Discover restaurants, hangouts and parks near you or afar.
//           </p>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-700 via-[#1A1A1A] to-slate-700 shadow-lg">
//           <div className="bg-[#121212] p-6 rounded-[inherit]">
//           <div className="bg-emerald-900 w-12 h-12 flex items-center justify-center rounded-full mb-4">
//             <CalendarDays className="w-6 h-6 text-emerald-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-white mb-2">
//              Events Near You
//           </h3>
//           <p className="text-gray-400">
//             Stay in the loop with upcoming happenings, events and/or festivals.
//           </p>
//           </div>
//         </div>

//         {/* Card 4 */}
//         <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-700 via-[#1A1A1A] to-slate-700 shadow-lg">
//           <div className="bg-[#121212] p-6 rounded-[inherit]">
//           <div className="bg-emerald-900 w-12 h-12 flex items-center justify-center rounded-full mb-4">
//             <Compass className="w-6 h-6 text-emerald-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-white mb-2">
//              Navigate Easily
//           </h3>
//           <p className="text-gray-400">
//             Use interactive maps and directions to reach spots without stress.
//           </p>
//           </div>
//         </div>

//       </div>
//     </section>

//         </>
//     );
// };

// function PopularCities () {
//     const cities = [
//     {
//       city: "Lagos",
//       image: lagosImg,
//       description: "Beaches, nightlife, food & energy",
//     },
//     {
//       city: "Abuja",
//       image: abujaImg,
//       description: "Modern markets, art, architecture",
//     },
//     {
//       city: "Cape Town",
//       image: capeTownImg,
//       description: "Mountains, oceans, colorful scenes",
//     },
//   ];

//   return(
//         <section className="py-16 px-4 md:px-16 bg-[#0B1210]">
//       <h2 className="text-3xl font-bold text-center text-white mb-10">
//          Popular Cities to Explore
//       </h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {cities.map((c, i) => (
//           <CityCard key={i} {...c} />
//         ))}
//       </div>
//     </section>
//   )
// }

// function Action (){
//   return(
//     <section className="bg-[#121212] py-16 px-6">
//   <div className="max-w-6xl mx-auto text-center">
//     <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-[#C0C0C0] text-transparent bg-clip-text">
//       Ready to Explore Your City Like Never Before?
//     </h2>
//     <p className="text-gray-400 text-lg md:text-xl mb-8">
//       Discover hidden gems, events, and experiences waiting for you.
//     </p>
//     <div className="flex justify-center gap-4">
//       <Link to= '/Signup'>
//       <button className="bg-emerald-600 hover:bg-[#32FCA9] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all">
//         Get Started
//       </button>
//     </Link>
//       <button className="border border-emerald-500 font-semibold px-6 py-3 rounded-xl text-emerald-400 hover:text-[#32FCA9] shadow-md hover:bg-[#1A1A1A] transition-all">
//         Learn More
//       </button>
//     </div>
//   </div>
// </section>

//   )
// }

// function Footer (){
// return (
//   <footer className=  "bg-[#0B1210] text-gray-400 py-10 px-6 border-t border-gray-800">
//   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

//     {/* Brand */}
//     <div className="p-4">
//       <h3 className="text-2xl font-bold text-emerald-400 mb-2">Skyline</h3>
//       <p className="text-sm">
//         Discover the beauty of your city. Find top locations, scenic views, and hidden gems — all in one place.
//       </p>
//     </div>

//     {/* Links */}
//     <div className="flex flex-col gap-2 p-4">
//       <h4 className="font-semibold text-white mb-2">Quick Links</h4>
//       <a href="#" className="hover:text-emerald-400 transition">Explore</a>
//       <a href="#" className="hover:text-emerald-400 transition">Events</a>
//       <a href="#" className="hover:text-emerald-400 transition">About</a>
//       <a href="#" className="hover:text-emerald-400 transition">Contact</a>
//     </div>

//     {/* Socials */}
// <div className="p-4">
//   <h4 className="font-semibold text-white mb-2">Follow Us</h4>
//   <div className="flex gap-4">
//     <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
//       <Twitter className="w-5 h-5" />
//     </a>
//     <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
//       <Instagram className="w-5 h-5" />
//     </a>
//     <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
//       <Facebook className="w-5 h-5" />
//     </a>
//   </div>
// </div>


//   </div>

//   {/* Bottom bar */}
//   <div className="text-center text-xs text-gray-500 mt-8">
//     &copy; {new Date().getFullYear()} Skyline. All rights reserved.
//   </div>
// </footer>

// )

// }

// export default function Home(){
//   return(
//       <div className="bg-[#0B1210]">
//       <HeroSection />
//       <PopularCities />
//       <Action />
//       <Footer />
//     </div>
//   )
// };
