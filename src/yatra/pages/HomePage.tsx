import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { IndiaMap } from '../components/IndiaMap';
import { DestinationPanel } from '../components/DestinationPanel';
import { DestinationModal } from '../components/DestinationModal';
import { TravelStylesCarousel } from '../components/TravelStylesCarousel';
import { TrendingSection } from '../components/TrendingSection';
import { HiddenGemsSection } from '../components/HiddenGemsSection';
import { RecentlyExplored } from '../components/RecentlyExplored';
import { Destination, ActiveJourney, TravelStyle, StatePath } from '../types';
import {
  DESTINATIONS,
  getTrendingDestinations,
  getHiddenGems,
  getDestinationById,
} from '../data/destinations';
import { useSaved } from '../context/SavedContext';

interface HomePageProps {
  onNavigateToExplore: (style?: string) => void;
  initialDestinationId?: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToExplore,
  initialDestinationId,
}) => {
  const { addRecent } = useSaved();

  // Active Journey State
  const [activeJourney, setActiveJourney] = useState<ActiveJourney | null>(() => {
    if (initialDestinationId) {
      const dest = getDestinationById(initialDestinationId);
      if (dest) {
        return {
          destination: dest,
          origin: { x: 186, y: 210 }, // New Delhi origin default
          phase: 'flight-route',
        };
      }
    }
    return null;
  });

  // Slide-up Destination Panel state
  const [panelOpen, setPanelOpen] = useState<boolean>(() => Boolean(initialDestinationId));

  // Deep-dive Itinerary Modal state
  const [modalDestination, setModalDestination] = useState<Destination | null>(null);

  // Trigger travel journey to a destination
  const handleSelectDestination = (dest: Destination) => {
    // Starting flight point: previous destination or center of India (New Delhi)
    const currentOrigin = activeJourney?.destination?.coordinates || { x: 186, y: 210 };

    setActiveJourney({
      destination: dest,
      origin: currentOrigin,
      phase: 'flight-route',
    });

    addRecent(dest.id);
    setPanelOpen(false); // will open when flight arrives
  };

  // Called when airplane completes trajectory
  const handleJourneyArrived = () => {
    if (activeJourney) {
      setActiveJourney((prev) => (prev ? { ...prev, phase: 'arrived' } : null));
      setPanelOpen(true);
    }
  };

  const handleSelectState = (state: StatePath | null) => {
    if (state) {
      setActiveJourney(null);
      setPanelOpen(false);
    }
  };

  const handleSelectStyle = (style: TravelStyle) => {
    onNavigateToExplore(style);
  };

  const handleSelectNearby = (nearbyName: string) => {
    const matched = DESTINATIONS.find(
      (d) =>
        d.name.toLowerCase().includes(nearbyName.toLowerCase()) ||
        (d.city && d.city.toLowerCase().includes(nearbyName.toLowerCase()))
    );
    if (matched) {
      handleSelectDestination(matched);
    } else {
      onNavigateToExplore(nearbyName);
    }
  };

  const trendingList = getTrendingDestinations();
  const hiddenGemsList = getHiddenGems();

  return (
    <div className="w-full min-h-screen pb-20 space-y-16">
      {/* Top Hero Section */}
      <section className="relative pt-10 sm:pt-14 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs font-semibold text-amber-400 mb-5 shadow-lg shadow-amber-500/10">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Interactive Travel Discovery of India</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white max-w-4xl leading-[1.15]">
          Where will{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            India
          </span>{' '}
          take you?
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
          Traverse 100+ authentic destinations across 36 States & Union Territories. Watch real-time flight routes, explore royal forts, high Himalayas, and sacred coastal waters.
        </p>

        {/* Search Bar */}
        <div className="mt-8 w-full flex justify-center">
          <SearchBar onSelectDestination={handleSelectDestination} />
        </div>

        {/* Popular Quick Search Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
          <span className="text-stone-500">Popular:</span>
          {['Jaipur', 'Munnar', 'Varanasi', 'Spiti Valley', 'Goa', 'Leh'].map((name) => (
            <button
              key={name}
              onClick={() => {
                const found = DESTINATIONS.find((d) => d.name.toLowerCase().includes(name.toLowerCase()));
                if (found) handleSelectDestination(found);
              }}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors border border-white/5"
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Interactive Map Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* SVG Map Canvas */}
          <IndiaMap
            activeJourney={activeJourney}
            onSelectDestination={handleSelectDestination}
            onSelectState={handleSelectState}
            onOpenModal={(d) => setModalDestination(d)}
            onJourneyArrived={handleJourneyArrived}
          />

          {/* Slide-Up Cinematic Destination Panel on Arrival */}
          {activeJourney?.destination && (
            <div className="mt-6 flex justify-center">
              <DestinationPanel
                destination={activeJourney.destination}
                isOpen={panelOpen}
                onClose={() => setPanelOpen(false)}
                onOpenModal={(d) => setModalDestination(d)}
                onSelectNearby={handleSelectNearby}
              />
            </div>
          )}
        </div>
      </section>

      {/* Travel Styles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TravelStylesCarousel onSelectStyle={handleSelectStyle} />
      </section>

      {/* Trending Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingSection
          destinations={trendingList}
          onSelectDestination={handleSelectDestination}
        />
      </section>

      {/* Hidden Gems Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HiddenGemsSection
          destinations={hiddenGemsList}
          onSelectDestination={handleSelectDestination}
        />
      </section>

      {/* Recently Explored Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyExplored onSelectDestination={handleSelectDestination} />
      </section>

      {/* Full Editorial Modal */}
      <DestinationModal
        destination={modalDestination}
        isOpen={Boolean(modalDestination)}
        onClose={() => setModalDestination(null)}
      />
    </div>
  );
};
