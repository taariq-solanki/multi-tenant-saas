/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",      // light gray
        background: "#ffffff",  // white
        foreground: "#000000",  // black
      },
    },
  },
  plugins: [],
};
