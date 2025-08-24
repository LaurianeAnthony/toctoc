import { Typography } from "@/components/ui/Typography";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ButtonItemProps = {
  title: string;
  rightContent: string;
  leftContent: string;

  onPress: () => void;
};

export default function ButtonItem({
  title,
  rightContent,
  leftContent,
  onPress,
}: ButtonItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.item, { borderColor: colors.border.default }]}
      onPress={onPress}
    >
      <Typography color={colors.content.subdued}>{rightContent}</Typography>
      <Typography>{title}</Typography>
      <View>
        <Typography color={colors.content.subdued}>{leftContent}</Typography>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
  },
});
