/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(primary|secondary|red|green|blue|emerald|rose|yellow|orange|purple|cyan|teal|amber|lime|pink|sky|indigo|violet|fuchsia|slate|gray|neutral|stone)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f2f7f3",
          "100": "#d9e8dc",
          "200": "#b5d1bb",
          "300": "#8db996",
          "400": "#6da477",
          "500": "#4b8a52",
          "600": "#3e7145",
          "700": "#355d3a",
          "800": "#2a4930",
          "900": "#1d3323",
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