"use client";

import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
  updateTaskOrder,
} from "@/apis/taskAPIs";
import { queryClient } from "@/lib/queryClient";
import { CreateTaskPayload, Task } from "@/types/task";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetTasks() {
  return useQuery({
    queryKey: ["getTasks"],
    queryFn: async () => {
      const res = fetchTasks();
      return res;
    },
  });
}

export function useCreateTask() {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: CreateTaskPayload) => {
      const res = createTask(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => {
      const res = deleteTask(taskId);
      return res;
    },
    onMutate: (taskId: string) => {
      queryClient.cancelQueries({ queryKey: ["getTasks"] });

      queryClient.setQueryData(["getTasks"], (oldData: Task[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((task) => task.id !== taskId);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    },
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (task: Task) => {
      const res = updateTask(task);
      return res;
    },
    onMutate: (task: Task) => {
      queryClient.cancelQueries({ queryKey: ["getTasks"] });

      queryClient.setQueryData(["getTasks"], (oldData: Task[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((t) => (t.id === task.id ? task : t));
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    }
  });
}

export function useUpdateTaskOrder() {
  return useMutation({
    mutationKey: ["updateTaskOrder"],
    mutationFn: async ({taskId, order}: {taskId: string, order: number}) => {
      const res = updateTaskOrder(taskId, order);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    }
  });
}
