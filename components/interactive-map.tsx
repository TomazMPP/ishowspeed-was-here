"use client"
import { useEffect, useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { countryData } from '../data/countries'
import { Tooltip } from './tooltip'
import { Legend } from './legend'
import { StatsOverlay } from './stats-overlay'
import type { CountryData, TooltipData } from '../types/map-types'
import { ViewModeToggle } from './view-toggle'


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
  "Ireland": "IE",
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
  "Guatemala": "GT"
};

export function InteractiveMap() {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selectedTooltipData, setSelectedTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [isChronological, setIsChronological] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const visitedCount = Object.values(countryData).filter(country => country.visited).length;

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
    if (!country?.visitDate) return '#e5e7eb'; 
    
    const year = getYearFromDate(country.visitDate);
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

  const getCountryColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    if (isChronological && countryData?.visited) {
      return getChronologicalColor(countryData);
    }

    if (!countryData) return '#e5e7eb' 
    if (alpha2Code === 'US') return '#3b82f6' 
    if (countryData.visited) return '#16a34a' 
    if (countryData.confirmedVisit) return '#f97316' 
    return '#e5e7eb'
  }

  const getHoverColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    if (isChronological && countryData?.visited) {
      const baseColor = getChronologicalColor(countryData);
      return baseColor.replace(/(\d+)%\)$/, (match, lightness) => 
        `${Math.max(0, parseInt(lightness) - 10)}%)`
      );
    }

    if (!countryData) return '#e5e7eb' 
    if (alpha2Code === 'US') return '#3b82f6' 
    if (countryData.visited) return '#15803d' 
    if (countryData.confirmedVisit) return '#ea580c' 
    return '#e5e7eb' 
  }

  const getPressedColor = (countryData: CountryData | undefined, alpha2Code: string) => {
    if (isChronological && countryData?.visited) {
      const baseColor = getChronologicalColor(countryData);
      return baseColor.replace(/(\d+)%\)$/, (match, lightness) => 
        `${Math.max(0, parseInt(lightness) - 15)}%)`
      );
    }

    if (!countryData) return '#e5e7eb' 
    if (alpha2Code === 'US') return '#1d4ed8' 
    if (countryData.visited) return '#166534' 
    if (countryData.confirmedVisit) return '#c2410c' 
    return '#e5e7eb' 
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
        isChronological={isChronological} 
        onToggle={() => setIsChronological(!isChronological)} 
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
      <Legend isChronological={isChronological} />
      <StatsOverlay visitedCount={visitedCount} />
    </div>
  );
}

export default InteractiveMap;