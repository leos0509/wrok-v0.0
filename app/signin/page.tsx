"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

const SigninPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user) {
    return (
      <div className="page-wrapper w-full h-full justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">Hello, {session.user.name}.</CardTitle>
            <CardDescription className="text-muted-foreground">
              You are already signed in as {session.user.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                size="lg"
                className="w-full hover:cursor-pointer gap-4 font-mono font-bold text-lg"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Sign Out</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-wrapper w-full h-full justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-mono">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Please sign-in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              size="lg"
              className="w-full hover:cursor-pointer gap-4 font-mono font-bold text-lg"
            >
              <Image
                src="/github-mark-white.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
              <span>Github</span>
            </Button>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              size="lg"
              variant="outline"
              className="w-full hover:cursor-pointer gap-4 font-mono font-bold text-lg"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span>Google</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
