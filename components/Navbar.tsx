import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="p-5 md:ml-[100px] md:mr-[100px] flex items-center justify-between">
      <div className="flex items-center">
        <Image className="w-[50px] md:w-[70px]" src={logo} alt="" />
        <h1 className="md:text-2xl text-md font-bold">NewsNugget</h1>
      </div>

      {/* some buttons */}
      <Link href="/signIn">
        <button className="px-5 py-2 md:py-3 bg-orange-500 hover:bg-orange-400 rounded-lg text-sm md:text-md font-semibold text-white">
          SignIn
        </button>
      </Link>
    </div>
  );
}
