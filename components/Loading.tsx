import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadingProps = {
  className?: string;
};

const Loading = ({className}: LoadingProps) => {
  return (
    <div className={cn("flex items-center justify-center h-full w-full", className)}>
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
