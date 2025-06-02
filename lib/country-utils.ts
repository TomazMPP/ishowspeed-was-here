import { CountryData } from '@/types/map-types';

// Helper functions to handle both single and multiple visit data
export function getVisitDates(country: CountryData): string[] {
  if (!country.visitDate) return [];
  return Array.isArray(country.visitDate) ? country.visitDate : [country.visitDate];
}

export function getVideoUrls(country: CountryData): string[] {
  if (!country.videoUrl) return [];
  return Array.isArray(country.videoUrl) ? country.videoUrl : [country.videoUrl];
}

export function getViewCounts(country: CountryData): number[] {
  if (!country.views) return [];
  return Array.isArray(country.views) ? country.views : [country.views];
}

export function getVisitCount(country: CountryData): number {
  if (country.visitCount !== undefined) return country.visitCount;
  return getVisitDates(country).length;
}

export function getLatestVisitDate(country: CountryData): string | null {
  const dates = getVisitDates(country);
  if (dates.length === 0) return null;
  
  // Sort dates and return the latest one
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}

export function getFirstVisitDate(country: CountryData): string | null {
  const dates = getVisitDates(country);
  if (dates.length === 0) return null;
  
  // Sort dates and return the earliest one
  return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];
}

export function hasMultipleVisits(country: CountryData): boolean {
  return getVisitCount(country) > 1;
}

export function getVisitsByYear(country: CountryData): Record<string, number> {
  const dates = getVisitDates(country);
  const yearCounts: Record<string, number> = {};
  
  dates.forEach(date => {
    const year = date.split('-')[0];
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });
  
  return yearCounts;
}

export function sortVisitsByDate(country: CountryData): Array<{
  date: string;
  videoUrl?: string;
  views?: number;
}> {
  const dates = getVisitDates(country);
  const videos = getVideoUrls(country);
  const views = getViewCounts(country);
  
  const visits = dates.map((date, index) => ({
    date,
    videoUrl: videos[index],
    views: views[index]
  }));
  
  // Sort by date (earliest first)
  return visits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
} 