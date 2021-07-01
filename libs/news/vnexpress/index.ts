import { Article, getRSS, processArticles } from '../utils';

export const source = 'VNExpress';

export const sourceUrl = 'https://vnexpress.net';

export const rssCategory: Record<string, string> = {
  'the-gioi': 'https://vnexpress.net/rss/the-gioi.rss',
  'thoi-su': 'https://vnexpress.net/rss/thoi-su.rss',
  'kinh-doanh': 'https://vnexpress.net/rss/kinh-doanh.rss',
  startup: 'https://vnexpress.net/rss/startup.rss',
  'giai-tri': 'https://vnexpress.net/rss/giai-tri.rss',
  'the-thao': 'https://vnexpress.net/rss/the-thao.rss',
  'phap-luat': 'https://vnexpress.net/rss/phap-luat.rss',
  'giao-duc': 'https://vnexpress.net/rss/giao-duc.rss',
  'suc-khoe': 'https://vnexpress.net/rss/suc-khoe.rss',
  'gia-dinh': 'https://vnexpress.net/rss/gia-dinh.rss',
  'du-lich': 'https://vnexpress.net/rss/du-lich.rss',
  'khoa-hoc': 'https://vnexpress.net/rss/khoa-hoc.rss',
  'so-hoa': 'https://vnexpress.net/rss/so-hoa.rss',
  'oto-xe-may': 'https://vnexpress.net/rss/oto-xe-may.rss'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory['kinh-doanh'] || '';
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
