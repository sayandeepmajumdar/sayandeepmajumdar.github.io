import React, { useState } from 'react';
import { Discovery } from '../types';
import { getFieldConfig } from '../data/fields';
import { ChevronDown, Sparkles, User, Calendar, Tag } from 'lucide-react';

interface DiscoveryCardProps {
  discovery: Discovery;
  isAutoExpanded?: boolean;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  discovery,
  isAutoExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isAutoExpanded);
  const fieldCfg = getFieldConfig(discovery.field);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const headerId = `discovery-header-${discovery.id}`;
  const contentId = `discovery-content-${discovery.id}`;

  return (
    <article
      className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden bg-[#0c101c]/90 backdrop-blur-md ${
        isExpanded
          ? 'border-white/25 shadow-xl bg-[#0f1424]'
          : 'border-white/10 hover:border-white/20 hover:bg-[#0e1220]'
      }`}
      style={
        isExpanded
          ? {
              boxShadow: `0 10px 30px -10px ${fieldCfg.color}25`,
            }
          : {}
      }
    >
      {/* Clickable Card Header (Large Touch Target) */}
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
        className="w-full text-left p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group min-h-[72px]"
      >
        <div className="flex-1 space-y-2">
          {/* Meta Tags: Year & Field Badge */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
            {/* Year Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-extrabold text-sm bg-white/10 text-white border border-white/15">
              <Calendar className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
              <span>{discovery.displayYear}</span>
            </span>

            {/* Field Badge (Color-coded with Text Label) */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs border ${fieldCfg.badgeClass}`}
            >
              <span aria-hidden="true">{fieldCfg.icon}</span>
              <span>{discovery.field}</span>
            </span>
          </div>

          {/* Discovery Name (Plain Language) */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-sky-200 transition-colors leading-snug">
            {discovery.name}
          </h3>

          {/* Primary Figure / Scientist */}
          <div className="flex items-center gap-2 text-sm sm:text-base text-stone-300 font-medium">
            <User className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
            <span>{discovery.who}</span>
          </div>
        </div>

        {/* Expand / Collapse Action Indicator */}
        <div className="flex flex-col items-center justify-center pl-2 pt-1">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 ${
              isExpanded
                ? 'bg-white/20 text-white rotate-180'
                : 'bg-white/5 text-stone-400 group-hover:bg-white/15 group-hover:text-stone-200'
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-semibold">
            {isExpanded ? 'Hide' : 'Explain'}
          </span>
        </div>
      </div>

      {/* Smooth Expandable Narrative & Details Area (Fast 150-250ms CSS Transition) */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-200 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-white/10 space-y-4">
            {/* Plain-Language 2-3 Sentence Explanation */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-1.5">
                How It Works &amp; Why It Matters
              </h4>
              <p className="text-stone-200 text-base sm:text-lg leading-relaxed">
                {discovery.explanation}
              </p>
            </div>

            {/* Impact Callout Block */}
            {discovery.impact && (
              <div
                className="p-4 rounded-2xl border bg-gradient-to-r from-white/[0.04] to-transparent relative overflow-hidden"
                style={{ borderColor: `${fieldCfg.color}40` }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
                  style={{ backgroundColor: fieldCfg.color }}
                  aria-hidden="true"
                />
                <div className="flex items-start gap-3">
                  <div
                    className="p-1.5 rounded-lg shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${fieldCfg.color}20`,
                      color: fieldCfg.color,
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: fieldCfg.color }}
                    >
                      Global Impact
                    </h5>
                    <p className="text-stone-300 text-sm sm:text-base font-medium leading-relaxed">
                      {discovery.impact}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags row */}
            {discovery.tags && discovery.tags.length > 0 && (
              <div className="pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap text-xs text-stone-400">
                <Tag className="w-3.5 h-3.5 text-stone-500" />
                {discovery.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-stone-400 text-xs"
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
