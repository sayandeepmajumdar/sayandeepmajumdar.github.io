import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { RECIPES } from '../data/recipes';
import { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { Heart, Compass, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesPageProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onSelectRecipe, onNavigate }) => {
  const { favorites, clearFavorites, count } = useFavorites();

  const favoriteRecipes = RECIPES.filter((r) => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-900 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>My Recipe Box</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Saved Favorite Recipes
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Your personal collection of favorite Indian dishes, saved right in your browser.
          </p>
        </div>

        {count > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-700 py-1.5 px-3 rounded-lg hover:bg-rose-50 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear recipe box</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      {favoriteRecipes.length === 0 ? (
        /* Empty State */
        <div className="max-w-md mx-auto my-12 text-center p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
            🤍
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Your recipe box is empty.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Save recipes you love and they'll appear here.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onNavigate('/explore')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Explore Recipes</span>
            </button>
          </div>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelectRecipe} />
          ))}
        </div>
      )}
    </div>
  );
};
