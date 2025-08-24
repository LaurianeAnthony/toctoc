/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useTheme() {
  const theme = useColorScheme() ?? "light";

  return {
    colors: Colors.light,
    spaces: {
      4: 4,
      8: 8,
      16: 16,
      20: 20,
      24: 24,
      32: 32,
      40: 40,
    },
  };
}
