/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#fbf9f3', 100: '#f5efe4', 400: '#dcc693', 500: '#c5a059', 600: '#a8823b', 700: '#8c682d' }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      animation: { 'fade-in': 'fadeIn 0.5s ease-out' },
      keyframes: { fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } } }
    },
  },
  plugins: [],
}