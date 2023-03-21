/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        bg1: "url('/src/assets/bg1.jpg')",
        bg2: "url('/src/assets/bg2.jpg')",
        bg3: "url('/src/assets/bg3.jpg')",
        bg4: "url('/src/assets/bg4.jpg')",
        bg5: "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmE1NTQ1ZDdlMDU5NGI1ZWQ0NTIzZmI3M2I4NDhhNGYzYzhmMmQzMyZjdD1n/PQU1LpZqt5mJbKjgKc/giphy.gif')",
      }
    },
  },
  plugins: [],
}
