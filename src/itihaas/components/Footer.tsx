import React from 'react';
import { ERAS } from '../data/eras';
import { ArrowUpRight, Heart, ShieldCheck, BookOpen, Landmark } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#07090e] text-stone-300 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-2xl font-black font-display tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                ITIHAAS
              </span>
              <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                इतिहास
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              An interactive historical chronicle celebrating the multi-millennial civilization of India and the heroic 90-year Freedom Struggle (1857–1947). Built with structured timeline data, cross-era figure tracking, and educational recap quizzes.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-2">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Screen-reader accessible
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Historically referenced
              </span>
            </div>
          </div>

          {/* Historical Eras */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-4">
              Historical Eras
            </h3>
            <ul className="space-y-2 text-sm">
              {ERAS.map((era) => (
                <li key={era.id}>
                  <button
                    onClick={() => onNavigate(`/${era.slug}`)}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-100 transition-colors group text-left"
                  >
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: era.accentColor }}
                      aria-hidden="true"
                    />
                    <span>{era.name}</span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      ({era.milestoneCount})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio & Connected Explorations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-4">
              Portfolio &amp; Projects
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Sayandeep Majumdar Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/rasoi/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Rasoi — Regional Indian Recipes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/yatra/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Yatra — Interactive Travel Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/tools/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Developer Toolbox (70+ Tools)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/games/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Browser Games Hub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} Itihaas · Curated &amp; engineered by{' '}
            <a
              href="/"
              className="text-stone-300 hover:text-amber-400 underline underline-offset-2"
            >
              Sayandeep Majumdar
            </a>
          </p>
          <p className="flex items-center gap-1">
            <span>Crafted with devotion to India’s heritage &amp; freedom fighters</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
