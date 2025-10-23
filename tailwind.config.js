/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    darkMode: 'class', // Enables dark mode toggle via class
  theme: {
    extend: {
            colors: {
            jade: '#00A86B',
        jadeLight: '#00c07a',
        silver: '#C0C0C0',
        darkBg: '#0F172A',
        lightBg: '#F9FAFB',
        jade: '#00A86B',     // Jade green
        silver: '#C0C0C0',   // Clean silver (adjust for dark mode if needed)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

