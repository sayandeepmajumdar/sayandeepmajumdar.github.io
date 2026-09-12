import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { INDIA_STATES, INDIA_MAP_VIEWBOX } from '../data/indiaMapPaths';
import { DESTINATIONS } from '../data/destinations';
import { Destination, StatePath, ActiveJourney } from '../types';
import { DestinationMarker } from './DestinationMarker';
import { StatePin } from './StatePin';
import { FlightPath } from './FlightPath';
import { MapControls } from './MapControls';

interface IndiaMapProps {
  activeJourney?: ActiveJourney | null;
  onSelectDestination: (destination: Destination) => void;
  onSelectState?: (state: StatePath | null) => void;
  onOpenModal?: (destination: Destination) => void;
  onJourneyArrived?: () => void;
  className?: string;
}

interface ActiveFlight {
  id: string;
  origin: { x: number; y: number };
  destination: { x: number; y: number };
  targetType: 'state' | 'destination';
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  activeJourney,
  onSelectDestination,
  onSelectState,
  onOpenModal,
  onJourneyArrived,
  className = '',
}) => {
  // Zoom & Pan Camera State
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Camera animation engine refs for direct SVG attribute interpolation
  const cameraRef = useRef<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const cameraAnimIdRef = useRef<number>(0);
  const mapGroupRef = useRef<SVGGElement>(null);
  const isInternalClickRef = useRef<boolean>(false);

  // State selection and hover state
  const [hoveredState, setHoveredState] = useState<StatePath | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  // Floating card dismiss state
  const [dismissedCardForId, setDismissedCardForId] = useState<string | null>(null);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Flight Tracking State: Tracks flight coordinates for both states & destinations
  const [activeFlight, setActiveFlight] = useState<ActiveFlight | null>(() => {
    if (activeJourney?.destination) {
      return {
        id: `init-flight-${Date.now()}`,
        origin: activeJourney.origin || { x: 186, y: 210 },
        destination: activeJourney.destination.coordinates,
        targetType: 'destination',
      };
    }
    return null;
  });

  const lastPositionRef = useRef<{ x: number; y: number }>(
    activeJourney?.destination?.coordinates || { x: 186, y: 210 }
  );

  const svgRef = useRef<SVGSVGElement>(null);

  // Active selected state object
  const selectedState = useMemo(() => {
    return INDIA_STATES.find((s) => s.id === selectedStateId) || null;
  }, [selectedStateId]);

  // Destinations in the currently selected state
  const selectedStateDestinations = useMemo(() => {
    if (!selectedState) return [];
    return DESTINATIONS.filter(
      (d) => d.state.toLowerCase() === selectedState.name.toLowerCase()
    );
  }, [selectedState]);

  // Count destinations per state
  const destinationsCountByState = useMemo(() => {
    const counts: Record<string, number> = {};
    DESTINATIONS.forEach((d) => {
      counts[d.state] = (counts[d.state] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter visible destinations based on category and active selection
  const visibleDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      if (selectedCategory !== 'All') {
        const matchesCategory = d.categories.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!matchesCategory) return false;
      }
      return true;
    });
  }, [selectedCategory]);

  // Smoothly glide camera to target (x, y, scale) using native SVG transform attribute
  const animateCameraTo = (
    targetX: number,
    targetY: number,
    targetScale: number,
    durationMs = 1100
  ) => {
    cancelAnimationFrame(cameraAnimIdRef.current);

    const startX = cameraRef.current.x;
    const startY = cameraRef.current.y;
    const startScale = cameraRef.current.scale;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Quartic ease-out for ultra-silky, cinematic deceleration
      const ease = 1 - Math.pow(1 - progress, 4);

      const curX = startX + (targetX - startX) * ease;
      const curY = startY + (targetY - startY) * ease;
      const curScale = startScale + (targetScale - startScale) * ease;

      cameraRef.current = { x: curX, y: curY, scale: curScale };

      if (mapGroupRef.current) {
        mapGroupRef.current.setAttribute(
          'transform',
          `translate(${curX.toFixed(2)}, ${curY.toFixed(2)}) scale(${curScale.toFixed(4)})`
        );
      }

      if (progress < 1) {
        cameraAnimIdRef.current = requestAnimationFrame(tick);
      } else {
        if (mapGroupRef.current) {
          mapGroupRef.current.setAttribute(
            'transform',
            `translate(${targetX.toFixed(2)}, ${targetY.toFixed(2)}) scale(${targetScale.toFixed(4)})`
          );
        }
        cameraRef.current = { x: targetX, y: targetY, scale: targetScale };
        setScale(targetScale);
        setTranslate({ x: targetX, y: targetY });
      }
    };

    cameraAnimIdRef.current = requestAnimationFrame(tick);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(cameraAnimIdRef.current);
  }, []);

  // Zoom to a state bounding box
  const zoomToState = (state: StatePath) => {
    setSelectedStateId(state.id);
    setDismissedCardForId(null);
    const [minX, minY, maxX, maxY] = state.boundingBox;
    const width = maxX - minX;
    const height = maxY - minY;

    // Viewport dimensions
    const vpWidth = 612;
    const vpHeight = 696;

    // Calculate appropriate zoom level with padding
    const zoomX = vpWidth / (width * 1.45);
    const zoomY = vpHeight / (height * 1.45);
    const targetScale = Math.min(Math.max(Math.min(zoomX, zoomY), 1.25), 3.2);

    // Center camera on state center
    const tx = vpWidth / 2 - state.center.x * targetScale;
    const ty = 330 - state.center.y * targetScale;

    animateCameraTo(tx, ty, targetScale, 1100);
  };

  // Zoom directly to a destination (mathematically centered with breathing room)
  const zoomToDestination = (dest: Destination) => {
    setDismissedCardForId(null);
    const targetScale = 2.4;
    const vpWidth = 612;
    // Position destination at upper-center (y=320) so callout pill and bottom cards have plenty of room
    const tx = vpWidth / 2 - dest.coordinates.x * targetScale;
    const ty = 320 - dest.coordinates.y * targetScale;

    animateCameraTo(tx, ty, targetScale, 1100);

    // Also highlight its state
    const matchedState = INDIA_STATES.find(
      (s) => s.name.toLowerCase() === dest.state.toLowerCase()
    );
    if (matchedState) {
      setSelectedStateId(matchedState.id);
    }
  };

  // Trigger flight to a state
  const handleStateClick = (state: StatePath) => {
    if (selectedStateId === state.id && !activeJourney?.destination) {
      handleResetView();
      return;
    }

    onSelectState?.(state);

    const origin = lastPositionRef.current;
    const target = state.center;
    lastPositionRef.current = target;

    // Trigger flight animation
    setActiveFlight({
      id: `state-flight-${state.id}-${Date.now()}`,
      origin,
      destination: target,
      targetType: 'state',
    });

    zoomToState(state);
  };

  // Trigger flight to a destination
  const handleDestinationClick = (dest: Destination) => {
    isInternalClickRef.current = true;

    const origin = lastPositionRef.current;
    const target = dest.coordinates;
    lastPositionRef.current = target;

    // Trigger flight animation
    setActiveFlight({
      id: `dest-flight-${dest.id}-${Date.now()}`,
      origin,
      destination: target,
      targetType: 'destination',
    });

    onSelectDestination(dest);
    zoomToDestination(dest);
  };

  // When active journey changes from external components (e.g. search bar, popular chips)
  useEffect(() => {
    if (activeJourney?.destination) {
      if (isInternalClickRef.current) {
        isInternalClickRef.current = false;
        return;
      }

      const target = activeJourney.destination.coordinates;
      if (
        lastPositionRef.current.x !== target.x ||
        lastPositionRef.current.y !== target.y
      ) {
        const origin = activeJourney.origin || lastPositionRef.current;
        lastPositionRef.current = target;
        setActiveFlight({
          id: `ext-dest-${activeJourney.destination.id}-${Date.now()}`,
          origin,
          destination: target,
          targetType: 'destination',
        });
      }
      zoomToDestination(activeJourney.destination);
    }
  }, [activeJourney?.destination?.id]);

  // Reset Map View
  const handleResetView = () => {
    animateCameraTo(0, 0, 1, 600);
    setSelectedStateId(null);
    setDismissedCardForId(null);
    setActiveFlight(null);
    onSelectState?.(null);
  };

  const handleZoomIn = () => {
    const curScale = cameraRef.current.scale;
    const nextScale = Math.min(curScale * 1.35, 4.0);
    const nextX = 306 - (306 - cameraRef.current.x) * (nextScale / curScale);
    const nextY = 348 - (348 - cameraRef.current.y) * (nextScale / curScale);
    animateCameraTo(nextX, nextY, nextScale, 400);
  };

  const handleZoomOut = () => {
    const curScale = cameraRef.current.scale;
    const nextScale = Math.max(curScale / 1.35, 1.0);
    if (nextScale <= 1.05) {
      animateCameraTo(0, 0, 1, 500);
    } else {
      const nextX = 306 - (306 - cameraRef.current.x) * (nextScale / curScale);
      const nextY = 348 - (348 - cameraRef.current.y) * (nextScale / curScale);
      animateCameraTo(nextX, nextY, nextScale, 400);
    }
  };

  const handleFlightArrival = () => {
    onJourneyArrived?.();
    // Clear active flight after landing fade-out completes
    setTimeout(() => {
      setActiveFlight(null);
    }, 700);
  };

  const activeDestination = activeJourney?.destination;
  const activeDestinationId = activeDestination?.id;

  // Card visibility
  const activeItemId = activeDestinationId || selectedStateId || '';
  const isCardVisible = activeItemId !== '' && dismissedCardForId !== activeItemId;

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/10 ${className}`}
    >
      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleResetView}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalVisible={visibleDestinations.length}
        />
      </div>

      {/* SVG Canvas */}
      <div className="w-full h-[540px] sm:h-[620px] md:h-[720px] flex items-center justify-center p-2 bg-gradient-to-b from-[#0e1320] via-[#0a0d16] to-[#070910]">
        <svg
          ref={svgRef}
          viewBox={INDIA_MAP_VIEWBOX}
          className="w-full h-full max-h-[720px] select-none touch-pan-y"
          style={{
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))',
          }}
        >
          <defs>
            {/* Ambient Background Gradient & Shadows */}
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* State Pin Gradient */}
            <linearGradient id="statePinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Badge Amber Gradient */}
            <linearGradient id="badgeAmberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Ambient Glow behind map */}
          <circle cx="306" cy="348" r="300" fill="url(#mapGlow)" onClick={handleResetView} className="cursor-default" />

          {/* Hardware-Accelerated Smooth Motion Group for Pan and Zoom via Native SVG Transform */}
          <g
            ref={mapGroupRef}
            id="main-map-camera-group"
            transform="translate(0, 0) scale(1)"
          >
            {/* 36 Indian States and Union Territories */}
            <g id="states-layer">
              {INDIA_STATES.map((state) => {
                const isSelected = selectedStateId === state.id;
                const isStateOfActiveDest =
                  activeJourney?.destination?.state.toLowerCase() === state.name.toLowerCase();
                const isDimmed =
                  (selectedStateId && !isSelected) ||
                  (activeJourney && !isStateOfActiveDest);

                return (
                  <path
                    key={state.id}
                    d={state.d}
                    className={`india-state-path ${
                      isSelected || isStateOfActiveDest ? 'active' : ''
                    } ${isDimmed ? 'dimmed' : ''}`}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => handleStateClick(state)}
                  />
                );
              })}
            </g>

            {/* State Location Pin: Appears at state center when clicked */}
            {selectedState && !activeDestination && (
              <StatePin
                state={selectedState}
                destinations={selectedStateDestinations}
                onClick={handleStateClick}
                onSelectDestination={handleDestinationClick}
                scale={scale}
              />
            )}

            {/* Animated Flight Path with Flying Plane (Active for both states & places) */}
            {activeFlight && (
              <FlightPath
                key={activeFlight.id}
                origin={activeFlight.origin}
                destination={activeFlight.destination}
                onArrival={handleFlightArrival}
                duration={1.8}
              />
            )}

            {/* Destination Markers */}
            <g id="destinations-layer">
              {visibleDestinations.map((destination) => {
                const isSelected = destination.id === activeDestinationId;
                return (
                  <DestinationMarker
                    key={destination.id}
                    destination={destination}
                    isSelected={isSelected}
                    onClick={handleDestinationClick}
                    onOpenInfo={onOpenModal}
                    scale={scale}
                  />
                );
              })}
            </g>
          </g>
        </svg>
      </div>

      {/* On-Map Floating Info Cards: Sleek & Compact */}
      {isCardVisible && (
        <div className="absolute bottom-4 right-4 z-30 w-72 sm:w-80 animate-fade-in pointer-events-auto">
          {activeDestination ? (
            /* Destination Floating Card (Compact) */
            <div className="glass-panel rounded-2xl p-3 border border-amber-500/30 shadow-2xl backdrop-blur-2xl bg-[#090d16]/95 flex flex-col gap-2.5">
              {/* Card Header with Image & Close */}
              <div className="relative h-20 w-full rounded-xl overflow-hidden bg-stone-900">
                <img
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-black/30 to-transparent" />
                <button
                  onClick={() => setDismissedCardForId(activeDestination.id)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white transition-colors"
                  title="Minimize card"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500 text-stone-950">
                    📍 {activeDestination.state}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-white/20 text-white backdrop-blur-md">
                    {activeDestination.categories[0]}
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div>
                <h4 className="text-sm font-bold font-display text-white">
                  {activeDestination.name}
                </h4>
                <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-relaxed">
                  {activeDestination.description}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center gap-2 text-[10px] text-stone-300 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <div className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-amber-400" />
                  <span>{activeDestination.bestTime}</span>
                </div>
                <span className="text-stone-600">•</span>
                <div>
                  <span className="text-stone-400">Stay: </span>
                  <span className="text-white font-medium">{activeDestination.idealDuration}</span>
                </div>
              </div>

              {/* High-visibility Action CTA */}
              <button
                onClick={() => onOpenModal?.(activeDestination)}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <span>📍 Read Full Travel Guide & Info</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : selectedState ? (
            /* State Floating Card (Compact) */
            <div className="glass-panel rounded-2xl p-3 border border-amber-500/30 shadow-2xl backdrop-blur-2xl bg-[#090d16]/95 flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[9px] font-semibold border border-amber-500/20 mb-0.5">
                    <span>📍 State Center</span>
                  </div>
                  <h4 className="text-sm font-bold font-display text-white">
                    {selectedState.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 italic">
                    "{selectedState.tagline}"
                  </p>
                </div>
                <button
                  onClick={() => handleResetView()}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white transition-colors"
                  title="Reset state view"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* State Destinations List */}
              {selectedStateDestinations.length > 0 ? (
                <div>
                  <div className="text-[10px] font-medium text-amber-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>
                      {selectedStateDestinations.length} Places to Visit:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {selectedStateDestinations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleDestinationClick(d)}
                        className="px-2 py-0.5 rounded text-[11px] bg-white/5 hover:bg-amber-500/20 text-stone-200 hover:text-amber-300 border border-white/10 transition-all flex items-center gap-0.5"
                      >
                        <span className="text-amber-400 text-[10px]">📍</span>
                        <span>{d.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Button to explore first destination */}
                  <button
                    onClick={() => handleDestinationClick(selectedStateDestinations[0])}
                    className="mt-2 w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span>Fly to {selectedStateDestinations[0].name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="text-[11px] text-stone-400 py-1">
                  Editorial destination profiles for this region are being curated.
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Minimized Pill if card was dismissed */}
      {!isCardVisible && (activeDestination || selectedState) && (
        <div className="absolute bottom-4 right-4 z-30 pointer-events-auto animate-fade-in">
          <button
            onClick={() => setDismissedCardForId(null)}
            className="glass-panel px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-xl hover:bg-white/10 transition-all"
          >
            <span>📍 View {activeDestination ? activeDestination.name : selectedState?.name}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* State Hover / Guide Information Pill (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        {hoveredState ? (
          <div className="glass-panel px-3 py-2 rounded-xl shadow-xl flex items-center gap-2.5 animate-fade-in border border-amber-500/20">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <div className="text-xs font-semibold text-white tracking-wide">
                {hoveredState.name}
              </div>
              <div className="text-[10px] text-stone-400">
                {hoveredState.tagline} •{' '}
                <span className="text-amber-400 font-medium">
                  {destinationsCountByState[hoveredState.name] || 0} places
                </span>
              </div>
            </div>
          </div>
        ) : activeDestination ? (
          <div className="hidden sm:flex glass-panel px-2.5 py-1 rounded-lg text-[10px] text-stone-300 items-center gap-1.5 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>📍 {activeDestination.name} pin placed • Click for full travel guide</span>
          </div>
        ) : selectedState ? (
          <div className="hidden sm:flex glass-panel px-2.5 py-1 rounded-lg text-[10px] text-stone-300 items-center gap-1.5 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>📍 {selectedState.name} active • Plane arrived at state center</span>
          </div>
        ) : (
          <div className="hidden sm:flex glass-panel px-2.5 py-1 rounded-lg text-[10px] text-stone-400 items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
            <span>Click any state or place to fly airplane</span>
          </div>
        )}
      </div>
    </div>
  );
};
