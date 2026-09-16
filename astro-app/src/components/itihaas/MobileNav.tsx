import React, { useState } from 'react';
import { Menu, X, Compass, ArrowUpRight } from 'lucide-react';
import { ERAS } from '../../data/itihaas/eras';
import type { EraId } from '../../types/itihaas';

interface MobileNavProps {
  currentPath: string;
  activeEraId?: EraId;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, activeEraId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-20 border-t border-white/10 bg-[#0a0d14]/95 backdrop-blur-2xl p-4 space-y-2 animate-fade-in shadow-2xl z-50">
          <a
            href="/itihaas/"
            onClick={() => setIsOpen(false)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentPath === '/itihaas/' || currentPath === '/itihaas'
                ? 'bg-amber-500/20 text-white font-semibold border border-amber-500/30'
                : 'text-stone-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>All Eras Overview</span>
            </div>
            <span className="text-xs text-stone-400">5 Eras</span>
          </a>

          <div className="pt-2 pb-1 text-[11px] uppercase tracking-wider font-semibold text-stone-400 px-3">
            Historical Eras
          </div>

          {ERAS.map((era) => {
            const isEraActive = activeEraId === era.id;
            return (
              <a
                key={era.id}
                href={`/itihaas/${era.slug}/`}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isEraActive
                    ? 'bg-white/15 text-white font-semibold border border-white/20'
                    : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{era.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-200">{era.name}</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          backgroundColor: `${era.accentColor}20`,
                          color: era.accentColor,
                        }}
                      >
                        {era.hindiName}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">{era.period}</p>
                  </div>
                </div>
                <span className="text-xs text-stone-400">{era.milestoneCount} events</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2">
            <a
              href="/"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 py-1"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/rasoi/"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 py-1"
            >
              <span>Rasoi 🍛</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/yatra/"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 py-1"
            >
              <span>Yatra ✈️</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
