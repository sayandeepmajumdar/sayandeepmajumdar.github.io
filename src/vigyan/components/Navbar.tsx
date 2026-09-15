import React from 'react';
import { ArrowLeft, ArrowUpRight, Atom, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  onReset?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080c14]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo Branding */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onReset && onReset()}
          aria-label="Vigyan Science Timeline Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 p-[1px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl bg-[#0b101c] flex items-center justify-center">
              <span className="text-xl">🔬</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-display tracking-wider bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                VIGYAN
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                विज्ञान
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Science &amp; Discoveries Timeline
            </p>
          </div>
        </div>

        {/* Backlinks to Portfolio and Apps */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-stone-400" />
            <span>Portfolio</span>
          </a>

          <a
            href="/itihaas/"
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
          >
            <span>Itihaas 🇮🇳</span>
            <ArrowUpRight className="w-3 h-3 text-stone-500" />
          </a>

          <a
            href="/tools/"
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
          >
            <span>Toolzy</span>
            <ArrowUpRight className="w-3 h-3 text-stone-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
