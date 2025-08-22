import { queryClient } from "@/lib/queryClient";
import { CreateTaskPayload, Task } from "@/types/task";
import { arrayMove } from "@dnd-kit/sortable";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

// Create a new task
export async function createTask(data: CreateTaskPayload): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return res.json();
}

export async function deleteTask(
  taskId: string
): Promise<{ message: string; status: number }> {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
  return res.json();
}

export async function updateTask(task: Task): Promise<Task> {
  const res = await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Failed to update task status");
  }
  return res.json();
}

export async function updateTaskOrder(
  taskId: string,
  order: number
): Promise<Task> {
  const res = await fetch(`/api/tasks/${taskId}/order`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    throw new Error("Failed to update task status");
  }
  return res.json();
}

export function useReorderTasks() {
  const reorderTasks = (activeId: string, overId: string) => {
    queryClient.setQueryData<Task[]>(["getTasks"], (oldTasks = []) => {
      const oldIndex = oldTasks.findIndex((task) => task.id === activeId);
      const newIndex = oldTasks.findIndex((task) => task.id === overId);

      if (oldIndex === -1 || newIndex === -1) return oldTasks;

      return arrayMove(oldTasks, oldIndex, newIndex);
    });
  };

  return { reorderTasks };
}