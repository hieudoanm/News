import cheerio, { Cheerio } from "cheerio";
import { fetchText } from "../../fetch";
import { Article } from "../utils";

export const source = "CafeF";

export const sourceUrl = "https://cafef.vn";

export const getArticles = async (): Promise<Array<Article>> => {
  const pageUrl = "https://cafef.vn/doc-nhanh.chn";
  const body: string = await fetchText(pageUrl);
  const $ = cheerio.load(body);
  const $listItems = $("#listNewHeader ul li")
    .get()
    .map((item: any) => $(item));
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const seconds = 0;
  const articles = $listItems.map(($item: Cheerio<any>) => {
    const title: string = $item.find("a").attr("title") || "";
    const slug: string = $item.find("a").attr("href") || "";
    const time: string = $item.find(".time").text() || "00:00";
    const [hh, mm] = time.split(":");
    const hours: number = parseInt(hh, 10);
    const minutes: number = parseInt(mm, 10);
    const dateTime = new Date(year, month, date, hours, minutes, seconds, 0);
    dateTime.setHours(hours + 7);
    const timestamp = dateTime.getTime();
    const publishedDate = dateTime.toISOString();
    const url = `https://cafef.vn/${slug}`;
    const [description] = publishedDate.split("T").join(" ").split(".");
    return {
      title,
      url,
      description,
      source,
      sourceUrl,
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      timestamp,
      publishedDate,
    };
  });
  return articles;
};
