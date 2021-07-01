import { Article, getRSS, processArticles } from '../utils';

export const source = 'Lao Động';

export const sourceUrl = 'https://laodong.vn';

export const rssCategory: Record<string, string> = { home: 'https://laodong.vn/rss/home.rss' };

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (): Promise<Array<Article>> => {
  const rssUrl = rssCategory.home || '';
  if (!rssUrl) return [];
  try {
    const items = await getRSS(rssUrl);
    const articles: Array<Article> = processArticles(items, source, sourceUrl);
    return articles;
  } catch (error) {
    return [];
  }
};

export default getArticles;
