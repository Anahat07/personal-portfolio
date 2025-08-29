/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        primary: {
          light: '#8F9A81',
          DEFAULT: '#566246',
          dark: '#383E30',
        },
        background: {
          light: '#EEE2DC',
          dark: '#383E30',
        },
      },
      animation: {
        flicker: "flicker 1s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
}