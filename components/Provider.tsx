"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthCheck from "./AuthCheck";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <AuthCheck>{children}</AuthCheck>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
