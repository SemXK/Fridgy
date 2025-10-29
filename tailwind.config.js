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
          "50": "#f5f7f5",  // very light gray-green
          "100": "#e3ebe3",  // light desaturated green
          "200": "#c8d6c8",  // pale mossy green
          "300": "#a2b7a2",  // muted sage
          "400": "#7c977c",  // soft olive green
          "500": "#4b8a52",  // your base
          "600": "#3e7145",  // darker moss
          "700": "#355d3a",  // forest green
          "800": "#2a4930",  // deep green
          "900": "#1d3323",  // near-black green
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