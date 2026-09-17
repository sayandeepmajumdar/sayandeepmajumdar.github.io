'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { COUNTRIES, getCountryById } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { Country, ContinentId } from '@/lib/types';

// Natural Earth 110m TopoJSON from public directory with basePath
const GEO_URL = '/world-explorer/maps/countries-110m.json';

interface TooltipData {
  country: Country;
  x: number;
  y: number;
}

interface ContinentCenter {
  center: [number, number];
  zoom: number;
}

const CONTINENT_CENTERS: Record<string, ContinentCenter> = {
  all: { center: [0, 20], zoom: 1 },
  asia: { center: [95, 35], zoom: 2.2 },
  europe: { center: [15, 52], zoom: 3.5 },
  africa: { center: [20, 2], zoom: 2.2 },
  'north-america': { center: [-95, 45], zoom: 2.2 },
  'south-america': { center: [-60, -20], zoom: 2.2 },
  oceania: { center: [140, -25], zoom: 2.5 },
};

export function InteractiveWorldMap({
  height = 500,
  initialContinent = 'all',
  showControls = true,
}: {
  height?: number;
  initialContinent?: string;
  showControls?: boolean;
}) {
  const router = useRouter();
  const [selectedContinent, setSelectedContinent] = useState<string>(initialContinent);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredData, setHoveredData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState<ContinentCenter>(
    CONTINENT_CENTERS[initialContinent] || CONTINENT_CENTERS.all
  );

  // Fast mapping of numericCode / name to Country
  const countryLookup = useMemo(() => {
    const map = new Map<string, Country>();
    COUNTRIES.forEach((c) => {
      map.set(c.numericCode, c);
      map.set(c.name.toLowerCase(), c);
      map.set(c.cca3.toLowerCase(), c);
    });
    return map;
  }, []);

  const handleContinentChange = (contId: string) => {
    setSelectedContinent(contId);
    if (CONTINENT_CENTERS[contId]) {
      setPosition(CONTINENT_CENTERS[contId]);
    }
  };

  const handleZoomIn = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.4, 8) }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.4, 1) }));
  };

  const handleResetZoom = () => {
    setPosition(CONTINENT_CENTERS[selectedContinent] || CONTINENT_CENTERS.all);
  };

  const matchingCountryIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const set = new Set<string>();
    COUNTRIES.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q)
      ) {
        set.add(c.id);
      }
    });
    return set;
  }, [searchQuery]);

  return (
    <div className="relative w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Map Controls Header */}
      {showControls && (
        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Continent Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold mr-1 hidden sm:inline">Continent:</span>
            <button
              onClick={() => handleContinentChange('all')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                selectedContinent === 'all'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {CONTINENTS.filter((c) => c.id !== 'antarctica').map((c) => (
              <button
                key={c.id}
                onClick={() => handleContinentChange(c.id)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  selectedContinent === c.id
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search bar inside map */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find country or capital..."
              className="w-full pl-8 pr-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>
      )}

      {/* SVG Canvas Map */}
      <div className="relative w-full overflow-hidden" style={{ height }}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 170 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.center}
            onMoveEnd={(pos) => {
              if (pos.coordinates) {
                setPosition({ center: pos.coordinates, zoom: pos.zoom ?? position.zoom });
              }
            }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = String(geo.id || '').padStart(3, '0');
                  const country =
                    countryLookup.get(geoId) ||
                    countryLookup.get(geo.properties?.name?.toLowerCase());

                  const isMatch = country && matchingCountryIds.has(country.id);
                  const isFiltered =
                    selectedContinent !== 'all' &&
                    country &&
                    country.continent !== selectedContinent;

                  let fillColor = '#1e293b'; // slate-800 default ocean/land
                  if (country) {
                    fillColor = '#334155'; // slate-700 recognized country
                    if (country.continent === 'asia') fillColor = '#3b4252';
                    if (country.continent === 'europe') fillColor = '#334e68';
                    if (country.continent === 'africa') fillColor = '#4a4238';
                    if (country.continent === 'south-america') fillColor = '#2a4347';
                    if (country.continent === 'north-america') fillColor = '#2b4736';
                    if (country.continent === 'oceania') fillColor = '#3c3453';
                  }

                  if (isMatch) fillColor = '#14b8a6'; // teal-500 highlight
                  if (isFiltered) fillColor = '#0f172a'; // dimmed if not in active continent filter

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(evt) => {
                        if (country) {
                          setHoveredData({
                            country,
                            x: evt.clientX,
                            y: evt.clientY,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredData(null)}
                      onClick={() => {
                        if (country) {
                          router.push(`/countries/${country.id}`);
                        }
                      }}
                      fill={fillColor}
                      stroke="#0f172a"
                      strokeWidth={0.5}
                      className="rsm-geography outline-none transition-all duration-150 cursor-pointer hover:brightness-125 hover:stroke-teal-400"
                      style={{ outline: 'none' }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Floating Zoom & Pan Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            aria-label="Reset zoom and center"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Instructions Pill */}
        <div className="absolute top-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-slate-300 text-xs">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Click any country to explore profile • Drag to pan</span>
        </div>
      </div>

      {/* Floating Hover Card (Bottom Left inside map) */}
      {hoveredData && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 animate-in fade-in duration-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl select-none">{hoveredData.country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-white">
                  {hoveredData.country.name}
                </p>
                <span className="px-1.5 py-0.5 rounded-md bg-teal-950 text-teal-300 text-[10px] font-semibold border border-teal-800/60">
                  {hoveredData.country.continentName}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Capital: <span className="text-slate-200">{hoveredData.country.capital}</span> • Pop:{' '}
                <span className="text-slate-200">
                  {(hoveredData.country.population / 1_000_000).toFixed(1)}M
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/countries/${hoveredData.country.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
