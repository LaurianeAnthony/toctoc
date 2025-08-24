import { SQLiteDatabase } from "expo-sqlite";
import { StepInstance } from "@/type/checklist";

export class StepInstanceRepository {
  constructor(private db: SQLiteDatabase) {}

  async findAll(): Promise<StepInstance[]> {
    return this.db.getAllAsync<StepInstance>("SELECT * FROM step_instances");
  }

  async findById(id: string): Promise<StepInstance | null> {
    const result = await this.db.getFirstAsync<StepInstance>(
      "SELECT * FROM step_instances WHERE id = ?",
      [id],
    );
    return result || null;
  }

  async findByChecklistInstanceId(
    checklistInstanceId: string,
  ): Promise<StepInstance[]> {
    return this.db.getAllAsync<StepInstance>(
      "SELECT * FROM step_instances WHERE checklistInstanceId = ?",
      [checklistInstanceId],
    );
  }
}
