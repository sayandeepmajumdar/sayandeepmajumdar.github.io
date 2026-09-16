export type Region =
  | 'North'
  | 'South'
  | 'East'
  | 'West'
  | 'Central'
  | 'Northeast'
  | 'Islands';

export type TravelStyle =
  | 'Relax'
  | 'Adventure'
  | 'History'
  | 'Nature'
  | 'Spiritual'
  | 'Food'
  | 'Photography'
  | 'Romantic'
  | 'Family'
  | 'Backpacking';

export type Category =
  | 'Beach'
  | 'Mountain'
  | 'Heritage'
  | 'Nature'
  | 'Spiritual'
  | 'Adventure'
  | 'Wildlife'
  | 'Food'
  | 'Romantic'
  | 'Weekend';

export interface Destination {
  id: string;
  name: string;
  city?: string;
  state: string;
  region: Region;
  coordinates: {
    x: number;
    y: number;
  };
  description: string;
  categories: string[];
  tags: string[];
  bestTime: string;
  idealDuration: string;
  popularity: number;
  highlights: string[];
  nearbyPlaces: string[];
  travelStyle: string[];
  image: string;
  isTrending?: boolean;
  isHiddenGem?: boolean;
}

export interface StatePath {
  id: string;
  name: string;
  tagline: string;
  d: string;
  center: { x: number; y: number };
  boundingBox: [number, number, number, number]; // [minX, minY, maxX, maxY]
}

export interface FilterState {
  searchQuery: string;
  region: string;
  state: string;
  category: string;
  travelStyle: string;
  season: string;
}

export interface ActiveJourney {
  destination: Destination;
  origin: { x: number; y: number };
  phase:
    | 'idle'
    | 'dimming'
    | 'highlight-state'
    | 'flight-route'
    | 'plane-moving'
    | 'marker-pulse'
    | 'arrived';
}
