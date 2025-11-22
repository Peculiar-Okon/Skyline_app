
// import React, { useState } from "react";
// import "../styles/index.css";
// import {
//   MapPin,
//   CalendarDays,
//   Compass,
//   Gem,
//   Hotel,
//   Plane,
//   Home,
//   GraduationCap,
//   Landmark,
//   Camera,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Clock,
//   BarChart2,
//   Building2,
//   Stethoscope,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSections, setOpenSections] = useState({
//     traveler: false,
//     essentials: false,
//     views: false,
//   });

//   const toggleSidebar = () => setCollapsed(!collapsed);

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   return (
    
//     <div
//       className={`${
//         collapsed ? "w-20" : "w-64"
//       } h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-lg`}
//     >
//       {/* Top Logo Section */}
//       <div className="flex items-center justify-between p-4">
//         {!collapsed && (
//           <h1 className="text-2xl font-bold text-emerald-600 tracking-wide">
//             Skyline
//           </h1>
//         )}
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-full hover:bg-emerald-50 transition"
//         >
//           {collapsed ? (
//             <ChevronRight className="text-emerald-600" />
//           ) : (
//             <ChevronLeft className="text-emerald-600" />
//           )}
//         </button>
//       </div>

//       {/* Current Location */}
//       {!collapsed && (
//         <div className="px-4 pb-2 text-sm text-gray-500 flex items-center gap-2 border-b border-gray-100 pb-3">
//           <MapPin size={16} className="text-emerald-600" />
//           <span>Lagos, Nigeria</span>
//         </div>
//       )}

//       {/* Nav Section */}
//       <nav className="mt-4 flex-1 overflow-y-auto px-2 space-y-2">
//         <MenuItem icon={<Home size={20} />} label="Overview" to="/overview" collapsed={collapsed} />
//         <MenuItem icon={<Compass size={20} />} label="Explore" to="/Explore" collapsed={collapsed} />
//         <MenuItem icon={<CalendarDays size={20} />} label="Events" collapsed={collapsed} />
//         <MenuItem icon={<MapPin size={20} />} label="Map View" collapsed={collapsed} />

//         {/* Traveller's Hub */}
//         <DropdownSection
//           icon={<Gem size={20} />}
//           title="Traveller's Hub"
//           collapsed={collapsed}
//           isOpen={openSections.traveler}
//           onToggle={() => toggleSection("traveler")}
//           items={[
//             { icon: <Heart size={20} />, label: "Saved Spots" },
//             { icon: <Plane size={20} />, label: "Trip Plans" },
//             { icon: <Hotel size={20} />, label: "Bookings" },
//             { icon: <Clock size={20} />, label: "Visited History" },
//             { icon: <BarChart2 size={20} />, label: "Travel Stats" },
//           ]}
//         />

//         {/* Living Essentials */}
//         <DropdownSection
//           icon={<Building2 size={20} />}
//           title="Living Essentials"
//           collapsed={collapsed}
//           isOpen={openSections.essentials}
//           onToggle={() => toggleSection("essentials")}
//           items={[
//             { icon: <Stethoscope size={20} />, label: "Healthcare" },
//             { icon: <GraduationCap size={20} />, label: "Schools" },
//             { icon: <Building2 size={20} />, label: "Housing" },
//             { icon: <Landmark size={20} />, label: "Public Services" },
//           ]}
//         />

//         {/* My Views */}
//         <DropdownSection
//           icon={<Camera size={20} />}
//           title="My Views"
//           collapsed={collapsed}
//           isOpen={openSections.views}
//           onToggle={() => toggleSection("views")}
//           items={[
//             { icon: <Camera size={20} />, label: "Snapped Scenic Pics" },
//           ]}
//         />
//       </nav>

//       {/* Settings Section */}
//       <div className="border-t border-gray-100 p-4">
//         <MenuItem icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
//       </div>
//     </div>
//   );
// }

// // function MenuItem({ icon, label, collapsed, to }) {
// //   return (
// //     <Link
// //   to={to}
// //   className={`menu-item flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm bg-gray-50 hover:bg-emerald-50 hover:shadow-md text-gray-700 transition-all duration-200 group`}
// // >
// //       <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
// //       {!collapsed && <span className="text-sm font-medium">{label}</span>}
// //     </Link>
// //   );
// // }

// function MenuItem({ icon, label, collapsed, to }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `menu-item flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm transition-all duration-200 group ${
//           isActive
//             ? "bg-emerald-50 shadow-md text-emerald-700"
//             : "bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:shadow-md"
//         }`
//       }
//     >
//       <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
//       {!collapsed && <span className="text-sm font-medium">{label}</span>}
//     </NavLink>
//   );
// }

// function DropdownSection({ icon, title, collapsed, isOpen, onToggle, items }) {
//   return (
//     <div className="rounded-lg shadow-sm bg-gray-50">
//       <button
//         onClick={onToggle}
//         className="flex items-center justify-between w-full px-3 py-2 hover:bg-emerald-50 hover:shadow-md text-gray-700 transition-all duration-200 group"
//       >
//         <div className="flex items-center gap-3">
//           <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
//           {!collapsed && (
//             <span className="text-sm font-semibold">{title}</span>
//           )}
//         </div>
//         {!collapsed && (
//           <div className="text-emerald-600">
//             {isOpen ? (
//               <ChevronUp size={16} />
//             ) : (
//               <ChevronDown size={16} />
//             )}
//           </div>
//         )}
//       </button>



//       {isOpen && !collapsed && (
//   <div className={`dropdown-content ${isOpen ? "dropdown-open" : ""} mt-1 space-y-1 pl-10 pb-2`}>
//     {items.map((item, idx) => (
//       <MenuItem key={idx} icon={item.icon} label={item.label} collapsed={false} />
//     ))}
//   </div>
// )}



//     </div>
//   );
// }


import React, { useState } from "react";
import "../styles/index.css";
import {
  MapPin,
  CalendarDays,
  Compass,
  Gem,
  Hotel,
  Plane,
  Home,
  GraduationCap,
  Landmark,
  Camera,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  Clock,
  BarChart2,
  Building2,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    traveler: false,
    essentials: false,
    views: false,
  });

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm fixed top-0 left-0 w-full z-40">
        <h1 className="text-xl font-bold text-emerald-600">Skyline</h1>
        <button
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleMobile}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-lg fixed md:static z-40
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo and collapse */}
        <div className="flex items-center justify-between p-4 md:flex">
          {!collapsed && (
            <h1 className="text-2xl font-bold text-emerald-600 tracking-wide hidden md:block">
              Skyline
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-emerald-50 transition hidden md:block"
          >
            {collapsed ? (
              <ChevronRight className="text-emerald-600" />
            ) : (
              <ChevronLeft className="text-emerald-600" />
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 pb-2 text-sm text-gray-500 flex items-center gap-2 border-b border-gray-100 pb-3 hidden md:flex">
            <MapPin size={16} className="text-emerald-600" />
            <span>Lagos, Nigeria</span>
          </div>
        )}

        {/* Nav */}
        <nav className="mt-4 flex-1 overflow-y-auto px-2 space-y-2">
          <MenuItem icon={<Home size={20} />} label="Overview" to="/DashboardLayout/overview" collapsed={collapsed} />
          <MenuItem icon={<Compass size={20} />} label="Explore" to="/DashboardLayout/Explore" collapsed={collapsed} />
          <MenuItem icon={<CalendarDays size={20} />} label="Events" to="/events" collapsed={collapsed} />
          <MenuItem icon={<MapPin size={20} />} label="Map View" to="/map" collapsed={collapsed} />

          <DropdownSection
            icon={<Gem size={20} />}
            title="Traveller's Hub"
            collapsed={collapsed}
            isOpen={openSections.traveler}
            onToggle={() => toggleSection("traveler")}
            items={[
              { icon: <Heart size={20} />, label: "Saved Spots", to: "/saved-spots" },
              { icon: <Plane size={20} />, label: "Trip Plans", to: "/trip-plans" },
              { icon: <Hotel size={20} />, label: "Bookings", to: "/bookings" },
              { icon: <Clock size={20} />, label: "Visited History", to: "/visited-history" },
              { icon: <BarChart2 size={20} />, label: "Travel Stats", to: "/travel-stats" },
            ]}
          />

          <DropdownSection
            icon={<Building2 size={20} />}
            title="Living Essentials"
            collapsed={collapsed}
            isOpen={openSections.essentials}
            onToggle={() => toggleSection("essentials")}
            items={[
              { icon: <Stethoscope size={20} />, label: "Healthcare", to: "/healthcare" },
              { icon: <GraduationCap size={20} />, label: "Schools", to: "/schools" },
              { icon: <Building2 size={20} />, label: "Housing", to: "/housing" },
              { icon: <Landmark size={20} />, label: "Public Services", to: "/public-services" },
            ]}
          />

          <DropdownSection
            icon={<Camera size={20} />}
            title="My Views"
            collapsed={collapsed}
            isOpen={openSections.views}
            onToggle={() => toggleSection("views")}
            items={[
              { icon: <Camera size={20} />, label: "Snapped Scenic Pics", to: "/snaps" },
            ]}
          />
        </nav>

        <div className="border-t border-gray-100 p-4">
          <MenuItem icon={<Settings size={20} />} label="Settings" to="/settings" collapsed={collapsed} />
        </div>
      </div>
    </>
  );
}

