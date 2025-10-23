import React from "react";
import Home from "./pages/Home";
import './styles/index.css'
import Navbar from "./components/Navbar";
import Signup from "./auth/signup";
import Login from "./auth/login";
import VerifyEmail from "./auth/verifyEmail";
import OnboardingWizard from "./pages/onboarding";
import ForgotPassword from "./auth/forgotPswd";
import VerifyOTP from "./auth/verifyOTP";
import ResetPassword from "./auth/resetpswd";
import DashboardLayout from "./Layouts/DashboardLayout";
import Overview from "./pages/overview";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";

function App (){
    return(
        <div>
        {/* <Navbar /> */}
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Signup" element ={<Signup/>} />
         <Route path="/Login" element ={<Login/>} />
         <Route path="/verifyEmail" element ={<VerifyEmail/>} />
         <Route path="/onboarding" element ={<OnboardingWizard/>} />
         <Route path="/forgotPswd" element ={<ForgotPassword/>} />
         <Route path="/verifyOTP" element ={<VerifyOTP/>} />
         <Route path="/resetpswd" element ={<ResetPassword/>} />
         <Route path="/DashboardLayout" element ={<DashboardLayout/>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/Explore" element={<Explore />} />

        {/* <Route path="/" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="Explore" element={<Explore />} />
        </Route> */}
        </Routes> 
        </div>
    );
}

export default App;

