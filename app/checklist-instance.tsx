import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { ChecklistInstance } from "@/type/checklist";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { ChecklistInstanceRepository } from "@/lib/repositories/checklistInstanceRepository";
import { StepInstanceRepository } from "@/lib/repositories/stepInstanceRepository";
import { useEffect, useState } from "react";

export default function InstanceScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [checklistInstance, setChecklistInstance] =
    useState<ChecklistInstance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChecklistInstance = async () => {
      try {
        const checklistRepo = new ChecklistInstanceRepository(db);
        const stepRepo = new StepInstanceRepository(db);

        const instance = await checklistRepo.findById(id);
        if (instance) {
          const steps = await stepRepo.findByChecklistInstanceId(id);
          setChecklistInstance({
            ...instance,
            steps: steps.map((step) => ({
              ...step,
            })),
          });
        }
      } catch (error) {
        console.error("Error loading checklist instance:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChecklistInstance();
  }, [db, id]);

  if (loading) {
    return (
      <Screen>
        <Header
          title="Loading..."
          icon="chevron-left"
          onPress={() => router.back()}
        />
        <View>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  if (!checklistInstance) {
    return (
      <Screen>
        <Header
          title="Not Found"
          icon="chevron-left"
          onPress={() => router.back()}
        />
        <View>
          <Text>Checklist instance not found</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title={checklistInstance.title}
        icon="chevron-left"
        onPress={() => router.back()}
      />

      <View>
        <Text>
          Created:{" "}
          {checklistInstance.createdAt
            ? new Date(checklistInstance.createdAt).toLocaleDateString()
            : "Unknown"}
        </Text>

        {checklistInstance.completedAt && (
          <Text>
            Completed:{" "}
            {new Date(checklistInstance.completedAt).toLocaleDateString()}
          </Text>
        )}

        <View>
          <Text>Steps:</Text>
          {checklistInstance.steps.map((item) => (
            <View key={item.id}>
              <Text>
                {item.completedAt ? "✓" : "○"} {item.title}
              </Text>
              {item.completedAt && (
                <Text>{new Date(item.completedAt).toLocaleTimeString()}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}
