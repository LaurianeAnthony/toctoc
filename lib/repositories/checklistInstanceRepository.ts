import { SQLiteDatabase } from "expo-sqlite";
import { ChecklistInstance } from "@/type/checklist";

export class ChecklistInstanceRepository {
  constructor(private db: SQLiteDatabase) {}

  async findAll(): Promise<ChecklistInstance[]> {
    return this.db.getAllAsync<ChecklistInstance>(
      "SELECT * FROM checklist_instances",
    );
  }

  async findById(id: string): Promise<ChecklistInstance | null> {
    const result = await this.db.getFirstAsync<ChecklistInstance>(
      "SELECT * FROM checklist_instances WHERE id = ?",
      [id],
    );
    return result || null;
  }
}
