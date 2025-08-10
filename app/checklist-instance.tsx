import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { ChecklistInstance } from "@/type/checklist";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function InstanceScreen() {
  const router = useRouter();
  const checklistInstance: ChecklistInstance = {
    id: "1",
    checklistId: "checklist-1",
    title: "Partir de la maison",
    completedAt: "2023-10-01T10:11:00Z",
    items: [
      {
        id: "1",
        title: "Prendre les clés",
        completedAt: "2023-10-01T10:00:00Z",
      },
      { id: "2", title: "Prendre le sac", completedAt: "2023-10-01T10:05:00Z" },
      { id: "3", title: "Vérifier le téléphone", completedAt: null },
      {
        id: "4",
        title: "Fermer la porte",
        completedAt: "2023-10-01T10:10:00Z",
      },
    ],
  };

  return (
    <Screen>
      <Header
        title={checklistInstance.title}
        icon="chevron-left"
        onPress={() => router.back()}
      />

      <View style={{ padding: 20 }}></View>
    </Screen>
  );
}
