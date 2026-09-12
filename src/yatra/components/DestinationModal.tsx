import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Compass,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Destination } from '../types';
import { useSaved } from '../context/SavedContext';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination?: (dest: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  const { isSaved, toggleSave } = useSaved();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!destination) return null;

  const saved = isSaved(destination.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} — Yatra India`,
        text: `Discover ${destination.name}, ${destination.state}: ${destination.description}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Destination link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel shadow-2xl border border-white/15 text-stone-100 z-10 scrollbar-none"
          >
            {/* Header Hero Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-black/40 to-transparent" />

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  title="Share Destination"
                  className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSave(destination.id)}
                  title={saved ? 'Remove from Saved' : 'Save to Bucket List'}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                    saved
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  title="Close Modal"
                  className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950">
                    {destination.region} Region
                  </span>
                  {destination.categories.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-md"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                  {destination.name}
                </h2>
                <p className="text-sm text-stone-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{destination.state}, India</span>
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Info Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-stone-400 block">Best Season</span>
                    <strong className="text-white">{destination.bestTime}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <div>
                    <span className="text-stone-400 block">Duration</span>
                    <strong className="text-white">{destination.idealDuration}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Compass className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-stone-400 block">Travel Style</span>
                    <strong className="text-white">
                      {destination.travelStyle.slice(0, 2).join(', ')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-lg font-bold font-display text-amber-400 mb-2">
                  About {destination.name}
                </h4>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-lg font-bold font-display text-amber-400 mb-3">
                  Must-Experience Highlights
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-stone-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Itinerary Framework */}
              <div className="pt-2">
                <h4 className="text-lg font-bold font-display text-amber-400 mb-3">
                  Curated {destination.idealDuration} Itinerary
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                        1
                      </span>
                      <span>Day 1: Arrival, Local Atmosphere & Iconic Landmarks</span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1.5 ml-8 leading-relaxed">
                      Settle in and explore {destination.highlights[0] || 'the vibrant central town'}. Take evening walks to sample local specialties and soak in the culture.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                        2
                      </span>
                      <span>Day 2: Deep Exploration & Signature Experiences</span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1.5 ml-8 leading-relaxed">
                      Dedicate the full day to {destination.highlights[1] || 'natural and architectural wonders'}, followed by {destination.highlights[2] || 'scenic sunset viewpoints'}.
                    </p>
                  </div>
                  {destination.highlights[3] && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="font-semibold text-sm text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                          3
                        </span>
                        <span>Day 3: Nearby Excursions & Souvenir Trails</span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1.5 ml-8 leading-relaxed">
                        Journey to {destination.nearbyPlaces[0] || 'nearby attractions'} and discover {destination.highlights[3]}.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags & Styles */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs bg-stone-800 text-stone-300 border border-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
