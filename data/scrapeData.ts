"use server";

import { extract } from "@extractus/article-extractor";

export async function fetchArticle(articleUrl: string) {
  try {
    const article = await extract(
      articleUrl,
      {},
      (url) =>
        fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
          },
        })
    );

    if (!article) {
      return { data: "", heading: "" };
    }

    return {
      heading: article.title ?? "",
      data: article.content ?? "",
      // bonus fields you get for free with this approach
      description: article.description ?? "",
      image: article.image ?? "",
      published: article.published ?? "",
      author: article.author ?? "",
    };
  } catch (error) {
    console.log(error);
    return { data: "", heading: "" };
  }
}