import fs from "fs";
import { Parser } from "json2csv";
import { Article, getSources, getTopHeadlines, Source } from "../libs/news-api";

const saveCategories = async (sources: Array<Source>): Promise<void> => {
  const categories: Array<string> = sources
    .map((source: Source) => source.category)
    .filter(
      (value: string, index: number, array: Array<string>) =>
        array.indexOf(value) === index
    )
    .sort();
  const total: number = categories.length;
  const jsonFile: string = "./data/categories";
  const jsonData: string = JSON.stringify({ total, categories }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);
};

const saveCountries = async (sources: Array<Source>): Promise<void> => {
  const countries: Array<string> = sources
    .map((source: Source) => source.country)
    .filter(
      (value: string, index: number, array: Array<string>) =>
        array.indexOf(value) === index
    )
    .sort();
  const total: number = countries.length;
  const jsonFile: string = "./data/countries";
  const jsonData: string = JSON.stringify({ total, countries }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);
};

const saveLanguages = async (sources: Array<Source>): Promise<void> => {
  const languages: Array<string> = sources
    .map((source: Source) => source.language)
    .filter(
      (value: string, index: number, array: Array<string>) =>
        array.indexOf(value) === index
    )
    .sort();
  const total: number = languages.length;
  const jsonFile: string = "./data/languages";
  const jsonData: string = JSON.stringify({ total, languages }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);
};

export const saveSources = async (): Promise<void> => {
  const sources: Array<Source> = await getSources({});
  const total: number = sources.length;
  const jsonFile: string = "./data/sources";
  const jsonData: string = JSON.stringify({ total, sources }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);

  const fields: Array<string> = [
    "id",
    "name",
    "description",
    "url",
    "category",
    "language",
    "country",
  ];
  const csvFile: string = "./data/categories";
  const parser: Parser<any> = new Parser({ fields });
  const csv: string = parser.parse(sources);
  await fs.writeFileSync(`${csvFile}.csv`, csv);

  await saveCategories(sources);
  await saveCountries(sources);
  await saveLanguages(sources);
};

export const saveTopHeadlines = async (): Promise<void> => {
  const { message, total, articles } = await getTopHeadlines({ country: "us" });
  console.log("message", message);

  const jsonFile: string = "./data/top-headlines";
  const jsonData: string = JSON.stringify({ total, articles }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);

  const mdBody: string = articles
    .map((article: Article) => {
      const {
        title = "",
        url = "",
        author = "",
        content = "",
        source = { name: "" },
      } = article;
      const { name = "" } = source;

      return `## ${title}

${author} - ${name}

\`\`\`
${content}
\`\`\`

[See More](${url})
`;
    })
    .join("\n");
  const markdown: string = `# News

${mdBody}
`;
  await fs.writeFileSync("./WORLD.md", markdown);
};
