import React from 'react';
import {
  Compass,
  Mountain,
  Landmark,
  TreePine,
  Sparkles,
  Utensils,
  Camera,
  Heart,
  Users,
  Backpack,
} from 'lucide-react';
import { TravelStyle } from '../types';

interface TravelStylesCarouselProps {
  selectedStyle?: string;
  onSelectStyle: (style: TravelStyle) => void;
}

interface StyleCard {
  id: TravelStyle;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  gradient: string;
}

const STYLES: StyleCard[] = [
  {
    id: 'Adventure',
    label: 'Adventure',
    icon: Mountain,
    tagline: 'Trekking & Rafting',
    gradient: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
  },
  {
    id: 'Spiritual',
    label: 'Spiritual',
    icon: Sparkles,
    tagline: 'Ghats & Ashrams',
    gradient: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
  },
  {
    id: 'History',
    label: 'Heritage',
    icon: Landmark,
    tagline: 'Forts & Palaces',
    gradient: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
  },
  {
    id: 'Nature',
    label: 'Nature',
    icon: TreePine,
    tagline: 'Lakes & Forests',
    gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  },
  {
    id: 'Food',
    label: 'Culinary',
    icon: Utensils,
    tagline: 'Street Food & Spices',
    gradient: 'from-rose-500/20 to-orange-500/20 border-rose-500/30',
  },
  {
    id: 'Romantic',
    label: 'Romantic',
    icon: Heart,
    tagline: 'Lakes & Quiet Hills',
    gradient: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  },
  {
    id: 'Photography',
    label: 'Visual Trails',
    icon: Camera,
    tagline: 'Golden Hour Vistas',
    gradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  },
  {
    id: 'Backpacking',
    label: 'Backpacking',
    icon: Backpack,
    tagline: 'Hostels & Valleys',
    gradient: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30',
  },
  {
    id: 'Family',
    label: 'Family Getaways',
    icon: Users,
    tagline: 'Safe, Memorable Escapes',
    gradient: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  },
  {
    id: 'Relax',
    label: 'Slow Travel',
    icon: Compass,
    tagline: 'Backwaters & Coastal',
    gradient: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30',
  },
];

export const TravelStylesCarousel: React.FC<TravelStylesCarouselProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            How do you want to travel?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
            Discover destinations shaped around your rhythm and passions
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
        {STYLES.map((style) => {
          const Icon = style.icon;
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={`flex-shrink-0 snap-start p-4 rounded-2xl glass-card border transition-all duration-300 w-44 sm:w-48 text-left group active:scale-95 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                  : 'hover:border-white/20'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-white/10 text-stone-300 group-hover:bg-amber-500/20 group-hover:text-amber-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">
                {style.label}
              </div>
              <div className="text-[11px] text-stone-400 truncate mt-0.5">
                {style.tagline}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
