import React, { useState } from 'react';
import { HistoricalEvent } from '../types';
import { EventCard } from './EventCard';
import { Search, ChevronDown, ChevronUp, History } from 'lucide-react';

interface TimelineProps {
  events: HistoricalEvent[];
  eraName: string;
  accentColor: string;
  activeFigureFilter?: string | null;
  onSelectFigure: (figure: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  eraName,
  accentColor,
  activeFigureFilter,
  onSelectFigure,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  // Filter events by search query if any
  const filteredEvents = events.filter((ev) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(query) ||
      String(ev.year).toLowerCase().includes(query) ||
      ev.narrative.toLowerCase().includes(query) ||
      ev.whyItMatters.toLowerCase().includes(query) ||
      ev.keyFigures.some((f) => f.toLowerCase().includes(query)) ||
      ev.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full space-y-6">
      {/* Timeline Controls: Search & Expand/Collapse Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search events, figures, or years in ${eraName}...`}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status indicator & Expand toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-400">
          <span>
            Showing <strong className="text-white">{filteredEvents.length}</strong> of {events.length} milestones
          </span>

          <button
            onClick={() => setExpandAll(!expandAll)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white font-medium border border-white/10 transition-colors"
          >
            {expandAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
          <History className="w-12 h-12 text-stone-600 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-stone-300 mb-1">No milestones match your search</h4>
          <p className="text-sm text-stone-500 mb-4">
            Try adjusting your search terms or clearing the figure filter.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* The Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 md:pl-32 lg:pl-36 py-4">
        {/* Continuous Connecting Vertical Line down the side */}
        <div
          className="absolute left-6 sm:left-8 md:left-28 lg:left-32 top-6 bottom-6 w-0.5"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}80, ${accentColor}30, #ffffff15)`,
          }}
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="relative group">
              {/* Left Column: Year Anchor */}
              <div
                className="hidden md:flex absolute -left-32 lg:-left-36 top-5 w-24 flex-col items-end text-right select-none"
                aria-hidden="true"
              >
                <span
                  className="font-extrabold font-mono text-base tracking-tight transition-colors"
                  style={{ color: accentColor }}
                >
                  {event.year}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {event.category}
                </span>
              </div>

              {/* Connecting Node Dot / Anchor on the Vertical Line */}
              <div
                className="absolute -left-6 sm:-left-8 md:-left-4 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#0c0f17] transition-transform duration-200 group-hover:scale-125 z-10"
                style={{
                  borderColor: accentColor,
                  boxShadow: `0 0 12px ${accentColor}80`,
                }}
                aria-hidden="true"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mx-auto my-0.5"
                  style={{ backgroundColor: accentColor }}
                />
              </div>

              {/* Mobile Year Badge Anchor */}
              <div className="md:hidden flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${accentColor}25`,
                    color: accentColor,
                  }}
                >
                  {event.year}
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {event.category}
                </span>
              </div>

              {/* Right Column: Event Card */}
              <div className="w-full">
                <EventCard
                  event={event}
                  accentColor={accentColor}
                  eraName={eraName}
                  activeFigureFilter={activeFigureFilter}
                  onSelectFigure={onSelectFigure}
                  isAutoExpanded={expandAll}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
