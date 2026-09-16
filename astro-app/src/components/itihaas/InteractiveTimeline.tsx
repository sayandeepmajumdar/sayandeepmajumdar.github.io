import React, { useState, useMemo } from 'react';
import type { HistoricalEvent } from '../../types/itihaas';
import {
  Search,
  ChevronDown,
  ChevronUp,
  History,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Tag,
  X,
  Filter,
} from 'lucide-react';

interface InteractiveTimelineProps {
  events: HistoricalEvent[];
  eraName: string;
  accentColor: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  events,
  eraName,
  accentColor = '#f97316',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState<boolean | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);

  // Filter events based on figure and search query
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // 1. Figure filter
      if (selectedFigure) {
        const matchesFigure = ev.keyFigures.some(
          (f) => f.toLowerCase() === selectedFigure.toLowerCase()
        );
        if (!matchesFigure) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          ev.title.toLowerCase().includes(query) ||
          String(ev.year).toLowerCase().includes(query) ||
          ev.narrative.toLowerCase().includes(query) ||
          ev.whyItMatters.toLowerCase().includes(query) ||
          ev.keyFigures.some((f) => f.toLowerCase().includes(query)) ||
          ev.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [events, selectedFigure, searchQuery]);

  const handleFigureClick = (e: React.MouseEvent, figure: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (selectedFigure?.toLowerCase() === figure.toLowerCase()) {
      setSelectedFigure(null);
    } else {
      setSelectedFigure(figure);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Active Figure Filter Alert Banner */}
      {selectedFigure && (
        <div className="p-4 sm:p-5 rounded-2xl border border-orange-500/40 bg-orange-500/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-orange-300 font-mono">
                  Filtered by Historical Figure:
                </span>
                <span className="text-sm font-bold text-white bg-orange-500/30 px-2.5 py-0.5 rounded-lg border border-orange-500/40">
                  {selectedFigure}
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Showing <strong>{filteredEvents.length}</strong> matching milestone
                {filteredEvents.length === 1 ? '' : 's'} in {eraName}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedFigure(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-semibold border border-white/15 transition-all self-start sm:self-center"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

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
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-2 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/60 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
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
            Showing <strong className="text-white">{filteredEvents.length}</strong> of{' '}
            {events.length} milestones
          </span>

          <button
            type="button"
            onClick={() => setExpandAll((prev) => (prev === true ? false : true))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white font-medium border border-white/10 transition-colors"
          >
            {expandAll === true ? (
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
            Try adjusting your search query or clearing the active figure filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedFigure(null);
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Reset Filters
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
          {filteredEvents.map((event) => {
            const isCardOpen = expandAll === true ? true : expandAll === false ? false : undefined;

            return (
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
                  <span className="text-[10px] text-stone-400 font-mono">{event.category}</span>
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
                  <span className="text-[11px] text-stone-400 font-mono">{event.category}</span>
                </div>

                {/* Right Column: Event Card using native HTML <details> */}
                <details
                  open={isCardOpen}
                  className="group/card rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 open:border-white/25 open:shadow-xl open:bg-[#13192c] bg-[#101524]/90 backdrop-blur-md transition-all duration-300 overflow-hidden"
                >
                  <summary className="list-none [&::-webkit-details-marker]:hidden w-full text-left p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group">
                    <div className="flex-1 space-y-2">
                      {/* Top Meta Badges */}
                      <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold"
                          style={{
                            backgroundColor: `${accentColor}22`,
                            color: accentColor,
                          }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.displayDate}</span>
                        </span>

                        {event.category && (
                          <span className="px-2 py-0.5 rounded-md bg-white/5 text-stone-300 border border-white/10 text-[11px]">
                            {event.category}
                          </span>
                        )}

                        {event.location && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-stone-400 text-[11px]">
                            <MapPin className="w-3 h-3 text-stone-500" />
                            <span>{event.location}</span>
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-200 transition-colors leading-snug">
                        {event.title}
                      </h3>

                      {/* Preview Figures in collapsed mode */}
                      {event.keyFigures.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 group-open/card:hidden">
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <Users className="w-3 h-3 text-stone-400" />
                            <span>Figures:</span>
                          </span>
                          {event.keyFigures.slice(0, 3).map((fig) => {
                            const isMatching =
                              selectedFigure?.toLowerCase() === fig.toLowerCase();
                            return (
                              <button
                                key={fig}
                                type="button"
                                onClick={(e) => handleFigureClick(e, fig)}
                                className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition-all ${
                                  isMatching
                                    ? 'bg-orange-500 text-white font-bold ring-2 ring-orange-300'
                                    : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white'
                                }`}
                                title={`Filter by ${fig}`}
                              >
                                {fig}
                              </button>
                            );
                          })}
                          {event.keyFigures.length > 3 && (
                            <span className="text-[11px] text-stone-400">
                              +{event.keyFigures.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expand / Collapse Indicator Icon */}
                    <div className="flex flex-col items-center justify-center pl-2 pt-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-stone-400 group-hover:bg-white/15 group-hover:text-stone-200 group-open/card:bg-white/20 group-open/card:text-white group-open/card:rotate-180 transition-all duration-300">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-semibold group-open/card:hidden">
                        Read
                      </span>
                      <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-semibold hidden group-open/card:inline">
                        Hide
                      </span>
                    </div>
                  </summary>

                  {/* Expandable Narrative & Details Area */}
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-5">
                    {/* Narrative Body */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                        Historical Narrative
                      </h4>
                      <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                        {event.narrative}
                      </p>
                    </div>

                    {/* Why It Matters Callout Block */}
                    {event.whyItMatters && (
                      <div
                        className="p-4 rounded-2xl border bg-gradient-to-r from-white/[0.04] to-transparent relative overflow-hidden"
                        style={{
                          borderColor: `${accentColor}40`,
                        }}
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
                          style={{ backgroundColor: accentColor }}
                          aria-hidden="true"
                        />
                        <div className="flex items-start gap-3">
                          <div
                            className="p-1.5 rounded-lg shrink-0 mt-0.5"
                            style={{
                              backgroundColor: `${accentColor}20`,
                              color: accentColor,
                            }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                              Why It Matters
                            </h5>
                            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
                              {event.whyItMatters}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Key Figures Section with Interactive Filter Tags */}
                    {event.keyFigures.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          <span>Key Figures (Click to filter):</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.keyFigures.map((fig) => {
                            const isMatching =
                              selectedFigure?.toLowerCase() === fig.toLowerCase();
                            return (
                              <button
                                key={fig}
                                type="button"
                                onClick={(e) => handleFigureClick(e, fig)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                  isMatching
                                    ? 'bg-orange-500 text-white shadow-lg ring-2 ring-orange-300'
                                    : 'bg-white/10 text-stone-200 hover:bg-orange-500/20 hover:text-orange-200 border border-white/10'
                                }`}
                                title={`Filter events featuring ${fig}`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span>{fig}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tags Row */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap text-xs text-stone-400">
                        <Tag className="w-3 h-3 text-stone-500" />
                        {event.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-white/5 text-stone-400 text-[11px]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
