"use client";

import { HomeIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SessionMenu from "./SessionMenu";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-primary text-primary-foreground h-16 flex items-center justify-between py-2 px-8 shadow-sm">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        <Image
          src="/WROK-white.svg"
          alt="Logo"
          width={32}
          height={32}
        />
        <span className="text-lg font-bold font-mono">WROK v0.0</span>
      </button>
      <SessionMenu />
    </div>
  );
};

export default Navbar;
