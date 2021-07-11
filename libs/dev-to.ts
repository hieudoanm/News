import { fetchJSON } from "../libs/fetch";

const base = "https://dev.to/api";

export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  slug: string;
  path: string;
  tags: Array<string>;
  created_at: string;
};

export type Tag = {
  id: number;
  name: string;
  bg_color_hex: string;
  text_color_hex: string;
};

export const getArticles = async (
  tag = "",
  skip = 1,
  limit = 10
): Promise<Array<Article>> => {
  const url = `${base}/articles?page=${skip}&per_page=${limit}&tag=${tag}`;
  return fetchJSON(url);
};

export const getTags = async (skip = 1, limit = 1000): Promise<Array<Tag>> => {
  const url = `${base}/tags?page=${skip}&per_page=${limit}`;
  return fetchJSON(url);
};
