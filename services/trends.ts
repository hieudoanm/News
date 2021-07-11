import fs from "fs";
import _ from "lodash";
import { getTrends } from "../libs/google-trends";

export const saveTrends = async (): Promise<void> => {
  const data = await getTrends();
  const countries = Object.keys(data).sort();
  const markdown = `# TRENDS

- [Trends](#trends)
${countries
  .map((country: string) => {
    const title = country.replace(/_/g, " ").toUpperCase();
    const reference = country.replace(/_/g, "-");
    return `  - [${title}](#${reference})`;
  })
  .join("\n")}

${countries
  .map((country: string = "") => {
    const trends = _.get(data, country, []).sort();
    return `## ${country.replace(/_/g, " ").toUpperCase()}
    
${trends
  .map((trend: string) => {
    return `- [${trend}](https://google.com/search?q=${encodeURI(trend)})`;
  })
  .join("\n")}
`;
  })
  .join("\n")}`;

  await fs.writeFileSync("./TRENDS.md", markdown);
};
