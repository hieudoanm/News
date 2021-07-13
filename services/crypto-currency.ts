import fs from "fs";
import { Coin, getCoins } from "../libs/coin-ranking";
import { currencyFormatter } from "../libs/utils";

export const saveCoins = async () => {
  const coins: Array<Coin> = await getCoins();

  const markdown: string = `# Coins

| Rank |     | Coin | Price | Change |
| ---- | --- | ---- | ----- | ------ |
${coins
  .map((coin: Coin) => {
    const { rank, symbol, name, coinrankingUrl, price, iconUrl, change } = coin;
    const price2 = currencyFormatter(parseFloat(price));
    const change2 = parseFloat(change).toFixed(2);
    const img = `<img src="${iconUrl}" alt="${name}" width="16px" height="16px" />`;
    return `| ${rank} | ${img} |  [${symbol} - ${name}](${coinrankingUrl}) | $${price2} | ${change2} |`;
  })
  .join("\n")}
`;

  await fs.writeFileSync("./markdown/COINS.md", markdown);
};
