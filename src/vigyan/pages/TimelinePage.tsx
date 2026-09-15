import React, { useState, useMemo } from 'react';
import { DISCOVERIES, getCenturyList } from '../data/discoveries';
import { ScientificField } from '../types';
import { SearchBar } from '../components/SearchBar';
import { CenturyPills } from '../components/CenturyPills';
import { FieldFilterBar } from '../components/FieldFilterBar';
import { ContinuousTimeline } from '../components/ContinuousTimeline';
import { Sparkles, ChevronsUpDown, RotateCcw } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<ScientificField | null>(null);
  const [selectedCentury, setSelectedCentury] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const centuries = useMemo(() => getCenturyList(), []);

  // Filter discoveries live by search query, selected field, and century (if filtered)
  const filteredDiscoveries = useMemo(() => {
    return DISCOVERIES.filter((d) => {
      // 1. Search Query match (discovery name or scientist name or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = d.name.toLowerCase().includes(query);
        const matchesWho = d.who.toLowerCase().includes(query);
        const matchesExplanation = d.explanation.toLowerCase().includes(query);
        const matchesTags = d.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesWho && !matchesExplanation && !matchesTags) {
          return false;
        }
      }

      // 2. Field match
      if (selectedField && d.field !== selectedField) {
        return false;
      }

      // 3. Century match (only if explicitly set by pill filter)
      if (selectedCentury && d.century !== selectedCentury) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedField, selectedCentury]);

  // Smooth scroll directly to the century section in the continuous timeline
  const handleJumpToCentury = (century: string) => {
    // If the century was previously filtered out, reset century filter so it's visible
    if (selectedCentury) {
      setSelectedCentury(null);
    }

    // Smoothly scroll to the century element
    const element = document.getElementById(`century-section-${century}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShowAll = () => {
    setSelectedCentury(null);
    setSelectedField(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFilteringActive = Boolean(searchQuery || selectedField || selectedCentury);

  return (
    <div className="w-full pb-24">
      {/* Hero Intro Header (Clear, warm, accessible for ages 10 to 60) */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#0c101c] via-[#080c16] to-[#06080e]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] rounded-full blur-[130px] pointer-events-none opacity-20 bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span>Discoveries That Changed Everything</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Science &amp; Discoveries{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              Timeline
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            From the realization that Earth orbits the Sun to penicillin, DNA, and gravitational waves—explore the giant leaps in human curiosity on one easy-to-read, continuous timeline.
          </p>
        </div>
      </section>

      {/* Pinned Sticky Control Bar: Search + Jump Pills + Field Filter */}
      <div className="sticky top-16 sm:top-20 z-30 border-b border-white/10 bg-[#080c14]/95 backdrop-blur-xl py-4 shadow-lg shadow-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          {/* 1. Live Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredDiscoveries.length}
            totalCount={DISCOVERIES.length}
          />

          {/* 2. Quick Jump Century Pills */}
          <CenturyPills
            centuries={centuries}
            activeCentury={selectedCentury}
            onJumpToCentury={handleJumpToCentury}
            onShowAll={() => setSelectedCentury(null)}
          />

          {/* 3. Field Category Filter Chips */}
          <div className="pt-1 flex items-center justify-between gap-3">
            <FieldFilterBar
              selectedField={selectedField}
              onSelectField={setSelectedField}
            />

            {/* Expand / Collapse All Toggle */}
            <button
              type="button"
              onClick={() => setExpandAll(!expandAll)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-300 hover:text-white bg-[#0e1322] border border-white/10 shrink-0 transition-colors"
              aria-label={expandAll ? 'Collapse all explanations' : 'Expand all explanations'}
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-sky-400" />
              <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Continuous Timeline Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Active Filter Notice if filters are active */}
        {isFilteringActive && (
          <div className="mb-8 p-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-between gap-3 text-sm text-sky-200">
            <span>
              Filtering by:{' '}
              {searchQuery && <strong className="text-white">"{searchQuery}" </strong>}
              {selectedField && <strong className="text-white">[{selectedField}] </strong>}
              {selectedCentury && <strong className="text-white">({selectedCentury}) </strong>}
            </span>
            <button
              type="button"
              onClick={handleShowAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* The Continuous Timeline View */}
        <ContinuousTimeline
          discoveries={filteredDiscoveries}
          expandAll={expandAll}
        />
      </main>
    </div>
  );
};
