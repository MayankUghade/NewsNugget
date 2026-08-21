"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Save, ChevronDown, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchArticle } from "@/data/scrapeData";
import { summarizeAI, NuggetSummary } from "@/data/actions";
import saveSumary from "@/data/save";

const formSchema = z.object({
  URL: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
});

function checkurl(url: string) {
  const validPrefix = "https://timesofindia.indiatimes.com/";
  return url.startsWith(validPrefix);
}

type Stage = "idle" | "fetching" | "summarizing" | "done";

export default function CreateSummary() {
  const router = useRouter();

  const [articleTitle, setArticleTitle] = useState("");
  const [article, setArticle] = useState("");
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState<NuggetSummary | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [showOriginal, setShowOriginal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { URL: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { URL } = values;

    if (!checkurl(URL)) {
      toast.error("Please enter a valid TOI URL");
      return;
    }

    setSummary(null);
    setShowOriginal(false);

    try {
      setStage("fetching");
      const articleData = await fetchArticle(URL);

      if (!articleData || !articleData.data || !articleData.heading) {
        toast.error(
          "Couldn't extract that article. It may be behind a paywall, or the page isn't supported yet."
        );
        setStage("idle");
        return;
      }

      setArticleTitle(articleData.heading);
      setArticle(articleData.data);
      setLink(URL);

      setStage("summarizing");
      const nugget = await summarizeAI(articleData.data, articleData.heading);
      setSummary(nugget);
      setStage("done");
    } catch (error) {
      console.error("Error creating summary:", error);
      toast.error("Something went wrong. Please try again.");
      setStage("idle");
    }
  }

  async function handleSave() {
    if (!link || !article || !summary) {
      toast.error("Create a summary first before saving");
      return;
    }
    saveSumary(link, articleTitle, article, JSON.stringify(summary));
    toast.success("Summary saved successfully");
    router.push("/saved");
  }

  function handleReset() {
    form.reset({ URL: "" });
    setArticleTitle("");
    setArticle("");
    setLink("");
    setSummary(null);
    setShowOriginal(false);
    setStage("idle");
  }

  const isLoading = stage === "fetching" || stage === "summarizing";

  return (
    <div className="lg:container min-h-screen pb-16">
      <div className="flex items-center justify-end pt-4">
        <Link href="/saved">
          <Button variant="outline">Saved summaries</Button>
        </Link>
      </div>

      {stage !== "done" && (
        <div className="mx-auto mt-10 max-w-2xl">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Paste a{" "}
            <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
              Times of India
            </span>{" "}
            article link, get the nugget.
          </h1>
          <p className="text-center text-muted-foreground text-sm sm:text-base mt-2">
            No extra steps. We fetch it, condense it, and show you the key points.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col sm:flex-row gap-3 items-start">
              <FormField
                control={form.control}
                name="URL"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Input placeholder="https://timesofindia.indiatimes.com/..." disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="bg-orange-500 text-white hover:bg-orange-400 shrink-0">
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    {stage === "fetching" ? "Fetching article..." : "Condensing..."}
                  </>
                ) : (
                  "Get the nugget"
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {stage === "done" && summary && (
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-lg sm:text-2xl font-semibold leading-snug">{articleTitle}</h1>
            <Button variant="ghost" size="sm" onClick={handleReset} className="shrink-0 gap-1.5 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" />
              New
            </Button>
          </div>

          <div className="rounded-lg border border-gray-500 p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2">TL;DR</h2>
            <p className="text-base leading-relaxed">{summary.tldr}</p>

            <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500 mt-6 mb-2.5">Key points</h2>
            <ul className="flex flex-col gap-2.5">
              {summary.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => setShowOriginal((v) => !v)} className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            <ChevronDown className={`h-4 w-4 transition-transform ${showOriginal ? "rotate-180" : ""}`} />
            {showOriginal ? "Hide" : "Show"} original article
          </button>

          {showOriginal && (
            <div className="mt-3 rounded-lg border border-gray-500">
              <ScrollArea className="h-[300px] w-full p-4">
                <p className="text-sm text-muted-foreground whitespace-pre-line">{article}</p>
              </ScrollArea>
            </div>
          )}

          <Button className="mt-6 flex items-center gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Summary
          </Button>
        </div>
      )}
    </div>
  );
}