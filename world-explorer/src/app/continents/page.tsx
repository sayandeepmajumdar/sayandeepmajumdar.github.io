import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Map, ArrowRight, Mountain, Users, Globe2, Sparkles } from 'lucide-react';
import { CONTINENTS } from '@/data/continents';
import { COUNTRIES } from '@/data/countries';
import { formatNumber, formatArea } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Explore the 7 Continents | World Explorer',
  description:
    'Discover Earth\'s seven major landmasses: Asia, Africa, Europe, North America, South America, Oceania, and Antarctica. Explore sovereign nations, geography, and languages.',
};

export default function ContinentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
          <Map className="w-3.5 h-3.5" />
          <span>Major Continental Landmasses</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          The Seven Continents
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          From the Himalayas in Asia to the Amazon Rainforest in South America, explore the distinctive
          geology, sovereign nations, and cultural geography of each continent.
        </p>
      </div>

      {/* Continents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONTINENTS.map((continent) => {
          const continentCountries = COUNTRIES.filter(
            (c) => c.continent === continent.id
          );

          return (
            <div
              key={continent.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/60 p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl group-hover:scale-110 transition-transform">
                    {continent.icon}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                    {continent.countriesCount} Nations
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {continent.name}
                </h2>
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 my-1">
                  {continent.tagline}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {continent.description}
                </p>

                {/* Key Geographic Metrics */}
                <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Users className="w-3.5 h-3.5 text-teal-600" /> Population:
                    </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {formatNumber(continent.population)}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Land Area:
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {formatArea(continent.areaKm2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Mountain className="w-3.5 h-3.5 text-teal-600" /> Highest Peak:
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 text-right truncate max-w-[140px]" title={continent.highestPoint.name}>
                      {continent.highestPoint.name} ({continent.highestPoint.elevationM.toLocaleString()}m)
                    </span>
                  </div>
                </div>

                {/* Sample Countries Flags Preview */}
                {continentCountries.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto py-2 text-xl">
                    {continentCountries.slice(0, 6).map((c) => (
                      <span key={c.id} title={c.name}>
                        {c.flag}
                      </span>
                    ))}
                    {continentCountries.length > 6 && (
                      <span className="text-xs font-bold text-slate-400">
                        +{continentCountries.length - 6}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Explore Button */}
              <Link
                href={`/continents/${continent.id}`}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Explore {continent.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
