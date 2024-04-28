import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSingleSummary } from "./actions";
import { auth } from "@/utils/auth";

export default async function page(props: { params: { summaryId: string } }) {
  const summaryId = props.params.summaryId;
  const data = await fetchSingleSummary(summaryId);
  const session = await auth();

  if (!session) {
    return <div>User not Logged in</div>;
  }
  return (
    <div className="lg:container h-screen p-3">
      <div className="flex">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-center mt-3">
          {data?.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center ml:2 mr:2 mt-10 gap-7">
        <div className="h-[400px] lg:w-[48%] w-[100%] rounded-sm border border-gray-500">
          <div className="flex items-center justify-between border-b p-3 border-gray-500">
            <h1 className="text-xl font-semibold text-orange-500">
              Actual article
            </h1>
          </div>
          <ScrollArea className="h-[340px] w-[100%] flex items-center p-4">
            {data?.article}
          </ScrollArea>
        </div>

        <div className="h-[400px] lg:w-[48%] w-[100%] rounded-sm border border-gray-500">
          <div className="flex items-center justify-between border-b p-3 border-gray-500">
            <h1 className="text-xl font-semibold text-orange-500">
              Summarized text
            </h1>
          </div>
          <ScrollArea className="h-[340px] w-[100%] flex items-center p-4">
            {data?.summary}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