function MenuItem({ icon, label, collapsed, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `menu-item flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm transition-all duration-200 group ${
          isActive
            ? "bg-emerald-50 shadow-md text-emerald-700"
            : "bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:shadow-md"
        }`
      }
    >
      <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}

function DropdownSection({ icon, title, collapsed, isOpen, onToggle, items }) {
  return (
    <div className="rounded-lg shadow-sm bg-gray-50">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-3 py-2 hover:bg-emerald-50 hover:shadow-md text-gray-700 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
          {!collapsed && <span className="text-sm font-semibold">{title}</span>}
        </div>
        {!collapsed && (
          <div className="text-emerald-600">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </button>

      {isOpen && !collapsed && (
        <div className="mt-1 space-y-1 pl-10 pb-2">
          {items.map((item, idx) => (
            <MenuItem key={idx} icon={item.icon} label={item.label} collapsed={false} to={item.to} />
          ))}
        </div>
      )}
    </div>
  );
}


// import React, { useState } from "react";
// import "../styles/index.css";
// import {
//   MapPin,
//   CalendarDays,
//   Compass,
//   Gem,
//   Hotel,
//   Plane,
//   Home,
//   GraduationCap,
//   Landmark,
//   Camera,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Clock,
//   BarChart2,
//   Building2,
//   Stethoscope,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSections, setOpenSections] = useState({
//     traveler: false,
//     essentials: false,
//     views: false,
//   });

//   const toggleSidebar = () => setCollapsed(!collapsed);
//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   return (
//     <div
//       className={`${
//         collapsed ? "w-20" : "w-64"
//       } h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-lg`}
//     >
//       {/* Logo & Toggle */}
//       <div className="flex items-center justify-between p-4">
//         {!collapsed && (
//           <h1 className="text-2xl font-bold text-emerald-600 tracking-wide">
//             Skyline
//           </h1>
//         )}
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-full hover:bg-emerald-50 transition"
//         >
//           {collapsed ? (
//             <ChevronRight className="text-emerald-600" />
//           ) : (
//             <ChevronLeft className="text-emerald-600" />
//           )}
//         </button>
//       </div>

//       {/* Location */}
//       {!collapsed && (
//         <div className="px-4 pb-2 text-sm text-gray-500 flex items-center gap-2 border-b border-gray-100 pb-3">
//           <MapPin size={16} className="text-emerald-600" />
//           <span>Lagos, Nigeria</span>
//         </div>
//       )}

//       {/* Nav Section */}
//       <nav className="mt-4 flex-1 overflow-y-auto px-2 space-y-2">
//         <MenuItem icon={<Home size={20} />} label="Overview" to="/DashboardLayout/overview" collapsed={collapsed} />
//         <MenuItem icon={<Compass size={20} />} label="Explore" to="/DashboardLayout/Explore" collapsed={collapsed} />
//         <MenuItem icon={<CalendarDays size={20} />} label="Events" to="/events" collapsed={collapsed} />
//         <MenuItem icon={<MapPin size={20} />} label="Map View" to="/map" collapsed={collapsed} />

//         {/* Traveller's Hub */}
//         <DropdownSection
//           icon={<Gem size={20} />}
//           title="Traveller's Hub"
//           collapsed={collapsed}
//           isOpen={openSections.traveler}
//           onToggle={() => toggleSection("traveler")}
//           items={[
//             { icon: <Heart size={20} />, label: "Saved Spots", to: "/saved-spots" },
//             { icon: <Plane size={20} />, label: "Trip Plans", to: "/trip-plans" },
//             { icon: <Hotel size={20} />, label: "Bookings", to: "/bookings" },
//             { icon: <Clock size={20} />, label: "Visited History", to: "/visited-history" },
//             { icon: <BarChart2 size={20} />, label: "Travel Stats", to: "/travel-stats" },
//           ]}
//         />

//         {/* Living Essentials */}
//         <DropdownSection
//           icon={<Building2 size={20} />}
//           title="Living Essentials"
//           collapsed={collapsed}
//           isOpen={openSections.essentials}
//           onToggle={() => toggleSection("essentials")}
//           items={[
//             { icon: <Stethoscope size={20} />, label: "Healthcare", to: "/healthcare" },
//             { icon: <GraduationCap size={20} />, label: "Schools", to: "/schools" },
//             { icon: <Building2 size={20} />, label: "Housing", to: "/housing" },
//             { icon: <Landmark size={20} />, label: "Public Services", to: "/public-services" },
//           ]}
//         />

//         {/* My Views */}
//         <DropdownSection
//           icon={<Camera size={20} />}
//           title="My Views"
//           collapsed={collapsed}
//           isOpen={openSections.views}
//           onToggle={() => toggleSection("views")}
//           items={[
//             { icon: <Camera size={20} />, label: "Snapped Scenic Pics", to: "/snaps" },
//           ]}
//         />
//       </nav>

//       {/* Settings */}
//       <div className="border-t border-gray-100 p-4">
//         <MenuItem icon={<Settings size={20} />} label="Settings" to="/settings" collapsed={collapsed} />
//       </div>
//     </div>
//   );
// }

// // MenuItem with active state
// function MenuItem({ icon, label, collapsed, to }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `menu-item flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm transition-all duration-200 group ${
//           isActive
//             ? "bg-emerald-50 shadow-md text-emerald-700"
//             : "bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:shadow-md"
//         }`
//       }
//     >
//       <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
//       {!collapsed && <span className="text-sm font-medium">{label}</span>}
//     </NavLink>
//   );
// }

// // DropdownSection supporting NavLink
// function DropdownSection({ icon, title, collapsed, isOpen, onToggle, items }) {
//   return (
//     <div className="rounded-lg shadow-sm bg-gray-50">
//       <button
//         onClick={onToggle}
//         className="flex items-center justify-between w-full px-3 py-2 hover:bg-emerald-50 hover:shadow-md text-gray-700 transition-all duration-200 group"
//       >
//         <div className="flex items-center gap-3">
//           <div className="text-emerald-600 group-hover:text-emerald-700">{icon}</div>
//           {!collapsed && <span className="text-sm font-semibold">{title}</span>}
//         </div>
//         {!collapsed && (
//           <div className="text-emerald-600">
//             {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </div>
//         )}
//       </button>

//       {isOpen && !collapsed && (
//         <div className="mt-1 space-y-1 pl-10 pb-2">
//           {items.map((item, idx) => (
//             <MenuItem key={idx} icon={item.icon} label={item.label} collapsed={false} to={item.to} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

