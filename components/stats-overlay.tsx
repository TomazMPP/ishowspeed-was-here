import { Calendar, Users, TrendingUp } from 'lucide-react';
import { ViewMode } from '@/types/map-types';

interface StatsOverlayProps {
  visitedCount: number;
  visited2022Count: number;
  visited2023Count: number;
  visited2024Count: number;
  visited2025Count: number;
  multipleVisitsCount: number;
  singleVisitCount: number;
  twoVisitsCount: number;
  threeOrMoreVisitsCount: number;
  viewMode: ViewMode;
}

export function StatsOverlay({ 
  visitedCount,
  visited2022Count,
  visited2023Count,
  visited2024Count,
  visited2025Count,
  multipleVisitsCount,
  singleVisitCount,
  twoVisitsCount,
  threeOrMoreVisitsCount,
  viewMode
}: StatsOverlayProps) {
  const yearData = [
    { year: 2022, count: visited2022Count, color: '#FF6B6B' },
    { year: 2023, count: visited2023Count, color: '#4ECDC4' },
    { year: 2024, count: visited2024Count, color: '#FFD166' },
    { year: 2025, count: visited2025Count, color: '#6A4C93' },
  ];

  return (
    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 z-10 overflow-hidden">
      <div className="p-4">
        {/* Total counter */}
        <div className="text-center pb-4 border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900">{visitedCount}</div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Countries Visited</div>
        </div>
        
        {/* Multiple visits mode */}
        {viewMode === 'multiple-visits' && (
          <>
            <div className="py-4 border-b border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{multipleVisitsCount}</div>
              </div>
              <div className="text-xs text-gray-600 font-medium">Multiple Visits</div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-700">Single Visit</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {singleVisitCount}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-gray-700">2 Visits</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {twoVisitsCount}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <span className="text-sm text-gray-700">3+ Visits</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {threeOrMoreVisitsCount}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Year counters for chronological and standard modes */}
        {(viewMode === 'chronological' || viewMode === 'standard') && (
          <div className="pt-4 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">By Year</div>
            <div className="space-y-2">
              {yearData.map(({ year, count, color }) => (
                <div key={year} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-700">{year}</span>
                  </div>
                  <div 
                    className="px-2 py-1 rounded-full text-xs font-semibold min-w-[24px] text-center"
                    style={{ 
                      backgroundColor: `${color}15`,
                      color: color,
                      border: `1px solid ${color}30`
                    }}
                  >
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}