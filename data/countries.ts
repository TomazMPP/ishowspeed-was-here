import { CountryData } from "@/types/map-types";

export const countryData: Record<string, CountryData> = {
  US: {
    id: "US",
    name: "United States",
    visited: true,
    videoUrl: "https://youtube.com/watch?v=example1",
    views: 1500000,
    visitDate: "2023-06-15"
  },
  BR: {
    id: "BR",
    name: "Brazil",
    visited: true,
    videoUrl: "https://youtube.com/watch?v=example2",
    views: 2000000,
    visitDate: "2023-08-20"
  },
  IN: {
    id: "IN",
    name: "India",
    visited: true,
    videoUrl: "https://youtube.com/watch?v=example3",
    views: 1800000,
    visitDate: "2023-09-10"
  },
};

