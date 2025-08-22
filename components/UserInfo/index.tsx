"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getShortName } from "@/lib/utils";
import UserStat from "./UserStat";
import Loading from "../Loading";

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-sm xl:max-w-md flex flex-col items-start justify-start gap-2 sticky top-0 z-10 py-8">
      <h2 className="text-2xl font-semibold text-center font-mono uppercase">
        User Information
      </h2>
      <div className="rounded-xs bg-card text-card-foreground w-full p-4 flex flex-col items-center justify-start gap-4 shadow-xs border">
        <div className="flex items-start gap-4 w-full h-24">
          <Avatar className="bg-accent text-accent-foreground size-24">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>
              {getShortName(session.user.name) || "User"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start justify-center h-full w-full">
            <h4 className="font-mono font-bold text-lg text-primary">
              {session.user.name}
            </h4>
            <p className="text-sm font-mono text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xs bg-card text-card-foreground w-full p-4 flex flex-col items-center justify-start gap-4 shadow-xs border">
        <UserStat />
      </div>
    </div>
  );
};

export default UserInfo;
