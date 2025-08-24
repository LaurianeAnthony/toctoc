import { SQLiteDatabase } from "expo-sqlite";

export const initializeDatabase = async (db: SQLiteDatabase): Promise<void> => {
  // Drop existing tables
  await db.execAsync(`
    DROP TABLE IF EXISTS step_instances;
    DROP TABLE IF EXISTS checklist_instances;
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

  // Create step instances table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS step_instances (
      id INTEGER PRIMARY KEY NOT NULL,
      checklistInstanceId INTEGER NOT NULL,
      title TEXT NOT NULL,
      completedAt TEXT DEFAULT NULL,
      image TEXT DEFAULT NULL,
      FOREIGN KEY (checklistInstanceId) REFERENCES checklist_instances(id) ON DELETE CASCADE
    );
  `);

  // Seed some data
  await db.execAsync(`
    INSERT INTO checklist_instances (id, title, checklistId) VALUES
    (1, 'Départ de la maison', 1),
    (2, 'Checkliste de voyage', 1),
    (3, 'Nourrir le gros chat', 1)
  `);

  // Seed step instances
  await db.execAsync(`
    INSERT INTO step_instances (checklistInstanceId, title, completedAt) VALUES
    (1, 'Fermer la porte à clé', NULL),
    (1, 'Éteindre les lumières', datetime('now')),
    (1, 'Vérifier les fenêtres', NULL),
    (2, 'Passeport', datetime('now')),
    (2, 'Billets', NULL),
    (2, 'Bagages', NULL),
    (3, 'Nourriture chat', datetime('now')),
    (3, 'Eau fraîche', NULL)
  `);
};