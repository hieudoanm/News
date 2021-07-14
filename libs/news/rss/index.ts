import _ from "lodash";
import xml2json from "xml2json";
import { fetchText } from "../../fetch";
import { addZero } from "../../utils";
import { Article, Category, Source, SourceId, sources } from "../sources";

export const parseJSON = (string: string, fallback: any = {}): any => {
  try {
    return JSON.parse(string);
  } catch (error) {
    console.error("parseJSON error", error);
    return fallback;
  }
};

export const processPublishedAt = (publishedDate: string): any => {
  const months: Array<string> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [, dateTime = ""] = publishedDate
    .split(",")
    .map((str: string) => str.trim());
  const [dateString = "0", monthString = "", yearString = "0", time = ""] =
    dateTime.split(" ").map((str: string) => str.trim());
  const date: number = parseInt(dateString, 10);
  const month: number = (months.indexOf(monthString) || 0) + 1;
  const year: number = parseInt(yearString, 10);

  const [hoursString = "0", minutesString = "0", secondsString = "0"] = time
    .split(":")
    .map((str: string) => str.trim());
  const hours: number = parseInt(hoursString, 10);
  const minutes: number = parseInt(minutesString, 10);
  const seconds: number = parseInt(secondsString, 10);

  const publishedAt: string = `${year}-${addZero(month)}-${addZero(
    date
  )}T${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}Z`;

  return publishedAt;
};

export const processArticles = (
  items: Array<any>,
  source: Source
): Array<Article> => {
  const articles: Array<Article> = items.map((article: any) => {
    const {
      title,
      link: url,
      description: content,
      pubDate: publishedDate,
    } = article;
    let urlToImage: string = "";
    if (content.includes("<img")) {
      const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
      const result: RegExpExecArray | null = rex.exec(content);
      if (result) {
        urlToImage = result[1] || "";
      }
    }
    const description = content.replace(/(<([^>]+)>)/gi, "");
    const publishedAt = processPublishedAt(publishedDate);
    const pickSource = _.pick(source, ["id", "name", "url"]);
    return {
      title,
      url,
      publishedAt,
      urlToImage,
      description,
      content,
      source: pickSource,
    };
  });
  return articles;
};

export const getRSS = async (
  rssUrl: string,
  source: Source
): Promise<Array<any>> => {
  try {
    const xml: string = await fetchText(rssUrl);
    const jsonString: string = xml2json.toJson(xml);
    const data: any = parseJSON(jsonString, {});
    const { rss = {} } = data;
    const { channel = {} } = rss;
    const { item = [] } = channel;
    return processArticles(item, source);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArticlesById = async (
  id: SourceId,
  category: Category
): Promise<Array<Article>> => {
  const source: Source | undefined = sources.find((s: Source) => s.id === id);
  if (!source) return [];

  const categories: Record<Category, string> | undefined = _.get(
    source,
    "categories"
  );
  if (!categories) return [];
  const rssUrl = categories[category] || "";
  if (!rssUrl) return [];

  const articles: Array<Article> = await getRSS(rssUrl, source);
  return articles;
};
