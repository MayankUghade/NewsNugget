import Image from "next/image";
import toi from "@/public/toi.png";
import { Button } from "./ui/button";
export default function Introdunction() {
  return (
    <div className="flex text-center justify-center flex-col gap-3">
      <h1 className="font-bold lg:text-6xl md:text-5xl text-3xl md:p-5">
        Grab Your Daily Dose of <span className="text-red-500">TOI</span> in
        Short from
        <br /> with{" "}
        <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent w-fit bg-clip-text">
          NewsNugget!
        </span>
      </h1>

      <p className="md:text-xl text-md">
        NewsNugget is an AI based application that helps user to sumarize{" "}
        <span className="text-red-500">Times of India</span> articles{" "}
      </p>

      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          className="w-[990px] md:h-[560px]  rounded-lg border-2 border-black mt-3"
          src={toi}
          alt="article"
        />
        <Button className=" bg-orange-500 hover:bg-orange-400 text-white">
          Explore
        </Button>
      </div>
    </div>
  );
}
