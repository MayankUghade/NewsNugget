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
import Summarization from "./summarization";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { fetchArticle } from "@/data/scrapeData";

const formSchema = z.object({
  URL: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
});

function checkurl(url: string) {
  const validPrefix = "https://timesofindia.indiatimes.com/";

  return url.startsWith(validPrefix);
}

export default function CreateSummary() {
  const [articleTitle, setArticleTitle] = useState("");
  const [article, setArticle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setloading] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      URL: "",
    },
  });

  async function fetchArticleData(url: string) {
    try {
      const articleData = await fetchArticle(url);
      if (articleData) {
        setArticleTitle(articleData.heading);
        setArticle(articleData.data);
        setLink(url);
        setloading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again later.");
      setloading(false);
    }
  }

  useEffect(() => {
    if (url) {
      fetchArticleData(url);
    }
  }, [url]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true);
    const { URL } = values;
    const isValid = checkurl(URL);

    if (!isValid) {
      toast.error("Please enter a valid TOI URL");
      setloading(false);
      return;
    }

    setUrl(URL); // Set the URL to trigger the useEffect
  }

  return (
    <div className="lg:container min-h-screen">
      <Link href="/saved" className="flex items-center justify-end">
        <Button variant="outline">Saved summaries</Button>
      </Link>
      <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-center mt-3">
        Please provide the URL of the{" "}
        <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent w-fit bg-clip-text">
          Times of India
        </span>{" "}
        article you'd like to summarize.
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
          <FormField
            control={form.control}
            name="URL"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="paste the times of india url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loading ? (
            <Button
              disabled
              className="items-center bg-orange-500 text-white hover:bg-orange-400"
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="items-center bg-orange-500 text-white hover:bg-orange-400"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>

      {/* Code summarization logic */}
      <Summarization
        title={articleTitle}
        orignalArticle={article}
        link={link}
      />
    </div>
  );
}
