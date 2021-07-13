import dotenv from "dotenv";
import { saveCountries } from "./services/countries";
import { saveCoins } from "./services/crypto-currency";
import { saveDevTo } from "./services/dev-to";
import { saveLanguages, saveTopRepositories } from "./services/github";
import { saveArticles } from "./services/local";
import { saveCards } from "./services/tarot";
import { saveTrends } from "./services/trends";
import { saveCommittees, saveMembers } from "./services/usa";
import { saveVietnam } from "./services/vietnam";
import { saveWeather } from "./services/weather";
import { saveSources, saveTopHeadlines } from "./services/world";
import { saveCategories, saveYouTube } from "./services/youtube";
dotenv.config();

const main = async () => {
  await saveCoins();
  await saveCountries();
  await saveLanguages();
  await saveTopRepositories();
  await saveCategories();
  await saveTrends();
  await saveWeather();
  await saveDevTo();
  await saveArticles();
  await saveSources();
  await saveTopHeadlines();
  await saveYouTube();
  await saveCards();
  await saveVietnam();
  await saveCommittees();
  await saveMembers();

  process.exit(0);
};

main().catch((error) => console.error(error));
