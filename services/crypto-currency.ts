import fs from "fs";
import request from "request";
import sharp from "sharp";
import { Coin, getCoins } from "../libs/coin-ranking";
import { currencyFormatter } from "../libs/utils";

const getFormat = (type: string) => {
  if (type.includes("png")) return "png";
  if (type.includes("svg")) return "svg";
  return "";
};

const svgToPNG = (svg: string, png: string) => {
  sharp(svg)
    .png()
    .toFile(png)
    .then(function (info) {
      console.log(info);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const download = (uri: string, symbol: string) => {
  request.head(uri, (error, res) => {
    if (error) {
      console.error(error);
      return;
    }
    const contentType = res.headers["content-type"] || "";
    if (!contentType) return;

    console.log("content-type:", contentType);
    console.log("content-length:", res.headers["content-length"]);

    const fileFormat = getFormat(contentType);
    const fileName = `./images/coins/${fileFormat}/${symbol.toLowerCase()}.${fileFormat}`;

    request(uri)
      .pipe(fs.createWriteStream(fileName))
      .on("close", () => {
        if (fileFormat === "svg") {
          const pngFile = `./images/coins/png/${symbol.toLowerCase()}.png`;
          svgToPNG(fileName, pngFile);
        }
        console.log(symbol);
      });
  });
};

const downloadImages = async (coins: Array<Coin>) => {
  for (const coin of coins) {
    const { symbol, iconUrl } = coin;
    await download(iconUrl, symbol);
  }
};

export const saveCoins = async () => {
  const coins: Array<Coin> = await getCoins();
  await downloadImages(coins);
  await fs.writeFileSync("./json/coins.json", JSON.stringify(coins, null, 2));

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
