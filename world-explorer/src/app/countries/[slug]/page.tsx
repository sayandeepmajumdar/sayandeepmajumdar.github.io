import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Compass,
  MapPin,
  Globe2,
  Languages as LangIcon,
  Sparkles,
  Landmark,
  ArrowRight,
  ShieldAlert,
  ChevronLeft,
} from 'lucide-react';
import { getCountryById, COUNTRIES } from '@/data/countries';
import { CountryHeader } from '@/components/country/CountryHeader';
import { FlagSymbolism } from '@/components/country/FlagSymbolism';
import { PhraseList } from '@/components/country/PhraseList';
import { CountryQuizMini } from '@/components/country/CountryQuizMini';
import { formatNumber, formatArea } from '@/lib/utils';

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryById(slug);
  if (!country) return { title: 'Country Not Found | World Explorer' };

  return {
    title: `${country.name} ${country.flag} — Flag, Capital, Language & Facts | World Explorer`,
    description: `Learn all about ${country.name} (${country.officialName}). Discover its capital ${country.capital}, flag symbolism, official languages, beginner audio phrases, and geography.`,
  };
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryById(slug);

  if (!country) {
    notFound();
  }

  // Related countries: either bordering countries or same continent peers
  const relatedCountries = country.borderCountryIds
    .map((id) => getCountryById(id))
    .filter(Boolean)
    .concat(
      COUNTRIES.filter(
        (c) => c.continent === country.continent && c.id !== country.id
      )
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/countries"
          className="inline-flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Country Directory</span>
        </Link>
        <span>
          {country.continentName} / {country.name}
        </span>
      </div>

      {/* 1. Overview: Country Header */}
      <section id="overview">
        <CountryHeader country={country} />
      </section>

      {/* 2. Flag: Documented Symbolism */}
      <section id="flag">
        <FlagSymbolism country={country} />
      </section>

      {/* 3 & 4. Geography & Capital Deep Dive */}
      <section id="geography-capital" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geography Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Geography & Coordinates
            </h2>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Continent:</span>
              <strong className="text-slate-900 dark:text-white font-semibold">
                {country.continentName} ({country.subregion})
              </strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Land Area:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formatArea(country.areaKm2)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Geographic Coordinates:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {country.coordinates[0].toFixed(2)}° N, {country.coordinates[1].toFixed(2)}° E
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Population Density:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {Math.round(country.population / (country.areaKm2 || 1))} people / km²
              </span>
            </div>
          </div>
        </div>

        {/* Capital City Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Capital City
            </h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {country.capital}
              </p>
              <span className="text-xs text-slate-500">
                Official Seat of Government & Capital
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {country.capital} serves as the political, administrative, and diplomatic heart of {country.name}.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Languages: Official vs Spoken Distinction */}
      <section id="languages" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <LangIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Languages & Linguistic Landscape
            </h2>
            <p className="text-xs text-slate-500">
              Clear distinction between de jure official status and widely spoken languages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900/50">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Official / Constitutional Language(s):
            </span>
            <ul className="mt-2 space-y-1">
              {country.officialLanguages.map((lang, idx) => (
                <li key={idx} className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Other Widely Spoken / Regional Languages:
            </span>
            <ul className="mt-2 space-y-1">
              {country.languages.map((lang, idx) => (
                <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Basic Phrases with Audio TTS */}
      {country.basicPhrases && country.basicPhrases.length > 0 && (
        <section id="phrases">
          <PhraseList
            phrases={country.basicPhrases}
            countryName={country.name}
            languageName={country.officialLanguages[0] || country.languages[0]}
          />
        </section>
      )}

      {/* 7. Culture & Facts */}
      <section id="culture-facts" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Culture, Milestones & Famous Landmarks
            </h2>
            <p className="text-xs text-slate-500">
              Documented cultural heritage and global contributions.
            </p>
          </div>
        </div>

        {/* Famous For Tags */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Famous Around the World For:
          </span>
          <div className="flex flex-wrap gap-2">
            {country.famousFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs font-bold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Facts List */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Fascinating Educational Facts:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {country.facts.map((fact, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <p>💡 {fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Landmarks */}
        {country.landmarks && country.landmarks.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-2">
              <Landmark className="w-3.5 h-3.5 text-teal-600" /> Prominent Landmarks:
            </span>
            <div className="flex flex-wrap gap-2">
              {country.landmarks.map((lm) => (
                <span
                  key={lm}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                >
                  🏛️ {lm}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 8. Related Countries */}
      {relatedCountries.length > 0 && (
        <section id="related" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Neighboring & Related Nations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCountries.map((c) => (
              <Link
                key={c!.id}
                href={`/countries/${c!.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-colors flex items-center gap-3 shadow-xs group"
              >
                <span className="text-3xl select-none group-hover:scale-110 transition-transform">
                  {c!.flag}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {c!.name}
                  </h3>
                  <p className="text-xs text-slate-500">{c!.continentName}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. Quiz Section */}
      <section id="quiz">
        <CountryQuizMini country={country} />
      </section>
    </div>
  );
}
