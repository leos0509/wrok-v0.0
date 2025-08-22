"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TaskStatusBadgeProps = {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
  disabled?: boolean;
  amount?: number;
};

export const statusConfig: Record<
  TaskStatus,
  { label: string; className: string; dropdownClassname: string }
> = {
  toDo: {
    label: "To Do",
    className: "bg-amber-200 text-amber-800",
    dropdownClassname: "hover:bg-amber-200 hover:text-amber-800",
  },
  inProgress: {
    label: "In Progress",
    className: "bg-blue-200 text-blue-800",
    dropdownClassname: "hover:bg-blue-200 hover:text-blue-800",
  },
  completed: {
    label: "Completed",
    className: "bg-green-200 text-green-800",
    dropdownClassname: "hover:bg-green-200 hover:text-green-800",
  },
  cancelled: {
    label: "Canceled",
    className: "bg-red-200 text-red-800",
    dropdownClassname: "hover:bg-red-200 hover:text-red-800",
  },
};

const StatusBadge = ({
  status,
  onChange,
  disabled = false,
  amount,
}: TaskStatusBadgeProps) => {
  const { label, className } = statusConfig[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium over:cursor-pointer flex items-center justify-between font-mono tracking-normal transition-all duration-100 ease-in-out border h-6 text-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 focus:border-primary gap-2",
            !disabled && "hover:cursor-pointer",
            className
          )}
        >
          <span>{label}</span>
          {amount && (
            <span className="text-xs font-bold">
              {amount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(statusConfig).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(key as TaskStatus)}
            className="hover:bg-secondary hover:text-secondary-foreground hover:cursor-pointer p-1.5"
          >
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs transition-all duration-100 ease-in-out w-full",
                value.className
              )}
            >
              {value.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusBadge;
