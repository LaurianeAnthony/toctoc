import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { Typography } from "@/components/ui/Typography";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { ChecklistInstance } from "@/type/checklist";

export default function CalendarScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const onPress = () => {
    router.navigate("/checklist-instance");
  };

  const db = useSQLiteContext();
  const [checklistInstances, setChecklistInstances] = useState<
    ChecklistInstance[]
  >([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<ChecklistInstance>(
        "SELECT * FROM checklist_instances",
      );
      setChecklistInstances(result);
    }
    setup();
  }, [db]);

  const getItem = (item: ChecklistInstance) => (
    <View style={{ padding: 10 }}>
      <Typography style={{ paddingBottom: 12 }}>{item.createdAt}</Typography>
      <TouchableOpacity
        style={[styles.item, { borderColor: colors.border.default }]}
        onPress={onPress}
      >
        <Typography color={colors.content.subdued}>11:12</Typography>
        <Typography>{item.title}</Typography>
        <View>
          <Typography color={colors.content.subdued}>8/8</Typography>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen>
      <Header title="Calendar" />
      <FlatList
        data={checklistInstances}
        renderItem={({ item }) => getItem(item)}
        keyExtractor={(item) => item.id}
      />
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
