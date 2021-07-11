import fs from "fs";
import _ from "lodash";
import { getVisaRequirements, VisaRequirement } from "../libs/passport-index";
import { Country, getRestCountries } from "../libs/rest-countries";

const getVisaRequirement = (
  visaRequirements: Array<VisaRequirement>,
  {
    common = "",
    official = "",
  }: {
    common: string;
    official: string;
  }
): string => {
  const filteredVisaRequirements = visaRequirements.filter(
    (visaRequirement: VisaRequirement) => {
      const { country: countryName } = visaRequirement;
      const lowerCountry = countryName.toLowerCase();
      return (
        lowerCountry === common.toLowerCase() ||
        lowerCountry === official.toLowerCase()
      );
    }
  );
  const visaRequirement = _.get(filteredVisaRequirements, "0.requirement", "");
  return visaRequirement;
};

export const saveCountries = async (): Promise<void> => {
  const visaRequirements: Array<VisaRequirement> = await getVisaRequirements();
  const countries: Array<Country> = await getRestCountries();
  if (!countries.length) return;

  const updatedCountries = countries.map((country: Country) => {
    const { name } = country;
    const { common = "", official = "" } = name;
    const visaRequirement: string = getVisaRequirement(visaRequirements, {
      common,
      official,
    });
    return { ...country, visaRequirement };
  });

  const data: string = JSON.stringify(updatedCountries, null, 2);

  await fs.writeFileSync("./json/countries.json", data);
};
