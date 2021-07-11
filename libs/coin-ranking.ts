import { fetchJSON } from "../libs/fetch";

const base = "https://api.coinranking.com/v2";

export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  price: string;
  listedAt: number;
  rank: number;
  coinrankingUrl: string;
  change: string;
};

export const getCoins = async (): Promise<Array<Coin>> => {
  const API_KEY_COIN_RANKING: string = process.env.API_KEY_COIN_RANKING || "";
  const url = `${base}/coins`;
  const headers = { "x-access-token": API_KEY_COIN_RANKING };
  const { error, status, data } = await fetchJSON(url, { headers });
  if (error) {
    console.error(error);
    return [];
  }
  if (status !== "success") {
    return [];
  }
  const { coins = [] } = data;
  return coins;
};
