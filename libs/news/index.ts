import _ from "lodash";
import getCafef from "./cafef";
import { getArticlesById } from "./rss";
import { Article, Category, Source, sources } from "./sources";

export { Article, Category };

export const getSources = (): { total: number; sources: Array<Source> } => {
  const omitSources = sources.map((s: Source) => _.omit(s, ["categories"]));
  const total = omitSources.length;
  return { total, sources: omitSources };
};

export const getArticles = async ({
  category = "general",
  pageSize = 50,
}: {
  category?: Category;
  pageSize?: number;
}): Promise<{ total: number; articles: Array<Article> }> => {
  return new Promise((resolve) => {
    Promise.all(
      sources.map(async (source: Source) => {
        const { id } = source;
        if (id === "cafef") {
          return await getCafef(category);
        }
        return await getArticlesById(id, category);
      })
    )
      .then((res) => {
        const articles: Array<Article> = _.flattenDeep(res).sort(
          (a: Article, b: Article) => (a.publishedAt < b.publishedAt ? 1 : -1)
        );
        const total: number = articles.length;
        const slicedArticles: Array<Article> = articles.slice(0, pageSize);
        resolve({ total, articles: slicedArticles });
      })
      .catch((error) => {
        console.error(error);
        resolve({ total: 0, articles: [] });
      });
  });
};
