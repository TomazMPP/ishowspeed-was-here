import { Info } from 'lucide-react'

export function Legend() {
  return (
    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4" />
        <h2 className="font-semibold">Map Legend</h2>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-sm" />
          <span>Visited Countries</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-sm" />
          <span>Not Visited Yet</span>
        </div>
      </div>
    </div>
  )
}

