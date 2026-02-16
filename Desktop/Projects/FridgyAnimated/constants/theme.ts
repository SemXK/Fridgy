import { Appearance, Platform } from "react-native";

// # Costanti, da cambiare anche in tailwindcss.conf
export const primaryColor = {
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
};
export const secondaryColor = {
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
};
export const darkColor = {
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
