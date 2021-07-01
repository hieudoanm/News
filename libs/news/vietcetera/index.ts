import { fetchJSON } from "../../fetch";
import { Article } from "../utils";

export const source = "Vietcetera";

export const sourceUrl = "https://vietcetera.com";

export const categories: Array<string> = [
  "kinh-doanh",
  "cuoc-song",
  "sang-tao",
  "thoi-trang",
  "thuong-thuc",
];

type Doc = {
  title: string;
  slug: string;
  language: string;
  excerpt: string;
  publishDate: string;
};

export const getArticles = async (
  topic = "kinh-doanh"
): Promise<Array<Article>> => {
  const apiUrl = `https://api.vietcetera.com/client/api/v2/latest-article?language=VN&groupTopic=${topic}`;

  const response = await fetchJSON(apiUrl);
  const { data = {} } = response;
  const { docs = [] } = data;
  const articles: Array<Article> = docs.map((doc: Doc) => {
    const {
      title,
      slug,
      language,
      excerpt: description,
      publishDate: publishedDate,
    } = doc;
    const url = `https://vietcetera.com/${language.toLowerCase()}/${slug}`;
    const [publishedTime] = publishedDate.split(".");
    const [date, time] = publishedTime.split("T");
    const [yyyy, mm, dd] = date.split("-");
    const [hh, mn, ss] = time.split(":");
    const year: number = parseInt(yyyy, 10);
    const month: number = parseInt(mm, 10);
    const date2: number = parseInt(dd, 10);
    const hours: number = parseInt(hh, 10);
    const minutes: number = parseInt(mn, 10);
    const seconds: number = parseInt(ss, 10);
    const timestamp = new Date(
      year,
      month - 1,
      date2,
      hours,
      minutes,
      seconds,
      0
    );
    return {
      title,
      url,
      description,
      source,
      sourceUrl,
      publishedDate,
      year,
      month,
      date: date2,
      hours,
      minutes,
      seconds,
      timestamp,
    };
  });
  return articles;
};
