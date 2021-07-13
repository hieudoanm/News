export type Can =
  | "Giáp"
  | "Ất"
  | "Bính"
  | "Đinh"
  | "Mậu"
  | "Kỷ"
  | "Canh"
  | "Tân"
  | "Nhâm"
  | "Quý";

export type Chi =
  | "Tý"
  | "Sửu"
  | "Dần"
  | "Mão"
  | "Thìn"
  | "Tỵ"
  | "Ngọ"
  | "Mùi"
  | "Thân"
  | "Dậu"
  | "Tuất"
  | "Hợi";

export type TietKhi =
  | "Xuân Phân"
  | "Thanh Minh"
  | "Cốc Vũ"
  | "Lập Hạ"
  | "Tiểu Mãn"
  | "Mang Chủng"
  | "Hạ Chí"
  | "Tiểu Thử"
  | "Đại Thử"
  | "Lập Thu"
  | "Xử Thử"
  | "Bạch Lộ"
  | "Thu Phân"
  | "Hàn Lộ"
  | "Sương Giáng"
  | "Lập Đông"
  | "Tiểu Tuyết"
  | "Đại Tuyết"
  | "Đông Chí"
  | "Tiểu Hàn"
  | "Đại Hàn"
  | "Lập Xuân"
  | "Vũ Thủy"
  | "Kinh Trập";

export type Date = {
  year: number;
  month: number;
  date: number;
};

export const listOfCan: Array<Can> = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

export const listOfChi: Array<Chi> = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

export const listOfTietKhi: Array<TietKhi> = [
  "Xuân Phân",
  "Thanh Minh",
  "Cốc Vũ",
  "Lập Hạ",
  "Tiểu Mãn",
  "Mang Chủng",
  "Hạ Chí",
  "Tiểu Thử",
  "Đại Thử",
  "Lập Thu",
  "Xử Thử",
  "Bạch Lộ",
  "Thu Phân",
  "Hàn Lộ",
  "Sương Giáng",
  "Lập Đông",
  "Tiểu Tuyết",
  "Đại Tuyết",
  "Đông Chí",
  "Tiểu Hàn",
  "Đại Hàn",
  "Lập Xuân",
  "Vũ Thủy",
  "Kinh Trập",
];

/**
 * (Solar) date to (Julius) jd
 */
const jdFromDate = (date: number, month: number, year: number): number => {
  const a: number = Math.floor((14 - month) / 12);
  const y: number = year + 4800 - a;
  const m: number = month + 12 * a - 3;
  let jd: number =
    date +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd =
      date +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      32083;
  }
  return jd;
};

/**
 * (Julius) jd to (Solar) date
 */
const jdToDate = (jd: number): Date => {
  let c = 0;
  let b = 0;
  let a = 0;
  if (jd > 2299160) {
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const date = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return { year, month, date };
};

/**
 * Calculate new Moon Date (Tính ngày Sóc)
 */
const getNewMoonDay = (k: number, timeZone = 7) => {
  const T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun"s mean anomaly
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon"s mean anomaly
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon"s argument of latitude
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 =
    C1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  C1 =
    C1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 =
    C1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));
  let deltat = 0;
  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  const JdNew = Jd1 + C1 - deltat;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
};

/**
 * Sun Longitude
 */
const getSunLongitude = (jdn: number, timeZone = 7): number => {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  const T2 = T * T;
  const dr = Math.PI / 180; // degree to radian
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL; // true longitude, degree
  const omega = 125.04 - 1934.136 * T;
  L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
  L *= dr;
  L -= Math.PI * 2 * Math.floor(L / (Math.PI * 2)); // Normalize to (0, 2*PI)
  return Math.floor((L / Math.PI) * 6);
};

const getSunLongitude2 = (jdn: number): number => {
  const T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  const T2 = T * T;
  const dr = Math.PI / 180; // degree to radian
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  const theta = L0 + DL; // true longitude, degree
  // obtain apparent longitude by correcting for nutation and aberration
  const omega = 125.04 - 1934.136 * T;
  let lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
  // Convert to radians
  lambda *= dr;
  lambda -= Math.PI * 2 * Math.floor(lambda / (Math.PI * 2)); // Normalize to (0, 2*PI)
  return lambda;
};

/**
 * Tính ngày bắt đầu tháng 11 âm lịch
 */
