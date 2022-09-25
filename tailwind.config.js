/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(36, 36, 36)",
        heroCircle: "#333333",
        accentColor: "#F7AB0A",
        customGray: "#242424",
      },
    },
  },
  plugins: [],
};
