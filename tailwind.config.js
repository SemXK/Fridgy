/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#faf8f3",
          "100": "#f3ecdd",
          "200": "#e6d6b8",
          "300": "#d2b67e",
          "400": "#bfa05b",
          "500": "#4b8a52",
          "600": "#3c6f44",
          "700": "#305937",
          "800": "#25432b",
          "900": "#1a2f1f"
        },
        secondary: {
          "50": "#fdfbf7",
          "100": "#f8f3ea",
          "200": "#f1e5cf",
          "300": "#e5cfac",
          "400": "#d4b889",
          "500": "#c3a16a",
          "600": "#a88454",
          "700": "#896942",
          "800": "#6b5133",
          "900": "#4e3a25"
        }
      }
    },
    plugins: [],
  },
}