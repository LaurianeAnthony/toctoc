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

const DATABASE_VERSION = 1;

async function createTables(db: SQLiteDatabase, databaseVersion: number) {
  // Create checklists table
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE checklist_instances (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed some data
  await db.execAsync(`
    INSERT INTO checklist_instances (id, title, orderIndex) VALUES
    (1, 'Départ de la maison', 1),
    (2, 'Checkliste de voyage', 2);
  `);

  await db.execAsync(`PRAGMA user_version = ${databaseVersion}`);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const migrateDb = async (db: SQLiteDatabase): Promise<void> => {
    const dbInfo = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");
    console.log(dbInfo);
    if (!dbInfo || dbInfo.user_version === 0) {
      return await createTables(db, DATABASE_VERSION);
    }
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="toctoc.db" onInit={migrateDb}>
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
