import React from 'react';
import { Discovery } from '../types';
import { DiscoveryCard } from './DiscoveryCard';
import { getFieldConfig } from '../data/fields';
import { Clock, Sparkles } from 'lucide-react';

interface ContinuousTimelineProps {
  discoveries: Discovery[];
  expandAll?: boolean;
}

export const ContinuousTimeline: React.FC<ContinuousTimelineProps> = ({
  discoveries,
  expandAll = false,
}) => {
  // Group discoveries by century for clear visual chapters while keeping the continuous timeline
  const centuriesPresent = Array.from(
    new Set(discoveries.map((d) => d.century))
  ).sort();

  if (discoveries.length === 0) {
    return (
      <div className="text-center py-20 px-4 rounded-3xl border border-white/10 bg-[#0e1322]/50">
        <span className="text-5xl block mb-3" aria-hidden="true">
          🔍
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
          No discoveries found
        </h3>
        <p className="text-stone-400 text-sm sm:text-base max-w-md mx-auto">
          Try typing a different keyword like <strong className="text-sky-300">gravity</strong>, <strong className="text-sky-300">Einstein</strong>, <strong className="text-sky-300">DNA</strong>, or <strong className="text-sky-300">vaccine</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 sm:space-y-20">
      {centuriesPresent.map((century) => {
        const centuryDiscoveries = discoveries.filter(
          (d) => d.century === century
        );

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

                    {/* Discovery Card */}
                    <DiscoveryCard
                      discovery={discovery}
                      isAutoExpanded={expandAll}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
