import xml2json from "xml2json";
import { fetchText } from "../../fetch";

export type Article = {
  title: string;
  url: string;
  description: string;
  publishedDate: string;
  source: string;
  sourceUrl: string;
  year: string | number;
  month: string | number;
  date: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
  timestamp: string | number;
};

export const parseJSON = (string: string, fallback: any = {}): any => {
  try {
    return JSON.parse(string);
  } catch (error) {
    console.error("parseJSON error", error);
    return fallback;
  }
};

export const getRSS = async (rssUrl: string): Promise<Array<any>> => {
  const xml: string = await fetchText(rssUrl);
  const jsonString: string = xml2json.toJson(xml);
  const data: any = parseJSON(jsonString, {});
  const { rss = {} } = data;
  const { channel = {} } = rss;
  const { item = [] } = channel;
  return item;
};

export const processPublishedDate = (publishedDate: string): any => {
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
  const timestamp: number = new Date(
    year,
    month - 1,
    date,
    hours,
    minutes,
    seconds,
    0
  ).getTime();
  return { year, month, date, hours, minutes, seconds, timestamp };
};

export const processArticles = (
  items: Array<any>,
  source: string,
  sourceUrl: string
): Array<Article> => {
  const articles: Array<Article> = items.map((article: any) => {
    const { title, link, description, pubDate: publishedDate } = article;
    const { year, month, date, hours, minutes, seconds, timestamp } =
      processPublishedDate(publishedDate);
    return {
      title,
      url: link,
      description,
      publishedDate,
      source,
      sourceUrl,
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      timestamp,
    };
  });
  return articles;
};
