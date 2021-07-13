import dotenv from "dotenv";
import { sendMessage } from "../libs/telegram";

dotenv.config();

const main = async () => {
  const CHAT_ID: number = parseInt(process.env.CHAT_ID || "0", 10) || 0;
  const [date] = new Date().toISOString().split("T");
  const formattedDate: string = date.replace(/-/, `\\-`);
  const message: string = `[${formattedDate}](https://hieudoanm.github.io/news/)`;
  console.log(message);
  const response = await sendMessage(CHAT_ID, message);
  console.log(response);
};

main().catch((error) => console.error(error));
