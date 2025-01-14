'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { countryData } from '../data/countries'
import { Tooltip } from './tooltip'
import { Legend } from './legend'
import { StatsOverlay } from './stats-overlay'
import type { CountryData, TooltipData } from '../types/map-types'
import customGeoJson from '../data/custom.geo.json'

export function InteractiveMap() {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const visitedCount = Object.values(countryData).filter(country => country.visited).length;

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const country = countryData[geo.id];
    if (country?.visited) {
      const rect = (event.target as Element).getBoundingClientRect();
      setTooltipData({
        country,
        position: {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
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
          <Geographies geography={customGeoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isVisited = countryData[geo.id]?.visited;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(event) => handleMouseEnter(geo, event)}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={isVisited ? 0 : -1}
                    aria-label={`${geo.properties.name} ${isVisited ? '- Visited' : ''}`}
                    style={{
                      default: {
                        fill: isVisited ? '#dc2626' : '#e5e7eb',
                        outline: 'none',
                        transition: 'all 0.3s',
                      },
                      hover: {
                        fill: isVisited ? '#b91c1c' : '#e5e7eb',
                        outline: 'none',
                        cursor: isVisited ? 'pointer' : 'default',
                        transition: 'all 0.3s',
                      },
                      pressed: {
                        fill: isVisited ? '#991b1b' : '#e5e7eb',
                        outline: 'none',
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

