import React from 'react';
import { Users, X, ArrowRight } from 'lucide-react';
import { HistoricalEvent, EraId } from '../types';
import { ERAS } from '../data/eras';

interface FigureFilterBannerProps {
  figure: string;
  currentEraId?: EraId;
  matchingEventsInCurrentEra: HistoricalEvent[];
  allMatchingEventsAcrossEras: HistoricalEvent[];
  onClearFilter: () => void;
  onNavigateToEra: (eraId: EraId) => void;
}

export const FigureFilterBanner: React.FC<FigureFilterBannerProps> = ({
  figure,
  currentEraId,
  matchingEventsInCurrentEra,
  allMatchingEventsAcrossEras,
  onClearFilter,
  onNavigateToEra,
}) => {
  // Find other eras where this figure appears
  const otherErasWithFigure = ERAS.filter((era) => {
    if (era.id === currentEraId) return false;
    return allMatchingEventsAcrossEras.some((e) => e.era === era.id);
  });

  return (
    <section
      aria-label="Active Key Figure Filter"
      className="rounded-2xl p-4 sm:p-5 border border-orange-500/40 bg-gradient-to-r from-orange-500/15 via-[#141926] to-[#0e1320] shadow-lg shadow-orange-500/10 mb-8 animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-bold tracking-wider text-orange-400">
                Figure Filter Active
              </span>
              <span className="text-xs text-stone-400">
                ({matchingEventsInCurrentEra.length} in this era, {allMatchingEventsAcrossEras.length} total)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Chronicles featuring <span className="text-amber-300">{figure}</span>
            </h2>
          </div>
        </div>

        <button
          onClick={onClearFilter}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-semibold border border-white/15 transition-all self-start sm:self-auto"
        >
          <X className="w-4 h-4" />
          <span>Clear Filter</span>
        </button>
      </div>

      {/* Cross-Era Presence Links */}
      {otherErasWithFigure.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 flex-wrap text-xs text-stone-300">
          <span className="text-stone-400">Also appears in other eras:</span>
          {otherErasWithFigure.map((era) => {
            const count = allMatchingEventsAcrossEras.filter((e) => e.era === era.id).length;
            return (
              <button
                key={era.id}
                onClick={() => onNavigateToEra(era.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/15 transition-colors border"
                style={{
                  borderColor: `${era.accentColor}50`,
                  color: era.accentColor,
                }}
              >
                <span>{era.name}</span>
                <span className="text-[10px] font-mono opacity-80">({count})</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
