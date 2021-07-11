import { fetchJSON } from "./fetch";

export type CountryName = {
  common: string;
  official: string;
};

export type Country = {
  name: CountryName;
  cioc: string;
};

export const getRestCountries = async (): Promise<Array<Country>> => {
  const url = "https://restcountries.com/v3/all";
  const countries = await fetchJSON(url);
  return countries;
};
