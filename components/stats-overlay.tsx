export function StatsOverlay({ visitedCount }: { visitedCount: number }) {
  return (
    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="text-center">
        <div className="text-3xl font-bold">{visitedCount}</div>
        <div className="text-sm text-gray-600">Countries Visited</div>
      </div>
    </div>
  )
}

