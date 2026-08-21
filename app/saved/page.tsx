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

  // Sort data by id in descending order (latest first)
  // Assuming IDs are chronological (like UUID v4 or MongoDB ObjectId)
  const sortedData = data?.sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="h-full lg:container min-h-screen p-5">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-3 mb-8">
        Your saved{" "}
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-gradient">
          Summaries
        </span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {sortedData && sortedData.length > 0 ? (
          sortedData.map((item, index) => (
            <div
              key={index}
              className="group p-4 border rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-purple-300 flex flex-col gap-3"
            >
              {/* Title */}
              <div className="border-b pb-2">
                <h1 className="font-bold text-lg line-clamp-1">
                  <span className="text-orange-500">Title</span>:{" "}
                  <span className="text-gray-700 dark:text-gray-200">{item.title}</span>
                </h1>
              </div>

              {/* Link */}
              <div className="flex-1 min-h-[60px]">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-2 break-all">
                  {item.link}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t">
                <Link href={`/${item.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                    📖 View More
                  </Button>
                </Link>

                <DeleteSummary summaryId={item.id as string} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center flex flex-col items-center justify-center gap-5 py-10">
            <Image 
              src="/empty.svg" 
              alt="No summaries" 
              width={300} 
              height={300}
              className="opacity-70"
            />
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
              No summaries saved yet.
            </h1>
            <p className="text-gray-500 dark:text-gray-500">
              Start summarizing your content today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}