import { fetchJSON } from "./fetch";

const request = async (endpoint: string, method: string, body: any) => {
  const init = { method, headers: { "Content-Type": "application/json" } };
  const API_KEY_TELEGRAM: string = process.env.API_KEY_TELEGRAM || "";
  const url = `https://api.telegram.org/bot${API_KEY_TELEGRAM}/${endpoint}`;
  const options =
    method === "GET"
      ? init
      : Object.assign(init, { body: JSON.stringify(body) });
  const data = await fetchJSON(url, options);
  return data;
};

export const sendMessage = async (
  chatId: number,
  text: string
): Promise<any> => {
  const body = { chat_id: chatId, text, parse_mode: "MarkdownV2" };
  const response = await request("sendMessage", "POST", body);
  return response;
};

export const deleteWebhook = async (url: string): Promise<any> => {
  const response = await request("deleteWebhook", "POST", { url });
  return response;
};

export const setWebhook = async (url: string): Promise<any> => {
  const response = await request("setWebhook", "POST", { url });
  return response;
};
