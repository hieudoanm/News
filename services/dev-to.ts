import fs from "fs";
import { getArticles } from "../libs/dev-to";

export const saveDevTo = async () => {
  const articles = await getArticles();

  const markdown = `# dev.to
  
${articles
  .map((article) => {
    const { title, url, description } = article;
    return `## [${title}](${url})

\`\`\`txt
${description}
\`\`\`
`;
  })
  .join("\n")}
`;
  await fs.writeFileSync("./markdown/DEV-TO.md", markdown);
};
