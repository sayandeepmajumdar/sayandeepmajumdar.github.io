import React from 'react';
import { Clock, Star, Flame, Heart } from 'lucide-react';
import { Recipe } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { ImageWithFallback } from './ImageWithFallback';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  priority?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, priority = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  const isVeg = recipe.diet.includes('Vegetarian') || recipe.diet.includes('Vegan');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(recipe.id);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-stone-700 bg-stone-50 border-stone-200';
    }
  };

  return (
    <article className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col select-none">
      <a
        href={`/rasoi/recipe/${recipe.slug}/`}
        onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            onSelect(recipe);
          }
        }}
        className="flex-1 flex flex-col h-full text-inherit no-underline"
      >
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          dishName={recipe.name}
          categoryName={recipe.category}
          className="w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
          fetchPriority={priority ? 'high' : undefined}
        />

        {/* Subtle Dark Gradient Overlay for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges: Region + Veg/Non-Veg */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {/* Indian Vegetarian / Non-Vegetarian Indicator */}
          <div
            className={`w-6 h-6 rounded-md bg-white/95 backdrop-blur-xs flex items-center justify-center border shadow-xs ${
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

          {/* Region Tag */}
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900/80 text-amber-300 backdrop-blur-md shadow-xs border border-white/10">
            {recipe.region}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md ${
            favorited
              ? 'bg-rose-600 text-white scale-110 shadow-rose-900/30'
              : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              favorited ? 'fill-white text-white' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Bottom Image Bar: Category & Total Time */}
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

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-stone-900">{recipe.rating.toFixed(1)}</span>
              <span className="text-[11px] text-stone-400 font-normal">
                ({recipe.ratingCount.toLocaleString()})
              </span>
            </div>

            {/* Spice Level Indicator */}
            <div
              className="flex items-center gap-0.5 text-xs font-semibold text-stone-600"
              title={`Spice Level: ${recipe.spiceLevel}`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  recipe.spiceLevel === 'Spicy'
                    ? 'fill-rose-500 text-rose-500'
                    : recipe.spiceLevel === 'Medium'
                    ? 'fill-amber-500 text-amber-500'
                    : 'fill-stone-300 text-stone-300'
                }`}
              />
              <span
                className={`text-[11px] ${
                  recipe.spiceLevel === 'Spicy'
                    ? 'text-rose-700 font-bold'
                    : recipe.spiceLevel === 'Medium'
                    ? 'text-amber-800'
                    : 'text-stone-500'
                }`}
              >
                {recipe.spiceLevel}
              </span>
            </div>
          </div>

          {/* Recipe Name */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-900 transition-colors line-clamp-1 leading-snug">
            {recipe.name}
          </h3>

          {/* Description snippet */}
          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
            {recipe.description}
          </p>
        </div>

        {/* Footer Info: Difficulty & Prep/Cook Pill */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span
            className={`px-2 py-0.5 rounded-md font-semibold border text-[11px] ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </span>
          <span className="text-stone-400 text-[11px] font-medium group-hover:text-rose-800 transition-colors flex items-center gap-1 font-sans">
            View Recipe →
          </span>
        </div>
      </div>
      </a>
    </article>
  );
};
