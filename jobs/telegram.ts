import dotenv from "dotenv";
import { sendMessage } from "../libs/telegram";

dotenv.config();

const main = async () => {
  const CHAT_ID: number = parseInt(process.env.CHAT_ID || "0", 10) || 0;
  const response = await sendMessage(CHAT_ID, "Test");
  console.log(response);
};

main().catch((error) => console.error(error));
