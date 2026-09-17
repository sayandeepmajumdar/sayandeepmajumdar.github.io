'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  Globe,
  MapPin,
  Users,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT, METHODOLOGY_NOTE } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { CountryCard } from '@/components/country/CountryCard';
import { formatNumber } from '@/lib/utils';

type SortOption = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc' | 'area-desc';

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesContinent =
        selectedContinent === 'all' || c.continent === selectedContinent;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.languages.some((l) => l.toLowerCase().includes(q));
      return matchesContinent && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'pop-desc') return b.population - a.population;
      if (sortBy === 'pop-asc') return a.population - b.population;
      if (sortBy === 'area-desc') return b.areaKm2 - a.areaKm2;
      return 0;
    });
  }, [searchQuery, selectedContinent, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Sovereign Nations Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          All Countries of the World
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Complete factual directory of {TOTAL_COUNTRIES_COUNT} sovereign countries. Filter by continent,
          sort by demographic metrics, or search by capital and language.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 italic">
          {METHODOLOGY_NOTE}
        </p>
      </div>

      {/* Controls: Search, Continent Filter, Sorting, Grid/List */}
      <div className="my-6 space-y-4">
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, capital, or language..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-hidden text-xs font-semibold"
              >
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="name-desc">Alphabetical (Z - A)</option>
                <option value="pop-desc">Population (Highest)</option>
                <option value="pop-asc">Population (Lowest)</option>
                <option value="area-desc">Land Area (Largest)</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Continent Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedContinent('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedContinent === 'all'
                ? 'bg-teal-600 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Continents ({COUNTRIES.length})
          </button>
          {CONTINENTS.filter((c) => c.id !== 'antarctica').map((c) => {
            const count = COUNTRIES.filter((country) => country.continent === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedContinent(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedContinent === c.id
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
        <span>
          Showing <strong>{filteredAndSortedCountries.length}</strong> of{' '}
          {TOTAL_COUNTRIES_COUNT} sovereign countries
        </span>
      </div>

      {/* Countries Display: Grid vs List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAndSortedCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAndSortedCountries.map((country) => (
            <div
              key={country.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl select-none" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {country.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {country.continentName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Capital: <strong className="text-slate-700 dark:text-slate-300">{country.capital}</strong> • Language:{' '}
                    <span className="text-slate-700 dark:text-slate-300">{country.officialLanguages[0] || country.languages[0]}</span> • Pop:{' '}
                    <span className="text-slate-700 dark:text-slate-300">{formatNumber(country.population)}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  href={`/learn/${country.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-amber-500" />
                  <span>60s Guide</span>
                </Link>
                <Link
                  href={`/countries/${country.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedCountries.length === 0 && (
        <div className="text-center py-20 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No countries found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your spelling or reset the continent filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedContinent('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
