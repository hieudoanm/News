import dotenv from "dotenv";
import { saveArticles } from "./services/local";
import { saveSources, saveTopHeadlines } from "./services/world";
dotenv.config();

const main = async () => {
  await saveArticles();
  await saveSources();
  await saveTopHeadlines();

  process.exit(0);
};

main().catch((error) => console.error(error));
