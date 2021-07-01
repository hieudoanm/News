import { Article, getRSS, processArticles } from '../utils';

export const source = 'VTV';

export const sourceUrl = 'https://vtv.vn';

export const rssCategory: Record<string, string> = {
  'kinh-te': 'https://vtv.vn/kinh-te.rss',
  'van-hoa-giai-tri': 'https://vtv.vn/van-hoa-giai-tri.rss',
  'trong-nuoc': 'https://vtv.vn/trong-nuoc.rss',
  'du-bao-thoi-tiet': 'https://vtv.vn/du-bao-thoi-tiet.rss',
  'du-lich': 'http://vtv.vn/doi-song/du-lich.rss',
  'the-thao': 'https://vtv.vn/the-thao.rss',
  'cong-nghe': 'https://vtv.vn/cong-nghe.rss',
  'gioi-tinh': 'http://vtv.vn/doi-song/gioi-tinh.rss',
  'lam-dep': 'http://vtv.vn/doi-song/lam-dep.rss',
  'suc-khoe': 'http://vtv.vn/doi-song/suc-khoe.rss',
  'giao-duc': 'http://vtv.vn/giao-duc.rss',
  'bong-da': 'http://vtv.vn/the-thao/bong-da.rss',
  tennis: 'http://vtv.vn/the-thao/tennis.rss',
  'dien-anh': 'http://vtv.vn/van-hoa-giai-tri/dien-anh.rss',
  'am-nhac': 'http://vtv.vn/van-hoa-giai-tri/am-nhac.rss',
  'chinh-tri': 'http://vtv.vn/trong-nuoc/chinh-tri.rss',
  'xa-hoi': 'http://vtv.vn/trong-nuoc/xa-hoi.rss',
  'phap-luat': 'http://vtv.vn/trong-nuoc/phap-luat.rss'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory['kinh-te'] || '';
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
