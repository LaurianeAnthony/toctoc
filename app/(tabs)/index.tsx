import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { Typography } from "@/components/ui/Typography";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CalendarScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const onPress = () => {
    router.navigate("/checklist-instance");
  };
  return (
    <Screen>
      <Header title="Calendar" />

      <View style={{ padding: 20 }}>
        <Typography style={{ paddingBottom: 12 }}>Today</Typography>
        <TouchableOpacity
          style={[styles.item, { borderColor: colors.border.default }]}
          onPress={onPress}
        >
          <Typography color={colors.content.subdued}>11:12</Typography>
          <Typography>Partir de la maison</Typography>
          <View>
            <Typography color={colors.content.subdued}>8/8</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
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
