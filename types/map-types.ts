export interface CountryData {
  id: string;
  name: string;
  visited: boolean;
  videoUrl?: string;
  visitDate?: string;
  views?: number;
}

export interface TooltipData {
  country: CountryData;
  position: {
    x: number;
    y: number;
  };
}

