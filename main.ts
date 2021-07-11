import dotenv from "dotenv";
import { saveTrends } from "./services/trends";
import { saveArticles } from "./services/local";
import { saveWeather } from "./services/weather";
import { saveSources, saveTopHeadlines } from "./services/world";
dotenv.config();

const main = async () => {
  await saveTrends();
  await saveWeather();
  await saveArticles();
  await saveSources();
  await saveTopHeadlines();

  process.exit(0);
};

main().catch((error) => console.error(error));
