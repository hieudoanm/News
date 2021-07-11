import fs from "fs";
import {
  CongressMember,
  getCommittees,
  getMembers,
} from "../libs/usa-congress";

export const saveMembers = async () => {
  const chambers = ["house", "senate"];
  for (let i = 80; i <= 117; i++) {
    for (const chamber of chambers) {
      const members: Array<CongressMember> = await getMembers(i, chamber);
      const total: number = members.length;
      console.log("members", i, chamber, total);
      if (total) {
        const fileName: string = `./json/usa/members/${chamber}/${i}.json`;
        const data: string = JSON.stringify({ total, members }, null, 2);
        await fs.writeFileSync(fileName, data);
      }
    }
  }
};

export const saveCommittees = async () => {
  const chambers = ["house", "senate"];
  for (let i = 80; i <= 117; i++) {
    for (const chamber of chambers) {
      const { total, committees } = await getCommittees(i, chamber);
      console.log("committees", i, chamber, total);
      if (total) {
        const fileName: string = `./json/usa/committees/${chamber}/${i}.json`;
        const data: string = JSON.stringify({ total, committees }, null, 2);
        await fs.writeFileSync(fileName, data);
      }
    }
  }
};
