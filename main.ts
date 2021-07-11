import dotenv from "dotenv";
import { saveCoins } from "./services/crypto-currency";
import { saveTrends } from "./services/trends";
import { saveArticles } from "./services/local";
import { saveCards } from "./services/tarot";
import { saveWeather } from "./services/weather";
import { saveSources, saveTopHeadlines } from "./services/world";
dotenv.config();

const main = async () => {
  await saveCards();
  await saveCoins();
  await saveTrends();
  await saveWeather();
  await saveArticles();
  await saveSources();
  await saveTopHeadlines();

  process.exit(0);
};

main().catch((error) => console.error(error));
