import { Calendar } from 'lucide-react';

interface StatsOverlayProps {
  visitedCount: number;
  visited2022Count: number;
  visited2023Count: number;
  visited2024Count: number;
  visited2025Count: number;
}

export function StatsOverlay({ 
  visitedCount,
  visited2022Count,
  visited2023Count,
  visited2024Count,
  visited2025Count
}: StatsOverlayProps) {
  const yearData = [
    { year: 2022, count: visited2022Count, color: '#FF6B6B' },
    { year: 2023, count: visited2023Count, color: '#4ECDC4' },
    { year: 2024, count: visited2024Count, color: '#FFD166' },
    { year: 2025, count: visited2025Count, color: '#6A4C93' },
  ];

  return (
    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="space-y-4">
        {/* Total counter */}
        <div className="text-center pb-3 border-b border-gray-200">
          <div className="text-3xl font-bold">{visitedCount}</div>
          <div className="text-sm text-gray-600">Total Countries Visited</div>
        </div>
        
        {/* Year counters */}
        <div className="space-y-2">
          {yearData.map(({ year, count, color }) => (
            <div key={year} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{year}</span>
              </div>
              <div 
                className="px-2 py-0.5 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${color}20`,
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}