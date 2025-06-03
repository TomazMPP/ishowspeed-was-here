"use client"
import { useEffect, useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { countryData } from '../data/countries'
import { Tooltip } from './tooltip'
import { Legend } from './legend'
import { StatsOverlay } from './stats-overlay'
import { HelpButton } from './help-button'
import type { CountryData, TooltipData, ViewMode } from '../types/map-types'
import { ViewModeToggle } from './view-toggle'
import { getFirstVisitDate, getVisitCount, hasMultipleVisits } from '@/lib/country-utils'


const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json"

interface Position {
  coordinates: [number, number];
  zoom: number;
}

const countryNameMap: { [key: string]: string } = {
  "United States of America": "US",
  "Brazil": "BR",
  "India": "IN",
  "Chile": "CL",
  "Peru": "PE",
  "Ecuador": "EC",
  "Uruguay": "UY",
  "Paraguay": "PY",
  "Panama": "PA",
  "Argentina": "AR",
  "Czech Republic": "CZ",
  "Albania": "AL",
  "Germany": "DE",
  "France": "FR",
  "Portugal": "PT",
  "Turkey": "TR",
  "Spain": "ES",
  "Norway": "NO",
  "Japan": "JP",
  "Romania": "RO",
  "Greece": "GR",
  "Italy": "IT",
  "Denmark": "DK",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  "Qatar": "QA",
  "Sweden": "SE",
  "Belgium": "BE",
  "Netherlands": "NL",
  "South Korea": "KR",
  "North Korea": "KP",
  "Bulgaria": "BG",
  "Poland": "PL",
  "Switzerland": "CH",
  "United Kingdom": "GB",
  "Hungary": "HU",
  "Austria": "AT",
  "Thailand": "TH",
  "Philippines": "PH",
  "Vietnam": "VN",
  "Cambodia": "KH",
  "Singapore": "SG",
  "Malaysia": "MY",
  "Indonesia": "ID",
  "Australia": "AU",
  "New Zealand": "NZ",
  "Colombia": "CO",
  "Guatemala": "GT",
  "Bolivia": "BO",
  "China": "CN",
  "Mongolia": "MN",
  "Andorra": "AD",
  "Bosnia and Herzegovina": "BA",
  "Bosnia & Herzegovina": "BA",
  "Belarus": "BY",
  "Cyprus": "CY",
  "Estonia": "EE",
  "Finland": "FI",
  "Faroe Islands": "FO",
  "Faeroe Islands": "FO",
  "Gibraltar": "GI",
  "Croatia": "HR",
  "Iceland": "IS",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Latvia": "LV",
  "Monaco": "MC",
  "Moldova": "MD",
  "Republic of Moldova": "MD",
  "North Macedonia": "MK",
  "Macedonia": "MK",
  "Former Yugoslav Republic of Macedonia": "MK",
  "Malta": "MT",
  "Montenegro": "ME",
  "Russia": "RU",
  "Russian Federation": "RU",
  "Serbia": "RS",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Ukraine": "UA",
  "Vatican City": "VA",
  "Vatican": "VA",
  "San Marino": "SM"
};

export function InteractiveMap() {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selectedTooltipData, setSelectedTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const mapRef = useRef<HTMLDivElement>(null);

  const visitedCount = Object.values(countryData).filter(country => country.visited).length;
  const visited2022Count = Object.values(countryData).filter(country => {
    const date = getFirstVisitDate(country);
    return date?.includes('2022');
  }).length;
  const visited2023Count = Object.values(countryData).filter(country => {
    const date = getFirstVisitDate(country);
    return date?.includes('2023');
  }).length;
  const visited2024Count = Object.values(countryData).filter(country => {
    const date = getFirstVisitDate(country);
    return date?.includes('2024');
  }).length;
  const visited2025Count = Object.values(countryData).filter(country => {
    const date = getFirstVisitDate(country);
    return date?.includes('2025');
  }).length;

  const multipleVisitsCount = Object.values(countryData).filter(country => hasMultipleVisits(country)).length;

  // Calculate specific visit count statistics
  const singleVisitCount = Object.values(countryData).filter(country => {
    return country.visited && getVisitCount(country) === 1;
  }).length;
  
  const twoVisitsCount = Object.values(countryData).filter(country => {
    return country.visited && getVisitCount(country) === 2;
  }).length;
  
  const threeOrMoreVisitsCount = Object.values(countryData).filter(country => {
    return country.visited && getVisitCount(country) >= 3;
  }).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        setSelectedTooltipData(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMoveEnd = (position: Position) => {
    setPosition(position);
  };
  
  const getYearFromDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    return parseInt(dateString.split('-')[0]);
  };

  const getChronologicalColor = (country: CountryData | undefined) => {
    if (!country?.visited) return '#e5e7eb'; 
    
    // Always use the first visit date for chronological coloring
    const date = getFirstVisitDate(country);
    if (!date) return '#e5e7eb';
    
    const year = getYearFromDate(date);
    if (!year) return '#e5e7eb';

    const yearColors = {
      1000: '#3b82f6',
      2022: '#FF6B6B', 
      2023: '#4ECDC4', 
      2024: '#FFD166', 
      2025: '#6A4C93'  
    };
    
    return yearColors[year as keyof typeof yearColors] || '#e5e7eb';
  };

  const getMultipleVisitsColor = (country: CountryData | undefined, alpha2Code: string) => {
    if (!country) return '#e5e7eb'; 
    if (alpha2Code === 'US') return '#3b82f6'; 
    if (!country.visited) {
      if (country.confirmedVisit) return '#f97316'; 
      return '#e5e7eb'; 
    }
    
    const visitCount = getVisitCount(country);
    if (visitCount >= 3) return '#ef4444'; // Red for 3+ visits
    if (visitCount === 2) return '#eab308'; // Yellow for 2 visits
    return '#16a34a'; // Green for 1 visit
  };

  const getCountryColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    if (viewMode === 'chronological' && countryData?.visited) {
      return getChronologicalColor(countryData);
    }

    if (viewMode === 'multiple-visits') {
      return getMultipleVisitsColor(countryData, alpha2Code);
    }

    // Standard view
    if (!countryData) return '#e5e7eb' 
    if (alpha2Code === 'US') return '#3b82f6' 
    
    // If visited and has planned micro-states, use pattern
    if (countryData.visited && hasPlannedMicroStates(alpha2Code)) {
      return 'url(#plannedMicroStates)';
    }
    
    if (countryData.visited) return '#16a34a' 
    if (countryData.confirmedVisit) return '#f97316' 
    return '#e5e7eb'
  }

  // New function to check if a country has planned micro-states
  const hasPlannedMicroStates = (alpha2Code: string) => {
    if (alpha2Code === 'IT') {
      // Check if Vatican or San Marino are planned
      return (countryData['VA']?.confirmedVisit && !countryData['VA']?.visited) ||
             (countryData['SM']?.confirmedVisit && !countryData['SM']?.visited);
    }
    if (alpha2Code === 'ES') {
      // Check if Andorra or Gibraltar are planned
      return (countryData['AD']?.confirmedVisit && !countryData['AD']?.visited) ||
             (countryData['GI']?.confirmedVisit && !countryData['GI']?.visited);
    }
    if (alpha2Code === 'FR') {
      // Check if Monaco is planned
      return countryData['MC']?.confirmedVisit && !countryData['MC']?.visited;
    }
    if (alpha2Code === 'DE') {
      // Check if Liechtenstein is planned
      return countryData['LI']?.confirmedVisit && !countryData['LI']?.visited;
    }
    if (alpha2Code === 'GB') {
      // Check if Faroe Islands are planned
      return countryData['FO']?.confirmedVisit && !countryData['FO']?.visited;
    }
    return false;
  }

  const getStrokeStyle = (countryData: CountryData | undefined, alpha2Code: string) => {
    // Default stroke for all countries
    return {
      strokeWidth: 0.5,
      stroke: '#fff'
    };
  }

  const getHoverColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    const baseColor = getCountryColor(countryData, alpha2Code);
    
    // If it's using the pattern, return a slightly darker version of the pattern
    if (baseColor === 'url(#plannedMicroStates)') {
      return 'url(#plannedMicroStates)';
    }
    
    // Darken the base color for hover effect
    if (baseColor === '#e5e7eb') return '#d1d5db';
    if (baseColor === '#3b82f6') return '#2563eb';
    if (baseColor === '#16a34a') return '#15803d';
    if (baseColor === '#f97316') return '#ea580c';
    if (baseColor === '#eab308') return '#ca8a04';
    if (baseColor === '#ef4444') return '#dc2626';
    if (baseColor === '#FF6B6B') return '#ff5252';
    if (baseColor === '#4ECDC4') return '#26a69a';
    if (baseColor === '#FFD166') return '#ffc107';
    if (baseColor === '#6A4C93') return '#5e3a82';
    return baseColor;
  }

  const getPressedColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    const hoverColor = getHoverColor(countryData, alpha2Code);
    
    // If it's using the pattern, keep the same pattern
    if (hoverColor === 'url(#plannedMicroStates)') {
      return 'url(#plannedMicroStates)';
    }
    
    // Further darken for pressed state
    if (hoverColor === '#d1d5db') return '#9ca3af';
    if (hoverColor === '#2563eb') return '#1d4ed8';
    if (hoverColor === '#15803d') return '#166534';
    if (hoverColor === '#ea580c') return '#c2410c';
    if (hoverColor === '#ca8a04') return '#a16207';
    if (hoverColor === '#dc2626') return '#b91c1c';
    if (hoverColor === '#ff5252') return '#f44336';
    if (hoverColor === '#26a69a') return '#00796b';
    if (hoverColor === '#ffc107') return '#ff9800';
    if (hoverColor === '#5e3a82') return '#4a2c6a';
    return hoverColor;
  }


  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full" 
      role="region" 
      aria-label="Interactive World Map"
      onMouseLeave={() => setTooltipData(null)}
    >
      <ViewModeToggle 
        viewMode={viewMode} 
        onToggle={setViewMode} 
      />
      
      <ComposableMap
        projection="geoMercator"
        className="w-full h-full bg-[#1a365d] transition-all duration-300"
      >
        <defs>
          {/* SVG Pattern for planned micro-states */}
          <pattern
            id="plannedMicroStates"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(45)"
          >
            <rect width="8" height="8" fill="#16a34a" />
            <rect width="2" height="8" fill="#f97316" />
          </pattern>
        </defs>
        
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          maxZoom={5}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties?.name;
                const alpha2Code = countryNameMap[countryName];
                const country = countryData[alpha2Code];
                const isInteractive = country?.visited || country?.confirmedVisit;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      if (isInteractive && !selectedTooltipData) {
                        setTooltipData({
                          country,
                          position: {
                            x: e.clientX,
                            y: e.clientY
                          }
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (tooltipData && isInteractive && !selectedTooltipData) {
                        setTooltipData({
                          country,
                          position: {
                            x: e.clientX,
                            y: e.clientY
                          }
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (!selectedTooltipData) {
                        setTooltipData(null);
                      }
                    }}
                    onClick={(e) => {
                      if (isInteractive) {
                        setSelectedTooltipData({
                          country,
                          position: {
                            x: e.clientX,
                            y: e.clientY
                          }
                        });
                        setTooltipData(null);
                      }
                    }}
                    tabIndex={isInteractive ? 0 : -1}
                    aria-label={countryName}
                    style={{
                      default: {
                        fill: getCountryColor(country, alpha2Code),
                        outline: 'none',
                        transition: 'all 0.3s',
                        strokeWidth: getStrokeStyle(country, alpha2Code).strokeWidth,
                        stroke: getStrokeStyle(country, alpha2Code).stroke
                      },
                      hover: {
                        fill: getHoverColor(country, alpha2Code),
                        outline: 'none',
                        cursor: isInteractive ? 'pointer' : 'default',
                        transition: 'all 0.3s',
                        strokeWidth: getStrokeStyle(country, alpha2Code).strokeWidth,
                        stroke: getStrokeStyle(country, alpha2Code).stroke
                      },
                      pressed: {
                        fill: getPressedColor(country, alpha2Code),
                        outline: 'none',
                        strokeWidth: getStrokeStyle(country, alpha2Code).strokeWidth,
                        stroke: getStrokeStyle(country, alpha2Code).stroke
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip 
        hoverData={tooltipData} 
        selectedData={selectedTooltipData}
        onClose={() => setSelectedTooltipData(null)}
      />
      <Legend viewMode={viewMode} />
      <StatsOverlay
        visitedCount={visitedCount}
        visited2022Count={visited2022Count}
        visited2023Count={visited2023Count}
        visited2024Count={visited2024Count}
        visited2025Count={visited2025Count}
        multipleVisitsCount={multipleVisitsCount}
        singleVisitCount={singleVisitCount}
        twoVisitsCount={twoVisitsCount}
        threeOrMoreVisitsCount={threeOrMoreVisitsCount}
        viewMode={viewMode}
      />
      
      <HelpButton />
    </div>
  );
}

export default InteractiveMap;