const getLunarMonth11 = (year: number, timeZone = 7): number => {
  const off: number = jdFromDate(31, 12, year) - 2415021;
  const k: number = Math.floor(off / 29.530588853);
  let newMoonDay: number = getNewMoonDay(k, timeZone);
  const sunLongitude = getSunLongitude(newMoonDay, timeZone); // sun longitude at local midnight
  if (sunLongitude >= 9) {
    newMoonDay = getNewMoonDay(k - 1, timeZone);
  }
  return newMoonDay;
};

/**
 * Xác định tháng nhuận
 */
const getLeapMonthOffset = (a11: number, timeZone = 7): number => {
  const k: number = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1; // We start with the month following lunar month 11
  let arc: number = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i += 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
};

/**
 * Leap
 */
export const isSolarLeapYear = (year: number): boolean =>
  year % 4 === 0 || (year % 100 === 0 && year % 400 === 0);

export const isLunarLeapYear = (year: number): boolean => {
  const list: Array<number> = [0, 3, 6, 9, 11, 14, 17];
  const leap: number = year % 19;
  return list.includes(leap);
};

/**
 * Solar to Lunar
 */
export const convertSolarToLunar = (
  { date, month, year }: { date: number; month: number; year: number },
  timeZone = 7
): Date => {
  const dayNumber = jdFromDate(date, month, year);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11: number = getLunarMonth11(year, timeZone);
  let b11: number = a11;
  let lunarYear = 0;
  if (a11 >= monthStart) {
    lunarYear = year;
    a11 = getLunarMonth11(year - 1, timeZone);
  } else {
    lunarYear = year + 1;
    b11 = getLunarMonth11(year + 1, timeZone);
  }
  const lunarDate: number = dayNumber - monthStart + 1;
  const diff: number = Math.floor((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth: number = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return { year: lunarYear, month: lunarMonth, date: lunarDate };
};

/**
 * Lunar to Solar
 */
export const convertLunarToSolar = (
  lunarDate: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap = 0,
  timeZone = 7
): Date => {
  let a11;
  let b11;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) {
      leapMonth += 12;
    }
    if (lunarLeap !== 0 && lunarMonth !== leapMonth) {
      return { year: 0, month: 0, date: 0 };
    }
    if (lunarLeap !== 0 || off >= leapOff) {
      off += 1;
    }
  }
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDate - 1);
};

export const getCanChiOfYear = (lunarYear: number): string => {
  const canIndex: number = (lunarYear + 6) % 10;
  const chiIndex: number = (lunarYear + 8) % 12;
  return `${listOfCan[canIndex]} ${listOfChi[chiIndex]}`;
};

export const getCanChiOfMonth = (
  lunarMonth: number,
  lunarYear: number
): string => {
  const canIndex: number = (lunarYear * 12 + lunarMonth + 3) % 10;
  const chiIndex: number = (lunarMonth + 1) % 12;
  return `${listOfCan[canIndex]} ${listOfChi[chiIndex]}`;
};

const getCanOfDate = (jd: number) => {
  const canIndex: number = (jd + 9) % 10;
  return listOfCan[canIndex];
};

const getChiOfDate = (jd: number): string => {
  const chiIndex = (jd + 1) % 12;
  return listOfChi[chiIndex];
};

export const getCanChiOfDate = (
  lunarDate: number,
  lunarMonth: number,
  lunarYear: number
): string => {
  const { date, month, year } = convertLunarToSolar(
    lunarDate,
    lunarMonth,
    lunarYear
  );
  const jd = jdFromDate(date, month, year);
  const can = getCanOfDate(jd);
  const chi = getChiOfDate(jd);
  return `${can} ${chi}`;
};

export const getCanChiHours = (
  date: number,
  month: number,
  year: number
): string => {
  const jd = jdFromDate(date, month, year);
  const can = ((jd - 1) * 2) % 10;
  return `${listOfCan[can]} ${listOfChi[0]}`;
};

/**
 * Tiet Khi
 */
export const getTietKhi = ({
  date,
  month,
  year,
}: {
  date: number;
  month: number;
  year: number;
}): TietKhi => {
  const jd = jdFromDate(date, month, year);
  const tietKhiIndex = Math.floor(
    (getSunLongitude2(jd + 1 - 0.5 - 7 / 24) / Math.PI) * 12
  );
  return listOfTietKhi[tietKhiIndex];
};
