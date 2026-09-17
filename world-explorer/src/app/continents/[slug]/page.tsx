import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Map,
  Users,
  Globe2,
  Mountain,
  Sparkles,
  Flag,
  MapPin,
  Languages,
  ChevronLeft,
  ArrowRight,
  Gamepad2,
} from 'lucide-react';
import { getContinentById, CONTINENTS } from '@/data/continents';
import { getCountriesByContinent } from '@/data/countries';
import { InteractiveWorldMap } from '@/components/map/InteractiveWorldMap';
import { CountryCard } from '@/components/country/CountryCard';
import { formatNumber, formatArea } from '@/lib/utils';

export function generateStaticParams() {
  return CONTINENTS.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const continent = getContinentById(slug);
  if (!continent) return { title: 'Continent Not Found | World Explorer' };

  return {
    title: `${continent.name} ${continent.icon} — Countries, Flags, Capitals & Map | World Explorer`,
    description: `Explore ${continent.name}. ${continent.tagline}. Discover sovereign nations, interactive geography map, capitals, and languages.`,
  };
}

export default async function ContinentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const continent = getContinentById(slug);

  if (!continent) {
    notFound();
  }

  const countries = getCountriesByContinent(continent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Breadcrumb Back Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/continents"
          className="inline-flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Continents</span>
        </Link>
        <span>Continents / {continent.name}</span>
      </div>

      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-6xl select-none" role="img" aria-label={continent.name}>
                {continent.icon}
              </span>
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {continent.name}
                </h1>
                <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                  {continent.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed pt-1">
              {continent.description}
            </p>
          </div>

          <Link
            href={`/games/country-quiz?continent=${continent.id}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors self-start md:self-auto"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play {continent.name} Quiz</span>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 uppercase">
              <Users className="w-3.5 h-3.5 text-teal-600" /> Population
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {formatNumber(continent.population)}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 uppercase">
              <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Land Area
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {formatArea(continent.areaKm2)}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 uppercase">
              <Mountain className="w-3.5 h-3.5 text-teal-600" /> Highest Point
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate" title={continent.highestPoint.name}>
              {continent.highestPoint.name} ({continent.highestPoint.elevationM.toLocaleString()}m)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 uppercase">
              <Flag className="w-3.5 h-3.5 text-teal-600" /> Sovereign Nations
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {continent.countriesCount} Countries
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Map Centered on this Continent */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-teal-600" />
          <span>Interactive Map of {continent.name}</span>
        </h2>
        <InteractiveWorldMap height={450} initialContinent={continent.id} showControls={true} />
      </section>

      {/* Flag Grid & Capital Cities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flag Grid */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flag className="w-4 h-4 text-rose-500" />
            <span>Flags of {continent.name}</span>
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {countries.map((c) => (
              <Link
                key={c.id}
                href={`/countries/${c.id}`}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-center flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105"
                title={`${c.name} - Capital: ${c.capital}`}
              >
                <span className="text-3xl select-none">{c.flag}</span>
                <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate w-full">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Capitals List */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Capitals of {continent.name}</span>
          </h3>
          <div className="max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
            {countries.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{c.name}</span>
                </div>
                <strong className="text-teal-700 dark:text-teal-400 font-medium">
                  {c.capital}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Languages & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Languages */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-500" />
            <span>Major Languages Spoken</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {continent.primaryLanguages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                🗣️ {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Geographic Highlights */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Geographic Highlights</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {continent.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-500 font-bold">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Country Cards Directory */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Nations of {continent.name} ({countries.length})
          </h2>
          <Link
            href="/countries"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            All countries directory
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>
    </div>
  );
}
