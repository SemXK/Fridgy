import { Appearance, Platform } from 'react-native';


// * Costanti, da cambiare anche in tailwindcss.conf
export const primaryColor = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e"
}

// * Palette di colori in base al tema
export const Colors = {
  light: {
    primaryClearColor: "#fff",         // colore definito come "bianco"
    shadowColor: "#090705",
    primaryColor
  },
  dark: {
    primaryClearColor: "#000",
    shadowColor: "#090705"
  },
};

// * Accesso alla palette

export function getCurrentTheme() {
  let  isLightTheme = Appearance.getColorScheme() == "light"
  return isLightTheme ?  Colors.light : Colors.dark
}
export function getOppositeTheme() {
  let  isLightTheme = Appearance.getColorScheme() != "light"
  return isLightTheme ?  Colors.light : Colors.dark
}


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
