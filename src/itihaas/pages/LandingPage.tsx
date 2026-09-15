import React from 'react';
import { ERAS } from '../data/eras';
import { EraSelector } from '../components/EraSelector';
import { getAllKeyFigures } from '../data/events';
import { EraId } from '../types';
import { Flame, Sparkles, Clock, Compass, Shield, Users, ArrowRight, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onSelectEra: (eraId: EraId) => void;
  onSelectFigure: (figure: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectEra,
  onSelectFigure,
}) => {
  const allFigures = getAllKeyFigures();
  const featuredFigures = allFigures.slice(0, 14);

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/10 bg-gradient-to-b from-[#0e1220] via-[#0b0e18] to-[#07090f]">
        {/* Ambient Gradient Glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-semibold uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Interactive Historical Chronicles</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Indian History &amp; The{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Freedom Struggle
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Journey across 4,500+ years of civilization from the ancient Indus Valley to the modern space age—anchored by the momentous 90-year march to Indian Independence (1857–1947).
          </p>

          {/* Quick Action CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onSelectEra('freedom-struggle')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
            >
              <Flame className="w-4 h-4" />
              <span>Explore Freedom Struggle (1857–1947)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectEra('ancient')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white font-semibold text-sm border border-white/10 transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Start from Ancient India</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-center">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">5</div>
              <div className="text-xs text-stone-400 mt-0.5">Historical Eras</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">45+</div>
              <div className="text-xs text-stone-400 mt-0.5">Key Milestones</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">60+</div>
              <div className="text-xs text-stone-400 mt-0.5">Cross-Linked Figures</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">100%</div>
              <div className="text-xs text-stone-400 mt-0.5">Interactive Quizzes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section: Era Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chronological Odyssey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Select an Epoch to Explore
            </h2>
          </div>
          <p className="text-sm text-stone-400 max-w-md">
            Each era features an interactive vertical timeline with collapsible event cards, key figures cross-linking, and an end-of-era recap quiz.
          </p>
        </div>

        {/* Era Cards Grid */}
        <EraSelector variant="cards" onSelectEra={onSelectEra} />
      </section>

      {/* Featured Key Figures Section (Cross-Linking Exploration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#0d121f]/90 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400 font-mono mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Historical Personages</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Explore by Key Figures
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Click any leader or revolutionary to view all events they participated in across all historical eras.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {featuredFigures.map((figure) => (
              <button
                key={figure}
                onClick={() => onSelectFigure(figure)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-orange-500/20 text-stone-200 hover:text-orange-200 border border-white/10 hover:border-orange-500/40 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>{figure}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
