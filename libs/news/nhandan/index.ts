import { Article, getRSS, processArticles } from '../utils';

export const source = 'Nhân Dân';

export const sourceUrl = 'https://nhandan.com.vn';

export const rssCategory: Record<string, string> = {
  business: 'https://en.nhandan.org.vn/rss/business.html',
  politics: 'https://en.nhandan.com.vn/rss/politics.html',
  society: 'https://en.nhandan.com.vn/rss/society.html',
  culture: 'https://en.nhandan.com.vn/rss/culture.html',
  sports: 'https://en.nhandan.org.vn/rss/sports.html',
  technology: 'https://en.nhandan.org.vn/rss/scitech.html',
  travel: 'https://en.nhandan.com.vn/rss/travel.html',
  world: 'https://en.nhandan.com.vn/rss/world.html',
  video: 'https://en.nhandan.com.vn/rss/video.html'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory.business || '';
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
