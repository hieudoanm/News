import cheerio from "cheerio";
import { fetchText } from "./fetch";

export type VisaRequirement = {
  country: string;
  requirement: string;
};

export const getVisaRequirements = async (): Promise<
  Array<VisaRequirement>
> => {
  const url = "https://www.passportindex.org/passport/viet-nam/";
  const body: string = await fetchText(url);
  const $ = cheerio.load(body);
  const rows = $("table#psprt-dashboard-table tbody tr").get();
  const visas = rows.map((row: any) => {
    const $row = $(row);
    const country: string = $row.find("td:nth-child(1) a").text().trim() || "";
    const requirement: string =
      $row.find("td:nth-child(2)").text().trim().toUpperCase() || "";
    return { country, requirement };
  });
  return visas;
};
