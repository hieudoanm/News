import { fetchJSON } from "../libs/fetch";

export const getTrends = async (
  country = "vietnam"
): Promise<Array<string>> => {
  const url =
    "https://trends.google.com/trends/hottrends/visualize/internal/data";
  const data = await fetchJSON(url);
  return data;
};
