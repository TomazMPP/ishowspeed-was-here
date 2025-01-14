import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, PlayCircle, Home, X } from 'lucide-react';
import type { TooltipData } from '../types/map-types';

interface TooltipProps {
  hoverData: TooltipData | null;
  selectedData: TooltipData | null;
  onClose: () => void;
}

export function Tooltip({ hoverData, selectedData, onClose }: TooltipProps) {
  const data = selectedData || hoverData;
  if (!data) return null;

  const isUS = data.country.id === 'US';
  const isVisited = data.country.visited;
  const isConfirmed = data.country.confirmedVisit;
  const isSelected = !!selectedData;

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault();
    window.open(videoUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed z-20 p-5 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 w-80"
          style={{
            left: data.position.x + 16,
            top: data.position.y + 16,
          }}
        >
          {isSelected && (
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Status Badge */}
          <div className="absolute -top-3 left-5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isUS 
                ? 'bg-blue-100 text-blue-800'
                : isVisited 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-orange-100 text-orange-800'
            }`}>
              {isUS ? 'Born' : isVisited ? 'Visited' : 'Confirmed Visit'}
            </span>
          </div>

          <h3 className="font-bold text-2xl mb-4 text-gray-900">{data.country.name}</h3>

          <div className="space-y-4">
            {isUS ? (
              <div className="flex items-center gap-3 text-gray-700">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">
                  Born and raised in the US
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">
                    {isVisited 
                      ? `Visited on ${new Date(data.country.visitDate! + 'T12:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}`
                      : isConfirmed
                        ? `Visit scheduled for ${new Date(data.country.visitDate! + 'T12:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}`
                        : 'Not visited yet'
                    }
                  </span>
                </div>

                {isVisited && data.country.videoUrl && (
                  <button 
                    onClick={(e) => handleVideoClick(e, data.country.videoUrl!)}
                    className="w-full flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors group mt-2 bg-blue-50 hover:bg-blue-100 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium flex-grow text-left">Watch the video</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}