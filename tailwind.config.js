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
        gray_900: "#3c3c3c",
        gray_800: "#606060",
        gray_700: "#818181",
        gray_600: "#979797",
        gray_500: "#c2c2c2",
        gray_400: "#dedede",
        gray_300: "#f0f0f0",
        gray_200: "#f5f5f5",
        gray_100: "#fafafa",
        gray_50: "#ffffff",
        blue_900: "#4341b1",
        blue_800: "#4862d1",
        blue_700: "#4b74e4",
        blue_600: "#4e87f9",
        blue_500: "#4e96ff",
        blue_400: "#5ba6ff",
        blue_300: "#73b6ff",
        blue_200: "#99cbff",
        blue_100: "#c1deff",
        blue_50: "#e5f2ff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
