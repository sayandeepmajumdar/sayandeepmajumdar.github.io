import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Destination } from '../types';
import { useSaved } from '../context/SavedContext';

interface DestinationPanelProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: (destination: Destination) => void;
  onSelectNearby?: (destinationName: string) => void;
}

export const DestinationPanel: React.FC<DestinationPanelProps> = ({
  destination,
  isOpen,
  onClose,
  onOpenModal,
  onSelectNearby,
}) => {
  const { isSaved, toggleSave } = useSaved();

  if (!destination) return null;

  const saved = isSaved(destination.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl rounded-3xl glass-panel shadow-2xl border border-white/15 overflow-hidden backdrop-blur-2xl"
        >
          {/* Header Image with Gradient */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-900">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-black/40 to-transparent" />

            {/* Top Close & Save Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => toggleSave(destination.id)}
                title={saved ? 'Remove from Saved' : 'Save to Bucket List'}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                  saved
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                title="Close"
                className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Title & Badges Overlay */}
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950">
                  {destination.region} India
                </span>
                {destination.categories.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-md"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
                {destination.name}
              </h3>
              <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{destination.state}</span>
              </p>
            </div>
          </div>

          {/* Panel Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                    Best Season
                  </div>
                  <div className="text-xs font-medium text-white">
                    {destination.bestTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                    Ideal Stay
                  </div>
                  <div className="text-xs font-medium text-white">
                    {destination.idealDuration}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-sm leading-relaxed">
              {destination.description}
            </p>

            {/* Top Highlights */}
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Highlights</span>
              </div>
              <ul className="space-y-1.5">
                {destination.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-stone-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Places */}
            {destination.nearbyPlaces.length > 0 && (
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs font-semibold text-stone-400 mb-2">
                  Nearby Excursions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {destination.nearbyPlaces.map((np) => (
                    <button
                      key={np}
                      onClick={() => onSelectNearby?.(np)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition-colors border border-white/5"
                    >
                      {np}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions CTA */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onOpenModal(destination)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Read Full Itinerary & Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
