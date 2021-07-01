import { Article, getRSS, processArticles } from '../utils';

export const source = 'Tuổi Trẻ';

export const sourceUrl = 'https://tuoitre.vn';

export const rssCategory: Record<string, string> = {
  'kinh-doanh': 'https://tuoitre.vn/rss/kinh-doanh.rss',
  'giai-tri': 'https://tuoitre.vn/rss/giai-tri.rss',
  'thoi-su': 'https://tuoitre.vn/rss/thoi-su.rss',
  'suc-khoe': 'https://tuoitre.vn/rss/suc-khoe.rss',
  'khoa-hoc': 'https://tuoitre.vn/rss/khoa-hoc.rss',
  'the-thao': 'https://tuoitre.vn/rss/the-thao.rss',
  'nhip-song-so': 'https://tuoitre.vn/rss/nhip-song-so.rss',
  'the-gioi': 'https://tuoitre.vn/rss/the-gioi.rss',
  xe: 'https://tuoitre.vn/rss/xe.rss',
  'van-hoa': 'https://tuoitre.vn/rss/van-hoa.rss',
  'phap-luat': 'https://tuoitre.vn/rss/phap-luat.rss',
  'giao-duc': 'https://tuoitre.vn/rss/giao-duc.rss',
  'du-lich': 'https://tuoitre.vn/rss/du-lich.rss'
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
