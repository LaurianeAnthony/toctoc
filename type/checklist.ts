export type ChecklistInstance = {
  id: string;
  title: string;
  checklistId: string;
  items: {
    id: string;
    title: string;
    completedAt: string | null;
    image?: string;
  }[];
  completedAt: string | null;
};

export type Checklist = {
  id: string;
  title: string;
  order: number;
  items: {
    id: string;
    title: string;
    imageRequired: boolean;
  }[];
  createdAt: string | null;
};
