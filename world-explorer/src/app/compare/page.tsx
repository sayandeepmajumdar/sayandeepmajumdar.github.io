'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Scale,
  MapPin,
  Globe2,
  Users,
  Coins,
  Languages,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { COUNTRIES, getCountryById } from '@/data/countries';
import { Country } from '@/lib/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { formatNumber, formatArea } from '@/lib/utils';

function CompareContent() {
  const searchParams = useSearchParams();
  const initialC1 = searchParams.get('c1') || 'india';
  const initialC2 = searchParams.get('c2') || 'japan';

  const [countryId1, setCountryId1] = useState(initialC1);
  const [countryId2, setCountryId2] = useState(initialC2);

  const country1 = getCountryById(countryId1) || COUNTRIES[0];
  const country2 = getCountryById(countryId2) || COUNTRIES[1];

  const greeting1 =
    country1.basicPhrases.find((p) => p.category === 'greetings') ||
    country1.basicPhrases[0];
  const greeting2 =
    country2.basicPhrases.find((p) => p.category === 'greetings') ||
    country2.basicPhrases[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>Educational Comparison Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Compare Sovereign Nations
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Side-by-side exploration of geography, languages, currencies, demographics, and greetings.
          Designed to foster cross-cultural understanding without arbitrary rankings.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Country A:
          </label>
          <select
            value={countryId1}
            onChange={(e) => setCountryId1(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500"
          >
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name} ({c.continentName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Country B:
          </label>
          <select
            value={countryId2}
            onChange={(e) => setCountryId2(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500"
          >
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name} ({c.continentName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country 1 Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-7xl select-none block mb-2 filter drop-shadow-md" role="img" aria-label={country1.name}>
              {country1.flag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {country1.name}
            </h2>
            <p className="text-xs text-slate-500 italic mt-0.5">{country1.officialName}</p>
            <Link
              href={`/countries/${country1.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline mt-2"
            >
              <span>Explore profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Continent:
              </span>
              <strong className="text-slate-900 dark:text-white">{country1.continentName}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> Capital City:
              </span>
              <strong className="text-slate-900 dark:text-white">{country1.capital}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-teal-600" /> Population:
              </span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(country1.population)}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Land Area:
              </span>
              <span className="text-slate-900 dark:text-white">{formatArea(country1.areaKm2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-teal-600" /> Currency:
              </span>
              <span className="text-slate-900 dark:text-white">
                {country1.currency.name} ({country1.currency.code} {country1.currency.symbol})
              </span>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-teal-600" /> Official Language(s):
              </span>
              <p className="text-slate-900 dark:text-white font-medium">
                {country1.officialLanguages.join(', ')}
              </p>
            </div>

            {/* How do you say hello */}
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  How to Say Hello:
                </span>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {greeting1?.original}
                </p>
                <p className="text-xs text-slate-500 italic">({greeting1?.phonetic})</p>
              </div>
              {greeting1 && (
                <AudioButton
                  text={greeting1.original}
                  langCode={greeting1.langCode}
                  label="Listen"
                  size="sm"
                />
              )}
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Flag Symbolism:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {country1.flagDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Country 2 Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-7xl select-none block mb-2 filter drop-shadow-md" role="img" aria-label={country2.name}>
              {country2.flag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {country2.name}
            </h2>
            <p className="text-xs text-slate-500 italic mt-0.5">{country2.officialName}</p>
            <Link
              href={`/countries/${country2.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline mt-2"
            >
              <span>Explore profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Continent:
              </span>
              <strong className="text-slate-900 dark:text-white">{country2.continentName}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> Capital City:
              </span>
              <strong className="text-slate-900 dark:text-white">{country2.capital}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-teal-600" /> Population:
              </span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(country2.population)}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Land Area:
              </span>
              <span className="text-slate-900 dark:text-white">{formatArea(country2.areaKm2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-teal-600" /> Currency:
              </span>
              <span className="text-slate-900 dark:text-white">
                {country2.currency.name} ({country2.currency.code} {country2.currency.symbol})
              </span>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-teal-600" /> Official Language(s):
              </span>
              <p className="text-slate-900 dark:text-white font-medium">
                {country2.officialLanguages.join(', ')}
              </p>
            </div>

            {/* How do you say hello */}
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  How to Say Hello:
                </span>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {greeting2?.original}
                </p>
                <p className="text-xs text-slate-500 italic">({greeting2?.phonetic})</p>
              </div>
              {greeting2 && (
                <AudioButton
                  text={greeting2.original}
                  langCode={greeting2.langCode}
                  label="Listen"
                  size="sm"
                />
              )}
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Flag Symbolism:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {country2.flagDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading comparison...</div>}>
      <CompareContent />
    </Suspense>
  );
}
