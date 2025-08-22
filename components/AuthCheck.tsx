"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./Loading";

type AuthCheckProps = {
  children: React.ReactNode;
  redirectTo?: string;
  publicRoutes?: string[]; 
};

const AuthCheck = ({
  children,
  redirectTo = "/signin",
  publicRoutes = ["/signin"],
}: AuthCheckProps) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.replace(redirectTo);
    }
  }, [status, pathname, publicRoutes, redirectTo, router]);

  if (status === "loading") {
    return <Loading className="w-full h-screen" />;
  }

  if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;