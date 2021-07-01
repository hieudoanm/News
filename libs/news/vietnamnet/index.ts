import { Article, getRSS, processArticles } from '../utils';

export const source = 'VietNamNet';

export const sourceUrl = 'https://vietnamnet.vn';

export const rssCategory: Record<string, string> = {
  'kinh-doanh': 'https://vietnamnet.vn/rss/kinh-doanh.rss',
  'giai-tri': 'https://vietnamnet.vn/rss/giai-tri.rss',
  'thoi-su': 'https://vietnamnet.vn/rss/thoi-su.rss',
  'suc-khoe': 'https://vietnamnet.vn/rss/suc-khoe.rss',
  'thoi-su-chinh-tri': 'https://vietnamnet.vn/rss/thoi-su-chinh-tri.rss',
  'the-thao': 'https://vietnamnet.vn/rss/the-thao.rss',
  'cong-nghe': 'https://vietnamnet.vn/rss/cong-nghe.rss',
  'the-gioi': 'https://vietnamnet.vn/rss/the-gioi.rss',
  'giao-duc': 'https://vietnamnet.vn/rss/giao-duc.rss',
  'doi-song': 'https://vietnamnet.vn/rss/doi-song.rss',
  'phap-luat': 'https://vietnamnet.vn/rss/phap-luat.rss',
  'bat-dong-san': 'https://vietnamnet.vn/rss/bat-dong-san.rss',
  'tuan-viet-nam': 'https://vietnamnet.vn/rss/tuanvietnam.rss',
  'oto-xe-may': 'https://vietnamnet.vn/rss/oto-xe-may.rss'
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
