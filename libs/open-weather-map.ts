import { fetchJSON } from "./fetch";

const base = "http://api.openweathermap.org/data/2.5";

export const getCurrentWeatherByLocation = async (
  lat: string,
  lon: string
): Promise<Record<string, any>> => {
  const API_KEY_OPEN_WEATHER: string = process.env.API_KEY_OPEN_WEATHER || "";
  const url = `${base}/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY_OPEN_WEATHER}`;
  return fetchJSON(url);
};

export const getCurrentWeather = async (
  q: string
): Promise<Record<string, any>> => {
  const API_KEY_OPEN_WEATHER: string = process.env.API_KEY_OPEN_WEATHER || "";
  const url = `${base}/weather?units=metric&q=${q}&appid=${API_KEY_OPEN_WEATHER}`;
  return fetchJSON(url);
};

export const getWeatherForecast = async (
  q: string,
  cnt = 16
): Promise<Record<string, any>> => {
  const API_KEY_OPEN_WEATHER: string = process.env.API_KEY_OPEN_WEATHER || "";
  const url = `${base}/forecast?units=metric&q=${q}&appid=${API_KEY_OPEN_WEATHER}&cnt=${cnt}`;
  return fetchJSON(url);
};
