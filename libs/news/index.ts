import { categories as c1, getArticles as getCafeBiz } from "./cafebiz";
import { getArticles as getCafef } from "./cafef";
import { categories as c2, getArticles as getLaodong } from "./laodong";
import { categories as c3, getArticles as getNhandan } from "./nhandan";
import { categories as c4, getArticles as getSoha } from "./soha";
import { categories as c5, getArticles as getThanhnien } from "./thanhnien";
import { categories as c6, getArticles as getTinhte } from "./tinhte";
import { categories as c7, getArticles as getTuoitre } from "./tuoitre";
import { Article } from "./utils";
import { categories as c8, getArticles as getVietcetera } from "./vietcetera";
import { categories as c9, getArticles as getVietnambiz } from "./vietnambiz";
import { categories as c10, getArticles as getVietnamnet } from "./vietnamnet";
import { categories as c11, getArticles as getVnexpress } from "./vnexpress";
import { categories as c12, getArticles as getVTV } from "./vtv";

export { Article };

export const categories: Array<string> = [""].concat(
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12
);

export const mapArticles: Record<string, any> = {
  cafebiz: getCafeBiz,
  cafef: getCafef,
  laodong: getLaodong,
  nhandan: getNhandan,
  soha: getSoha,
  thanhnien: getThanhnien,
  tinhte: getTinhte,
  tuoitre: getTuoitre,
  vietcetera: getVietcetera,
  vietnambiz: getVietnambiz,
  vietnamnet: getVietnamnet,
  vnexpress: getVnexpress,
  vtv: getVTV,
};

export const sources: Array<string> = Object.keys(mapArticles).sort();

export const getArticles = async (
  source = "vietcetera"
): Promise<{ total: number; articles: Array<Article> }> => {
  const articles: Array<Article> = await mapArticles[source]();
  const total: number = articles.length;
  return { total, articles };
};
