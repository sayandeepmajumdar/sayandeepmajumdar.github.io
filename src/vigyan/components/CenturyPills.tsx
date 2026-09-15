import React from 'react';
import { Clock } from 'lucide-react';

interface CenturyPillsProps {
  centuries: string[];
  activeCentury: string | null;
  onJumpToCentury: (century: string) => void;
  onShowAll: () => void;
}

export const CenturyPills: React.FC<CenturyPillsProps> = ({
  centuries,
  activeCentury,
  onJumpToCentury,
  onShowAll,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none py-1">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1 hidden sm:inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Jump to:</span>
        </span>

        {/* 'All' pill */}
        <button
          type="button"
          onClick={onShowAll}
          className={`h-11 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center justify-center border ${
            activeCentury === null
              ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
              : 'bg-[#0e1322] text-stone-300 hover:text-white hover:bg-white/10 border-white/10'
          }`}
          aria-pressed={activeCentury === null}
        >
          All Eras
        </button>

        {/* Century Pills */}
        {centuries.map((century) => {
          const isActive = activeCentury === century;
          return (
            <button
              key={century}
              type="button"
              onClick={() => onJumpToCentury(century)}
              className={`h-11 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : 'bg-[#0e1322] text-stone-300 hover:text-white hover:bg-white/10 border-white/10'
              }`}
              aria-pressed={isActive}
            >
              <span>{century}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
