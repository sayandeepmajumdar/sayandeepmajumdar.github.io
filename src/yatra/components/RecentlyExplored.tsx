import React from 'react';
import { History, XCircle, MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';
import { useSaved } from '../context/SavedContext';
import { DESTINATIONS } from '../data/destinations';

interface RecentlyExploredProps {
  onSelectDestination: (dest: Destination) => void;
}

export const RecentlyExplored: React.FC<RecentlyExploredProps> = ({
  onSelectDestination,
}) => {
  const { recentIds, clearRecent } = useSaved();

  const recentDestinations = recentIds
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  if (recentDestinations.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-500" />
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Recently Explored
          </h3>
        </div>
        <button
          onClick={clearRecent}
          className="text-xs text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {recentDestinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="flex-shrink-0 snap-start flex items-center gap-3 p-2.5 pr-4 rounded-2xl glass-card border border-white/5 hover:border-amber-500/30 cursor-pointer transition-all active:scale-95 group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-800 flex-shrink-0">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                {dest.name}
              </div>
              <div className="text-xs text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-500" />
                <span>{dest.state}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all ml-2" />
          </div>
        ))}
      </div>
    </section>
  );
};
