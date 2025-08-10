import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, type TextProps } from "react-native";

export type TypographyProps = TextProps & {
  color?: string;
  variant?: "default" | "title";
};

export function Typography({
  style,
  color,
  variant = "default",
  ...rest
}: TypographyProps) {
  const { colors } = useTheme();

  // useFonts({Roboto_400Regular, Roboto_100Thin});

  return (
    <Text
      style={[
        { color: color ?? colors.content.default },
        styles.base,
        styles[variant],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    // fontFamily: 'Roboto_400Regular'
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: 32,
    // fontFamily: 'Roboto_100Thin'
  },
});
