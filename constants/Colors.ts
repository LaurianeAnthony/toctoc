/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const GlobalColors = {
  green: {
    800: "#386155",
    700: "#527369",
    600: "#67857C",
    400: "#81A69B",
    100: "#AFCFC6",
  },
  red: {
    500: "#B30C14",
  },
  neutral: {
    800: "#1E1E1E",
    400: "#A3A3A3",
    100: "#FFFFFF",
  },
};

export const Colors = {
  light: {
    background: {
      layout: GlobalColors.neutral[100],
      secondary: GlobalColors.green[600],
    },
    content: {
      default: GlobalColors.neutral[800],
      secondary: GlobalColors.neutral[100],
      subdued: GlobalColors.green[600],
    },
    border: {
      default: GlobalColors.green[100],
    },
    interactive: {
      primary: {
        content: GlobalColors.neutral[100],
        background: {
          default: GlobalColors.green[600],
          focused: GlobalColors.green[800],
        },
      },
    },
    text: "#11181C",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: {
      layout: GlobalColors.neutral[800],
      secondary: GlobalColors.green[800],
    },
    content: {
      default: GlobalColors.neutral[100],
      secondary: GlobalColors.neutral[100],
      subdued: GlobalColors.green[400],
    },
    border: {
      default: GlobalColors.green[400],
    },
    interactive: {
      primary: {
        content: GlobalColors.neutral[100],
        background: {
          default: GlobalColors.green[800],
          focused: GlobalColors.green[700],
        },
      },
    },
    text: "#ECEDEE",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
