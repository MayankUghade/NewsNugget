"use server";
import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";

export async function fetchArticle(articleUrl: string) {
  try {
    const response = await axios.get(articleUrl as string);
    const html = response.data;

    const $: CheerioAPI = cheerio.load(html);
    const title = $(".HNMDR");
    const article = $("._s30J.clearfix");

    const data = article.text();
    const heading = title.text();

    return { data, heading };
  } catch (error) {
    console.log(error);
  }
}
