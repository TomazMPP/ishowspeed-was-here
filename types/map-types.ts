export interface CountryData {
  id: string;
  name: string;
  visited: boolean;
  confirmedVisit?: boolean; 
  videoUrl?: string | string[];
  visitDate?: string | string[];
  views?: number | number[];
  visitCount?: number;
}

export interface TooltipData {
  country: CountryData;
  position: {
    x: number;
    y: number;
  };
}

export type ViewMode = 'standard' | 'chronological' | 'multiple-visits';