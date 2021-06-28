import qs from "querystring";
import { fetchJSON } from "./fetch";

export type SortBy = "relevancy" | "popularity" | "publishedAt";

export type FilterQuery = {
  apiKey: string;
  q?: string;
  country?: string;
  category?: string;
  qInTitle?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string | SortBy;
  page?: number;
  pageSize?: number;
};

export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type Article = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const buildFilterQuery = ({
  q,
  qInTitle,
  country,
  category,
  sources = [],
  domains = [],
  excludeDomains = [],
  from,
  to,
  language,
  sortBy,
  page,
  pageSize,
}: {
  q?: string;
  qInTitle?: string;
  country?: string;
  category?: string;
  sources?: Array<string>;
  domains?: Array<string>;
  excludeDomains?: Array<string>;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string | SortBy;
  page?: number;
  pageSize?: number;
}): FilterQuery => {
  const API_KEY_NEWS: string = process.env.API_KEY_NEWS || "";
  let filterQuery: FilterQuery = { apiKey: API_KEY_NEWS };
  filterQuery = q ? { ...filterQuery, q } : filterQuery;
  filterQuery = qInTitle ? { ...filterQuery, qInTitle } : filterQuery;
  filterQuery = country ? { ...filterQuery, country } : filterQuery;
  filterQuery = category ? { ...filterQuery, category } : filterQuery;
  filterQuery =
    sources.length > 0
      ? { ...filterQuery, sources: sources.join(",") }
      : filterQuery;
  filterQuery =
    domains.length > 0
      ? { ...filterQuery, domains: domains.join(",") }
      : filterQuery;
  filterQuery =
    excludeDomains.length > 0
      ? { ...filterQuery, excludeDomains: excludeDomains.join(",") }
      : filterQuery;
  filterQuery = from ? { ...filterQuery, from } : filterQuery;
  filterQuery = to ? { ...filterQuery, to } : filterQuery;
  filterQuery = language ? { ...filterQuery, language } : filterQuery;
  filterQuery = sortBy ? { ...filterQuery, sortBy } : filterQuery;
  filterQuery = page ? { ...filterQuery, page } : filterQuery;
  filterQuery = pageSize ? { ...filterQuery, pageSize } : filterQuery;
  return filterQuery;
};

export type EverythingFilterQuery = {
  q: string;
  qInTitle: string;
  sources: Array<string>;
  domains: Array<string>;
  excludeDomains: Array<string>;
  from: string;
  to: string;
  language: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
};

export const getEverything = async ({
  q,
  qInTitle,
  sources,
  domains,
  excludeDomains,
  from,
  to,
  language,
  sortBy,
  page,
  pageSize,
}: EverythingFilterQuery): Promise<{
  message: string;
  total: number;
  articles: Array<Article>;
}> => {
  const filterQuery: FilterQuery = buildFilterQuery({
    q,
    qInTitle,
    sources,
    domains,
    excludeDomains,
    from,
    to,
    language,
    sortBy,
    page,
    pageSize,
  });
  const queryString = qs.encode(filterQuery);
  const url = `https://newsapi.org/v2/everything?${queryString}`;
  const response = await fetchJSON(url);
  const {
    message = "",
    totalResults: total = 0,
    articles = [],
  } = response || {};
  return { total, articles, message };
};

export type TopHeadlinesFilterQuery = {
  q?: string;
  country?: string;
  category?: string;
  sources?: Array<string>;
  page?: number;
  pageSize?: number;
};

export const getTopHeadlines = async ({
  q = "",
  country = "",
  category = "",
  sources = [],
  page = 1,
  pageSize = 20,
}: TopHeadlinesFilterQuery): Promise<{
  message: string;
  total: number;
  articles: Array<Article>;
}> => {
  const filterQuery: FilterQuery = buildFilterQuery({
    q,
    country,
    category,
    sources,
    page,
    pageSize,
  });
  const queryString = qs.encode(filterQuery);
  const url = `https://newsapi.org/v2/top-headlines?${queryString}`;
  const response = await fetchJSON(url);
  const {
    message = "",
    totalResults: total = 0,
    articles = [],
  } = response || {};
  return { message, total, articles };
};

export type SourceFilterQuery = {
  language?: string;
  category?: string;
  country?: string;
};

export const getSources = async ({
  language = "",
  category = "",
  country = "",
}: SourceFilterQuery): Promise<Array<Source>> => {
  const filterQuery: FilterQuery = buildFilterQuery({
    language,
    category,
    country,
  });
  const queryString = qs.encode(filterQuery);
  const url = `https://newsapi.org/v2/sources?${queryString}`;
  const response = await fetchJSON(url);
  const { sources = [] } = response || {};
  return sources;
};
