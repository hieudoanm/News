import dotenv from "dotenv";
import { saveCoins } from "./services/crypto-currency";
import { saveArticles } from "./services/local";
import { saveCards } from "./services/tarot";
import { saveTrends } from "./services/trends";
import { saveWeather } from "./services/weather";
import { saveSources, saveTopHeadlines } from "./services/world";
import { saveCategories, saveYouTube } from "./services/youtube";
import { saveDevTo } from "./services/dev-to";
dotenv.config();

const main = async () => {
  await saveCategories();
  await saveCoins();
  await saveTrends();
  await saveWeather();
  await saveDevTo();
  await saveArticles();
  await saveSources();
  await saveTopHeadlines();
  await saveYouTube();
  await saveCards();

  process.exit(0);
};

main().catch((error) => console.error(error));
