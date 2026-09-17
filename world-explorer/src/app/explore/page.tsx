'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Map as MapIcon,
  List,
  Search,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { InteractiveWorldMap } from '@/components/map/InteractiveWorldMap';
import { CountryCard } from '@/components/country/CountryCard';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT, METHODOLOGY_NOTE } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'map' | 'directory'>('map');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter((c) => {
    const matchesContinent =
      selectedContinent === 'all' || c.continent === selectedContinent;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.continentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Atlas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            World Explorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Navigate through {TOTAL_COUNTRIES_COUNT} sovereign nations. Hover to discover key facts or click to enter in-depth country profiles.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center self-start md:self-auto p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'directory'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Country Cards ({filteredCountries.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {activeTab === 'map' ? (
          <div className="space-y-6">
            <InteractiveWorldMap height={620} showControls={true} />

            {/* Quick stats strip */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-600" />
                <span>{METHODOLOGY_NOTE}</span>
              </div>
              <Link
                href="/countries"
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Country Directory</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              {/* Continent Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedContinent('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    selectedContinent === 'all'
                      ? 'bg-teal-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  All Continents
                </button>
                {CONTINENTS.filter((c) => c.id !== 'antarctica').map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContinent(c.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      selectedContinent === c.id
                        ? 'bg-teal-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter countries or capitals..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>

            {/* Grid of Countries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCountries.map((country) => (
                <CountryCard key={country.id} country={country} />
              ))}
            </div>

            {filteredCountries.length === 0 && (
              <div className="text-center py-16 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  No countries match your search &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your search query or selecting &ldquo;All Continents&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedContinent('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
