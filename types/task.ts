export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  startDate?: string | null;
  dueDate?: string | null;
  order: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = "toDo" | "inProgress" | "completed" | "cancelled";

export type CreateTaskPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
  startDate?: string | null;
  dueDate?: string | null;
};