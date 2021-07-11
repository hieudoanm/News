import { fetchJSON } from "./fetch";

type Chamber = string | "house" | "senate";

const base = "https://api.propublica.org/congress/v1";

const request = async (endpoint: string): Promise<any> => {
  const API_KEY_PROPUBLICA: string = process.env.API_KEY_PROPUBLICA || "";
  const url: string = `${base}/${endpoint}`;
  const headers = {
    "X-API-Key": API_KEY_PROPUBLICA,
    "Content-Type": "application/json;charset=UTF-8",
  };
  const options = { headers };
  return fetchJSON(url, options);
};

export type CongressMember = {
  id: string;
  title: string;
  short_title: string;
  first_name: string;
  last_name: string;
  gender: string;
  party: string;
  leadership_role: string;
  in_office: boolean;
  state: string;
  district: string | any;
  at_large: boolean;
};

export type Subcommittee = {
  id: string;
  name: string;
  api_uri: string;
};

export type Committee = {
  id: string;
  name: string;
  chamber: string;
  url: string;
  chair: string;
  chair_id: string;
  chair_party: string;
  chair_state: string;
  chair_uri: string;
  subcommittees: Array<Subcommittee>;
};

export const getMembers = async (
  congress: number,
  chamber: Chamber
): Promise<Array<CongressMember>> => {
  const response = await request(`${congress}/${chamber}/members.json`);
  const { results = [{}] } = response;
  const [result = { members: [] }] = results;
  const { members = [] } = result;
  return members;
};

export const getCommittees = async (
  congress: number,
  chamber: Chamber
): Promise<{ total: number; committees: Array<Committee> }> => {
  const res = await request(`${congress}/${chamber}/committees.json`);
  const { results = [{}] } = res;
  const [result = { committees: [] }] = results;
  const { num_results: total = 0, committees = [] } = result;
  return { total, committees };
};
