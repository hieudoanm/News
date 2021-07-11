import { fetchJSON } from "./fetch";

export type AirVisualResponse = {
  status: string;
  data: any;
};

export const getCountries = async (): Promise<Array<string>> => {
  const API_KEY_AIR_VISUAL: string = process.env.API_KEY_AIR_VISUAL || "";
  const url = `http://api.airvisual.com/v2/countries?key=${API_KEY_AIR_VISUAL}`;
  const response: AirVisualResponse = await fetchJSON(url);
  const { status = "", data = [] } = response;
  if (status !== "success") return [];
  const countries: Array<string> = data.map((item: { country: string }) => {
    const { country = "" } = item;
    return country;
  });
  return countries;
};

export const getStates = async (country: string): Promise<Array<string>> => {
  const API_KEY_AIR_VISUAL: string = process.env.API_KEY_AIR_VISUAL || "";
  const url = `http://api.airvisual.com/v2/states?country=${country}&key=${API_KEY_AIR_VISUAL}`;
  const response: AirVisualResponse = await fetchJSON(url);
  const { status = "", data = [] } = response;
  if (status !== "success") return [];
  const states: Array<string> = data.map((item: { state: string }) => {
    const { state } = item;
    return state;
  });
  return states;
};

export const getCities = async (
  state: string,
  country: string
): Promise<Array<string>> => {
  const API_KEY_AIR_VISUAL: string = process.env.API_KEY_AIR_VISUAL || "";
  const url = `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${API_KEY_AIR_VISUAL}`;
  const response: AirVisualResponse = await fetchJSON(url);
  const { status = "", data = [] } = response;
  if (status !== "success") return [];
  const cities: Array<string> = data.map((item: { city: string }) => {
    const { city } = item;
    return city;
  });
  return cities;
};

export const getAirVisual = async (
  city: string,
  state: string,
  country: string
): Promise<Record<string, any>> => {
  const API_KEY_AIR_VISUAL: string = process.env.API_KEY_AIR_VISUAL || "";
  const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY_AIR_VISUAL}`;
  const response: AirVisualResponse = await fetchJSON(url);
  const { status = "", data = {} } = response;
  if (status !== "success") return {};
  return data;
};
