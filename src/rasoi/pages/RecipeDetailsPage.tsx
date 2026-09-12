import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { getSimilarRecipes } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';
import { ServingsScaler } from '../components/ServingsScaler';
import { RecipeCard } from '../components/RecipeCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  Clock,
  Star,
  Flame,
  ChefHat,
  ArrowLeft,
  Heart,
  Share2,
  Printer,
  Sparkles,
  Lightbulb,
  Repeat,
  UtensilsCrossed,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface RecipeDetailsPageProps {
  recipe: Recipe;
  onBack: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = ({
  recipe,
  onBack,
  onSelectRecipe,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);
  const [servings, setServings] = useState(recipe.servings);
  const [copiedShare, setCopiedShare] = useState(false);

  // Reset servings when switching recipes
  useEffect(() => {
    setServings(recipe.servings);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipe]);

  const isVeg = recipe.diet.includes('Vegetarian') || recipe.diet.includes('Vegan');
  const similarRecipes = getSimilarRecipes(recipe, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${recipe.name} — Rasoi`,
        text: recipe.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Navigation Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <a
          href="/rasoi/explore/"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 hover:text-rose-900 transition-colors py-2 px-3 rounded-xl hover:bg-rose-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors shadow-2xs"
            title="Share recipe"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copiedShare && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Link copied!
            </span>
          )}

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors shadow-2xs"
            title="Print recipe"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Favorite Heart Button */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs ${
              favorited
                ? 'bg-rose-600 text-white shadow-rose-900/20'
                : 'bg-white border border-stone-200 text-stone-800 hover:bg-rose-50 hover:text-rose-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
            <span>{favorited ? 'Saved in Box' : 'Save to Favorites'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header: Title, Badges, Rating */}
      <div className="space-y-4">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Veg/Non-Veg Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isVeg
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-600' : 'bg-rose-700'}`}
            />
            {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {recipe.region}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            {recipe.category}
          </span>
        </div>

        {/* Recipe Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          {recipe.name}
        </h1>

        {/* Rating and Reviews */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
          <div className="flex items-center gap-1.5 text-amber-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(recipe.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-stone-200 text-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-stone-900 ml-1">{recipe.rating.toFixed(1)}</span>
            <span className="text-xs text-stone-500">
              ({recipe.ratingCount.toLocaleString()} ratings)
            </span>
          </div>

          <span className="text-stone-300">•</span>

          <span className="text-stone-600 text-xs sm:text-sm font-medium">
            Cuisine: <span className="font-semibold text-stone-900">{recipe.cuisine}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
          {recipe.description}
        </p>
      </div>

      {/* Large Hero Food Photography */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-100">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          dishName={recipe.name}
          categoryName={recipe.category}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Key Information Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <Clock className="w-5 h-5 mx-auto text-amber-600 mb-1.5" />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Prep Time
          </span>
          <span className="font-serif font-black text-lg text-stone-900">{recipe.prepTime} min</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <Clock className="w-5 h-5 mx-auto text-orange-600 mb-1.5" />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Cook Time
          </span>
          <span className="font-serif font-black text-lg text-stone-900">{recipe.cookTime} min</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <Clock className="w-5 h-5 mx-auto text-rose-700 mb-1.5" />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Total Time
          </span>
          <span className="font-serif font-black text-lg text-rose-950">{recipe.totalTime} min</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <UtensilsCrossed className="w-5 h-5 mx-auto text-amber-600 mb-1.5" />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Servings
          </span>
          <span className="font-serif font-black text-lg text-stone-900">{servings}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <ChefHat className="w-5 h-5 mx-auto text-stone-600 mb-1.5" />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Difficulty
          </span>
          <span className="font-serif font-black text-lg text-stone-900">{recipe.difficulty}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <Flame
            className={`w-5 h-5 mx-auto mb-1.5 ${
              recipe.spiceLevel === 'Spicy'
                ? 'text-rose-600 fill-rose-600'
                : recipe.spiceLevel === 'Medium'
                ? 'text-amber-500 fill-amber-500'
                : 'text-stone-400'
            }`}
          />
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Spice Level
          </span>
          <span className="font-serif font-black text-lg text-stone-900">{recipe.spiceLevel}</span>
        </div>
      </div>

      {/* Main Recipe Content: Ingredients & Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        {/* Left Column: Ingredients Checklist (5 Cols) */}
        <section className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Ingredients</h2>
          </div>

          <ServingsScaler
            baseServings={recipe.servings}
            currentServings={servings}
            onServingsChange={setServings}
            ingredients={recipe.ingredients}
          />
        </section>

        {/* Right Column: Step-by-Step Cooking Instructions (7 Cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Cooking Instructions</h2>
          </div>

          <div className="space-y-6">
            {recipe.instructions.map((step) => (
              <div
                key={step.step}
                className="relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-amber-300 transition-colors"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-900 to-amber-600 text-white font-serif font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                  {step.step < 10 ? `0${step.step}` : step.step}
                </div>

                {/* Step Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      {step.title}
                    </h3>
                    {step.timeMinutes && (
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.timeMinutes}m
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {step.instruction}
                  </p>

                  {/* Sensory Cue / Visual Indicator */}
                  {step.cue && (
                    <div className="flex items-start gap-2 pt-1 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-amber-950">Visual Cue:</strong>{' '}
                        {step.cue}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Advisory Cards: Chef's Tips & Substitutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Chef's Pro Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-lg">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3>Chef's Authentic Tips</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-stone-700">
              {recipe.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ingredient Substitutions */}
        {recipe.substitutions && recipe.substitutions.length > 0 && (
          <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-950 font-serif font-bold text-lg">
              <Repeat className="w-5 h-5 text-rose-700" />
              <h3>Smart Substitutions</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-stone-700">
              {recipe.substitutions.map((sub, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-700 shrink-0 mt-2" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Serving Suggestions & Nutrition Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Serving Suggestions */}
        {recipe.servingSuggestions && recipe.servingSuggestions.length > 0 && (
          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
              <UtensilsCrossed className="w-5 h-5 text-amber-600" />
              <h3>Serving Suggestions & Pairings</h3>
            </div>
            <ul className="space-y-2 text-sm text-stone-700">
              {recipe.servingSuggestions.map((sugg, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{sugg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nutrition Estimates */}
        {recipe.nutrition && (
          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                <Activity className="w-5 h-5 text-rose-700" />
                <h3>Estimated Nutrition</h3>
              </div>
              <span className="text-xs text-stone-400 font-medium">Per Serving</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="block text-xs font-semibold text-stone-500">Calories</span>
                <span className="font-serif font-bold text-base text-rose-950">
                  {recipe.nutrition.calories}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="block text-xs font-semibold text-stone-500">Protein</span>
                <span className="font-serif font-bold text-base text-stone-900">
                  {recipe.nutrition.protein}g
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="block text-xs font-semibold text-stone-500">Carbs</span>
                <span className="font-serif font-bold text-base text-stone-900">
                  {recipe.nutrition.carbs}g
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="block text-xs font-semibold text-stone-500">Fat</span>
                <span className="font-serif font-bold text-base text-stone-900">
                  {recipe.nutrition.fat}g
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Similar Recipes Recommendations */}
      {similarRecipes.length > 0 && (
        <section className="pt-10 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Similar Recipes</h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Other delicious dishes you might enjoy from {recipe.region} and {recipe.category}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarRecipes.map((item) => (
              <RecipeCard key={item.id} recipe={item} onSelect={onSelectRecipe} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
