import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { countryData } from '../data/countries'
import { Tooltip } from './tooltip'
import { Legend } from './legend'
import { StatsOverlay } from './stats-overlay'
import type { CountryData, TooltipData } from '../types/map-types'

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json"

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
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const visitedCount = Object.values(countryData).filter(country => country.visited).length;

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  const getCountryColor = (countryData: CountryData | undefined) => {
    if (!countryData) return '#e5e7eb' 
    if (countryData.visited) return '#16a34a' 
    if (countryData.confirmedVisit) return '#f97316' 
    return '#e5e7eb' 
  }

  const getHoverColor = (countryData: CountryData | undefined) => {
    if (!countryData) return '#e5e7eb' 
    if (countryData.visited) return '#15803d' 
    if (countryData.confirmedVisit) return '#ea580c' 
    return '#e5e7eb' 
  }

  const getPressedColor = (countryData: CountryData | undefined) => {
    if (!countryData) return '#e5e7eb' 
    if (countryData.visited) return '#166534' 
    if (countryData.confirmedVisit) return '#c2410c' 
    return '#e5e7eb' 
  }

  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>, geo: any) => {
    const countryName = geo.properties?.name;
    const alpha2Code = countryNameMap[countryName];
    const country = countryData[alpha2Code];
    
    if (country?.visited || country?.confirmedVisit) {
      setTooltipData({
        country,
        position: {
          x: event.clientX,
          y: event.clientY
        }
      });
    } else {
      setTooltipData(null);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGPathElement>, geo: any) => {
    if (tooltipData) {
      setTooltipData({
        ...tooltipData,
        position: {
          x: event.clientX,
          y: event.clientY
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="relative w-full h-full" role="region" aria-label="Interactive World Map">
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
                    onMouseEnter={(e) => handleMouseEnter(e, geo)}
                    onMouseMove={(e) => handleMouseMove(e, geo)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      console.log('Country:', {
                        name: countryName,
                        alpha2: alpha2Code,
                        data: country
                      });
                    }}
                    tabIndex={isInteractive ? 0 : -1}
                    aria-label={`${countryName} ${country?.visited ? '- Visited' : country?.confirmedVisit ? '- Visit Confirmed' : ''}`}
                    style={{
                      default: {
                        fill: getCountryColor(country),
                        outline: 'none',
                        transition: 'all 0.3s',
                        strokeWidth: 0.5,
                        stroke: '#fff'
                      },
                      hover: {
                        fill: getHoverColor(country),
                        outline: 'none',
                        cursor: isInteractive ? 'pointer' : 'default',
                        transition: 'all 0.3s',
                        strokeWidth: 0.5,
                        stroke: '#fff'
                      },
                      pressed: {
                        fill: getPressedColor(country),
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
      <Tooltip data={tooltipData} />
      <Legend />
      <StatsOverlay visitedCount={visitedCount} />
    </div>
  );
}

export default InteractiveMap;