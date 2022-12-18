/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        "loading-pulse": "fade 2s linear infinite"
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}