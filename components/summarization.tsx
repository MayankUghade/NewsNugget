import { summarizeAI } from "@/data/actions";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Summarization({
  title,
  orignalArticle,
}: {
  title: string;
  orignalArticle: string;
}) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const data = await summarizeAI(orignalArticle);
    setSummary(data[0].summary_text);
    setLoading(false);
  };

  useEffect(() => {
    setSummary("");
  }, [orignalArticle]);

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="font-semibold text-xl text-center">
        {!title || title.length === 0 ? "Here comes the title" : title}
      </h1>
      <div className="w-full flex items-center justify-center mt-3">
        {loading ? (
          <Button
            disabled
            className="items-center bg-green-600 text-white hover:bg-green-500"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleClick}
            className="items-center bg-green-600 text-white hover:bg-green-500"
          >
            Summarize
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center ml:2 mr:2 mt-7 gap-7">
        <div className="h-[400px] lg:w-[48%] w-[100%] rounded-sm border border-gray-500">
          <div className="flex items-center justify-between border-b p-3 border-gray-500">
            <h1 className="text-xl font-semibold text-orange-500">
              Actual article
            </h1>
          </div>
          <ScrollArea className="h-[340px] w-[100%] flex items-center p-4">
            {!orignalArticle || orignalArticle.length === 0
              ? "No article found yet"
              : orignalArticle}
          </ScrollArea>
        </div>

        <div className="h-[400px] lg:w-[48%] w-[100%] rounded-sm border border-gray-500">
          <div className="flex items-center justify-between border-b p-3 border-gray-500">
            <h1 className="text-xl font-semibold text-orange-500">
              Summarised text
            </h1>
          </div>
          <ScrollArea className="h-[340px] w-[100%] flex items-center p-4">
            {!summary || summary.length === 0
              ? "No summary found yet"
              : summary}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
