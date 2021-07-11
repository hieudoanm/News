import fs from "fs";
import _ from "lodash";
import { getAirVisual } from "../libs/air-visual";
import {
  getCurrentWeather,
  getCurrentWeatherByLocation,
  getWeatherForecast,
} from "../libs/open-weather-map";

type Level = {
  min: number;
  max: number;
  icon: string;
  color: string;
  description: string;
};

type City = {
  city: string;
  state: string;
  country: string;
};

const levels: Array<Level> = [
  {
    min: 0,
    max: 50,
    icon: "ic-face-green",
    color: "#a8e05f",
    description: "Good",
  },
  {
    min: 51,
    max: 100,
    icon: "ic-face-yellow",
    color: "#fdd64b",
    description: "Moderate",
  },
  {
    min: 101,
    max: 150,
    icon: "ic-face-orange",
    color: "#ff9b57",
    description: "Unhealthy For Sensitive Groups",
  },
  {
    min: 151,
    max: 200,
    icon: "ic-face-red",
    color: "#fe6a69",
    description: "Unhealthy",
  },
  {
    min: 201,
    max: 250,
    icon: "ic-face-purple",
    color: "#a97abc",
    description: "Very Unhealthy",
  },
];

const cities: Array<City> = [
  { city: "Cau Dien", state: "Hanoi", country: "Vietnam" },
  { city: "Cau Giay", state: "Hanoi", country: "Vietnam" },
  { city: "Chuc Son", state: "Hanoi", country: "Vietnam" },
  { city: "Dai Nghia", state: "Hanoi", country: "Vietnam" },
  { city: "Dong Anh", state: "Hanoi", country: "Vietnam" },
  { city: "Dong Da", state: "Hanoi", country: "Vietnam" },
  { city: "Ha Dong", state: "Hanoi", country: "Vietnam" },
  { city: "Hai BaTrung", state: "Hanoi", country: "Vietnam" },
  { city: "Hanoi", state: "Hanoi", country: "Vietnam" },
  { city: "Hoan Kiem", state: "Hanoi", country: "Vietnam" },
  { city: "Kim Bai", state: "Hanoi", country: "Vietnam" },
  { city: "Lien Quan", state: "Hanoi", country: "Vietnam" },
  { city: "Quoc Oai", state: "Hanoi", country: "Vietnam" },
  { city: "Soc Son", state: "Hanoi", country: "Vietnam" },
  { city: "Tay Ho", state: "Hanoi", country: "Vietnam" },
  { city: "Thach That", state: "Hanoi", country: "Vietnam" },
  { city: "Thanh Xuan", state: "Hanoi", country: "Vietnam" },
  { city: "Van Dien", state: "Hanoi", country: "Vietnam" },
  { city: "Van Dinh", state: "Hanoi", country: "Vietnam" },
  { city: "Ho Chi Minh City", state: "Ho Chi Minh City", country: "Vietnam" },
];

const getAQIUS = async (cityQuery: string): Promise<number> => {
  const {
    city = "Hanoi",
    state = "Hanoi",
    country = "Vietnam",
  } = cities.find((item: City) => item.city.toLowerCase() === cityQuery) || {};
  const result = await getAirVisual(city, state, country);
  const aqius = _.get(result, "current.pollution.aqius", 0);
  return aqius;
};

type Info = {
  temp: number;
  feelsLike: number;
  main: string;
  description: string;
  timestamp?: number;
};

type Weather = Info & {
  name: string;
  aqius: number;
  color: string;
  forecast: Array<Info>;
};

const getForecast = async (city: string): Promise<Array<Info>> => {
  const result: Record<string, any> = await getWeatherForecast(city);
  const { list = [] } = result;
  const forecast = list.map((item: any) => {
    const temp = Math.round(_.get(item, "main.temp", 0));
    const feelsLike = Math.round(_.get(item, "main.feels_like", 0));
    const main = _.get(item, "weather.0.main", "");
    const description = _.get(item, "weather.0.description", "");
    const timestamp = _.get(item, "dt", 0);
    return { temp, feelsLike, main, description, timestamp };
  });
  return forecast;
};

const getWeather = async (city: string): Promise<Weather> => {
  const weather: Record<string, any> = await getCurrentWeather(city);
  const aqius: number = await getAQIUS(city);
  const forecast = await getForecast(city);
  const [level = { color: "#000" }] = levels.filter(
    (lvl: Level) => lvl.min <= aqius && aqius <= lvl.max
  );
  const { color = "#000" } = level;
  const name: string = _.get(weather, "name", "");
  const temp: number = Math.round(_.get(weather, "main.temp", 0));
  const feelsLike: number = Math.round(_.get(weather, "main.feels_like", 0));
  const main: string = _.get(weather, "weather.0.main", "");
  const description: string = _.get(weather, "weather.0.description", "");
  return { name, temp, feelsLike, main, description, aqius, color, forecast };
};

const getWeatherByCityMarkdown = async (city: string): Promise<string> => {
  const weather: Weather = await getWeather(city);
  const {
    name,
    temp,
    feelsLike,
    main,
    description,
    aqius,
    forecast = [],
  } = weather;
  const filteredForecast = forecast.filter((_, index: number) => {
    return index % 3 === 0;
  });
  return `## ${name}

Air Visual: ${aqius}

<table>

<thead>

<tr>

<th>Now</th>

${filteredForecast
  .map((info: Info) => {
    const { timestamp = 0 } = info;
    const d = new Date(timestamp * 1000);
    const [date, time] = d.toISOString().split("T");
    const [hour, minute] = time.split(":");
    return `<th>
<div>${date}</div>
<div>${hour}:${minute}</div>
</th>`;
  })
  .join("\n")}

</tr>

</thead>

<tbody>

<tr>

<td>

<div>${temp}°C - ${feelsLike}°C</div>
<div>${main}</div>
<div>\`${description.toUpperCase()}\`</div>

</td>

${filteredForecast
  .map((info: Info) => {
    const { temp, feelsLike, main, description } = info;

    return `<td>
<div>${temp}°C - ${feelsLike}°C</div>
<div>${main}</div>
<div>\`${description.toUpperCase()}\`</div>
</td>`;
  })
  .join("\n")}

</tr>

</tbody>

</table>`;
};

export const saveWeather = async () => {
  const hnMarkdown: string = await getWeatherByCityMarkdown("hanoi");
  const hcmMarkdown: string = await getWeatherByCityMarkdown(
    "ho chi minh city"
  );

  const markdown: string = `# Weather

${hnMarkdown}

${hcmMarkdown}
`;

  await fs.writeFileSync("./WEATHER.md", markdown);
};

const getWeatherByLocation = async (
  lat: string,
  lon: string
): Promise<Weather> => {
  const weather: Record<string, any> = await getCurrentWeatherByLocation(
    lat,
    lon
  );
  const name = _.get(weather, "name", "");
  const temp = Math.round(_.get(weather, "main.temp", 0));
  const feelsLike = Math.round(_.get(weather, "main.feels_like", 0));
  const main = _.get(weather, "weather.0.main", "");
  const description = _.get(weather, "weather.0.description", "");
  return {
    name,
    temp,
    feelsLike,
    main,
    description,
    aqius: 0,
    color: "#000",
    forecast: [],
  };
};
