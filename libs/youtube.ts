import { fetchJSON } from "../libs/fetch";

const regionCode = "VN";
const base = "https://www.googleapis.com/youtube/v3";

export type Video = {
  id: string;
  channelId: string;
  title: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
  tags: Array<string>;
  categoryId: string;
  url: string;
};

export type Category = {
  id: string;
  title: string;
  assignable: boolean;
  channelId: string;
};

export type Snippet = {
  channelId: string;
  title: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
  tags: Array<string>;
  categoryId: string;
  assignable?: boolean;
};

export type Item = {
  id: string;
  snippet: Snippet;
};

export const getMostPopularVideos = async (
  videoCategoryId = 0,
  maxResults: number = 50
): Promise<Array<Video>> => {
  const API_KEY_YOUTUBE: string = process.env.API_KEY_YOUTUBE || "";
  const url = `${base}/videos?part=snippet&videoCategoryId=${videoCategoryId}&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${API_KEY_YOUTUBE}`;
  const data = await fetchJSON(url);
  const { items = [] } = data;
  const videos = items.map((item: Item) => {
    const { id, snippet } = item;
    const {
      channelId = "",
      title = "",
      publishedAt = "",
      description = "",
      channelTitle = "",
      tags = [],
      categoryId = "",
    } = snippet;
    const link = `https://www.youtube.com/watch?v=${id}`;
    return {
      id,
      channelId,
      title,
      publishedAt,
      description,
      channelTitle,
      tags,
      categoryId,
      url: link,
    };
  });
  return videos;
};

export const getCategories = async (): Promise<Array<Category>> => {
  const API_KEY_YOUTUBE: string = process.env.API_KEY_YOUTUBE || "";
  const url = `${base}/videoCategories?regionCode=${regionCode}&key=${API_KEY_YOUTUBE}`;
  const data = await fetchJSON(url);
  const { items = [] } = data;
  const categories = items.map((item: Item) => {
    const { id, snippet } = item;
    const { title, assignable = false, channelId } = snippet;
    return { id, title, assignable, channelId };
  });
  return categories;
};
