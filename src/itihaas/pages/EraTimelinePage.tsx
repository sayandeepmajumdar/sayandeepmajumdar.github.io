import React from 'react';
import { EraInfo, EraId, HistoricalEvent } from '../types';
import { ERAS } from '../data/eras';
import { getEventsByEra, getEventsByFigure } from '../data/events';
import { getQuizByEra } from '../data/quizzes';
import { Timeline } from '../components/Timeline';
import { EraSelector } from '../components/EraSelector';
import { FigureFilterBanner } from '../components/FigureFilterBanner';
import { RecapQuiz } from '../components/RecapQuiz';
import { Clock, ArrowLeft, ArrowRight, Sparkles, BookOpen, Users } from 'lucide-react';

interface EraTimelinePageProps {
  era: EraInfo;
  activeFigureFilter?: string | null;
  onSelectEra: (eraId: EraId) => void;
  onSelectFigure: (figure: string) => void;
  onClearFigureFilter: () => void;
}

export const EraTimelinePage: React.FC<EraTimelinePageProps> = ({
  era,
  activeFigureFilter,
  onSelectEra,
  onSelectFigure,
  onClearFigureFilter,
}) => {
  const allEraEvents = getEventsByEra(era.id);
  const quiz = getQuizByEra(era.id);

  // Figure filtering logic
  const allEventsForFigure = activeFigureFilter ? getEventsByFigure(activeFigureFilter) : [];
  const displayedEvents = activeFigureFilter
    ? allEraEvents.filter((ev) =>
        ev.keyFigures.some(
          (f) => f.toLowerCase() === activeFigureFilter.toLowerCase()
        )
      )
    : allEraEvents;

  // Extract unique key figures in this era for quick chips
  const eraFigures = Array.from(
    new Set(allEraEvents.flatMap((e) => e.keyFigures))
  );

  // Find previous and next eras for footer navigation
  const currentIndex = ERAS.findIndex((e) => e.id === era.id);
  const prevEra = currentIndex > 0 ? ERAS[currentIndex - 1] : null;
  const nextEra = currentIndex < ERAS.length - 1 ? ERAS[currentIndex + 1] : null;

  return (
    <div className="w-full pb-20">
      {/* Top Breadcrumb & Smooth Era Switcher Tabs */}
      <div className="border-b border-white/10 bg-[#0c0f18]/80 backdrop-blur-md sticky top-16 sm:top-20 z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EraSelector
            activeEraId={era.id}
            variant="tabs"
            onSelectEra={onSelectEra}
          />
        </div>
      </div>

      {/* Era Hero Header */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#111526] to-[#0a0d16]">
        {/* Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ backgroundColor: era.accentColor }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl sm:text-4xl" aria-hidden="true">
              {era.icon}
            </span>
            <span
              className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full border font-mono"
              style={{
                backgroundColor: `${era.accentColor}20`,
                color: era.accentColor,
                borderColor: `${era.accentColor}40`,
              }}
            >
              {era.hindiName}
            </span>
            <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{era.period}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            {era.name}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
            {era.fullDescription}
          </p>

          {/* Quick Key Figures Bar in this Era */}
          {eraFigures.length > 0 && !activeFigureFilter && (
            <div className="pt-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-400 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>Key Figures in this Era:</span>
              </span>
              {eraFigures.slice(0, 10).map((fig) => (
                <button
                  key={fig}
                  onClick={() => onSelectFigure(fig)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
                >
                  {fig}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area: Figure Banner + Timeline + Recap Quiz */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Active Figure Filter Alert */}
        {activeFigureFilter && (
          <FigureFilterBanner
            figure={activeFigureFilter}
            currentEraId={era.id}
            matchingEventsInCurrentEra={displayedEvents}
            allMatchingEventsAcrossEras={allEventsForFigure}
            onClearFilter={onClearFigureFilter}
            onNavigateToEra={onSelectEra}
          />
        )}

        {/* The Vertical Timeline */}
        <Timeline
          events={displayedEvents}
          eraName={era.name}
          accentColor={era.accentColor}
          activeFigureFilter={activeFigureFilter}
          onSelectFigure={onSelectFigure}
        />

        {/* End of Era Recap Quiz */}
        {quiz && (
          <RecapQuiz
            quiz={quiz}
            eraName={era.name}
            accentColor={era.accentColor}
            onNavigateToNextEra={onSelectEra}
          />
        )}

        {/* Previous / Next Era Jump Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          {prevEra ? (
            <button
              onClick={() => onSelectEra(prevEra.id)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group text-left"
            >
              <ArrowLeft className="w-5 h-5 text-stone-400 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[11px] text-stone-400 uppercase font-mono block">
                  Previous Era
                </span>
                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {prevEra.name}
                </span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextEra && (
            <button
              onClick={() => onSelectEra(nextEra.id)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group text-right ml-auto"
            >
              <div>
                <span className="text-[11px] text-stone-400 uppercase font-mono block">
                  Next Era
                </span>
                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {nextEra.name}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
