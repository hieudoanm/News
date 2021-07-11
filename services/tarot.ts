import fs from "fs";
import { Card, getCards } from "../libs/tarot";

export const saveCards = async () => {
  const { total, cards } = await getCards();
  await fs.writeFileSync("./json/cards.json", JSON.stringify(cards, null, 2));
  const randomIndex = Math.floor(Math.random() * total + 1);
  const card: Card = cards[randomIndex] || cards[0];
  const { type, name, meaning_up } = card;
  const filename = name.replace(/ /g, "-").toLowerCase();
  const imgSrc = `images/tarot/${type}/${filename}.png`;
  const markdown: string = `<h1 align="center">Tarot of the Day</h1>
  
<p align="center">
  <img src="${imgSrc}" alt="${name}"/>
</p>

${meaning_up}
`;
  await fs.writeFileSync("./TAROT.md", markdown);
};
