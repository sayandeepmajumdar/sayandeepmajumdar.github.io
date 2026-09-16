import React, { useState, useMemo, useEffect } from 'react';
import type { Recipe, FilterState, Region, DietType, Category, Difficulty, SpiceLevel } from '../../types/rasoi';
import { RECIPES, REGIONS, CATEGORIES, DIETS } from '../../data/rasoi/recipes';
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Clock,
  Flame,
  ChefHat,
  Star,
  Sparkles,
} from 'lucide-react';

export const RecipeExplorer: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: 'All',
    diet: 'All',
    category: 'All',
    difficulty: 'All',
    cookingTime: 'All',
    spiceLevel: 'All',
    sortBy: 'popular',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize from URL search parameters if present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      const regionParam = params.get('region');
      const dietParam = params.get('diet');
      const categoryParam = params.get('category');
      const spiceParam = params.get('spice');

      setFilters((prev) => ({
        ...prev,
        searchQuery: q || prev.searchQuery,
        region: (REGIONS.includes(regionParam as Region) ? regionParam : 'All') as Region | 'All',
        diet: (DIETS.includes(dietParam as DietType) ? dietParam : 'All') as DietType | 'All',
        category: (CATEGORIES.includes(categoryParam as Category) ? categoryParam : 'All') as Category | 'All',
        spiceLevel: (['Mild', 'Medium', 'Spicy'].includes(spiceParam as any) ? spiceParam : 'All') as SpiceLevel | 'All',
      }));
    } catch {
      // Ignore
    }
  }, []);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      region: 'All',
      diet: 'All',
      category: 'All',
      difficulty: 'All',
      cookingTime: 'All',
      spiceLevel: 'All',
      sortBy: 'popular',
    });
  };

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = recipe.name.toLowerCase().includes(query);
        const matchesRegion = recipe.region.toLowerCase().includes(query);
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(query);
        const matchesCategory = recipe.category.toLowerCase().includes(query);
        const matchesTags = recipe.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesIngredients = recipe.ingredients.some((group) =>
          group.items.some((item) => item.name.toLowerCase().includes(query))
        );

        if (
          !matchesName &&
          !matchesRegion &&
          !matchesCuisine &&
          !matchesCategory &&
          !matchesTags &&
          !matchesIngredients
        ) {
          return false;
        }
      }

      // 2. Region Filter
      if (filters.region !== 'All' && recipe.region !== filters.region) {
        return false;
      }

      // 3. Diet Filter
      if (filters.diet !== 'All' && !recipe.diet.includes(filters.diet)) {
        return false;
      }

      // 4. Category Filter
      if (filters.category !== 'All' && recipe.category !== filters.category) {
        return false;
      }

      // 5. Difficulty Filter
      if (filters.difficulty !== 'All' && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      // 6. Cooking Time Filter
      if (filters.cookingTime !== 'All') {
        if (filters.cookingTime === 'Under 30 min' && recipe.totalTime > 30) return false;
        if (
          filters.cookingTime === '30–60 min' &&
          (recipe.totalTime <= 30 || recipe.totalTime > 60)
        )
          return false;
        if (filters.cookingTime === 'Over 60 min' && recipe.totalTime <= 60) return false;
      }

      // 7. Spice Level Filter
      if (filters.spiceLevel !== 'All' && recipe.spiceLevel !== filters.spiceLevel) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'quickest':
          return a.totalTime - b.totalTime;
        case 'rating':
          return b.rating - a.rating;
        case 'az':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return b.ratingCount - a.ratingCount;
      }
    });
  }, [filters]);

  const hasActiveFilters =
    filters.region !== 'All' ||
    filters.diet !== 'All' ||
    filters.category !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.cookingTime !== 'All' ||
    filters.spiceLevel !== 'All' ||
    filters.searchQuery !== '';

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const spiceLevels: SpiceLevel[] = ['Mild', 'Medium', 'Spicy'];
  const timeOptions: FilterState['cookingTime'][] = [
    'All',
    'Under 30 min',
    '30–60 min',
    'Over 60 min',
  ];

  const popularTags = [
    'paneer',
    'biryani',
    'chicken',
    'tandoori',
    'dosa',
    'dal',
    'street food',
    'dessert',
  ];

  const sidebarContent = (
    <div className="space-y-6 text-sm text-stone-800">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-rose-800" />
          <h2 className="font-serif font-bold text-base text-stone-900">Filter Recipes</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs text-rose-800 hover:text-rose-950 font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all</span>
          </button>
        )}
      </div>

      {/* 1. Region */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Cuisine / Region
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('region', 'All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filters.region === 'All'
                ? 'bg-rose-900 text-white shadow-2xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Regions
          </button>
          {REGIONS.map((region) => (
            <button
              type="button"
              key={region}
              onClick={() => updateFilter('region', filters.region === region ? 'All' : region)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.region === region
                  ? 'bg-rose-900 text-white shadow-2xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Diet */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Dietary Preference
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('diet', 'All')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
              filters.diet === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Diets
          </button>
          {DIETS.map((diet) => (
            <button
              type="button"
              key={diet}
              onClick={() => updateFilter('diet', filters.diet === diet ? 'All' : diet)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                filters.diet === diet
                  ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {diet === 'Vegetarian' && '🟢 '}
              {diet === 'Non-Vegetarian' && '🔴 '}
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Course &amp; Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('category', 'All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filters.category === 'All'
                ? 'bg-rose-900 text-white shadow-2xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Courses
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => updateFilter('category', filters.category === cat ? 'All' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-rose-900 text-white shadow-2xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Cooking Time */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Cooking Time</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {timeOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => updateFilter('cookingTime', opt)}
              className={`px-2.5 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.cookingTime === opt
                  ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Spice Level */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Spice Level</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('spiceLevel', 'All')}
            className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
              filters.spiceLevel === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All
          </button>
          {spiceLevels.map((spice) => (
            <button
              type="button"
              key={spice}
              onClick={() => updateFilter('spiceLevel', filters.spiceLevel === spice ? 'All' : spice)}
              className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.spiceLevel === spice
                  ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {spice}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Difficulty */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <ChefHat className="w-3.5 h-3.5 text-stone-400" />
          <span>Difficulty</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('difficulty', 'All')}
            className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
              filters.difficulty === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All
          </button>
          {difficulties.map((diff) => (
            <button
              type="button"
              key={diff}
              onClick={() => updateFilter('difficulty', filters.difficulty === diff ? 'All' : diff)}
              className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.difficulty === diff
                  ? 'bg-rose-900 text-white border-rose-900 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="Search by recipe title, cuisine, ingredient (e.g. paneer, mustard, biryani)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base shadow-2xs focus:outline-none focus:border-rose-900 focus:ring-4 focus:ring-rose-900/10 transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 font-medium">Trending:</span>
          {popularTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => updateFilter('searchQuery', tag)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 hover:text-rose-900 border border-stone-200 text-stone-600 font-medium transition-colors shadow-2xs capitalize"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white/70 border border-stone-200/90 text-xs">
          <span className="font-bold text-stone-600 uppercase tracking-wider">Active:</span>
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 font-semibold">
              Search: "{filters.searchQuery}"
              <button
                type="button"
                onClick={() => updateFilter('searchQuery', '')}
                className="hover:text-rose-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.region !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-950 font-semibold">
              Region: {filters.region}
              <button
                type="button"
                onClick={() => updateFilter('region', 'All')}
                className="hover:text-amber-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.diet !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold">
              Diet: {filters.diet}
              <button
                type="button"
                onClick={() => updateFilter('diet', 'All')}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-800 font-semibold">
              Category: {filters.category}
              <button
                type="button"
                onClick={() => updateFilter('category', 'All')}
                className="hover:text-stone-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.cookingTime !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-950 font-semibold">
              Time: {filters.cookingTime}
              <button
                type="button"
                onClick={() => updateFilter('cookingTime', 'All')}
                className="hover:text-orange-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.spiceLevel !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-950 font-semibold">
              Spice: {filters.spiceLevel}
              <button
                type="button"
                onClick={() => updateFilter('spiceLevel', 'All')}
                className="hover:text-rose-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.difficulty !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-800 font-semibold">
              Difficulty: {filters.difficulty}
              <button
                type="button"
                onClick={() => updateFilter('difficulty', 'All')}
                className="hover:text-stone-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleResetFilters}
            className="ml-auto text-xs font-semibold text-rose-800 hover:text-rose-950 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Control bar: Count + Mobile Filter + Sort */}
      <div className="flex items-center justify-between py-4 border-y border-stone-200 gap-4">
        <div className="text-stone-800 font-semibold text-sm sm:text-base">
          <span className="font-serif font-black text-rose-950 text-lg sm:text-xl">
            {filteredRecipes.length}
          </span>{' '}
          dish{filteredRecipes.length === 1 ? '' : 'es'} found
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs sm:text-sm font-bold shadow-2xs hover:bg-stone-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-800" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400 hidden sm:inline" />
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
              aria-label="Sort recipes"
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs focus:border-rose-800 outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="quickest">Quickest</option>
              <option value="rating">Highest Rated</option>
              <option value="az">A–Z Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-stone-200/80 shadow-2xs">
            {sidebarContent}
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />
            <div className="relative ml-auto w-full max-w-sm h-full bg-[#faf7f2] shadow-2xl p-6 overflow-y-auto z-10 animate-in slide-in-from-right duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                  <span className="font-serif font-bold text-lg text-stone-900">
                    Filters ({filteredRecipes.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-2 rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {sidebarContent}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 sticky bottom-0 bg-[#faf7f2] pb-2">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm shadow-md"
                >
                  Show {filteredRecipes.length} Recipes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipe Grid Area */}
        <div className="flex-1 min-w-0">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl">
                🍲
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                No recipes match your filters
              </h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Try loosening your filters, choosing a different region, or searching for a general ingredient.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-semibold text-xs transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => {
                const isVeg = recipe.diet.includes('Vegetarian') || recipe.diet.includes('Vegan');
                return (
                  <article
                    key={recipe.id}
                    className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col select-none"
                  >
                    <a
                      href={`/rasoi/recipe/${recipe.slug}/`}
                      className="flex-1 flex flex-col h-full text-inherit no-underline"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20 pointer-events-none" />

                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-md bg-white/95 backdrop-blur-xs flex items-center justify-center border shadow-2xs ${
                              isVeg ? 'border-emerald-600' : 'border-rose-700'
                            }`}
                            title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                              }`}
                            />
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900/80 text-amber-300 backdrop-blur-md shadow-2xs border border-white/10">
                            {recipe.region}
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                          <span className="bg-stone-900/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-stone-200">
                            {recipe.category}
                          </span>
                          <div className="flex items-center gap-1 bg-stone-900/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-amber-300 font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{recipe.totalTime} min</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-bold text-stone-900">
                                {recipe.rating.toFixed(1)}
                              </span>
                              <span className="text-[11px] text-stone-400 font-normal">
                                ({recipe.ratingCount.toLocaleString()})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-semibold">
                              <Flame
                                className={`w-3.5 h-3.5 ${
                                  recipe.spiceLevel === 'Spicy'
                                    ? 'fill-rose-500 text-rose-500'
                                    : recipe.spiceLevel === 'Medium'
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'fill-stone-300 text-stone-300'
                                }`}
                              />
                              <span className="text-[11px] text-stone-600">{recipe.spiceLevel}</span>
                            </div>
                          </div>

                          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-900 transition-colors line-clamp-1 leading-snug">
                            {recipe.name}
                          </h3>
                          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
                            {recipe.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded-md font-semibold border text-[11px] text-stone-700 bg-stone-50 border-stone-200">
                            {recipe.difficulty}
                          </span>
                          <span className="text-stone-500 text-[11px] font-semibold group-hover:text-rose-900 transition-colors">
                            View Recipe →
                          </span>
                        </div>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
