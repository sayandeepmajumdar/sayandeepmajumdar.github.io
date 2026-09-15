import React from 'react';
import { ERAS } from '../data/eras';
import { EraId } from '../types';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface EraSelectorProps {
  activeEraId?: EraId;
  variant?: 'cards' | 'tabs';
  onSelectEra: (eraId: EraId) => void;
}

export const EraSelector: React.FC<EraSelectorProps> = ({
  activeEraId,
  variant = 'cards',
  onSelectEra,
}) => {
  if (variant === 'tabs') {
    return (
      <nav
        className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1"
        aria-label="Select Historical Era"
      >
        {ERAS.map((era) => {
          const isSelected = activeEraId === era.id;
          return (
            <button
              key={era.id}
              onClick={() => onSelectEra(era.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap select-none shrink-0 ${
                isSelected
                  ? 'bg-white/15 text-white shadow-lg border'
                  : 'bg-white/5 text-stone-400 hover:text-stone-200 hover:bg-white/10 border border-transparent'
              }`}
              style={
                isSelected
                  ? {
                      borderColor: era.accentColor,
                      boxShadow: `0 0 20px -5px ${era.accentColor}50`,
                    }
                  : {}
              }
              aria-current={isSelected ? 'page' : undefined}
            >
              <span className="text-base" aria-hidden="true">
                {era.icon}
              </span>
              <span className="font-bold">{era.name}</span>
              <span
                className="text-[11px] font-mono px-1.5 py-0.5 rounded-md"
                style={{
                  backgroundColor: `${era.accentColor}25`,
                  color: era.accentColor,
                }}
              >
                {era.period}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Cards layout for Landing Page
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {ERAS.map((era) => {
        const isFeatured = era.id === 'freedom-struggle';
        return (
          <div
            key={era.id}
            onClick={() => onSelectEra(era.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectEra(era.id)}
            className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer overflow-hidden border bg-[#101420]/80 hover:bg-[#141a2a] flex flex-col justify-between ${
              isFeatured
                ? 'md:col-span-2 lg:col-span-2 border-orange-500/40 hover:border-orange-400 shadow-xl shadow-orange-500/10'
                : 'border-white/10 hover:border-white/25'
            }`}
            style={{
              borderColor: undefined,
            }}
          >
            {/* Ambient Background Accent Glow */}
            <div
              className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity"
              style={{ backgroundColor: era.accentColor }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl" aria-hidden="true">
                    {era.icon}
                  </span>
                  <span
                    className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border font-mono"
                    style={{
                      backgroundColor: `${era.accentColor}18`,
                      color: era.accentColor,
                      borderColor: `${era.accentColor}40`,
                    }}
                  >
                    {era.hindiName}
                  </span>
                </div>

                {isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Featured Epoch (1857–1947)
                  </span>
                )}
              </div>

              {/* Title & Dates */}
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                {era.name}
              </h2>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-400 font-mono mb-4">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>{era.period}</span>
                <span className="text-stone-600">•</span>
                <span style={{ color: era.accentColor }}>{era.milestoneCount} Milestones</span>
              </div>

              {/* Description */}
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                {era.shortDescription}
              </p>
            </div>

            {/* Action CTA Row */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
              <span
                className="text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-200"
                style={{ color: era.accentColor }}
              >
                <span>Explore Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </span>

              <span className="text-xs text-stone-400">
                End-of-Era Quiz included
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
