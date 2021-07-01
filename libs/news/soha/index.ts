import { Article, getRSS, processArticles } from '../utils';

export const source = 'Soha';

export const sourceUrl = 'https://soha.vn';

export const rssCategory: Record<string, string> = {
  'kind-doanh': 'https://soha.vn/kinh-doanh.rss',
  'giai-tri': 'https://soha.vn/giai-tri.rss',
  'thoi-su': 'https://soha.vn/thoi-su.rss',
  'song-khoe': 'https://soha.vn/song-khoe.rss',
  infographic: 'https://soha.vn/infographic.rss',
  'the-thao': 'https://soha.vn/the-thao.rss',
  'cong-nghe': 'https://soha.vn/cong-nghe.rss',
  'doi-song': 'https://soha.vn/doi-song.rss',
  'phat-luat': 'https://soha.vn/phap-luat.rss',
  'quoc-te': 'https://soha.vn/quoc-te.rss',
  'quan-su': 'https://soha.vn/quan-su.rss',
  'kham-pha': 'https://soha.vn/kham-pha.rss'
};

export const categories: Array<string> = Object.keys(rssCategory).sort();

export const getArticles = async (category: string): Promise<Array<Article>> => {
  const rssUrl = rssCategory[category] || rssCategory['kind-doanh'] || '';
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
