import Image from "next/image";
import toi from "@/public/toi.png";
export default function Introdunction() {
  return (
    <div className="flex text-center justify-center flex-col gap-3">
      <h1 className="font-bold lg:text-6xl md:text-5xl text-2xl md:p-5">
        Grab Your Daily Dose of TOI in Short from
        <br /> with{" "}
        <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent w-fit bg-clip-text">
          NewsNugget!
        </span>
      </h1>

      <p className="md:text-xl text-sm">
        NewsNugget is an AI based application that helps user to sumarize{" "}
        <span className="text-red-500">Times of India</span> articles{" "}
      </p>

      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          className="w-[990px] md:h-[560px]  rounded-lg border-2 border-black mt-3"
          src={toi}
          alt="article"
        />
        <button className="px-10 py-2 bg-orange-500 hover:bg-orange-400 rounded-lg font-semibold text-white">
          Explore
        </button>
      </div>
    </div>
  );
}
