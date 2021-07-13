import dotenv from "dotenv";
import fs from "fs";
import _ from "lodash";
import { getTrends } from "../libs/google-trends";
import { Article, getSources, getTopHeadlines, Source } from "../libs/news-api";
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../libs/open-weather-map";
import { Card, getCards } from "../libs/tarot";

dotenv.config();

const generateHTML = (body: string): string => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>News</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div
      style="
        margin: 0 auto;
        max-width: 600px;
        background-color: white;
        color: black;
      "
    >
      <div style="padding: 1rem">
        ${body}
      </div>
    </div>
  </body>
</html>
`;
};

const getGoogleTrends = async () => {
  const d = new Date();
  const [date] = d.toISOString().split("T");
  const data = await getTrends();
  const trends = _.get(data, "vietnam", []).sort();
  const base = "https://google.com/search";
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <div style="padding: 1rem">
    <div style="text-align: center; margin-bottom: 1rem">
      <p>${date}</p>
      <h1 style="text-transform: uppercase">Cafe Sang</h1>
    </div>
    <div>
      ${trends
        .map((trend: string) => {
          const url: string = `${base}?q=${encodeURI(trend)}`;
          return `<div
        style="
          display: inline-block;
          background-color: black;
          padding: 0.25rem;
          border-radius: 0.25rem;
          margin-bottom: 0.25rem;
          margin-right: 0.25rem;
        "
      >
        <a
          href="${url}"
          target="_blank"
          style="
            color: white;
            text-decoration: none;
            font-size: 0.75rem;
          "
        >
          ${trend}
        </a>
      </div>`;
        })
        .join("\n")}
    </div>
  </div>
</div>`;
};

const getForecast = async (city: string): Promise<Array<any>> => {
  const result: Record<string, any> = await getWeatherForecast(city);
  const { list = [] } = result;
  const forecast = list.map((item: any) => {
    const temp = Math.round(_.get(item, "main.temp", 0));
    const feelsLike = Math.round(_.get(item, "main.feels_like", 0));
    const main = _.get(item, "weather.0.main", "");
    const description = _.get(item, "weather.0.description", "");
    const timestamp = _.get(item, "dt", 0);
    return { temp, feelsLike, main, timestamp, description };
  });
  return forecast;
};

const getWeather = async (city: string) => {
  const weather = await getCurrentWeather(city);
  const forecast = await getForecast(city);
  const name: string = _.get(weather, "name", "");
  const temp: number = Math.round(_.get(weather, "main.temp", 0));
  const feelsLike: number = Math.round(_.get(weather, "main.feels_like", 0));
  const main: string = _.get(weather, "weather.0.main", "");
  const description = _.get(weather, "weather.0.description", "");
  const filteredForecast = forecast.filter((_, index: number) => {
    return index % 4 === 0;
  });
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <table
    style="
      width: 100%;
      margin: 0;
      padding: 0;
      border-collapse: collapse;
    "
  >
    <caption
      style="
        text-align: center;
        padding: 1rem;
        border-bottom: 1px solid #e6e6e6;
      "
    >
      <h2>Weather</h2>
      <p>${name}</p>
    </caption>
    <tbody>
      <tr>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
          "
        >
          Now
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: center;
          "
        >
          ${main} (${description})
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: right;
          "
        >
          ${temp}°C (${feelsLike}°C)
        </td>
      </tr>
      ${filteredForecast
        .map((item) => {
          const { temp, feelsLike, main, description, timestamp } = item;
          const d = new Date(timestamp * 1000);
          const [date, time] = d.toISOString().split("T");
          const [hour, minute] = time.split(":");
          return `<tr>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
          "
        >
          ${date} ${hour}:${minute}
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: center;
          "
        >
          ${main} (${description})
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: right;
          "
        >
          ${temp}°C (${feelsLike}°C)
        </td>
      </tr>`;
        })
        .join("\n")}
    </tbody>
  </table>
</div>`;
};

const getNews = async (): Promise<string> => {
  const sources = await getSources({});
  const { message, total, articles } = await getTopHeadlines({
    country: "us",
    pageSize: 3,
  });
  console.log("total", total, message);
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <div style="padding: 1rem 0; border-bottom: 1px solid #e6e6e6">
    <h2 style="text-align: center">News</h2>
  </div>
  ${articles
    .map((article: Article) => {
      const { title, source, description, url } = article;
      const { id, name } = source;
      const { url: sourceUrl = "#" } =
        sources.find((s: Source) => s.id === id) || {};
      return `<div style="padding: 1rem; border-bottom: 1px solid #e6e6e6">
    <h3 style="margin-bottom: 0.5rem">${title}</h3>
    <p style="margin-bottom: 0.5rem">
      <a href="${sourceUrl}" target="_blank" style="text-decoration: none">
        ${name}
      </a>
    </p>
    <p style="margin-bottom: 0.5rem">${description}</p>
    <p>
      <a href="${url}" target="_blank" style="text-decoration: none">
        Read More
      </a>
    </p>
  </div>`;
    })
    .join("\n")}
</div>`;
};

const getTarot = async () => {
  const { total, cards } = await getCards();
  const randomIndex = Math.floor(Math.random() * total + 1);
  const card: Card = cards[randomIndex] || cards[0];
  const { type, name, meaning_up } = card;
  const filename = name.replace(/ /g, "-").toLowerCase();
  const imgSrc = `../images/tarot/${type}/${filename}.png`;
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <div style="padding: 1rem">
    <h2 style="text-align: center; margin-bottom: 1rem">
      Tarot of the Day
    </h2>
    <img
      src="${imgSrc}"
      alt="Tarot"
      style="
        display: block;
        max-width: 300px;
        width: 100%;
        margin: 0 auto 1rem;
        border-radius: 0.25rem;
      "
    />
    <p style="text-align: center">${meaning_up}</p>
  </div>
</div>`;
};

const generateBody = async (): Promise<string> => {
  const googleTrends = await getGoogleTrends();
  const weather = await getWeather("ho chi minh city");
  const news = await getNews();
  const tarot = await getTarot();
  return `${googleTrends}
${weather}
${news}
${tarot}`;
};

const main = async () => {
  const body: string = await generateBody();
  const html: string = generateHTML(body);
  await fs.writeFileSync("./web/index.html", html);
};

main().catch((error) => console.error(error));
