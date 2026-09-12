import React from 'react';
import { Plus, Minus, RotateCcw, Filter } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalVisible: number;
}

const CATEGORIES = [
  'All',
  'Mountain',
  'Beach',
  'Heritage',
  'Spiritual',
  'Wildlife',
  'Adventure',
];

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  selectedCategory,
  onSelectCategory,
  totalVisible,
}) => {
  return (
    <div className="flex flex-col gap-3 pointer-events-none">
      {/* Category Pills Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl glass-panel shadow-xl pointer-events-auto max-w-[90vw] md:max-w-none overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-stone-400">
          <Filter className="w-3 h-3 text-amber-500" />
          <span className="hidden sm:inline">Filter:</span>
        </div>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
        <div className="px-2 py-1 text-[11px] text-stone-400 border-l border-white/10 font-mono">
          {totalVisible} places
        </div>
      </div>

      {/* Floating Zoom & Reset Buttons */}
      <div className="flex items-center gap-2 self-end pointer-events-auto">
        <button
          onClick={onReset}
          title="Reset Map View"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel text-xs font-medium text-stone-300 hover:text-white hover:bg-white/10 transition-colors shadow-lg active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Reset View</span>
        </button>

        <div className="flex items-center rounded-xl glass-panel overflow-hidden shadow-lg">
          <button
            onClick={onZoomIn}
            title="Zoom In"
            className="p-2 text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-white/10" />
          <button
            onClick={onZoomOut}
            title="Zoom Out"
            className="p-2 text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
