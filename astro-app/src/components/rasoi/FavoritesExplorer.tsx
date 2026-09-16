import React, { useState, useEffect } from 'react';
import { RECIPES } from '../../data/rasoi/recipes';
import type { Recipe } from '../../types/rasoi';
import { Compass, Trash2, Heart, Clock, Star, Flame } from 'lucide-react';

const STORAGE_KEY = 'rasoi_favorites_v1';

export const FavoritesExplorer: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      } else {
        setFavoriteIds([]);
      }
    } catch {
      setFavoriteIds([]);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadFavorites();

    const handleUpdate = () => loadFavorites();
    window.addEventListener('favorites-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('favorites-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = favoriteIds.filter((favId) => favId !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFavoriteIds(updated);
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {
      // Ignore
    }
  };

  const clearAllFavorites = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFavoriteIds([]);
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {
      // Ignore
    }
  };

  const favoriteRecipes = RECIPES.filter((r) => favoriteIds.includes(r.id));

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-stone-500">
        <p className="animate-pulse">Loading your saved recipes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      {favoriteRecipes.length > 0 && (
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <span className="text-sm font-semibold text-stone-700">
            Showing <strong className="text-rose-950 font-serif">{favoriteRecipes.length}</strong>{' '}
            saved dish{favoriteRecipes.length === 1 ? '' : 'es'}
          </span>
          <button
            type="button"
            onClick={clearAllFavorites}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-700 py-1.5 px-3 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear recipe box</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      {favoriteRecipes.length === 0 ? (
        <div className="max-w-md mx-auto my-12 text-center p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto text-3xl shadow-2xs">
            🤍
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Your recipe box is empty.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Save dishes you love while exploring, and they'll be safely kept here in your browser for quick access anytime!
            </p>
          </div>

          <div className="pt-3">
            <a
              href="/rasoi/explore/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Explore Recipes</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => {
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

                    <button
                      type="button"
                      onClick={(e) => removeFavorite(recipe.id, e)}
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className="w-4 h-4 fill-white text-white" />
                    </button>

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
  );
};
