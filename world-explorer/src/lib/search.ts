import { COUNTRIES } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { LANGUAGES } from '@/data/languages';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  type: 'country' | 'continent' | 'language' | 'capital';
  url: string;
}

export function searchGlobal(query: string): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // 1. Continents
  CONTINENTS.forEach((c) => {
    if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
      results.push({
        id: `continent-${c.id}`,
        title: c.name,
        subtitle: `${c.countriesCount} countries • ${c.tagline}`,
        icon: c.icon,
        type: 'continent',
        url: `/continents/${c.id}`,
      });
    }
  });

  // 2. Languages
  LANGUAGES.forEach((l) => {
    if (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.family.toLowerCase().includes(q)
    ) {
      results.push({
        id: `lang-${l.id}`,
        title: `${l.name} (${l.nativeName})`,
        subtitle: `Language family: ${l.family} • ~${l.speakersTotalApprox} speakers`,
        icon: '🗣️',
        type: 'language',
        url: `/languages#${l.id}`,
      });
    }
  });

  // 3. Countries & Capitals
  COUNTRIES.forEach((c) => {
    const matchesName =
      c.name.toLowerCase().includes(q) ||
      c.officialName.toLowerCase().includes(q) ||
      c.cca2.toLowerCase() === q ||
      c.cca3.toLowerCase() === q;
    const matchesCapital = c.capital.toLowerCase().includes(q);

    if (matchesCapital) {
      results.push({
        id: `capital-${c.id}`,
        title: c.capital,
        subtitle: `Capital of ${c.name} ${c.flag} (${c.continentName})`,
        icon: '🏙️',
        type: 'capital',
        url: `/countries/${c.id}`,
      });
    }

    if (matchesName && !matchesCapital) {
      results.push({
        id: `country-${c.id}`,
        title: `${c.name} ${c.flag}`,
        subtitle: `${c.continentName} • Capital: ${c.capital} • Pop: ${(c.population / 1_000_000).toFixed(1)}M`,
        icon: c.flag,
        type: 'country',
        url: `/countries/${c.id}`,
      });
    }
  });

  return results.slice(0, 10);
}
