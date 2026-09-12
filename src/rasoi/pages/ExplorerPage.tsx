import React, { useState, useMemo, useEffect } from 'react';
import { Recipe, FilterState } from '../types';
import { RECIPES } from '../data/recipes';
import { SearchBar } from '../components/SearchBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { FilterChips } from '../components/FilterChips';
import { RecipeGrid } from '../components/RecipeGrid';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

interface ExplorerPageProps {
  onSelectRecipe: (recipe: Recipe) => void;
  initialFilters?: Partial<FilterState>;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  onSelectRecipe,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialFilters.searchQuery || '',
    region: initialFilters.region || 'All',
    diet: initialFilters.diet || 'All',
    category: initialFilters.category || 'All',
    difficulty: initialFilters.difficulty || 'All',
    cookingTime: initialFilters.cookingTime || 'All',
    spiceLevel: initialFilters.spiceLevel || 'All',
    sortBy: initialFilters.sortBy || 'popular',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialFilters changes (e.g. user clicked a region from home or footer)
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      setFilters((prev) => ({
        ...prev,
        ...initialFilters,
      }));
    }
  }, [initialFilters]);

  // Actual filtering engine
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // 1. Search Query (across name, ingredients, region, cuisine, category, tags)
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

      // 2. Region / Cuisine Filter
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header Banner */}
      <div className="max-w-3xl mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Recipe Discovery</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
          Explore Indian Recipes
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Filter through regional cuisines, dietary choices, cooking times, and spice preferences
          to find your next delicious homemade meal.
        </p>
      </div>

      {/* Main Search Bar & Quick Suggestion Selector */}
      <div className="mb-6">
        <SearchBar
          value={filters.searchQuery}
          onChange={(searchQuery) => setFilters({ ...filters, searchQuery })}
          onSelectSuggestion={(tag) => setFilters({ ...filters, searchQuery: tag })}
        />
      </div>

      {/* Active Filter Chips */}
      <div className="mb-6">
        <FilterChips
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      {/* Results Controls Bar (Count + Mobile Filter Button + Sorting Dropdown) */}
      <div className="flex items-center justify-between py-4 mb-6 border-y border-stone-200 gap-4">
        {/* Result Counter */}
        <div className="text-stone-800 font-semibold text-sm sm:text-base">
          <span className="font-serif font-black text-rose-950 text-lg sm:text-xl">
            {filteredRecipes.length}
          </span>{' '}
          recipes found
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs sm:text-sm font-bold shadow-2xs hover:bg-stone-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-800" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400 hidden sm:inline" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
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

      {/* Main Content Layout: Sidebar + Recipe Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
          totalFilteredCount={filteredRecipes.length}
        />

        {/* Recipe Grid Area */}
        <div className="flex-1 min-w-0">
          <RecipeGrid
            recipes={filteredRecipes}
            onSelectRecipe={onSelectRecipe}
            onClearFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
};
