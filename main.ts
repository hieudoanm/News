import dotenv from "dotenv";
import { saveCountries } from "./services/countries";
import { saveCoins } from "./services/crypto-currency";
import { saveDevTo } from "./services/dev-to";
import { saveLanguages, saveTopRepositories } from "./services/github";
import { saveArticles } from "./services/local";
import { saveCards } from "./services/tarot";
import { saveTrends } from "./services/trends";
import { saveWeather } from "./services/weather";
import { saveSources, saveTopHeadlines } from "./services/world";
import { saveCategories, saveYouTube } from "./services/youtube";
dotenv.config();

const main = async () => {
  await saveCountries();
  await saveLanguages();
  await saveTopRepositories();
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
