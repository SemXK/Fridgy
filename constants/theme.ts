import { Appearance, Platform } from "react-native";

// # Costanti, da cambiare anche in tailwindcss.conf
export const primaryColor = {
  "50": "#f2f7f3",
  "100": "#d9e8dc",
  "200": "#b5d1bb",
  "300": "#8db996",
  "400": "#6da477",
  "500": "#4b8a52",
  "600": "#3c6f44",
  "700": "#305937",
  "800": "#25432b",
  "900": "#1a2f1f",
};
export const secondaryColor = {
  "50": "#fdfbf7",
  "100": "#f8f3ea",
  "200": "#f1e5cf",
  "300": "#e5cfac",
  "400": "#d4b889",
  "500": "#c3a16a",
  "600": "#a88454",
  "700": "#896942",
  "800": "#6b5133",
  "900": "#4e3a25",
};

// * Palette di colori in base al tema
export const Colors = {
  light: {
    primaryClearColor: "#fff", // colore definito come "bianco"
    shadowColor: "#090705",
    primaryColor,
  },
  dark: {
    primaryClearColor: "#000",
    shadowColor: "#090705",
  },
};

// * Accesso alla palette

export function getCurrentTheme() {
  let isLightTheme = Appearance.getColorScheme() == "light";
  return isLightTheme ? Colors.light : Colors.dark;
}
export function getOppositeTheme() {
  let isLightTheme = Appearance.getColorScheme() != "light";
  return isLightTheme ? Colors.light : Colors.dark;
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
