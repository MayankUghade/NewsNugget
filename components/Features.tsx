import Image from "next/image";
import news from "@/public/news.svg";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
export default function Features() {
  return (
    <div className="flex flex-col items-center justify-center md:p-5 mt-8">
      <h1 className="md:text-4xl text-2xl text-center font-bold">
        Key Features of <span className="text-orange-500">NewsNugget</span>
      </h1>

      {/* points and image */}
      <div className="flex flex-col md:flex-row items-center md:mt-[80px] md:mb-[80px] mt-10 md:gap-[120px] gap-12">
        {/* points */}
        <div className="flex flex-col gap-10 md:text-3xl text-md font-semibold">
          <div className="flex gap-3 items-center ">
            <TaskAltIcon className="text-green-500 " />
            <h1>Get news In short form</h1>
          </div>
          <div className="flex gap-3 items-center">
            <TaskAltIcon className="text-green-500" />
            <h1>Skip countless ads</h1>
          </div>
          <div className="flex gap-3 items-center">
            <TaskAltIcon className="text-green-500" />
            <h1>Save lots of time</h1>
          </div>
          <div className="flex gap-3 items-center">
            <TaskAltIcon className="text-green-500" />
            <h2>Avoid the Clickbait Trap</h2>
          </div>
        </div>

        {/* Image */}
        <div>
          <Image className="w-[200px] md:w-[500px]" src={news} alt="" />
        </div>
      </div>
    </div>
  );
}
