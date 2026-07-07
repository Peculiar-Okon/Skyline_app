import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./Auth/login.tsx";
import Signup from "./Auth/Signup.tsx";
import VerifyEmail from "./Auth/verifyEmail.tsx";
import EmailVerified from "./Auth/emailVerified.tsx";
import ProtectedRoute from "./protectedRoutes.tsx";
import ForgotPassword from "./Auth/forgotPassword.tsx";
import VerifyResetOTP from "./Auth/resetPasswordverify.tsx";
import CreateNewPassword from "./Auth/createNewpassword.tsx";
import Onboarding from "./Auth/Onboarding.tsx";
import DashboardLayout from "./Layouts/DashboardLayout.tsx";
import { AuthProvider } from "./Context/authContext.tsx";
import { ProfileProvider } from "./Context/profileContext.tsx";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        <Route
          path="/reset-password-verify"
          element={<VerifyResetOTP />}
        />

        <Route
          path="/create-new-password"
          element={<CreateNewPassword />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  {/* <Route
    index
    element={<Overview />}
  />

  <Route
    path="explore"
    element={<Explore />}
  />

  <Route
    path="events"
    element={<Events />}
  />

  <Route
    path="map"
    element={<MapView />}
  />

  <Route
    path="saved"
    element={<SavedSpots />}
  />

  <Route
    path="trip-plans"
    element={<TripPlans />}
  />

  <Route
    path="hotels"
    element={<Hotels />}
  />

  <Route
    path="transport"
    element={<Transport />}
  />

  <Route
    path="bookings"
    element={<Bookings />}
  />

  <Route
    path="history"
    element={<History />}
  />

  <Route
    path="travel-stats"
    element={<TravelStats />}
  />

  <Route
    path="healthcare"
    element={<Healthcare />}
  />

  <Route
    path="schools"
    element={<Schools />}
  />

  <Route
    path="housing"
    element={<Housing />}
  />

  <Route
    path="services"
    element={<PublicServices />}
  />

  <Route
    path="my-views"
    element={<MyViews />}
  />

  <Route
    path="settings"
    element={<Settings />}
  /> */}
</Route>
      </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
