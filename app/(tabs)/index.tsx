import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { Typography } from "@/components/ui/Typography";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { ChecklistInstance } from "@/type/checklist";
import { ChecklistInstanceRepository } from "@/lib/repositories/checklistInstanceRepository";
import { StepInstanceRepository } from "@/lib/repositories/stepInstanceRepository";

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
      const checklistInstanceRepository = new ChecklistInstanceRepository(db);
      const stepInstanceRepository = new StepInstanceRepository(db);

      const checklistInstances = await checklistInstanceRepository.findAll();
      const stepInstances = await stepInstanceRepository.findAll();

      const result = checklistInstances.map((instance) => ({
        ...instance,
        steps: stepInstances
          .filter((step) => step.checklistInstanceId === instance.id)
          .map((step) => ({
            ...step,
            checklistInstanceId: step.checklistInstanceId,
          })),
      }));

      setChecklistInstances(result);
    }
    setup();
  }, [db]);

  const getItem = (checklistInstance: ChecklistInstance) => (
    <View style={{ padding: 10 }}>
      <Typography style={{ paddingBottom: 12 }}>
        {new Date(checklistInstance.createdAt).toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <TouchableOpacity
        style={[styles.item, { borderColor: colors.border.default }]}
        onPress={onPress}
      >
        <Typography color={colors.content.subdued}>
          {new Date(checklistInstance.createdAt).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography>{checklistInstance.title}</Typography>
        <View>
          <Typography color={colors.content.subdued}>
            {checklistInstance.steps.filter((step) => step.completedAt).length}/
            {checklistInstance.steps.length}
          </Typography>
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
