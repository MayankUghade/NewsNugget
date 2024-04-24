import Image from "next/image";
import logo from "@/public/logo.svg";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <div className="p-5 md:ml-[100px] md:mr-[100px] flex items-center justify-between">
      <div className="flex items-center">
        <Image className="w-[50px] md:w-[70px]" src={logo} alt="" />
        <h1 className="md:text-2xl text-md font-bold">NewsNugget</h1>
      </div>

      {/* some buttons */}
      <div className="flex items-center gap-2">
        <Button className=" bg-orange-500 hover:bg-orange-400 text-white">
          SignIn
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
