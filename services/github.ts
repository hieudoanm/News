import fs from "fs";
import {
  getLanguages,
  getTrending,
  Language,
  Repository,
} from "../libs/github";

export const saveLanguages = async () => {
  const languages: Array<Language> = await getLanguages();

  await fs.writeFileSync(
    "./json/languages.json",
    JSON.stringify(languages, null, 2)
  );
};

const convertToMD = async (
  language: string,
  name: string,
  repositories: Array<Repository>
): Promise<string> => {
  const title: string = language.toUpperCase();
  const list: string = repositories
    .map((repository: Repository, index: number) => {
      const { name, fullName, url, homepage = "", stars = 0 } = repository;
      const basicName = homepage ? `[${name}](${homepage})` : name;
      return `${index + 1}. ${basicName} ([${fullName}](${url})) - ${stars}`;
    })
    .join("\n");
  const markdown: string = `## ${name}\n\n${list}`;
  return markdown;
};

type Item = { language: string; name: string; reference: string };

export const saveTopRepositories = async () => {
  const items: Array<Item> = [
    { language: "c", name: "C", reference: "#c" },
    { language: "c++", name: "C++", reference: "#c-1" },
    { language: "c#", name: "C Sharp", reference: "#c-sharp" },
    { language: "go", name: "Go", reference: "#go" },
    { language: "javascript", name: "JavaScript", reference: "#javascript" },
    { language: "typescript", name: "TypeScript", reference: "#typescript" },
    { language: "java", name: "Java", reference: "#java" },
    { language: "kotlin", name: "Kotlin", reference: "#kotlin" },
    { language: "python", name: "Python", reference: "#python" },
    { language: "swift", name: "Swift", reference: "#swift" },
  ].sort((a: Item, b: Item) => (a.reference > b.reference ? 1 : -1));

  let bodyList = [];
  for (const item of items) {
    const { language, name } = item;
    const repositories: Array<Repository> = await getTrending(language, 1, 100);
    const md = await convertToMD(language, name, repositories);
    console.log(language);
    bodyList.push(md);
  }
  const body: string = bodyList.join("\n\n");

  const tableOfContent: string = items
    .map((item: Item) => {
      const { name, reference } = item;
      return `  - [${name}](${reference})`;
    })
    .join("\n");

  const markdown: string = `# Trending

- [Trending](#trending)
${tableOfContent}
  
${body}`;

  await fs.writeFileSync(`./GITHUB.md`, markdown);
};
