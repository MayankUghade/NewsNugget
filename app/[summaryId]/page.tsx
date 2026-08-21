import { fetchSingleSummary } from "./actions";
import { auth } from "@/utils/auth";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface NuggetSummary {
  tldr: string;
  keyPoints: string[];
}

function parseSummary(raw: string | undefined | null): NuggetSummary | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.tldr === "string" && Array.isArray(parsed.keyPoints)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function page(props: { params: { summaryId: string } }) {
  const summaryId = props.params.summaryId;
  const data = await fetchSingleSummary(summaryId);
  const session = await auth();

  if (!session) {
    return <div>User not Logged in</div>;
  }

  const nugget = parseSummary(data?.summary);

  return (
    <div className="lg:container min-h-screen p-3 pb-16">
      <div className="mx-auto mt-6 max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
            {data?.title}
          </h1>
          {data?.link && (
            <Link
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mt-2"
            >
              Original
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-gray-500 p-5 sm:p-6">
          {nugget ? (
            <>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2">
                TL;DR
              </h2>
              <p className="text-base leading-relaxed">{nugget.tldr}</p>

              <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500 mt-6 mb-2.5">
                Key points
              </h2>
              <ul className="flex flex-col gap-2.5">
                {nugget.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Fallback for summaries saved before the structured format existed
            <p className="text-base leading-relaxed whitespace-pre-line">
              {data?.summary ?? "No summary available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}