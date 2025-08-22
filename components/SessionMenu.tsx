"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { cn, getShortName } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const SessionMenu = () => {
  const [onOpenDropdown, setOnOpenDropdown] = useState(false);
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu open={onOpenDropdown} onOpenChange={setOnOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2 hover:cursor-pointer",
              onOpenDropdown && "bg-accent text-accent-foreground"
            )}
          >
            <Avatar className="bg-accent text-accent-foreground size-6">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>
                {getShortName(session.user.name) || "User"}
              </AvatarFallback>
            </Avatar>
            <span className="text-md font-bold line-clamp-1 font-mono ml-1">
              {session.user.name || "User"}
            </span>
            <ChevronDown
              className={cn(
                "size-4 transition-all duration-200",
                onOpenDropdown && "rotate-180"
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-36 rounded-xs"
          sideOffset={4}
        >
          <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="size-4 mr-1" />
            ) : (
              <MoonIcon className="size-4 mr-1" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => signOut({ callbackUrl: "/signin" })}
          >
            <LogOutIcon className="size-4 mr-1" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SessionMenu;
