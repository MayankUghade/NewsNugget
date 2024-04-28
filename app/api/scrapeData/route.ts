import { auth } from "@/utils/auth";
import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const Link = searchParams.get("URL");

  const session = await auth();

  try {
    const response = await axios.get(Link as string);
    const html = response.data;

    const $: CheerioAPI = cheerio.load(html);
    const title = $(".HNMDR");
    const article = $("._s30J.clearfix");

    const data = article.text();
    const heading = title.text();

    if (!session) {
      return NextResponse.json("User not logged in");
    } else {
      return NextResponse.json({ data, heading });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
