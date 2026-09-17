import { Continent } from '@/lib/types';

export const CONTINENTS: Continent[] = [
  {
    id: 'asia',
    name: 'Asia',
    tagline: "The world's largest and most populous continent",
    description:
      'Spanning from the Mediterranean Sea to the Pacific Ocean, Asia encompasses 48 UN member states, rich historical civilizations, the highest mountain peaks on Earth, and remarkable cultural diversity.',
    countriesCount: 48,
    population: 4750000000,
    areaKm2: 44579000,
    icon: '🌏',
    color: '#F43F5E',
    accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
    highestPoint: {
      name: 'Mount Everest',
      elevationM: 8848.86,
      country: 'Nepal / China',
    },
    lowestPoint: {
      name: 'Dead Sea',
      elevationM: -432,
      country: 'Jordan / Israel / Palestine',
    },
    highlights: [
      'Home to nearly 60% of the world human population',
      'Birthplace of all major world religions: Hinduism, Buddhism, Judaism, Christianity, Islam',
      'Features the world tallest peak (Everest) and lowest land depression (Dead Sea)',
      'Economic hub with Tokyo, Shanghai, Mumbai, Singapore, and Seoul',
    ],
    primaryLanguages: ['Mandarin Chinese', 'Hindi', 'Arabic', 'Bengali', 'Japanese', 'Russian'],
  },
  {
    id: 'africa',
    name: 'Africa',
    tagline: 'The cradle of humankind with extraordinary biodiversity',
    description:
      'The second-largest continent on Earth, comprising 54 UN member states. Renowned for dramatic natural landscapes, the Sahara Desert, the Nile river, and thousands of unique indigenous languages.',
    countriesCount: 54,
    population: 1420000000,
    areaKm2: 30370000,
    icon: '🌍',
    color: '#F59E0B',
    accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    highestPoint: {
      name: 'Mount Kilimanjaro',
      elevationM: 5895,
      country: 'Tanzania',
    },
    lowestPoint: {
      name: 'Lake Assal',
      elevationM: -155,
      country: 'Djibouti',
    },
    highlights: [
      'Youngest population of any continent with median age under 20',
      'Over 2,000 distinct spoken languages across 54 sovereign nations',
      'Home to the world longest river (Nile) and the largest hot desert (Sahara)',
      'Rich mineral wealth including gold, platinum, diamonds, and cobalt',
    ],
    primaryLanguages: ['Arabic', 'Swahili', 'French', 'English', 'Hausa', 'Yoruba'],
  },
  {
    id: 'europe',
    name: 'Europe',
    tagline: 'A tapestry of storied heritage, arts, and innovation',
    description:
      'Home to 44 UN member states plus the Holy See, Europe offers a dense concentration of cultural, scientific, and architectural history, interconnected through modern democratic institutions.',
    countriesCount: 44,
    population: 745000000,
    areaKm2: 10180000,
    icon: '🌍',
    color: '#3B82F6',
    accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
    highestPoint: {
      name: 'Mount Elbrus',
      elevationM: 5642,
      country: 'Russia',
    },
    lowestPoint: {
      name: 'Caspian Sea Shore',
      elevationM: -28,
      country: 'Russia / Azerbaijan',
    },
    highlights: [
      'Birthplace of Western philosophy, classical music, and the Renaissance',
      'Pioneered modern industrialization and scientific breakthroughs',
      'Extensive transnational mobility with the Schengen Area and the European Union',
      'World-famous museums, architecture, and culinary traditions',
    ],
    primaryLanguages: ['Russian', 'German', 'French', 'English', 'Italian', 'Spanish'],
  },
  {
    id: 'north-america',
    name: 'North America',
    tagline: 'From Arctic tundra to Caribbean coral reefs',
    description:
      'Comprising 23 sovereign nations spanning Canada, the United States, Mexico, Central America, and Caribbean island states. A continent of vast economic influence, expansive biomes, and diverse peoples.',
    countriesCount: 23,
    population: 592000000,
    areaKm2: 24709000,
    icon: '🌎',
    color: '#10B981',
    accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
    highestPoint: {
      name: 'Denali',
      elevationM: 6190,
      country: 'United States',
    },
    lowestPoint: {
      name: 'Death Valley (Badwater Basin)',
      elevationM: -86,
      country: 'United States',
    },
    highlights: [
      'Home to the world largest freshwater lake system: the Great Lakes',
      'Encompasses major global trade routes including the Panama Canal',
      'Stretches across all major climate zones from Polar Arctic to Tropical Rainforests',
      'Produces substantial contributions to global cinema, literature, and technology',
    ],
    primaryLanguages: ['English', 'Spanish', 'French', 'Indigenous languages'],
  },
  {
    id: 'south-america',
    name: 'South America',
    tagline: 'The Amazon basin, the soaring Andes, and vibrant culture',
    description:
      'Comprising 12 sovereign nations, South America is home to the Amazon Rainforest (the planet lungs), the Andes mountain chain (longest continental range), and vibrant musical and cultural festivals.',
    countriesCount: 12,
    population: 430000000,
    areaKm2: 17840000,
    icon: '🌎',
    color: '#06B6D4',
    accentBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900',
    highestPoint: {
      name: 'Aconcagua',
      elevationM: 6961,
      country: 'Argentina',
    },
    lowestPoint: {
      name: 'Laguna del Carbón',
      elevationM: -105,
      country: 'Argentina',
    },
    highlights: [
      'Houses the Amazon River, discharging more water than the next 7 largest rivers combined',
      'Contains Angel Falls (Venezuela), the highest uninterrupted waterfall on Earth (979m)',
      'The Andes mountains span over 7,000 km along the Pacific coast',
      'Rich indigenous heritage intertwined with Portuguese, Spanish, and African influences',
    ],
    primaryLanguages: ['Spanish', 'Portuguese', 'Quechua', 'Guaraní'],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    tagline: 'Islands of the Pacific, ancient coral reefs, and Australasia',
    description:
      'Encompassing 14 sovereign nations including Australia, New Zealand, Papua New Guinea, and island nations of Melanesia, Micronesia, and Polynesia across the southern and western Pacific.',
    countriesCount: 14,
    population: 45000000,
    areaKm2: 8525989,
    icon: '🌏',
    color: '#8B5CF6',
    accentBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
    highestPoint: {
      name: 'Puncak Jaya (Carstensz Pyramid)',
      elevationM: 4884,
      country: 'Indonesia / Papua New Guinea region',
    },
    lowestPoint: {
      name: 'Lake Eyre',
      elevationM: -15,
      country: 'Australia',
    },
    highlights: [
      'The Great Barrier Reef is the largest living coral organism on Earth',
      'Extraordinary endemic wildlife including kangaroos, koalas, platypuses, and kiwis',
      'Master Polynesian navigators traversed thousands of ocean miles using stars and swells',
      'Smallest land area of any inhabited continent, but covers vast ocean territory',
    ],
    primaryLanguages: ['English', 'Tok Pisin', 'Fijian', 'Māori', 'Samoan'],
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    tagline: 'The frozen frontier of international science and peace',
    description:
      'Governed under the Antarctic Treaty System for peaceful scientific research. The coldest, windiest, and driest continent on Earth, covered by an ice sheet holding approximately 70% of the worlds freshwater.',
    countriesCount: 0,
    population: 1200,
    areaKm2: 14200000,
    icon: '🧊',
    color: '#38BDF8',
    accentBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900',
    highestPoint: {
      name: 'Vinson Massif',
      elevationM: 4892,
      country: 'Antarctic Treaty Area',
    },
    lowestPoint: {
      name: 'Deep Lake (Vestfold Hills)',
      elevationM: -50,
      country: 'Antarctic Treaty Area',
    },
    highlights: [
      'No permanent human residents or sovereign countries; governed by international treaty',
      'Holds 90% of all Earth ice and 70% of its freshwater',
      'Temperatures have dropped as low as -89.2°C (-128.6°F) at Vostok Station',
      'Crucial global climate observatory for atmospheric and ice-core science',
    ],
    primaryLanguages: ['English', 'Spanish', 'Russian (Scientific stations)'],
  },
];

export function getContinentById(id: string): Continent | undefined {
  return CONTINENTS.find((c) => c.id === id);
}
