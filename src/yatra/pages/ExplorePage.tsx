import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Heart,
  PlaneTakeoff,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination, Region } from '../types';
import { useSaved } from '../context/SavedContext';
import { DestinationModal } from '../components/DestinationModal';

interface ExplorePageProps {
  onTravelToDestination: (dest: Destination) => void;
  initialTravelStyle?: string;
}

const REGIONS: (Region | 'All')[] = [
  'All',
  'North',
  'South',
  'East',
  'West',
  'Central',
  'Northeast',
  'Islands',
];

const CATEGORIES = [
  'All',
  'Mountain',
  'Beach',
  'Heritage',
  'Spiritual',
  'Adventure',
  'Wildlife',
  'Food',
  'Romantic',
];

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onTravelToDestination,
  initialTravelStyle,
}) => {
  const { isSaved, toggleSave } = useSaved();

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalDestination, setModalDestination] = useState<Destination | null>(null);

  // Initialize with passed travel style if available
  React.useEffect(() => {
    if (initialTravelStyle) {
      setSearchQuery(initialTravelStyle);
    }
  }, [initialTravelStyle]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      // Region match
      if (selectedRegion !== 'All' && d.region !== selectedRegion) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'All') {
        const hasCategory = d.categories.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasCategory) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesState = d.state.toLowerCase().includes(q);
        const matchesCity = d.city && d.city.toLowerCase().includes(q);
        const matchesTag = d.tags.some((t) => t.toLowerCase().includes(q));
        const matchesStyle = d.travelStyle.some((s) => s.toLowerCase().includes(q));
        const matchesCat = d.categories.some((c) => c.toLowerCase().includes(q));

        if (!matchesName && !matchesState && !matchesCity && !matchesTag && !matchesStyle && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedRegion('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
          Discovery Matrix
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Explore All Destinations
        </h1>
        <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
          Filter through 100+ authentic destinations by region, travel mood, and landscape. Click "Fly on Map" to initiate the real-time flight animation.
        </p>
      </div>

      {/* Filter Control Box */}
      <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by destination name, state, tag, or experience..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 outline-none focus:border-amber-500/50 transition-colors text-sm"
          />
        </div>

        {/* Region Pills */}
        <div>
          <div className="text-xs font-semibold text-stone-400 mb-2">Region</div>
          <div className="flex flex-wrap gap-1.5">
            {REGIONS.map((region) => {
              const active = selectedRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <div className="text-xs font-semibold text-stone-400 mb-2">Experience & Landscape</div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Meta Bar */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
          <span>
            Showing <strong className="text-white">{filteredDestinations.length}</strong> of{' '}
            {DESTINATIONS.length} destinations
          </span>
          {(selectedRegion !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const saved = isSaved(dest.id);
            return (
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

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950">
                      {dest.region}
                    </span>
                    {dest.categories.slice(0, 1).map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSave(dest.id)}
                    title={saved ? 'Remove from Saved' : 'Save to Bucket List'}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                      saved
                        ? 'bg-rose-500 text-white'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Destination Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold font-display text-white">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{dest.state}</span>
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="text-xs space-y-1 text-stone-400 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-stone-500">Best Season:</span> {dest.bestTime}
                    </div>
                    <div>
                      <span className="text-stone-500">Ideal Stay:</span> {dest.idealDuration}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onTravelToDestination(dest)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <PlaneTakeoff className="w-3.5 h-3.5" />
                      <span>Fly on Map</span>
                    </button>
                    <button
                      onClick={() => setModalDestination(dest)}
                      title="Read Guide"
                      className="p-2.5 rounded-xl glass-panel text-stone-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-bold font-display text-white">
            No Destinations Found
          </h3>
          <p className="text-stone-400 text-sm max-w-md mx-auto">
            We couldn't find destinations matching your current filter combination.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Editorial Deep-Dive Modal */}
      <DestinationModal
        destination={modalDestination}
        isOpen={Boolean(modalDestination)}
        onClose={() => setModalDestination(null)}
      />
    </div>
  );
};
