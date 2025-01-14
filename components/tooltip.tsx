import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar, PlayCircle } from 'lucide-react'
import type { TooltipData } from '../types/map-types'

interface TooltipProps {
  data: TooltipData | null;
}

export function Tooltip({ data }: TooltipProps) {
  if (!data) return null;

  const isVisited = data.country.visited;
  const isConfirmed = data.country.confirmedVisit;

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
          {/* Status Badge */}
          <div className="absolute -top-3 right-5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isVisited 
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {isVisited ? 'Visited' : 'Confirmed Visit'}
            </span>
          </div>

          {/* Country Name */}
          <h3 className="font-bold text-2xl mb-4 text-gray-900">{data.country.name}</h3>

          <div className="space-y-4">
            {/* Visit Date */}
            <div className="flex items-center gap-3 text-gray-700">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">
                {isVisited 
                  ? `Visited on ${new Date(data.country.visitDate!).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`
                  : isConfirmed
                    ? `Visit scheduled for ${new Date(data.country.visitDate!).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}`
                    : 'Not visited yet'
                }
              </span>
            </div>

            {/* Video Views - Only for visited countries */}
            {isVisited && data.country.views && (
              <div className="flex items-center gap-3 text-gray-700">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">
                  {(data.country.views / 1000000).toFixed(1)}M views
                </span>
              </div>
            )}

            {/* Video Link - Only for visited countries */}
            {isVisited && data.country.videoUrl && (
              <a 
                href={data.country.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors group mt-2"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Watch video</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}