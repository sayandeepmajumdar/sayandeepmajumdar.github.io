import React, { useState, useEffect } from 'react';
import {
  Heart,
  MapPin,
  PlaneTakeoff,
  Trash2,
  BookOpen,
  Compass,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { DESTINATIONS } from '../../../data/yatra/destinations';
import type { Destination } from '../../../types/yatra';
import { getSavedIds, toggleSavedId } from '../../../utils/yatraSaved';
import { DestinationModal } from './DestinationModal';

export const SavedDestinations: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [modalDestination, setModalDestination] = useState<Destination | null>(null);

  useEffect(() => {
    setSavedIds(getSavedIds());
    const handleStorage = () => setSavedIds(getSavedIds());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleRemove = (id: string) => {
    const updated = toggleSavedId(id);
    setSavedIds(updated);
  };

  const savedDestinations = savedIds
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Personalized Journey</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            Your India Bucket List
          </h1>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            {savedDestinations.length} destination
            {savedDestinations.length === 1 ? '' : 's'} saved to your local exploration list.
          </p>
        </div>
      </div>

      {savedDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-3xl glass-card overflow-hidden border border-white/10 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-800">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950">
                    {dest.region}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md">
                    {dest.categories[0]}
                  </span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(dest.id)}
                  title="Remove from Bucket List"
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white transition-all active:scale-90 shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Title */}
                <div className="absolute bottom-3 left-4 right-4">
                  <a
                    href={`/yatra/destination/${dest.id}/`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    <h3 className="text-xl font-bold font-display text-white">
                      {dest.name}
                    </h3>
                  </a>
                  <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{dest.state}</span>
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                  {dest.description}
                </p>

                <div className="text-xs space-y-1 text-stone-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>
                      <span className="text-stone-500">Best Season:</span> {dest.bestTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>
                      <span className="text-stone-500">Duration:</span> {dest.idealDuration}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`/yatra/?dest=${dest.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 text-decoration-none"
                  >
                    <PlaneTakeoff className="w-3.5 h-3.5" />
                    <span>Fly on Map</span>
                  </a>
                  <button
                    onClick={() => setModalDestination(dest)}
                    title="Quick Guide Preview"
                    className="p-2.5 rounded-xl glass-panel text-stone-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <a
                    href={`/yatra/destination/${dest.id}/`}
                    title="Open Dedicated Destination Page"
                    className="p-2.5 rounded-xl glass-panel text-stone-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-16 sm:p-20 text-center rounded-3xl glass-panel border border-white/10 space-y-4 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto mb-2 text-2xl">
            ✈️
          </div>
          <h3 className="text-2xl font-bold font-display text-white">
            Your Bucket List is Empty
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            As you browse India's royal citadels, misty hill retreats, and tropical coasts, click the heart icon on any destination to save it for your next adventure.
          </p>
          <a
            href="/yatra/explore/"
            className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm shadow-xl shadow-orange-500/20 transition-all inline-flex items-center gap-2 active:scale-95 text-decoration-none"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Destinations</span>
          </a>
        </div>
      )}

      {/* Editorial Modal */}
      <DestinationModal
        destination={modalDestination}
        isOpen={Boolean(modalDestination)}
        onClose={() => setModalDestination(null)}
      />
    </div>
  );
};
