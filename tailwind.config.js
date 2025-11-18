
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Heebo"', '"Playfair Display"', 'serif'],
        'sans': ['"Assistant"', '"Montserrat"', 'sans-serif'],
      },
      colors: {
        'brand-bg': '#F9F9F7',
        'brand-text': '#5D4037',
        'brand-dark': '#3E2723',
        'brand-accent': '#C4B7A6'
      }
    },
  },
  plugins: [],
}