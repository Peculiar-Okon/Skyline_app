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

        'skyline-primary-bg': '#0B1210',
        'skyline-secondary-bg': '#121212',
        'skyline-accent-glow': '#32FCA9', // light emerald
        'skyline-muted-accent': '#1A1A1A', // Using the dark gray option for backgrounds/input
        'skyline-text-main': '#E5E5E5',
        'skyline-text-muted': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

