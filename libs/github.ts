import yaml from "js-yaml";
import qs from "querystring";
import { fetchJSON, fetchText } from "./fetch";

export type Language = {
  type?: string;
  name: string;
  color: string;
  extensions: Array<string>;
};

export type Repository = {
  id: string;
  name: string;
  description: string;
  fullName: string;
  url: string;
  homepage: string;
  stars: number;
};

export const getRepository = async (repo: string): Promise<Repository> => {
  const API_KEY_GITHUB = process.env.API_KEY_GITHUB || "";
  const url = `https://api.github.com/repos/${repo}`;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${API_KEY_GITHUB}`,
  };
  const data = await fetchJSON(url, { headers });
  return data;
};

export const getTrending = async (
  language: string,
  page = 1,
  limit = 10
): Promise<Array<Repository>> => {
  const API_KEY_GITHUB = process.env.API_KEY_GITHUB || "";

  const api = "https://api.github.com/search/repositories";
  const query = {
    sort: "stars",
    order: "desc",
    q: `language:${language}`,
    page,
    per_page: limit,
  };
  const url = `${api}?${qs.encode(query)}`;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${API_KEY_GITHUB}`,
  };
  const data = await fetchJSON(url, { headers });
  const { items = [] } = data;
  return items.map((item: any) => {
    const {
      id,
      name,
      description,
      homepage,
      full_name: fullName,
      html_url: url,
      created_at: createdAt,
      updated_at: updatedAt,
      stargazers_count: stars,
    } = item;
    return {
      id,
      name,
      fullName,
      url,
      createdAt,
      updatedAt,
      description,
      homepage,
      stars,
    };
  });
};

export const getLanguages = async (): Promise<Array<Language>> => {
  const url: string =
    "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";
  const yml: string = await fetchText(url);
  const doc: any = yaml.load(yml);
  const languages: Array<Language> = Object.keys(doc)
    .map((name: string) => {
      const { color = "", extensions = [], type = "" } = doc[name] || {};
      return { color, extensions, type, name };
    })
    .filter(
      (language: Language) =>
        language.type === "programming" &&
        language.color &&
        language.extensions?.length
    )
    .sort((a: Language, b: Language) => (a.name > b.name ? 1 : -1));
  return languages;
};
