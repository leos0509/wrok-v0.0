"use client";

import { useCreateTask } from "@/hooks/useTasks";
import { TaskStatus } from "@/lib/generated/prisma";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import TaskStatusBadge from "./StatusBadge";

const TaskHeader = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("toDo");
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createTask, isPending } = useCreateTask();

  const handleCreateTask = () => {
    if (taskTitle.trim() === "") return;
    createTask(
      { title: taskTitle, status },
      {
        onSuccess: () => {
          setTaskTitle("");
          setStatus("toDo");

          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full items-start justify-start gap-2 sticky top-0 z-10">
      <h1 className="text-2xl font-bold font-mono uppercase">Tasks</h1>
      <div
        className="flex items-center justify-between w-full gap-2"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <div className="w-full border bg-background text-foreground rounded-full pl-4 pr-2 py-2 h-10 flex items-center justify-center gap-1 group focus-within:border-primary focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/50 transition-all shadow-xs">
          <input
            ref={inputRef}
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreateTask();
              }
            }}
            placeholder="Task title..."
            className="w-full bg-transparent outline-none font-mono"
            disabled={isPending}
          />
          <TaskStatusBadge
            status={status}
            onChange={(status) => setStatus(status)}
          />
        </div>
        <button
          onClick={handleCreateTask}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors font-bold font-mono uppercase text-nowrap h-10 w-10 tracking-wider flex items-center justify-center hover:cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 shadow-xs"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin size-4 shrink-0" />
          ) : (
            <PlusIcon className="size-4 shrink-0" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;
