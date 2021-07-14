import fs from "fs";
import { Article, getArticles, getSources } from "../libs/news";

export const saveLocalSources = async () => {
  const { total, sources } = getSources();
  const jsonFile: string = "./json/news/sources";
  const jsonData: string = JSON.stringify({ total, sources }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);
};

export const saveArticles = async (): Promise<void> => {
  const { total, articles } = await getArticles({ category: "general" });
  const jsonFile: string = "./json/news/articles";
  const jsonData: string = JSON.stringify({ total, articles }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);

  const mdBody: string = articles
    .map((article: Article) => {
      const {
        title = "",
        url = "",
        source = { name: "", url: "" },
        description = "",
        publishedAt,
      } = article;
      const { name = "", url: sourceUrl = "" } = source;

      return `## [${title}](${url})

[${name}](${sourceUrl})

**${publishedAt}**

\`\`\`html
${description}
\`\`\`
`;
    })
    .join("\n");
  const markdown: string = `# News

${mdBody}
`;
  await fs.writeFileSync("./README.md", markdown);
};
