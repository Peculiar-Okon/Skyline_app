import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./Theme/themeContext.tsx";
import { ProfileProvider } from './Context/profileContext.tsx';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
      <App />

      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,

    style: {
      background: "#0f172a",
      color: "#fff",
      border: "1px solid #1e293b",
      borderRadius: "16px",
    },

    success: {
      iconTheme: {
        primary: "#10b981",
        secondary: "#ffffff",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>
</ProfileProvider>
    </ThemeProvider>
  </StrictMode>,
)
