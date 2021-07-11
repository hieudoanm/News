import fs from "fs";
import { Article, getArticles } from "../libs/news";

export const saveArticles = async (): Promise<void> => {
  const { total, articles } = await getArticles();

  const jsonFile: string = "./data/articles";
  const jsonData: string = JSON.stringify({ total, articles }, null, 2);
  await fs.writeFileSync(`${jsonFile}.json`, jsonData);

  const mdBody: string = articles
    .map((article: Article) => {
      const { title = "", url = "", source = "", description = "" } = article;

      return `## ${title}

${source}

\`\`\`html
${description}
\`\`\`

[See More](${url})
`;
    })
    .join("\n");
  const markdown: string = `# News

${mdBody}
`;
  await fs.writeFileSync("./README.md", markdown);
};
