export const parseJSON = (string: string, fallback: any = {}): any => {
  try {
    return JSON.parse(string);
  } catch (error) {
    console.error("parseJSON error", error);
    return fallback;
  }
};

export const currencyFormatter = (number: number): string =>
  number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

export const addZero = (number: number): string => {
  return number > 9 ? `${number}` : `0${number}`;
};
