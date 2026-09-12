import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSelectSuggestion?: (suggestion: string) => void;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for a recipe, ingredient or cuisine...',
  onSelectSuggestion,
  autoFocus = false,
}) => {
  const popularSuggestions = [
    'Paneer',
    'Butter Chicken',
    'Biryani',
    'Dosa',
    'Dal Makhani',
    'South Indian',
    'Samosa',
    'Dessert',
  ];

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 sm:left-5 text-stone-400 pointer-events-none flex items-center justify-center">
          <Search className="w-5 h-5 text-rose-900/60" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white border border-stone-300/80 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base font-medium shadow-sm hover:border-amber-500/80 focus:border-rose-800 focus:ring-4 focus:ring-rose-900/10 outline-none transition-all"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestion Chips */}
      {onSelectSuggestion && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
            Popular:
          </span>
          {popularSuggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectSuggestion(tag)}
              className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-stone-100 hover:bg-rose-100/80 hover:text-rose-900 text-stone-700 transition-colors border border-stone-200/80"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
