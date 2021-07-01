import { Article, getRSS, processArticles } from '../utils';

export const source = 'VietNamBiz';

export const sourceUrl = 'https://vietnambiz.vn/';

export const rssCategory: Record<string, string> = {
  'trang-chu': 'https://vietnambiz.vn/trang-chu.rss',
  'thoi-su': 'https://vietnambiz.vn/thoi-su.rss',
  'hang-hoa': 'https://vietnambiz.vn/hang-hoa.rss',
  'tai-chinh': 'https://vietnambiz.vn/tai-chinh.rss',
  'nha-dat': 'https://vietnambiz.vn/nha-dat.rss',
  'chung-khoan': 'https://vietnambiz.vn/chung-khoan.rss',
  'doanh-nghiep': 'https://vietnambiz.vn/doanh-nghiep.rss',
  'kinh-doanh': 'https://vietnambiz.vn/kinh-doanh.rss'
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
