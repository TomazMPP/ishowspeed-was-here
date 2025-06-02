import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { ViewMode } from '@/types/map-types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onToggle }: ViewModeToggleProps) {
  const modes: Array<{ key: ViewMode; label: string; icon: React.ReactNode }> = [
    { key: 'standard', label: 'Standard', icon: <Clock className="w-4 h-4" /> },
    { key: 'chronological', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
    { key: 'multiple-visits', label: 'Visits', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="absolute top-6 left-6 z-10">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 p-1">
        <div className="flex gap-1">
          {modes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => onToggle(mode.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                viewMode === mode.key
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {mode.icon}
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}