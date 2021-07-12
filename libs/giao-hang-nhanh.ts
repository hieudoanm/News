import _ from "lodash";
import { fetchJSON } from "./fetch";

const base: string = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data`;

export type Response = {
  code?: number;
  message?: string;
  data?: Array<any>;
};

export type Province = {
  id: number;
  name: string;
  code: string;
};

export type District = {
  provinceId: number;
  id: number;
  name: string;
  code: string;
  type: string;
  supportType: string;
};

export type Ward = {
  code: string;
  districtId: number;
  name: string;
};

export const getProvinces = async (): Promise<{
  error?: string;
  message?: string;
  provinces: Array<Province>;
}> => {
  const API_KEY_GHN: string = process.env.API_KEY_GHN || "";
  const headers = { Token: API_KEY_GHN, "Content-Type": "application/json" };
  const response: Response = await fetchJSON(`${base}/province`, { headers });
  const { code = 0, message = "" } = response;
  if (code !== 200) return { error: message, provinces: [] };
  const data = _.get(response, "data", []) || [];
  const provinces: Array<Province> = data
    .map((item) => {
      const { ProvinceID: id, ProvinceName: name, Code: code } = item;
      return { id, name, code };
    })
    .sort((a: Province, b: Province) => (a.name > b.name ? 1 : -1));
  return { message, provinces };
};

export const getDistricts = async (
  province_id: number
): Promise<{
  error?: string;
  message?: string;
  districts: Array<District>;
}> => {
  const API_KEY_GHN: string = process.env.API_KEY_GHN || "";
  const headers = { Token: API_KEY_GHN, "Content-Type": "application/json" };
  const response: Response = await fetchJSON(
    `${base}/district?province_id=${province_id}`,
    { headers }
  );
  const { code = 0, message = "" } = response;
  if (code !== 200) return { error: message, districts: [] };
  const data = _.get(response, "data", []) || [];
  const districts: Array<District> = data.map((item) => {
    const {
      DistrictID: id,
      ProvinceID: provinceId,
      DistrictName: name,
      Code: code,
      Type: type,
      SupportType: supportType,
    } = item;
    return { id, provinceId, name, code, type, supportType };
  });
  return { message, districts };
};

export const getWards = async (
  districtId: number
): Promise<{ error?: string; message?: string; wards: Array<Ward> }> => {
  const API_KEY_GHN: string = process.env.API_KEY_GHN || "";
  const headers = { Token: API_KEY_GHN, "Content-Type": "application/json" };
  const response: Response = await fetchJSON(
    `${base}/ward?district_id=${districtId}`,
    { headers }
  );
  6;
  const { code = 0, message = "" } = response;
  if (code !== 200) return { error: message, wards: [] };
  const data = _.get(response, "data", []) || [];
  const wards: Array<Ward> = data.map((item) => {
    const { DistrictID: districtId, WardName: name, WardCode: code } = item;
    return { districtId, name, code };
  });
  return { message, wards };
};
