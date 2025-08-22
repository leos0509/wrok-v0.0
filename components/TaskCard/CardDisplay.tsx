import { Task } from "@/types/task";
import {
  CheckIcon,
  // ChevronDownIcon,
  GripVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { TaskStatus } from "@/lib/generated/prisma";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import StatusBadge from "../StatusBadge";

const getChecked = (status: TaskStatus) => {
  return status === "completed";
};

type CardDisplayProps = {
  task: Task;
  isDragging: boolean;
};

const CardDisplay = ({ task, isDragging }: CardDisplayProps) => {
  const [taskData, setTaskData] = useState(task);
  // const [isOpen, setIsOpen] = useState(false);
  const debounceTask = useDebounce(taskData, 500);

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (debounceTask) {
      updateTask(debounceTask);
    }
  }, [debounceTask, updateTask]);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleStatusChange = (status: TaskStatus) => {
    setTaskData((prev) => ({ ...prev, status }));
  };

  const handleCheckedChange = () => {
    if (getChecked(taskData.status)) {
      setTaskData((prev) => ({ ...prev, status: "toDo" }));
    }
    setTaskData((prev) => ({ ...prev, status: "completed" }));
  };

  return (
    <div className="flex items-center gap-3 justify-center w-full mt-2">
      <div className="flex flex-col items-start justify-start p-4 bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground w-full border rounded-xs relative shadow-xs">
        {isDragging && (
          <div className="absolute z-20 top-0 inset-0 bg-secondary rounded-xs" />
        )}
        <div
          className={cn(
            "absolute top-0 -translate-y-1/2 right-6 flex items-center justify-center gap-2 z-10",
            isDragging && "opacity-0"
          )}
        >
          <StatusBadge
            status={taskData.status}
            onChange={(status) => handleStatusChange(status)}
          />
          <button
            onClick={handleDelete}
            className="size-6 border rounded-full bg-background hover:bg-red-200 hover:text-red-800 flex items-center justify-center hover:cursor-pointer"
          >
            <TrashIcon className="size-3" />
          </button>
          <button
            onClick={() => handleCheckedChange()}
            className={cn(
              "size-6 border rounded-full bg-background hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center hover:cursor-pointer transition-all duration-200 ease-in-out",
              getChecked(taskData.status) &&
                "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            )}
          >
            <CheckIcon
              className={cn(
                "size-3 transition-all duration-200 ease-in-out",
                getChecked(taskData.status)
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0"
              )}
            />
          </button>
          {/* <button
            onClick={() => setIsOpen(!isOpen)}
            className="size-6 border rounded-full bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center hover:cursor-pointer"
          >
            <ChevronDownIcon
              className={cn(
                "size-3 transition-all duration-200 ease-in-out",
                isOpen && "rotate-180"
              )}
            />
          </button> */}
        </div>
        <div className="flex flex-col items-start justify-start w-full px-1">
          <textarea
            className={cn(
              "font-medium line-clamp-3 font-mono outline-none resize-none bg-transparent w-full",
              getChecked(taskData.status) ? "line-through" : ""
            )}
            value={taskData.title}
            disabled={getChecked(taskData.status)}
            onChange={(e) => {
              setTaskData((prev) => ({ ...prev, title: e.target.value }));
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "") {
                setTaskData((prev) => ({ ...prev, title: "Untitled Task" }));
              }
            }}
            rows={1}
          />
        </div>
      </div>
      <button
        className={cn(
          "size-6 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center rounded-[4px] hover:cursor-grabbing active:cursor-grabbing",
          isDragging && "opacity-0"
        )}
      >
        <GripVerticalIcon className="size-4" />
      </button>
    </div>
  );
};

export default React.memo(CardDisplay);
