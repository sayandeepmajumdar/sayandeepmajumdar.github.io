import React from 'react';
import { Compass, Heart } from 'lucide-react';
import { Region } from '../types';

interface FooterProps {
  onSelectRegion?: (region: Region) => void;
  onNavigate: (path: string) => void;
}

const REGIONS: Region[] = [
  'North',
  'South',
  'East',
  'West',
  'Central',
  'Northeast',
  'Islands',
];

export const Footer: React.FC<FooterProps> = ({ onSelectRegion, onNavigate }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080b12] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-display tracking-wider bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              YATRA
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              India
            </span>
          </div>
          <p className="text-sm text-stone-400 max-w-md leading-relaxed">
            An interactive exploration of India's ancient civilization, majestic Himalayas, tranquil backwaters, royal desert citadels, and lush rainforests.
          </p>
          <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-2">
            <span>Built 100% client-side with React 19 & Framer Motion</span>
          </div>
        </div>

        {/* Regions Column */}
        <div>
          <h5 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">
            Explore By Region
          </h5>
          <ul className="space-y-1.5 text-xs">
            {REGIONS.map((region) => (
              <li key={region}>
                <button
                  onClick={() => onSelectRegion?.(region)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {region} India
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Column */}
        <div>
          <h5 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">
            Navigation
          </h5>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => onNavigate('/')}
                className="hover:text-amber-400 transition-colors"
              >
                Interactive Map Discovery
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/explore')}
                className="hover:text-amber-400 transition-colors"
              >
                Destination Matrix
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/saved')}
                className="hover:text-amber-400 transition-colors"
              >
                Saved Bucket List
              </button>
            </li>
            <li>
              <a href="/rasoi/" className="hover:text-amber-400 transition-colors">
                Rasoi — Authentic Indian Recipes
              </a>
            </li>
            <li>
              <a href="/tools/" className="hover:text-amber-400 transition-colors">
                Developer Toolbox
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          © {new Date().getFullYear()} Yatra • Sayandeep Majumdar. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-current inline" />
          <span>for curious travelers</span>
        </div>
      </div>
    </footer>
  );
};
