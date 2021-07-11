import { fetchJSON } from "../libs/fetch";

export type Card = {
  type: string;
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
};

export const getCards = async (): Promise<{
  total: number;
  cards: Array<Card>;
}> => {
  const url = "https://rws-cards-api.herokuapp.com/api/v1/cards";
  const { nhits: total = 0, cards = [] } = await fetchJSON(url);
  return { total, cards };
};
