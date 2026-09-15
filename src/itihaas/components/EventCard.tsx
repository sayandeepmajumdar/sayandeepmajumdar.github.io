import React, { useState } from 'react';
import { HistoricalEvent } from '../types';
import { ChevronDown, Sparkles, MapPin, Users, Tag, Calendar } from 'lucide-react';

interface EventCardProps {
  event: HistoricalEvent;
  accentColor?: string;
  eraName?: string;
  activeFigureFilter?: string | null;
  onSelectFigure: (figure: string) => void;
  isAutoExpanded?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  accentColor = '#f97316',
  eraName,
  activeFigureFilter,
  onSelectFigure,
  isAutoExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isAutoExpanded);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleFigureClick = (e: React.MouseEvent, figure: string) => {
    e.stopPropagation();
    onSelectFigure(figure);
  };

  const contentId = `event-narrative-${event.id}`;
  const headerId = `event-header-${event.id}`;

  return (
    <article
      className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-[#101524]/90 backdrop-blur-md ${
        isExpanded
          ? 'border-white/25 shadow-xl bg-[#13192c]'
          : 'border-white/10 hover:border-white/20 hover:bg-[#121828]'
      }`}
      style={
        isExpanded
          ? {
              boxShadow: `0 10px 30px -10px ${accentColor}25`,
            }
          : {}
      }
    >
      {/* Clickable Header Area (Collapsible Trigger) */}
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        onClick={toggleExpand}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
          }
        }}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="w-full text-left p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group"
      >
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
          {!isExpanded && event.keyFigures.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-stone-400" />
                <span>Figures:</span>
              </span>
              {event.keyFigures.slice(0, 3).map((fig) => {
                const isMatchingFilter =
                  activeFigureFilter?.toLowerCase() === fig.toLowerCase();
                return (
                  <button
                    key={fig}
                    type="button"
                    onClick={(e) => handleFigureClick(e, fig)}
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition-all ${
                      isMatchingFilter
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
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded
                ? 'bg-white/20 text-white rotate-180'
                : 'bg-white/5 text-stone-400 group-hover:bg-white/15 group-hover:text-stone-200'
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-semibold">
            {isExpanded ? 'Hide' : 'Read'}
          </span>
        </div>
      </div>

      {/* Smooth Expandable Narrative & Details Area (CSS Transition) */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
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
                  <span>Key Figures (Click to filter across all eras)</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.keyFigures.map((fig) => {
                    const isMatchingFilter =
                      activeFigureFilter?.toLowerCase() === fig.toLowerCase();
                    return (
                      <button
                        key={fig}
                        type="button"
                        onClick={(e) => handleFigureClick(e, fig)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isMatchingFilter
                            ? 'bg-orange-500 text-white shadow-lg ring-2 ring-orange-300'
                            : 'bg-white/10 text-stone-200 hover:bg-orange-500/20 hover:text-orange-200 border border-white/10'
                        }`}
                        title={`Filter all events featuring ${fig}`}
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
        </div>
      </div>
    </article>
  );
};
