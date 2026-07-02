/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          600: "#059669",
          700: "#047857",
        },
        slate: {
          800: "#1E293B",
        },
        amber: {
          400: "#F59E0B",
        }
      },
    },
  },
  plugins: [],
}

