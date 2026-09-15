import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  resultCount,
  totalCount,
}) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <label htmlFor="timeline-search" className="sr-only">
          Search scientific discoveries by name or scientist
        </label>

        <div className="absolute left-4 pointer-events-none text-stone-400">
          <Search className="w-5 h-5 text-sky-400" aria-hidden="true" />
        </div>

        <input
          id="timeline-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search discoveries or scientists (e.g., gravity, Einstein, vaccine, DNA)..."
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-[#0e1322] border border-white/15 text-stone-100 placeholder-stone-400 text-base sm:text-lg focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all shadow-lg shadow-black/20"
          autoComplete="off"
          spellCheck="false"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3.5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Screen-reader Live Region Announcement */}
      <div aria-live="polite" className="sr-only">
        {value
          ? `${resultCount} scientific ${resultCount === 1 ? 'discovery' : 'discoveries'} found matching ${value}`
          : `Showing all ${totalCount} scientific discoveries`}
      </div>

      {/* Visible Status Indicator */}
      <div className="mt-2.5 flex items-center justify-between px-2 text-xs sm:text-sm text-stone-400">
        <span>
          {value ? (
            <span>
              Found <strong className="text-sky-300 font-bold">{resultCount}</strong> of {totalCount} breakthroughs
            </span>
          ) : (
            <span>
              Explore all <strong className="text-stone-200">{totalCount}</strong> landmark breakthroughs
            </span>
          )}
        </span>

        {value && (
          <button
            onClick={() => onChange('')}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-2 font-medium"
          >
            Show all
          </button>
        )}
      </div>
    </div>
  );
};
