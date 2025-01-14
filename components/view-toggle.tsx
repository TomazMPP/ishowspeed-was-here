import React from 'react';
import { format, parse } from 'date-fns';
import { Clock, Map } from 'lucide-react';

interface ViewModeToggleProps {
  isChronological: boolean;
  onToggle: () => void;
}
export function ViewModeToggle({ isChronological, onToggle }: ViewModeToggleProps) {
  return (
    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-10">
      <button
        onClick={onToggle}
        className="p-3 flex items-center gap-2 hover:bg-gray-100 transition-colors rounded-lg"
        aria-pressed={isChronological}
        aria-label="Toggle chronological view"
      >
        {isChronological ? (
          <>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Chronological View</span>
          </>
        ) : (
          <>
            <Map className="w-4 h-4" />
            <span className="text-sm font-medium">Standard View</span>
          </>
        )}
      </button>
    </div>
  );
}