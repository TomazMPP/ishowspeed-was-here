import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Home, PlayCircle, ExternalLink, MapPin } from 'lucide-react';
import type { TooltipData } from '../types/map-types';
import { getVisitDates, getVideoUrls, getVisitCount, sortVisitsByDate, hasMultipleVisits } from '@/lib/country-utils';

interface TooltipProps {
  hoverData: TooltipData | null;
  selectedData: TooltipData | null;
  onClose: () => void;
}

export function Tooltip({ hoverData, selectedData, onClose }: TooltipProps) {
  const data = selectedData || hoverData;
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate better positioning to avoid screen edges
  useEffect(() => {
    if (!data) return;

    const padding = 20;
    const tooltipWidth = data.country.id === 'CN' ? 400 : hasMultipleVisits(data.country) ? 360 : 300;
    const tooltipHeight = hasMultipleVisits(data.country) ? 400 : 200;
    
    let x = data.position.x + 16;
    let y = data.position.y + 16;

    // Adjust horizontal position if too close to right edge
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = data.position.x - tooltipWidth - 16;
    }

    // Adjust vertical position if too close to bottom edge
    if (y + tooltipHeight > window.innerHeight - padding) {
      y = data.position.y - tooltipHeight - 16;
    }

    // Ensure it doesn't go off the left or top edges
    x = Math.max(padding, x);
    y = Math.max(padding, y);

    setTooltipPosition({ x, y });
  }, [data]);

  if (!data) return null;

  const isUS = data.country.id === 'US';
  const isVisited = data.country.visited;
  const isSelected = !!selectedData;
  const visitCount = getVisitCount(data.country);
  const multipleVisits = hasMultipleVisits(data.country);

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault();
    window.open(videoUrl, '_blank');
  };

  const sortedVisits = sortVisitsByDate(data.country);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="fixed z-20 bg-white rounded-2xl shadow-2xl border border-gray-200/80 backdrop-blur-xl"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            width: data.country.id === 'CN' ? '400px' : multipleVisits ? '360px' : '300px',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div className="relative px-5 pt-5 pb-3">
            {isSelected && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close tooltip"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Status Badge */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                isUS 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : isVisited 
                    ? multipleVisits
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}>
                <MapPin className="w-3 h-3" />
                {isUS ? 'Born Here' : isVisited ? (multipleVisits ? `${visitCount} Visits` : 'Visited') : 'Planned'}
              </div>
            </div>

            <h3 className="font-bold text-xl text-gray-900 leading-tight">
              {data.country.id === 'CN' ? 'China/Hong Kong' : data.country.name}
            </h3>
          </div>

          {/* Content */}
          <div className="px-5 pb-5">
            {isUS ? (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-blue-900 text-sm">Home Country</div>
                  <div className="text-blue-700 text-xs">Born and raised here</div>
                </div>
              </div>
            ) : multipleVisits ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-medium text-sm border-b border-gray-100 pb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Visit History</span>
                  <span className="text-purple-600">({visitCount})</span>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {sortedVisits.map((visit, index) => (
                    <div key={index} className="group border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">
                              {new Date(visit.date + 'T12:00:00').toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            {data.country.customLabels && data.country.customLabels[index] && (
                              <span className="text-xs text-purple-600 font-medium">
                                {data.country.customLabels[index]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {visit.videoUrl && (
                        <button 
                          onClick={(e) => handleVideoClick(e, visit.videoUrl!)}
                          className="w-full flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group bg-blue-50 hover:bg-blue-100 p-2 rounded-lg"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span className="text-xs font-medium flex-grow text-left">
                            {data.country.customLabels && data.country.customLabels[index] 
                              ? `Watch ${data.country.customLabels[index]} Visit`
                              : `Watch Visit #${index + 1}`
                            }
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Special note for China/Hong Kong */}
                {data.country.id === 'CN' && data.country.customLabels?.includes('Hong Kong') && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        <strong>Geographic Note:</strong> Hong Kong appears as part of China on this map due to the World Atlas data structure, but both mainland China and Hong Kong visits are tracked separately in the timeline above.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Only show standard sections for non-China countries */}
                {data.country.id !== 'CN' && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {isVisited ? 'Visit Date' : 'Scheduled Visit'}
                        </div>
                        <div className="text-gray-600 text-xs">
                          {new Date(getVisitDates(data.country)[0] + 'T12:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {getVideoUrls(data.country).length > 0 && (
                      <button 
                        onClick={(e) => handleVideoClick(e, getVideoUrls(data.country)[0])}
                        className="w-full flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors group bg-blue-50 hover:bg-blue-100 p-3 rounded-xl"
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <PlayCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-grow text-left">
                          <div className="text-sm font-medium">Watch Video</div>
                          <div className="text-xs opacity-70">View the livestream</div>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </>
                )}

                {/* Special China + Hong Kong Section */}
                {data.country.id === 'CN' && (
                  <div className="mt-4 space-y-3">
                    {/* China and Hong Kong Cards - Horizontal Layout */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Mainland China Card */}
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <h4 className="font-semibold text-green-900 text-xs">🇨🇳 Mainland</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs text-green-700">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">
                              {new Date(data.country.visitDate + 'T12:00:00').toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <button 
                            onClick={(e) => handleVideoClick(e, getVideoUrls(data.country)[0])}
                            className="w-full flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors group bg-white hover:bg-blue-50 p-2 rounded-md border border-green-200"
                          >
                            <PlayCircle className="w-3 h-3" />
                            <span className="text-xs font-medium flex-grow text-left">Watch</span>
                            <ExternalLink className="w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </div>
                      </div>

                      {/* Hong Kong Card */}
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <h4 className="font-semibold text-red-900 text-xs">🇭🇰 Hong Kong</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs text-red-700">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">Apr 3, 2025</span>
                          </div>
                          
                          <button 
                            onClick={(e) => handleVideoClick(e, "https://www.youtube.com/watch?v=oNS8PHxWdp8")}
                            className="w-full flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors group bg-white hover:bg-blue-50 p-2 rounded-md border border-red-200"
                          >
                            <PlayCircle className="w-3 h-3" />
                            <span className="text-xs font-medium flex-grow text-left">Watch</span>
                            <ExternalLink className="w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Improved Geographic Note */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-xs text-amber-700 leading-relaxed">
                          <p className="font-medium mb-1">⚠️ Technical Limitation</p>
                          <p>
                            Hong Kong appears combined with China on this map due to the World Atlas GeoJSON data structure. 
                            <strong> I have no control over this geographical representation.</strong> Both regions are tracked separately with their own visit dates and videos above.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}