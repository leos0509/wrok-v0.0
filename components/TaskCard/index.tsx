import { Task } from "@/types/task";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardDisplay from "./CardDisplay";

type TaskWrapperProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskWrapperProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full"
    >
      <CardDisplay task={task} isDragging={isDragging} />
    </div>
  );
};

export default React.memo(TaskCard);
