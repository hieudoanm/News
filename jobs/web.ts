import fs from "fs";
import { generateBody, generateHTML } from "./html";

const main = async () => {
  const body: string = await generateBody(false);
  const html: string = generateHTML(body);
  await fs.writeFileSync("./web/index.html", html);
};

main().catch((error) => console.error(error));
