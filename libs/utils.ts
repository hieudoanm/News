export const parseJSON = (string: string, fallback: any = {}): any => {
  try {
    return JSON.parse(string);
  } catch (error) {
    console.error("parseJSON error", error);
    return fallback;
  }
};
