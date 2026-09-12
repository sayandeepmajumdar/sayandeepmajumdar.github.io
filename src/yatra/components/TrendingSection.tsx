import React from 'react';
import { Sparkles, MapPin, Heart, PlaneTakeoff } from 'lucide-react';
import { Destination } from '../types';
import { useSaved } from '../context/SavedContext';

interface TrendingSectionProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const { isSaved, toggleSave } = useSaved();

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Picks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Trending Across India
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.slice(0, 8).map((dest) => {
          const saved = isSaved(dest.id);
          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group cursor-pointer rounded-2xl glass-card overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 active:scale-[0.99] flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full overflow-hidden bg-stone-800">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/90 text-stone-950 backdrop-blur-md">
                    {dest.categories[0]}
                  </span>
                </div>

                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(dest.id);
                  }}
                  title={saved ? 'Remove from Saved' : 'Save to Bucket List'}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                    saved
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                </button>

                {/* State Name */}
                <div className="absolute bottom-3 left-3 text-xs text-stone-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dest.state}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                  <span>{dest.bestTime}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <PlaneTakeoff className="w-3.5 h-3.5" />
                    <span>Fly on Map</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
