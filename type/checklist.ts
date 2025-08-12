type Step = {
  id: string;
  title: string;
  imageRequired: boolean;
};

type StepInstance = {
  id: string;
  title: string;
  completedAt: string | null;
  image?: string;
};

export type Checklist = {
  id: string;
  title: string;
  order: number;
  items: Step[];
  createdAt: string | null;
};

export type ChecklistInstance = {
  id: string;
  title: string;
  checklistId: string;
  items: StepInstance[];
  createdAt: string | null;
  completedAt: string | null;
};
