import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar, PlayCircle } from 'lucide-react'
import type { TooltipData } from '../types/map-types'

interface TooltipProps {
  data: TooltipData | null;
}

export function Tooltip({ data }: TooltipProps) {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-20 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 w-72"
          style={{
            left: data.position.x + 10,
            top: data.position.y + 10,
          }}
        >
          <h3 className="font-bold text-xl mb-3">{data.country.name}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Visited on {new Date(data.country.visitDate!).toLocaleDateString()}</span>
            </div>
            {data.country.views && (
              <div className="flex items-center gap-2 text-gray-600">
                <PlayCircle className="w-4 h-4" />
                <span>Most viewed video: {(data.country.views / 1000000).toFixed(1)}M views</span>
              </div>
            )}
            {data.country.videoUrl && (
              <a 
                href={data.country.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Watch video
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

