import React from 'react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Sparkles, RotateCcw } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onClearFilters?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  onSelectRecipe,
  onClearFilters,
  emptyTitle = 'No recipes found',
  emptyMessage = 'Try a different ingredient, cuisine or recipe name.',
}) => {
  if (recipes.length === 0) {
    return (
      <div className="w-full py-16 px-4 text-center bg-white rounded-3xl border border-stone-200/80 shadow-xs max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">
          🍲
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">{emptyTitle}</h3>
        <p className="text-stone-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          {emptyMessage}
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white text-sm font-semibold shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelect={onSelectRecipe}
          priority={index < 4}
        />
      ))}
    </div>
  );
};
