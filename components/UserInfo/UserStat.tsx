import { useGetUserInfo } from "@/hooks/useUser";
import React from "react";
import StatusBadge from "../StatusBadge";
import Loading from "../Loading";

const UserStat = () => {
  const { data: userInfo, isLoading, error } = useGetUserInfo();

  if (isLoading) {
    return <Loading className="h-16" />;
  }

  if (error) {
    return (
      <p className="text-destructive-foreground text-sm">
        {error.message || "Failed to load user information"}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start w-full gap-1 font-mono">
      <div className="flex items-center gap-1 justify-start w-full">
        <span className="font-bold">Total Tasks:</span>
        {userInfo?.taskStats.totalTasks ?? 0}
      </div>
      <div className="flex flex-wrap items-center gap-1.5 justify-start w-full">
        <StatusBadge
          status="toDo"
          onChange={() => {}}
          disabled
          amount={userInfo?.taskStats.toDoTasks ?? 0}
        />
        <StatusBadge
          status="inProgress"
          onChange={() => {}}
          disabled
          amount={userInfo?.taskStats.inProgressTasks ?? 0}
        />
        <StatusBadge
          status="completed"
          onChange={() => {}}
          disabled
          amount={userInfo?.taskStats.completedTasks ?? 0}
        />
        <StatusBadge
          status="cancelled"
          onChange={() => {}}
          disabled
          amount={userInfo?.taskStats.cancelledTasks ?? 0}
        />
      </div>
    </div>
  );
};

export default UserStat;
