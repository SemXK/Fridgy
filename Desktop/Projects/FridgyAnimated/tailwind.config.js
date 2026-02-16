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
          "50": "#fff5f5",
          "100": "#ffe0e0",
          "200": "#ffbaba",
          "300": "#ff8b8b",
          "400": "#f55858",
          "500": "#e3342f",
          "600": "#c72b29",
          "700": "#a12224",
          "800": "#7c1a1d",
          "900": "#551214",
        },
        secondary: {
          "50": "#fffbea",
          "100": "#fff3c4",
          "200": "#ffe88a",
          "300": "#ffdb4d",
          "400": "#ffcf1a",
          "500": "#ffbe00",
          "600": "#e6a700",
          "700": "#b38100",
          "800": "#805c00",
          "900": "#4d3700",
        },
        darkColor: {
          "50":  "#f5f5f7",
          "100": "#e6e6e9",
          "200": "#c8c8cc",
          "300": "#a9a9b0",
          "400": "#7c7c82",
          "500": "#4f4f55",
          "600": "#404046",
          "700": "#303035",
          "800": "#1f1f22",
          "900": "#0f0f11",
        }
      }
    },
    plugins: [],
  },
}