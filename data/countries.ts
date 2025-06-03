import { CountryData } from "@/types/map-types";

export const countryData: Record<string, CountryData> = {
  US: {
    id: "US",
    name: "United States",
    visited: true,
    videoUrl: "https://youtube.com/watch?v=example1",
    visitDate: "1000-06-15"
  },  
  BR: {
    id: "BR",
    name: "Brazil",
    visited: true,
    videoUrl: [
      "https://www.youtube.com/watch?v=bil2kEOg-D8",
      "https://www.youtube.com/watch?v=1FturZiQpXE",
      "https://www.youtube.com/watch?v=mn0mcy763iI"
    ],
    visitDate: ["2024-01-08", "2024-02-12", "2025-01-27"],
    visitCount: 3
  },
  IN: {
    id: "IN",
    name: "India",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=h3PLizx9GIU",
    views: 1800000,
    visitDate: "2023-10-12"
  },
  CZ: {
    id: "CZ",
    name: "Czech Republic",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=evopWnMeCM0",
    views: 1200000,
    visitDate: "2024-07-13"
  },
  AL: {
    id: "AL",
    name: "Albania",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=hWDIHvBEzIY",
    views: 1300000,
    visitDate: "2024-06-20"
  },
  DE: {
    id: "DE",
    name: "Germany",
    visited: true,
    videoUrl: [
      "https://www.youtube.com/watch?v=gtATq8Zs7po",
    ],
    views: [1700000, 1900000],
    visitDate: ["2024-06-16", "2024-08-20"],
    visitCount: 1
  },
  FR: {
    id: "FR",
    name: "France",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=B4Q37W7vkm8",
    views: 1900000,
    visitDate: "2023-06-05"
  },
  PT: {
    id: "PT",
    name: "Portugal",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=R2v3Sui_9WA",
    views: 1400000,
    visitDate: "2023-03-23"
  },
  TR: {
    id: "TR",
    name: "Turkey",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=RHa2eBio4hI",
    views: 1600000,
    visitDate: "2023-06-10"
  },
  ES: {
    id: "ES",
    name: "Spain",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=n-KG_C7Sui4",
    views: 1750000,
    visitDate: "2024-05-31"
  },
  NO: {
    id: "NO",
    name: "Norway",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=_rgQQ89zND0",
    views: 1250000,
    visitDate: "2024-07-03"
  },
  JP: {
    id: "JP",
    name: "Japan",
    visited: true,
    videoUrl: [
      "https://www.youtube.com/watch?v=sZIPaQUc4uc",
    ],
    views: [2100000, 2300000, 1950000],
    visitDate: ["2023-07-14", "2024-03-22", "2024-10-05"],
    visitCount: 1
  },
  RO: {
    id: "RO",
    name: "Romania",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=OAtqkkQ3eLE",
    views: 1350000,
    visitDate: "2024-07-12"
  },
  GR: {
    id: "GR",
    name: "Greece",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=NCA_O0oSItM",
    views: 1450000,
    visitDate: "2024-07-08"
  },
  IT: {
    id: "IT",
    name: "Italy",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=o595drmP55U",
    views: 1850000,
    visitDate: "2024-06-23"
  },
  DK: {
    id: "DK",
    name: "Denmark",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=vJiSTu7Za-c",
    views: 1300000,
    visitDate: "2024-07-18"
  },
  AE: {
    id: "AE",
    name: "United Arab Emirates",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=81GEDb9Qjj0",
    views: 1650000,
    visitDate: "2022-12-08"
  },
  SA: {
    id: "SA",
    name: "Saudi Arabia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=q1trJRhH9SE",
    views: 1550000,
    visitDate: "2024-02-02"
  },
  QA: {
    id: "QA",
    name: "Qatar",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=b-k4Rj91uoQ",
    views: 1400000,
    visitDate: "2022-12-06"
  },
  SE: {
    id: "SE",
    name: "Sweden",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=vQK6F_Z9Y3A",
    views: 1350000,
    visitDate: "2024-07-03"
  },
  BE: {
    id: "BE",
    name: "Belgium",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=uDr3gD28tlg",
    views: 1250000,
    visitDate: "2024-06-28"
  },
  NL: {
    id: "NL",
    name: "Netherlands",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=Qbd0JhZUTjQ",
    views: 1450000,
    visitDate: "2024-06-24"
  },
  KR: {
    id: "KR",
    name: "South Korea",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=s7abxsByIJ8",
    views: 1750000,
    visitDate: "2024-05-13"
  },
  KP: {
    id: "KP",
    name: "North Korea",
    visited: true,
    videoUrl: "https://youtu.be/Mra9vzMrtsw?si=Ecd3hXitcFI74TVj&t=169",
    views: 2200000,
    visitDate: "2024-05-18"
  },
  BG: {
    id: "BG",
    name: "Bulgaria",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=xhxL1h2RiEE",
    views: 1150000,
    visitDate: "2024-07-11"
  },
  PL: {
    id: "PL",
    name: "Poland",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=J6Hxw1Fzt1M",
    views: 1350000,
    visitDate: "2024-07-02"
  },
  CH: {
    id: "CH",
    name: "Switzerland",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=GaXdgQYLFw0",
    views: 1450000,
    visitDate: "2024-07-06"
  },
  GB: {
    id: "GB",
    name: "United Kingdom",
    visited: true,
    videoUrl: [
      "https://www.youtube.com/watch?v=QdZQKm6_V9Y",
      "https://www.youtube.com/watch?v=wL08QXd_ato"
    ],
    views: [1850000, 2050000],
    visitDate: ["2022-09-20", "2024-04-15"],
    visitCount: 2
  },
  HU: {
    id: "HU",
    name: "Hungary",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=VxDubYjDux8",
    views: 1250000,
    visitDate: "2024-07-16"
  },
  AT: {
    id: "AT",
    name: "Austria",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=f0DmRB1LGws",
    views: 1350000,
    visitDate: "2024-07-16"
  },
  TH: {
    id: "TH",
    name: "Thailand",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=oaRc-P3Na-w",
    views: 1650000,
    visitDate: "2024-09-09"
  },
  PH: {
    id: "PH",
    name: "Philippines",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=qWuJYrEZBkw",
    views: 1550000,
    visitDate: "2024-09-11"
  },
  VN: {
    id: "VN",
    name: "Vietnam",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=VTorUJcMYGg",
    views: 1450000,
    visitDate: "2024-09-14"
  },
  KH: {
    id: "KH",
    name: "Cambodia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=yyNDJuMCxDc",
    views: 1350000,
    visitDate: "2024-09-16"
  },
  SG: {
    id: "SG",
    name: "Singapore",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=oZxOzl441qQ",
    views: 1750000,
    visitDate: "2024-09-24"
  },
  MY: {
    id: "MY",
    name: "Malaysia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=Ws9hCaDuUWQ",
    views: 1650000,
    visitDate: "2024-09-17"
  },
  ID: {
    id: "ID",
    name: "Indonesia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=9s6imDGjy08",
    views: 1850000,
    visitDate: "2024-09-18"
  },
  AU: {
    id: "AU",
    name: "Australia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=C8Gqmu4p49s",
    views: 1950000,
    visitDate: "2024-11-20"
  },
  NZ: {
    id: "NZ",
    name: "New Zealand",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=eFz30QfDvwg",
    views: 1450000,
    visitDate: "2024-11-23"
  },
  CO: {
    id: "CO",
    name: "Colombia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=1GBOYFAHRA0",
    views: 1550000,
    visitDate: "2025-01-12"
  },
  GT: {
    id: "GT",
    name: "Guatemala",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=DGsqQlVTcGE",
    views: 1350000,
    visitDate: "2025-01-15"
  },
  CL: {
    id: "CL",
    name: "Chile",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=9xHloVj7b1s",
    visitDate: "2025-01-23"
  },
  PE: {
    id: "PE",
    name: "Peru",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=qvhH0EgKUiI",
    visitDate: "2025-01-28"
  },
  EC: {
    id: "EC",
    name: "Ecuador",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=3bV4x2uLtB0",
    views: 1850000,
    visitDate: "2025-01-16"
  },
  UY: {
    id: "UY",
    name: "Uruguay",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=m3fzVMVEj8U",
    visitDate: "2025-01-25"
  },
  PY: {
    id: "PY",
    name: "Paraguay",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=mn0mcy763iI",
    visitDate: "2025-01-27"
  },
  PA: {
    id: "PA",
    name: "Panama",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=UTHmxfJlxGE",
    visitDate: "2025-01-18"
  },
  AR: {
    id: "AR",
    name: "Argentina",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=_C7EuXcsveg",
    visitDate: "2025-01-21"
  },
  BO: {
    id: "BO",
    name: "Bolivia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=Mi1w07kgo5g",
    visitDate: "2025-01-29"
  },
  CN: {
    id: "CN",
    name: "China",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=fK85SQzm0Z0",
    visitDate: "2025-03-24"
  },
  HK: {
    id: "HK",
    name: "Hong Kong",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=oNS8PHxWdp8",
    visitDate: "2025-04-03"
  },
  MN: {
    id: "MN",
    name: "Mongolia",
    visited: true,
    videoUrl: "https://www.youtube.com/watch?v=0mwuGExoxFU",
    visitDate: "2025-04-11"
  },
  VA: {
    id: "VA",
    name: "Vatican",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-06-01"
  },
  SM: {
    id: "SM",
    name: "San Marino",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-06-15"
  },
  AD: {
    id: "AD",
    name: "Andorra",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-01"
  },
  BA: {
    id: "BA",
    name: "Bosnia and Herzegovina",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-05"
  },
  BY: {
    id: "BY",
    name: "Belarus",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-10"
  },
  CY: {
    id: "CY",
    name: "Cyprus",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-15"
  },
  EE: {
    id: "EE",
    name: "Estonia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-20"
  },
  FI: {
    id: "FI",
    name: "Finland",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-07-25"
  },
  FO: {
    id: "FO",
    name: "Faroe Islands",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-01"
  },
  GI: {
    id: "GI",
    name: "Gibraltar",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-05"
  },
  HR: {
    id: "HR",
    name: "Croatia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-10"
  },
  IS: {
    id: "IS",
    name: "Iceland",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-15"
  },
  LI: {
    id: "LI",
    name: "Liechtenstein",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-20"
  },
  LT: {
    id: "LT",
    name: "Lithuania",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-08-25"
  },
  LU: {
    id: "LU",
    name: "Luxembourg",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-01"
  },
  LV: {
    id: "LV",
    name: "Latvia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-05"
  },
  MC: {
    id: "MC",
    name: "Monaco",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-10"
  },
  MD: {
    id: "MD",
    name: "Moldova",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-15"
  },
  MK: {
    id: "MK",
    name: "North Macedonia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-20"
  },
  MT: {
    id: "MT",
    name: "Malta",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-09-25"
  },
  ME: {
    id: "ME",
    name: "Montenegro",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-01"
  },
  RU: {
    id: "RU",
    name: "Russia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-05"
  },
  RS: {
    id: "RS",
    name: "Serbia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-10"
  },
  SK: {
    id: "SK",
    name: "Slovakia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-15"
  },
  SI: {
    id: "SI",
    name: "Slovenia",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-20"
  },
  UA: {
    id: "UA",
    name: "Ukraine",
    visited: false,
    confirmedVisit: true,
    visitDate: "2025-10-25"
  },
};