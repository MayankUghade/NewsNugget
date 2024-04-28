import { Button } from "@/components/ui/button";
import { fetchSummary } from "./actions";
import Link from "next/link";
import DeleteSummary from "./Delete";
import Image from "next/image";
import { auth } from "@/utils/auth";

export default async function Page() {
  const data = await fetchSummary();
  const session = await auth();

  if (!session) {
    return <div className="min-h-screen container">User not Logged in</div>;
  }
  return (
    <div className="h-full lg:container min-h-screen p-5">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mt-3">
        Your saved{" "}
        <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent w-fit bg-clip-text">
          Summaries
        </span>
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-3 mt-5">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg sm:w-[500px] w-full sm:h-[280px] flex flex-col gap-2"
            >
              <h1 className="font-semibold text-center">
                <span className="text-orange-500 text-xl">Title</span>:{" "}
                {item.title}
              </h1>
              <div
                className="font-semibold p-3"
                style={{ maxWidth: "100%", overflowWrap: "break-word" }}
              >
                {item.link}
              </div>

              <div className="flex items-center justify-between mt-auto ">
                <Link href={`/${item.id}`}>
                  <Button className="bg-green-600 text-white">View More</Button>
                </Link>

                <DeleteSummary summaryId={item.id as string} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center flex flex-col items-center justify-between gap-5 sm:mt-10 mt-3">
            <Image src="/empty.svg" alt="Image" width="300" height="300" />
            <h1 className="text-xl font-semibold">No summaries saved yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
