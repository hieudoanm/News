import fs from "fs";
import { Parser } from "json2csv";
import _ from "lodash";
import {
  District,
  getDistricts,
  getProvinces,
  getWards,
  Province,
  Ward,
} from "../libs/giao-hang-nhanh";

const convertJSONtoCSV = async (
  json: Record<string, any>,
  fields: Array<string>,
  path: string
) => {
  const parser = new Parser({ fields, delimiter: "," });
  const csv = parser.parse(json);
  if (path) {
    await fs.writeFileSync(path, csv);
  }
  return csv;
};

const saveProvinces = async (): Promise<Array<Province>> => {
  const { message, provinces = [] } = await getProvinces();
  console.log("message", message);
  const fields: Array<string> = ["id", "name", "code"];
  const path: string = `./docs/vietnam/maps/provinces.csv`;
  await convertJSONtoCSV(provinces, fields, path);
  return provinces;
};

type ExtendedDistrict = District & { province: string };

const saveDistricts = async (
  provinces: Array<Province>
): Promise<Array<ExtendedDistrict>> => {
  const { districts = [] } = await getDistricts(0);
  const districts2: Array<ExtendedDistrict> = districts
    .map((district: District) => {
      const { provinceId } = district;
      const province: Province | undefined = provinces.find(
        (province: Province) => province.id === provinceId
      );
      const name: string = _.get(province, "name", "");
      const ExtendedDistrict: ExtendedDistrict = Object.assign(district, {
        province: name,
      });
      return ExtendedDistrict;
    })
    .sort((a: ExtendedDistrict, b: ExtendedDistrict) => {
      if (a.province === b.province) return a.name > b.name ? 1 : -1;
      return a.province > b.province ? 1 : -1;
    });
  const fields: Array<string> = [
    "provinceId",
    "province",
    "id",
    "name",
    "code",
    "type",
    "supportType",
  ];
  const path: string = `./docs/vietnam/maps/districts.csv`;
  await convertJSONtoCSV(districts2, fields, path);
  return districts2;
};

type ExtendedWard = Ward & {
  provinceId: number;
  province: string;
  district: string;
};

const saveWards = async (
  districts: Array<ExtendedDistrict>
): Promise<Array<ExtendedWard>> => {
  let allWards: Array<ExtendedWard> = [];
  const total: number = districts.length;
  let i: number = 0;
  for (const district of districts) {
    const { id, provinceId, province, name } = district;
    const { wards = [] } = await getWards(id);
    const percentage = (((i + 1) / total) * 100).toFixed(2);
    console.log(percentage + "%", "district", province, name, wards.length);
    const wardsByDistrict: Array<ExtendedWard> = wards.map((ward: Ward) => {
      return Object.assign(ward, { provinceId, province, district: name });
    });
    allWards = allWards.concat(wardsByDistrict);
    i++;
  }
  allWards.sort((a: ExtendedWard, b: ExtendedWard) => {
    if (a.name === b.name) return a.district > b.district ? 1 : -1;
    if (a.district === b.district) return a.province > b.province ? 1 : -1;
    return a.province > b.province ? 1 : -1;
  });
  const fields: Array<string> = [
    "provinceId",
    "province",
    "districtId",
    "district",
    "name",
    "code",
  ];
  const path: string = `./docs/vietnam/maps/wards.csv`;
  await convertJSONtoCSV(allWards, fields, path);
  return allWards;
};

export const saveVietnam = async (): Promise<void> => {
  const provinces: Array<Province> = await saveProvinces();
  console.log("Sync GHN - Provinces", provinces.length);
  const districts: Array<ExtendedDistrict> = await saveDistricts(provinces);
  console.log("Sync GHN - Districts", districts.length);
  const wards: Array<ExtendedWard> = await saveWards(districts);
  console.log("Sync GHN - Wards", wards.length);
};
