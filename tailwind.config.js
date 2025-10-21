/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        'xxs': '350px',   // 21.875rem
        'xs': '400px',    // 25rem
        // sm, md, lg, xl, 2xl remain default
      },
    },
  },
  plugins: [],
};