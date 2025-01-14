export function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#1a365d]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <div className="text-white text-lg">Loading Map...</div>
      </div>
    </div>
  )
}

