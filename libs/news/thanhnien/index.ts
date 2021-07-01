import { Article, getRSS, processArticles } from '../utils';

export const source = 'Thanh Niên';

export const sourceUrl = 'https://thanhnien.vn';

export const rssCategory: Record<string, string> = {
  'tai-chinh-kinh-doanh': 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh.rss',
  'giai-tri': 'https://thanhnien.vn/rss/giai-tri.rss',
  'thoi-su': 'https://thanhnien.vn/rss/thoi-su.rss',
  'suc-khoe': 'https://thanhnien.vn/rss/suc-khoe.rss',
  'the-gioi': 'https://thanhnien.vn/rss/the-gioi.rss',
  'the-thao': 'https://thethao.thanhnien.vn/rss/home.rss',
  'cong-nghe': 'https://thanhnien.vn/rss/cong-nghe.rss',
  'quan-su': 'https://thanhnien.vn/rss/the-gioi/quan-su.rss',
  'van-hoa': 'https://thanhnien.vn/rss/van-hoa.rss',
  phim: 'https://thanhnien.vn/rss/giai-tri/phim.rss',
  'chung-khoan': 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh/chung-khoan.rss',
  'ngan-hang': 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh/ngan-hang.rss',
  'lam-dep': 'https://thanhnien.vn/rss/suc-khoe/lam-dep.rss',
  'gioi-tinh': 'https://thanhnien.vn/rss/suc-khoe/gioi-tinh.rss',
  xe: 'https://xe.thanhnien.vn/rss/home.rss'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory['tai-chinh-ngan-hang'] || '';
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
