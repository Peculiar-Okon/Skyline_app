// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";


// function DashboardLayout() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//     <Outlet />
//       </div>

//     </div>
//   );
// }

// export default DashboardLayout;

import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* Active page renders here */}
      </div>
    </div>
  );
}

export default DashboardLayout;

