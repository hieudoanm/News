import cheerio from "cheerio";
import { fetchText } from "../../fetch";
import { Article, Source, sources } from "../sources";

const getArticles = async (category: string): Promise<Array<Article>> => {
  const id = "cafef";
  const sourceIndex: number = sources.findIndex((s: Source) => s.id === id);
  const source: Source | undefined = sources[sourceIndex];
  if (!source) return [];

  const { category: mainCategory } = source;
  if (category !== mainCategory) return [];

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
  const articles = $listItems.map(($item: any) => {
    const title: string = $item.find("a").attr("title") || "";
    const slug: string = $item.find("a").attr("href") || "";
    const time: string = $item.find(".time").text() || "00:00";
    const [hh, mm] = time.split(":");
    const hours: number = parseInt(hh, 10);
    const minutes: number = parseInt(mm, 10);
    const dateTime = new Date(year, month, date, hours, minutes, seconds, 0);
    dateTime.setHours(hours + 7);
    const publishedAt = dateTime.toISOString();
    const url = `https://cafef.vn/${slug}`;
    return {
      title,
      url,
      description: "",
      content: "",
      urlToImage: "",
      source,
      publishedAt,
    };
  });
  return articles;
};

export default getArticles;
