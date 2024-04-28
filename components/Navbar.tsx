"use client";

import Image from "next/image";
import logo from "@/public/logo.svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="p-5 lg:container flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image className="w-[50px] md:w-[70px]" src={logo} alt="" />
        <h1 className="md:text-2xl text-md font-bold sm:flex hidden">
          NewsNugget
        </h1>
      </Link>

      {/* some buttons */}
      <div className="flex items-center gap-3 md:mr-5">
        {session ? (
          <div className="flex gap-3 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image ?? ""}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="text-lg">{session?.user?.name}</h1>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Button
                  type="submit"
                  variant="link"
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                >
                  LogOut
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            onClick={() => signIn("google")}
            variant="default"
            className="font-semibold  bg-orange-500 hover:bg-orange-400 text-white"
          >
            SignUp
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}
