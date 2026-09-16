import React, { useState, useMemo, useEffect } from 'react';
import type { Discovery, ScientificField } from '../../types/vigyan';
import { ALL_FIELDS, getFieldConfig } from '../../data/vigyan/fields';
import {
  Search,
  X,
  Clock,
  Sparkles,
  Calendar,
  User,
  Tag,
  ChevronDown,
  ChevronsUpDown,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

interface InteractiveVigyanTimelineProps {
  discoveries: Discovery[];
}

export const InteractiveVigyanTimeline: React.FC<InteractiveVigyanTimelineProps> = ({
  discoveries,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<ScientificField | null>(null);
  const [selectedCentury, setSelectedCentury] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState<boolean | null>(null);

  // Available centuries
  const centuries = useMemo(() => {
    const set = new Set(discoveries.map((d) => d.century));
    return Array.from(set).sort();
  }, [discoveries]);

  // Filtered discoveries
  const filteredDiscoveries = useMemo(() => {
    return discoveries.filter((d) => {
      // 1. Search Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesWho = d.who.toLowerCase().includes(q);
        const matchesExplanation = d.explanation.toLowerCase().includes(q);
        const matchesTags = d.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesWho && !matchesExplanation && !matchesTags) {
          return false;
        }
      }

      // 2. Field match
      if (selectedField && d.field !== selectedField) {
        return false;
      }

      // 3. Century match (only if explicitly clicked)
      if (selectedCentury && d.century !== selectedCentury) {
        return false;
      }

      return true;
    });
  }, [discoveries, searchQuery, selectedField, selectedCentury]);

  // Group filtered discoveries by century
  const centuriesPresent = useMemo(() => {
    const set = new Set(filteredDiscoveries.map((d) => d.century));
    return Array.from(set).sort();
  }, [filteredDiscoveries]);

  // Sync expand/collapse all to DOM <details> elements
  useEffect(() => {
    if (expandAll === null) return;
    const detailsEls = document.querySelectorAll<HTMLDetailsElement>('details.vigyan-card');
    detailsEls.forEach((el) => {
      el.open = expandAll;
    });
  }, [expandAll, filteredDiscoveries]);

  const handleJumpToCentury = (century: string) => {
    if (selectedCentury) {
      setSelectedCentury(null);
    }
    setTimeout(() => {
      const element = document.getElementById(`century-section-${century}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedField(null);
    setSelectedCentury(null);
    setExpandAll(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFilteringActive = Boolean(searchQuery || selectedField || selectedCentury);

  return (
    <div className="w-full">
      {/* Sticky Control Bar: Search + Jump Pills + Field Filter */}
      <div className="sticky top-16 sm:top-20 z-30 border-b border-white/10 bg-[#080c14]/95 backdrop-blur-xl py-4 shadow-lg shadow-black/40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* 1. Live Search Bar */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search
                className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discoveries, scientists, tags (e.g. Einstein, gravity, DNA, vaccine)..."
                className="w-full pl-11 pr-24 py-3 rounded-2xl bg-[#0e1322] border border-white/15 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                aria-label="Search scientific discoveries"
              />
              <div className="absolute right-3 flex items-center gap-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400 px-2 py-1 rounded bg-white/5 border border-white/10">
                    {filteredDiscoveries.length} / {discoveries.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Quick Jump Century Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-stone-400 text-[11px] font-mono uppercase tracking-wider shrink-0 flex items-center gap-1 pr-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Era:</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedCentury(null)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap shrink-0 ${
                selectedCentury === null
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              All Centuries
            </button>

            {centuries.map((c) => {
              const countInCentury = discoveries.filter((d) => d.century === c).length;
              const isActive = selectedCentury === c;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    if (selectedCentury === c) {
                      setSelectedCentury(null);
                    } else {
                      handleJumpToCentury(c);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-bold'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{c}</span>
                  <span className="text-[10px] opacity-70 font-mono">({countInCentury})</span>
                </button>
              );
            })}
          </div>

          {/* 3. Field Category Filter Chips + Expand All Toggle */}
          <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs flex-1">
              <button
                type="button"
                onClick={() => setSelectedField(null)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedField === null
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                All Fields
              </button>

              {ALL_FIELDS.map((f) => {
                const cfg = getFieldConfig(f);
                const isActive = selectedField === f;

                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedField(isActive ? null : f)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-xs border ${
                      isActive
                        ? `${cfg.badgeClass} ring-2 ring-sky-400/40 font-bold shadow-sm`
                        : 'bg-white/5 text-stone-300 hover:text-white border-transparent'
                    }`}
                  >
                    <span aria-hidden="true">{cfg.icon}</span>
                    <span>{f}</span>
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse All Toggle */}
            <button
              type="button"
              onClick={() => setExpandAll((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-300 hover:text-white bg-[#0e1322] border border-white/10 shrink-0 transition-colors"
              aria-label="Toggle expand all discovery descriptions"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-sky-400" />
              <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Status Notification */}
      {isFilteringActive && (
        <div className="mb-8 p-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-between gap-3 text-sm text-sky-200">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              Showing {filteredDiscoveries.length} {filteredDiscoveries.length === 1 ? 'discovery' : 'discoveries'}
              {searchQuery && <> matching <strong className="text-white">"{searchQuery}"</strong></>}
              {selectedField && <> in <strong className="text-white">[{selectedField}]</strong></>}
              {selectedCentury && <> from <strong className="text-white">({selectedCentury})</strong></>}
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredDiscoveries.length === 0 && (
        <div className="text-center py-20 px-4 rounded-3xl border border-white/10 bg-[#0e1322]/60 max-w-2xl mx-auto my-12">
          <span className="text-5xl block mb-3" aria-hidden="true">🔬</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
            No scientific discoveries found
          </h3>
          <p className="text-stone-400 text-sm sm:text-base max-w-md mx-auto mb-5 leading-relaxed">
            No breakthroughs match your search. Try typing another term or click a suggested keyword:
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['gravity', 'Einstein', 'DNA', 'vaccine', 'penicillin', 'telescope'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-500/30 text-xs font-mono hover:bg-sky-500/20 transition-colors"
              >
                #{term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Continuous Timeline Chapters */}
      <div className="w-full space-y-16 sm:space-y-20">
        {centuriesPresent.map((century) => {
          const centuryDiscoveries = filteredDiscoveries.filter((d) => d.century === century);

          return (
            <section
              key={century}
              id={`century-section-${century}`}
              className="scroll-mt-48 relative"
              aria-labelledby={`century-heading-${century}`}
            >
              {/* Century Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <Clock className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  <h2
                    id={`century-heading-${century}`}
                    className="text-lg sm:text-xl font-extrabold font-mono text-white tracking-tight"
                  >
                    The {century}
                  </h2>
                  <span className="text-xs text-stone-400 font-mono">
                    ({centuryDiscoveries.length} {centuryDiscoveries.length === 1 ? 'breakthrough' : 'breakthroughs'})
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" aria-hidden="true" />
              </div>

              {/* Continuous Timeline Entries */}
              <div className="relative pl-6 sm:pl-8 md:pl-10 space-y-6 sm:space-y-8">
                {/* Continuous Vertical Side Line */}
                <div
                  className="absolute left-2.5 sm:left-3.5 md:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-sky-500/60 via-teal-500/40 to-white/10"
                  aria-hidden="true"
                />

                {centuryDiscoveries.map((discovery) => {
                  const fieldCfg = getFieldConfig(discovery.field);

                  return (
                    <div key={discovery.id} className="relative group">
                      {/* Node Circle Anchor on the Vertical Line */}
                      <div
                        className="absolute -left-6 sm:-left-8 md:-left-10 top-7 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#080c14] transition-transform duration-200 group-hover:scale-125 z-10"
                        style={{
                          borderColor: fieldCfg.color,
                          boxShadow: `0 0 12px ${fieldCfg.color}80`,
                        }}
                        aria-hidden="true"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mx-auto my-0.5"
                          style={{ backgroundColor: fieldCfg.color }}
                        />
                      </div>

                      {/* Native <details>/<summary> Discovery Card for Searchable Hidden Content */}
                      <details
                        className="vigyan-card group/card rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 bg-[#0c101c]/90 backdrop-blur-md open:bg-[#0f1424] open:border-white/25 open:shadow-xl transition-all duration-200 overflow-hidden"
                        style={{
                          // dynamic subtle accent glow when open
                        }}
                      >
                        <summary className="list-none cursor-pointer select-none p-5 sm:p-6 flex items-start justify-between gap-4 min-h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl sm:rounded-3xl">
                          <div className="flex-1 space-y-2">
                            {/* Meta Tags: Year & Field Badge */}
                            <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-extrabold text-sm bg-white/10 text-white border border-white/15">
                                <Calendar className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                                <span>{discovery.displayYear}</span>
                              </span>

                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs border ${fieldCfg.badgeClass}`}
                              >
                                <span aria-hidden="true">{fieldCfg.icon}</span>
                                <span>{discovery.field}</span>
                              </span>
                            </div>

                            {/* Discovery Name */}
                            <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover/card:text-sky-200 transition-colors leading-snug">
                              {discovery.name}
                            </h3>

                            {/* Primary Figure / Scientist */}
                            <div className="flex items-center gap-2 text-sm sm:text-base text-stone-300 font-medium">
                              <User className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                              <span>{discovery.who}</span>
                            </div>
                          </div>

                          {/* Expand / Collapse Action Indicator */}
                          <div className="flex flex-col items-center justify-center pl-2 pt-1 shrink-0">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 text-stone-400 group-hover/card:bg-white/15 group-hover/card:text-stone-200 group-open/card:rotate-180 group-open/card:bg-white/20 group-open/card:text-white transition-transform duration-200"
                              aria-hidden="true"
                            >
                              <ChevronDown className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-semibold group-open/card:hidden">
                              Explain
                            </span>
                            <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-semibold hidden group-open/card:inline">
                              Hide
                            </span>
                          </div>
                        </summary>

                        {/* Expandable Explanation & Impact Area */}
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-4">
                          {/* Plain-Language 2-3 Sentence Explanation */}
                          <div>
                            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-1.5">
                              How It Works &amp; Why It Matters
                            </h4>
                            <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-normal">
                              {discovery.explanation}
                            </p>
                          </div>

                          {/* Global Impact Callout Block */}
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

                          {/* Tags Row */}
                          {discovery.tags && discovery.tags.length > 0 && (
                            <div className="pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap text-xs text-stone-400">
                              <Tag className="w-3.5 h-3.5 text-stone-500" />
                              {discovery.tags.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 rounded-md bg-white/5 text-stone-400 text-xs hover:text-stone-200 transition-colors"
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
            </section>
          );
        })}
      </div>
    </div>
  );
};
