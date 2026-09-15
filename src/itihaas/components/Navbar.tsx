import React, { useState } from 'react';
import { Compass, BookOpen, Menu, X, ArrowUpRight, Flame, Landmark, Clock, ArrowLeft } from 'lucide-react';
import { ERAS } from '../data/eras';
import { EraId } from '../types';

interface NavbarProps {
  currentPath: string;
  activeEraId?: EraId;
  activeFigureFilter?: string | null;
  onNavigate: (path: string) => void;
  onClearFigureFilter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  activeEraId,
  activeFigureFilter,
  onNavigate,
  onClearFigureFilter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0d14]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo Branding */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
          aria-label="Itihaas Home — Chronicles of Indian History"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 p-[1px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl bg-[#0e1320] flex items-center justify-center">
              <span className="text-xl">🇮🇳</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-display tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                ITIHAAS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                इतिहास
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Chronicles of India &amp; Freedom Struggle
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Era Navigation">
          <button
            onClick={() => handleNavClick('/')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPath === '/'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Eras Overview</span>
          </button>

          {ERAS.map((era) => {
            const isEraActive = activeEraId === era.id && currentPath !== '/';
            return (
              <button
                key={era.id}
                onClick={() => handleNavClick(`/${era.slug}`)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isEraActive
                    ? 'bg-white/15 text-white border border-white/20 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
                style={isEraActive ? { borderColor: era.accentColor } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: era.accentColor }}
                  aria-hidden="true"
                />
                <span>{era.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Active Filter Pill or Back to Other Sections */}
        <div className="hidden sm:flex items-center gap-3">
          {activeFigureFilter && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs animate-fade-in">
              <span>Figure: <strong>{activeFigureFilter}</strong></span>
              {onClearFigureFilter && (
                <button
                  onClick={onClearFigureFilter}
                  className="hover:text-white p-0.5 rounded-full hover:bg-orange-500/30"
                  title="Clear figure filter"
                  aria-label="Clear figure filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <a
            href="/"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 border border-white/5 hover:border-white/20 transition-colors"
            title="Return to Sayandeep Majumdar Homepage"
          >
            <ArrowLeft className="w-3 h-3 text-stone-500" />
            <span>Portfolio</span>
          </a>

          <a
            href="/rasoi/"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 border border-white/5 hover:border-white/20 transition-colors"
          >
            <span>Rasoi</span>
            <ArrowUpRight className="w-3 h-3 text-stone-500" />
          </a>

          <a
            href="/yatra/"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 border border-white/5 hover:border-white/20 transition-colors"
          >
            <span>Yatra</span>
            <ArrowUpRight className="w-3 h-3 text-stone-500" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {activeFigureFilter && (
            <span className="px-2 py-0.5 text-[11px] rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 truncate max-w-[120px]">
              {activeFigureFilter}
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0a0d14]/95 backdrop-blur-2xl p-4 space-y-2 animate-fade-in">
          <button
            onClick={() => handleNavClick('/')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentPath === '/'
                ? 'bg-amber-500/20 text-white font-semibold border border-amber-500/30'
                : 'text-stone-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>All Eras Overview</span>
            </div>
            <span className="text-xs text-stone-400">5 Eras</span>
          </button>

          <div className="pt-2 pb-1 text-[11px] uppercase tracking-wider font-semibold text-stone-400 px-3">
            Historical Eras
          </div>

          {ERAS.map((era) => {
            const isEraActive = activeEraId === era.id && currentPath !== '/';
            return (
              <button
                key={era.id}
                onClick={() => handleNavClick(`/${era.slug}`)}
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
                        className="text-[10px] px-1.5 py-0.2 rounded font-mono"
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
              </button>
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
    </header>
  );
};
