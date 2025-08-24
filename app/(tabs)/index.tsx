import Header from "@/components/Header";
import Screen from "@/components/Screen";
import ButtonItem from "@/components/ui/ButtonItem";
import { Typography } from "@/components/ui/Typography";
import { useTheme } from "@/hooks/useTheme";
import { ChecklistInstanceRepository } from "@/lib/repositories/checklistInstanceRepository";
import { StepInstanceRepository } from "@/lib/repositories/stepInstanceRepository";
import { ChecklistInstance } from "@/type/checklist";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function CalendarScreen() {
  const { spaces } = useTheme();
  const router = useRouter();

  const onPress = (id: string) => {
    router.navigate(`/checklist-instance?${id}`);
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
    <View>
      <Typography style={{ paddingBottom: 12 }}>
        {new Date(checklistInstance.createdAt).toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <ButtonItem
        onPress={() => onPress(checklistInstance.id)}
        title={checklistInstance.title}
        leftContent={`${checklistInstance.steps.filter((step) => step.completedAt).length}/${checklistInstance.steps.length}`}
        rightContent={new Date(checklistInstance.createdAt).toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )}
      />
    </View>
  );

  return (
    <Screen>
      <Header title="Calendar" />
      <View style={{ padding: spaces[20] }}>
        <FlatList
          contentContainerStyle={{ gap: spaces[8] }}
          data={checklistInstances}
          renderItem={({ item }) => getItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  );
}
