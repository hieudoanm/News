import { fetchJSON } from "../../fetch";
import { Article, Source, sources } from "../sources";

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
  category = "kinh-doanh"
): Promise<Array<Article>> => {
  const id = "vietcetera";
  const source: Source = sources.find((source: Source) => source.id === id);
  if (!source) return [];

  const { category: mainCatory = "", categories } = source;
  const topic: string = categories[category] || categories[mainCatory] || "";
  if (!topic) return [];

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
      publishDate: publishedAt,
    } = doc;
    const url = `https://vietcetera.com/${language.toLowerCase()}/${slug}`;
    return { title, url, description, source, publishedAt };
  });
  return articles;
};
