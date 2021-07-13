import fetch, { Response, RequestInit } from "node-fetch";

export const fetchJSON = async (
  url: string,
  options: RequestInit = {},
  fallback: any = {}
): Promise<any> => {
  try {
    const response = await fetch(url, options).then((res: Response) =>
      res.json()
    );
    return response;
  } catch (error) {
    console.error(error);
    return fallback;
  }
};

export const fetchText = async (url: string, options = {}): Promise<string> => {
  try {
    return await fetch(url, options).then((res: Response) => res.text());
  } catch (error) {
    console.error(error);
    return "";
  }
};
