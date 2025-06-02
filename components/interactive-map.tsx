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
import { getLatestVisitDate, getFirstVisitDate, getVisitCount, hasMultipleVisits } from '@/lib/country-utils'


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
  "Mongolia": "MN"
};

export function InteractiveMap() {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selectedTooltipData, setSelectedTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const mapRef = useRef<HTMLDivElement>(null);

  const visitedCount = Object.values(countryData).filter(country => country.visited).length;
  const visited2022Count = Object.values(countryData).filter(country => {
    const date = getLatestVisitDate(country) || getFirstVisitDate(country);
    return date?.includes('2022');
  }).length;
  const visited2023Count = Object.values(countryData).filter(country => {
    const date = getLatestVisitDate(country) || getFirstVisitDate(country);
    return date?.includes('2023');
  }).length;
  const visited2024Count = Object.values(countryData).filter(country => {
    const date = getLatestVisitDate(country) || getFirstVisitDate(country);
    return date?.includes('2024');
  }).length;
  const visited2025Count = Object.values(countryData).filter(country => {
    const date = getLatestVisitDate(country) || getFirstVisitDate(country);
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
    
    const date = getLatestVisitDate(country) || getFirstVisitDate(country);
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
    if (countryData.visited) return '#16a34a' 
    if (countryData.confirmedVisit) return '#f97316' 
    return '#e5e7eb'
  }

  const getHoverColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    const baseColor = getCountryColor(countryData, alpha2Code);
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
                        strokeWidth: 0.5,
                        stroke: '#fff'
                      },
                      hover: {
                        fill: getHoverColor(country, alpha2Code),
                        outline: 'none',
                        cursor: isInteractive ? 'pointer' : 'default',
                        transition: 'all 0.3s',
                        strokeWidth: 0.5,
                        stroke: '#fff'
                      },
                      pressed: {
                        fill: getPressedColor(country, alpha2Code),
                        outline: 'none',
                        strokeWidth: 0.5,
                        stroke: '#fff'
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