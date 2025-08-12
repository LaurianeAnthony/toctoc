import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const initDb = async (db: SQLiteDatabase): Promise<void> => {
    // Drop checklists table
    await db.execAsync(`
        DROP TABLE IF EXISTS checklist_instances
    `);

    // Create checklists instances table
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS checklist_instances (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        checklistId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        completedAt TEXT DEFAULT NULL
      );
    `);

    // Seed some data
    await db.execAsync(`
      INSERT INTO checklist_instances (id, title, checklistId) VALUES
      (1, 'Départ de la maison', 1),
      (2, 'Checkliste de voyage', 1),
      (3, 'Nourrir le gros chat', 1)
    `);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="toctoc.db" onInit={initDb}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="checklist-instance"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}
