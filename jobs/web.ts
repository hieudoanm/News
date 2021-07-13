import dotenv from "dotenv";
import fs from "fs";
import _ from "lodash";
import {
  convertSolarToLunar,
  getCanChiOfDate,
  getCanChiOfMonth,
  getCanChiOfYear,
  getTietKhi,
} from "../libs/calendar";
import { Coin, getCoins } from "../libs/coin-ranking";
import { getTrends } from "../libs/google-trends";
import { Article, getSources, getTopHeadlines, Source } from "../libs/news-api";
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../libs/open-weather-map";
import { Card, getCards } from "../libs/tarot";
import { addZero, currencyFormatter } from "../libs/utils";
import { getMostPopularVideos, Video } from "../libs/youtube";

dotenv.config();

const generateHTML = (body: string): string => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Café Sáng</title>
    <meta charset="UTF-8" />
    <meta name="description" content="News" />
    <meta name="keywords" content="News,Café Sáng" />
    <meta name="author" content="Hieu Doan" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="application-name" name="cafe-sang" />
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <main style="margin: 0 auto; max-width: 600px">
      <div style="padding: 1rem">
        ${body}
      </div>
    </main>
  </body>
</html>
`;
};

const getCanChi = ({
  year,
  month,
  date,
}: {
  year: number;
  month: number;
  date: number;
}): string => {
  const canChiOfYear: string = getCanChiOfYear(year);
  const canChiOfMonth: string = getCanChiOfMonth(month, year);
  const canChiOfDate: string = getCanChiOfDate(date, month, year);
  const canChi: string = `${canChiOfYear} - ${canChiOfMonth} - ${canChiOfDate}`;
  return canChi;
};

const getGoogleTrends = async () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const [solarDate] = d.toISOString().split("T");
  const {
    year: lYear,
    month: lMonth,
    date: lDate,
  } = convertSolarToLunar({ year, month, date });
  const lunarDate = `${lYear}-${addZero(lMonth)}-${addZero(lDate)}`;
  const canChi = getCanChi({ year: lYear, month: lDate, date: lDate });
  const tietKhi: string = getTietKhi({ date, month, year });
  const data = await getTrends();
  const trends: Array<string> = _.get(data, "vietnam", []).sort();
  const colors: Array<string> = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];
  const base: string = "https://google.com/search";
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <div style="padding: 1rem">
    <div style="text-align: center; margin-bottom: 1rem">
      <p style="margin-bottom: 0.5rem">${solarDate}</p>
      <p style="margin-bottom: 0.5rem">${lunarDate}</p>
      <p style="margin-bottom: 0.5rem">${canChi} (${tietKhi})</p>
      <h1 style="text-transform: uppercase">Café Sáng</h1>
    </div>
    <div>
      ${trends
        .map((trend: string, index: number) => {
          const color: string = colors[index % 4];
          const url: string = `${base}?q=${encodeURI(trend)}`;
          return `<div
        style="
          display: inline-block;
          background-color: ${color};
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
          <div><b>${main}</b></div>
          <div>${description}</div>
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: right;
          "
        >
          <div><b>${temp}°C</b></div>
          <div>${feelsLike}°C</div>
        </td>
      </tr>
      ${filteredForecast
        .map((item) => {
          const { temp, feelsLike, main, description, timestamp } = item;
          const sevenHours = 1000 * 60 * 60 * 7;
          const d = new Date(timestamp * 1000 + sevenHours);
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
          <div>${date}</div>
          <div>${hour}:${minute}</div>
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: center;
          "
        >
          <div><b>${main}</b></div>
          <div>${description}</div>
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: right;
          "
        >
          <div><b>${temp}°C</b></div>
          <div>${feelsLike}°C</div>
        </td>
      </tr>`;
        })
        .join("\n")}
    </tbody>
  </table>
</div>`;
};

const getCoinRanking = async () => {
  const coins = await getCoins();
  const topCoins = coins.slice(0, 5);
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
      <h2>Coins</h2>
    </caption>
    <tbody>
      ${topCoins
        .map((coin: Coin) => {
          const { iconUrl, symbol, name, price, coinrankingUrl } = coin;
          const price2: string = currencyFormatter(parseFloat(price));
          return `<tr>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
          "
        >
          <div style="display: flex; align-items: center">
            <img
              src="${iconUrl}"
              width="16px"
              style="margin-right: 16px"
            />
            <a href="${coinrankingUrl}" target="_blank" style="text-decoration: none">
              ${symbol} - ${name}
            </a>
          </div>
        </td>
        <td
          style="
            padding: 0.75rem;
            border-bottom: 1px solid #e6e6e6;
            width: 33.33%;
            text-align: right;
          "
        >
          <b>$${price2}</b>
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
    <h2 style="text-align: center">Top Headlines</h2>
  </div>
  ${articles
    .map((article: Article) => {
      const { title, source, description, url, urlToImage } = article;
      const { id, name } = source;
      const { url: sourceUrl = "#" } =
        sources.find((s: Source) => s.id === id) || {};
      return `<div style="padding: 1rem; border-bottom: 1px solid #e6e6e6">
    <img
      src="${urlToImage}"
      alt="${title}"
      style="width: 100%; margin-bottom: 0.5rem; border-radius: 0.5rem"
    />
    <h3 style="margin-bottom: 0.5rem">
      <a href="${url}" target="_blank" style="text-decoration: none">${title}</a>
    </h3>
    <p style="margin-bottom: 0.5rem">
      <a href="${sourceUrl}" target="_blank" style="text-decoration: none">
        ${name}
      </a>
    </p>
    <p>${description}</p>
  </div>`;
    })
    .join("\n")}
</div>`;
};

const getYouTubeTrending = async () => {
  const videos = await getMostPopularVideos(0, 3);
  return `<div
  style="
    border-radius: 0.25rem;
    border: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  "
>
  <div style="padding: 1rem 0; border-bottom: 1px solid #e6e6e6">
    <h2 style="text-align: center">YouTube Trending</h2>
  </div>
  ${videos
    .map((video: Video) => {
      const { title, id, channelTitle, channelId } = video;
      const url = `https://youtu.be/${id}`;
      const channelUrl = `https://www.youtube.com/channel/${channelId}`;
      const imgSrc = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      return `<div style="padding: 1rem; border-bottom: 1px solid #e6e6e6">
    <img
      src="${imgSrc}"
      alt="${title}"
      style="width: 100%; margin-bottom: 0.5rem; border-radius: 0.25rem"
    />
    <h3 style="margin-bottom: 0.5rem">
      <a href="${url}" target="_blank" style="text-decoration: none">
        ${title}
      </a>
    </h3>
    <p>
      <a href="${channelUrl}" target="_blank" style="text-decoration: none">
        ${channelTitle}
      </a>
    </p>
  </div>`;
    })
    .join("\n")}
</div>`;
};

const getTarot = async () => {
  const { total, cards } = await getCards();
  const index1 = Math.floor(Math.random() * total + 1);
  const index2 = Math.floor(Math.random() * total + 1);
  const index3 = Math.floor(Math.random() * total + 1);
  const card1: Card = cards[index1] || cards[0];
  const card2: Card = cards[index2] || cards[0];
  const card3: Card = cards[index3] || cards[0];
  const { type: type1, name: name1 } = card1;
  const filename1 = name1.replace(/ /g, "-").toLowerCase();
  const imgSrc1 = `../images/tarot/${type1}/${filename1}.png`;
  const { type: type2, name: name2 } = card2;
  const filename2 = name2.replace(/ /g, "-").toLowerCase();
  const imgSrc2 = `../images/tarot/${type2}/${filename2}.png`;
  const { type: type3, name: name3 } = card3;
  const filename3 = name3.replace(/ /g, "-").toLowerCase();
  const imgSrc3 = `../images/tarot/${type3}/${filename3}.png`;
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
    <table>
      <tbody>
        <tr>
          <td style="width: 33.33%">
            <img
              src="${imgSrc1}"
              alt="${name1}"
              style="width: 100%; border-radius: 0.25rem"
            />
          </td>
          <td style="width: 33.33%">
            <img
              src="${imgSrc2}"
              alt="${name2}"
              style="width: 100%; border-radius: 0.25rem"
            />
          </td>
          <td style="width: 33.33%">
            <img
              src="${imgSrc3}"
              alt="${name3}"
              style="width: 100%; border-radius: 0.25rem"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
};

const generateBody = async (): Promise<string> => {
  const googleTrends = await getGoogleTrends();
  const weather = await getWeather("ho chi minh city");
  const coinRanking = await getCoinRanking();
  const news = await getNews();
  const youTubeTrending = await getYouTubeTrending();
  const tarot = await getTarot();
  return `${googleTrends}
${weather}
${coinRanking}
${news}
${youTubeTrending}
${tarot}`;
};

const main = async () => {
  const body: string = await generateBody();
  const html: string = generateHTML(body);
  await fs.writeFileSync("./web/index.html", html);
};

main().catch((error) => console.error(error));
