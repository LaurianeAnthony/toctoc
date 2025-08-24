export type Step = {
  id: string;
  title: string;
  imageRequired: boolean;
};

export type StepInstance = {
  id: string;
  checklistInstanceId: string;
  title: string;
  completedAt: string | null;
  image?: string;
};

export type Checklist = {
  id: string;
  title: string;
  order: number;
  items: Step[];
  createdAt: null;
};

export type ChecklistInstance = {
  id: string;
  title: string;
  checklistId: string;
  steps: StepInstance[];
  createdAt: string;
  completedAt: string | null;
};
