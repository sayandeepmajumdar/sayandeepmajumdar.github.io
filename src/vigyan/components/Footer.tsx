import React from 'react';
import { ArrowUpRight, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#06080e] text-stone-300 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🔬</span>
              <span className="text-2xl font-black font-display tracking-wider bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                VIGYAN
              </span>
              <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                विज्ञान
              </span>
            </div>
            <p className="text-stone-400 text-sm max-w-lg leading-relaxed">
              A single, continuous chronicle of scientific breakthroughs that reshaped human understanding. Written in clear, accessible language for inquiring minds aged 10 to 60.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Screen-reader accessible
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Jargon-free explanations
              </span>
            </div>
          </div>

          {/* Connected Projects */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              Explore More Sections
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/itihaas/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Itihaas — Indian History &amp; Freedom</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/tools/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Toolzy — 70+ Developer Tools</span>
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
                  href="/games/"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <span>Games — Arcade &amp; Puzzles</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Vigyan · Created by{' '}
            <a
              href="/"
              className="text-stone-300 hover:text-sky-300 underline underline-offset-2"
            >
              Sayandeep Majumdar
            </a>
          </p>
          <p className="flex items-center gap-1">
            <span>Dedicated to human curiosity and scientific exploration</span>
            <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
