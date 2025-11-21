import React from "react";
import '../styles/index.css';
import ThemeToggle from "./themeToggle";
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from "react-router-dom";

function Navbar (){
    const [isOpen, setIsOpen] = useState(false);
      const toggleMenu = () => setIsOpen(!isOpen);
    return(
        <>
         <nav className="w-[80%] bg-gray-100 shadow-md fixed top-4 left-[9%] z-50 rounded-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex">
        <div>
        <svg width="50" height="50" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
         <linearGradient id="jade-silver" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
           <stop stop-color="#00A86B"/>
           <stop offset="1" stop-color="#C0C0C0"/>
         </linearGradient>
         </defs>
        <path d="M60 0C36.6 0 18 18.6 18 42C18 70 60 120 60 120C60 120 102 70 102 42C102 18.6 83.4 0 60 0Z" fill="url(#jade-silver)"/>
         <g fill="white">
         <rect x="45" y="50" width="6" height="20"/>
         <rect x="54" y="40" width="6" height="30"/>
         <rect x="63" y="47" width="6" height="23"/>
         <rect x="72" y="55" width="6" height="15"/>
        </g>
        </svg>
        
        </div>
        <div className=" pt-2 pl-2 text-2xl font-bold bg-gradient-to-r from-jade to-silver bg-clip-text text-transparent top-8">Skyline</div>
        </div>

        
        {/* Nav Links */}
        <div className="hidden md:flex space-x-8">
          
          <Link to="/Signup" className="text-silver-700 hover:text-jade transform transition-transform duration-300 hover:scale-105">Sign-up</Link>
          <Link to="/Login" className="text-silver-700 hover:text-jade transform transition-transform duration-300 hover:scale-105">Log-in</Link>
          <Link to="/About" className="text-silver-700 hover:text-jade transform transition-transform duration-300 hover:scale-105">About</Link>
        </div>

        

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

      </div>

            {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-md">
          <Link to= "/" className="block py-2 text-gray-700 hover:text-jade">Home</Link>
          <Link to= "/Signup" className="block py-2 text-gray-700 hover:text-jade">Sign Up</Link>
          <Link to= "/Login" className="block py-2 text-gray-700 hover:text-jade">Log In</Link>
          <Link to= "/About" className="block py-2 text-gray-700 hover:text-jade">About</Link>
        </div>
      )}

    </nav>
        </>
    );
};

export default Navbar;

// import React, { useState } from "react";
// import "../styles/index.css";
// import ThemeToggle from "./themeToggle";
// import { HiMenu, HiX } from "react-icons/hi";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <nav className="w-[80%] bg-gray-100 dark:bg-gray-900 shadow-md fixed top-4 left-[9%] z-50 rounded-[50px] transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div>
//               <svg
//                 width="50"
//                 height="50"
//                 viewBox="0 0 120 120"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <defs>
//                   <linearGradient
//                     id="jade-silver"
//                     x1="0"
//                     y1="0"
//                     x2="120"
//                     y2="120"
//                     gradientUnits="userSpaceOnUse"
//                   >
//                     <stop stopColor="#00A86B" />
//                     <stop offset="1" stopColor="#C0C0C0" />
//                   </linearGradient>
//                 </defs>
//                 <path
//                   d="M60 0C36.6 0 18 18.6 18 42C18 70 60 120 60 120C60 120 102 70 102 42C102 18.6 83.4 0 60 0Z"
//                   fill="url(#jade-silver)"
//                 />
//                 <g fill="white">
//                   <rect x="45" y="50" width="6" height="20" />
//                   <rect x="54" y="40" width="6" height="30" />
//                   <rect x="63" y="47" width="6" height="23" />
//                   <rect x="72" y="55" width="6" height="15" />
//                 </g>
//               </svg>
//             </div>

//             <div className="pt-2 pl-2 text-2xl font-bold bg-gradient-to-r from-jade to-silver bg-clip-text text-transparent">
//               Skyline
//             </div>
//           </div>

//           <ThemeToggle />

//           {/* Nav Links (Desktop) */}
//           <div className="hidden md:flex space-x-8">
//             <a
//               href="#"
//               className="text-gray-700 dark:text-gray-300 hover:text-jade dark:hover:text-jade transform transition-transform duration-300 hover:scale-105"
//             >
//               Sign-up
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 dark:text-gray-300 hover:text-jade dark:hover:text-jade transform transition-transform duration-300 hover:scale-105"
//             >
//               Log-in
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 dark:text-gray-300 hover:text-jade dark:hover:text-jade transform transition-transform duration-300 hover:scale-105"
//             >
//               About
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={toggleMenu}>
//               {isOpen ? (
//                 <HiX className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//               ) : (
//                 <HiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav Links */}
//         {isOpen && (
//           <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
//             <a
//               href="#"
//               className="block py-2 text-gray-700 dark:text-gray-200 hover:text-jade dark:hover:text-jade"
//             >
//               Home
//             </a>
//             <a
//               href="#"
//               className="block py-2 text-gray-700 dark:text-gray-200 hover:text-jade dark:hover:text-jade"
//             >
//               Explore
//             </a>
//             <a
//               href="#"
//               className="block py-2 text-gray-700 dark:text-gray-200 hover:text-jade dark:hover:text-jade"
//             >
//               Events
//             </a>
//             <a
//               href="#"
//               className="block py-2 text-gray-700 dark:text-gray-200 hover:text-jade dark:hover:text-jade"
//             >
//               About
//             </a>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

// export default Navbar;
