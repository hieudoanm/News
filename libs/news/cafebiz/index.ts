import { Article, getRSS, processArticles } from '../utils';

export const source = 'CafeBiz';

export const sourceUrl = 'https://cafebiz.vn';

export const rssCategory: Record<string, string> = {
  'trang-chu': 'https://cafebiz.vn/trang-chu.rss',
  'thoi-su': 'https://cafebiz.vn/thoi-su.rss',
  'tin-tuc': 'https://cafebiz.vn/tin-tuc.rss',
  'phat-luat': 'https://cafebiz.vn/phap-luat.rss',
  'vi-mo': 'https://cafebiz.vn/kinh-te-vi-mo.rss',
  'tai-chinh': 'https://cafebiz.vn/tai-chinh.rss',
  'chinh-sach': 'https://cafebiz.vn/chinh-sach.rss',
  'kinh-doanh': 'https://cafebiz.vn/cau-chuyen-kinh-doanh.rss',
  'quan-tri': 'https://cafebiz.vn/quan-tri.rss',
  'nghe-nghiep': 'https://cafebiz.vn/nghe-nghiep.rss',
  'nhan-vat': 'https://cafebiz.vn/nhan-vat.rss',
  'thuong-hieu': 'https://cafebiz.vn/thuong-hieu.rss',
  'ho-so': 'https://cafebiz.vn/ho-so.rss',
  'cong-nghe': 'https://cafebiz.vn/cong-nghe.rss',
  'doanh-nghiep-cong-nghe': 'https://cafebiz.vn/doanh-nghiep-cong-nghe.rss',
  startup: 'https://cafebiz.vn/startup.rss',
  'khoa-hoc': 'https://cafebiz.vn/khoa-hoc.rss',
  song: 'https://cafebiz.vn/song.rss',
  'suc-khoe': 'https://cafebiz.vn/suc-khoe.rss',
  'phong-cach': 'https://cafebiz.vn/phong-cach.rss',
  'giao-duc': 'https://cafebiz.vn/giao-duc.rss'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory['trang-chu'] || '';
  if (!rssUrl) return [];
  try {
    const items = await getRSS(rssUrl);
    const articles: Array<Article> = processArticles(items, source, sourceUrl);
    return articles;
  } catch (error) {
    return [];
  }
};
