"use client";

import { useReorderTasks } from "@/apis/taskAPIs";
import { useGetTasks, useUpdateTaskOrder } from "@/hooks/useTasks";
import { queryClient } from "@/lib/queryClient";
import { Task } from "@/types/task";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TaskCard from "./TaskCard";
import Loading from "./Loading";
import { CircleDashedIcon } from "lucide-react";

const GAP = 1;

const TaskList = () => {
  const { data: tasks = [], isLoading, error } = useGetTasks();
  const { mutate: updateTaskOrder } = useUpdateTaskOrder();
  const { reorderTasks } = useReorderTasks();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const extractNewOrder = (activeId: string, overId: string): number | null => {
    const activeIndex = tasks.findIndex((task) => task.id === activeId);
    const overIndex = tasks.findIndex((task) => task.id === overId);

    if (activeIndex === -1 || overIndex === -1) return null;

    const overTask = tasks[overIndex];
    const prevTask = tasks[overIndex - 1] ?? null;
    const nextTask = tasks[overIndex + 1] ?? null;

    if (activeIndex > overIndex) {
      return prevTask
        ? (prevTask.order + overTask.order) / 2
        : overTask.order / 2;
    }

    if (activeIndex < overIndex) {
      return nextTask
        ? (overTask.order + nextTask.order) / 2
        : overTask.order + GAP;
    }

    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id) || null;
    setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    reorderTasks(activeId, overId);

    const newOrder = extractNewOrder(activeId, overId);
    if (newOrder != null) {
      updateTaskOrder({ taskId: activeId, order: newOrder });

      queryClient.setQueryData<Task[]>(["getTasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === activeId ? { ...task, order: newOrder } : task
        )
      );
    }

    setActiveTask(null);
  };

  if (isLoading) return <Loading className="w-full h-64" />;

  if (error) return <div>Error loading tasks: {error.message}</div>;

  if (!tasks.length)
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-32 opacity-50">
        <CircleDashedIcon className="size-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No tasks available.</p>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4 overflow-y-auto py-2">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {activeTask && (
          <DragOverlay modifiers={[restrictToWindowEdges]}>
            <TaskCard task={activeTask} />
          </DragOverlay>
        )}
      </DndContext>
    </div>
  );
};

export default TaskList;
