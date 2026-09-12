import React, { useState } from 'react';
import {
  getPopularRecipes,
  getQuickAndEasyRecipes,
  getVegetarianFavorites,
  getNonVegetarianFavorites,
  REGIONS,
} from '../data/recipes';
import { Recipe, Region } from '../types';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Compass,
  ChefHat,
  Leaf,
  Drumstick,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
  onSelectRegion: (region: Region) => void;
  onOpenPantryModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectRecipe,
  onNavigate,
  onSearchSubmit,
  onSelectRegion,
  onOpenPantryModal,
}) => {
  const [heroSearch, setHeroSearch] = useState('');

  const popularRecipes = getPopularRecipes();
  const quickRecipes = getQuickAndEasyRecipes(30).slice(0, 4);
  const vegFavorites = getVegetarianFavorites().slice(0, 4);
  const nonVegFavorites = getNonVegetarianFavorites().slice(0, 4);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (heroSearch.trim()) {
      onSearchSubmit(heroSearch);
      onNavigate('/explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRegionClick = (region: Region) => {
    onSelectRegion(region);
    onNavigate('/explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Regional highlights metadata
  const regionMeta: Record<Region, { emoji: string; highlight: string; count: number }> = {
    'North Indian': { emoji: '🍲', highlight: 'Rich gravies & tandoor', count: 16 },
    'South Indian': { emoji: '🥥', highlight: 'Crispy dosas & sambar', count: 10 },
    'Bengali': { emoji: '🐟', highlight: 'Mustard fish & sweets', count: 4 },
    'Punjabi': { emoji: '🫓', highlight: 'Chole bhature & saag', count: 4 },
    'Gujarati': { emoji: '🧆', highlight: 'Dhokla, thepla & snacks', count: 3 },
    'Maharashtrian': { emoji: '🌶️', highlight: 'Pav bhaji, vada pav & misal', count: 4 },
    'Hyderabadi': { emoji: '🍗', highlight: 'Nizami dum biryanis', count: 3 },
    'Rajasthani': { emoji: '👑', highlight: 'Dal baati & gatte', count: 2 },
    'Kashmiri': { emoji: '🏔️', highlight: 'Rogan josh & dum aloo', count: 2 },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Visually Impressive Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f3eb] via-[#faf7f2] to-white pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-stone-200/60">
        {/* Decorative Indian Mandala/Glow Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-br from-amber-200/40 via-rose-200/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-300/20 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/10 border border-rose-900/20 text-rose-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>100% Authentic Regional Flavors</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
            Indian food. <span className="text-rose-900">Real recipes.</span>{' '}
            <span className="bg-gradient-to-r from-amber-600 to-rose-700 bg-clip-text text-transparent">
              Made simple.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-stone-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Explore authentic Indian dishes with clear ingredients, precise measurements, and
            step-by-step cooking instructions.
          </p>

          {/* Large Hero Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form onSubmit={handleSearchSubmit}>
              <SearchBar
                value={heroSearch}
                onChange={setHeroSearch}
                placeholder="Search for a recipe, ingredient or cuisine..."
                onSelectSuggestion={(suggestion) => {
                  setHeroSearch(suggestion);
                  onSearchSubmit(suggestion);
                  onNavigate('/explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="/rasoi/explore/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-950/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Explore Recipes</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('browse-cuisines');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm sm:text-base border border-stone-300 shadow-sm hover:border-amber-500 hover:scale-105 active:scale-95 transition-all"
            >
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span>Browse Categories</span>
            </button>
          </div>

          {/* Quick Platform Stats */}
          <div className="pt-6 grid grid-cols-3 max-w-lg mx-auto divide-x divide-stone-200 text-center">
            <div>
              <span className="block font-serif font-black text-2xl sm:text-3xl text-rose-950">
                50+
              </span>
              <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">
                Authentic Dishes
              </span>
            </div>
            <div>
              <span className="block font-serif font-black text-2xl sm:text-3xl text-rose-950">
                9
              </span>
              <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">
                Cuisine Regions
              </span>
            </div>
            <div>
              <span className="block font-serif font-black text-2xl sm:text-3xl text-rose-950">
                100%
              </span>
              <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">
                Client-Side Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Indian Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-900 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Most Loved by Foodies</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Popular Indian Recipes
            </h2>
          </div>

          <a
            href="/rasoi/explore/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-sm font-bold text-rose-900 hover:text-rose-950 hover:underline self-start sm:self-auto"
          >
            <span>View All Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Core Popular Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.map((recipe, idx) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              priority={idx < 3}
            />
          ))}
        </div>
      </section>

      {/* 3. Browse by Cuisine Section */}
      <section id="browse-cuisines" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Culinary Map of India</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Browse by Cuisine & Region
          </h2>
          <p className="text-stone-600 text-sm">
            Travel from Punjab's rich butter curries to coastal Bengal and fragrant southern coconut dishes.
          </p>
        </div>

        {/* Regional Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {REGIONS.map((region) => {
            const meta = regionMeta[region];
            return (
              <div
                key={region}
                onClick={() => handleRegionClick(region)}
                className="group relative p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-3xl shadow-xs transition-colors group-hover:scale-110 duration-300">
                    {meta.emoji}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-stone-100 group-hover:bg-rose-100 group-hover:text-rose-900 text-stone-600 text-xs font-bold transition-colors">
                    {meta.count} dishes
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 group-hover:text-rose-900 transition-colors">
                    {region}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">{meta.highlight}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800 group-hover:text-rose-900">
                  <span>Explore region</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Pantry Matcher Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Smart Pantry Assistant</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Cook with what you have in your kitchen
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Have potatoes, onions, tomatoes, or paneer? Tell Rasoi what's in your pantry, and we'll
              instantly calculate matching authentic recipes with ingredient match percentages.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenPantryModal}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>Try Pantry Matcher</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-8xl opacity-10 select-none pointer-events-none hidden md:block">
            🥘
          </div>
        </div>
      </section>

      {/* 5. Quick & Easy (< 30 min) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Fast & Delicious</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Quick & Easy Indian Recipes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Ready in 30 minutes or less with straightforward steps.
            </p>
          </div>

          <a
            href="/rasoi/explore/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-rose-900 hover:underline flex items-center gap-1"
          >
            <span>See more quick dishes</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelectRecipe} />
          ))}
        </div>
      </section>

      {/* 6. Vegetarian Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Plant-Based & Pure Veg</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Vegetarian Favorites
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Paneer classics, hearty lentils, and aromatic vegetable curries.
            </p>
          </div>

          <a
            href="/rasoi/explore/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>Explore all vegetarian</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vegFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelectRecipe} />
          ))}
        </div>
      </section>

      {/* 7. Non-Vegetarian Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-rose-900 text-xs font-bold uppercase tracking-wider mb-1">
              <Drumstick className="w-4 h-4 text-rose-700" />
              <span>Tandoori, Curries & Biryanis</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Non-Vegetarian Favorites
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Smoky tandoori grills, rich chicken curries, and slow-cooked Nizami biryanis.
            </p>
          </div>

          <a
            href="/rasoi/explore/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-rose-900 hover:underline flex items-center gap-1"
          >
            <span>Explore all non-vegetarian</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nonVegFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelectRecipe} />
          ))}
        </div>
      </section>
    </div>
  );
};
