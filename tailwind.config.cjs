/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg1: "url('/src/assets/bg1.jpg')",
        bg2: "url('/src/assets/bg2.jpg')",
        bg3: "url('/src/assets/bg3.jpg')",
        bg4: "url('/src/assets/bg4.jpg')",
      }
    },
  },
  plugins: [],
}
