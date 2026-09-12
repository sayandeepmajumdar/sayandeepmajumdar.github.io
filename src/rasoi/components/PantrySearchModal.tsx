import React, { useState, useMemo } from 'react';
import { X, ChefHat, Plus, Check, Sparkles, ArrowRight } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { Recipe, PantryMatchResult } from '../types';
import { RecipeCard } from './RecipeCard';

interface PantrySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const PantrySearchModal: React.FC<PantrySearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRecipe,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'potato',
    'onion',
    'tomato',
  ]);
  const [inputVal, setInputVal] = useState('');

  // Common Indian pantry staples for quick 1-click addition
  const commonStaples = [
    'onion',
    'tomato',
    'potato',
    'paneer',
    'ginger',
    'garlic',
    'chicken',
    'spinach',
    'curd',
    'basmati rice',
    'urad dal',
    'toor dal',
    'cauliflower',
    'green peas',
    'mustard seeds',
    'butter',
    'eggplant',
    'flour',
    'chickpeas',
  ];

  const handleAddIngredient = (ing: string) => {
    const clean = ing.trim().toLowerCase();
    if (clean && !selectedIngredients.includes(clean)) {
      setSelectedIngredients([...selectedIngredients, clean]);
    }
    setInputVal('');
  };

  const handleRemoveIngredient = (ing: string) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ing));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddIngredient(inputVal);
    }
  };

  // Match percentage calculation
  const matchedResults: PantryMatchResult[] = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    const userPantry = selectedIngredients.map((i) => i.toLowerCase().trim());

    return RECIPES.map((recipe) => {
      // Gather all distinct ingredient names from the recipe
      const recipeIngredients = recipe.ingredients.flatMap((g) =>
        g.items.map((item) => item.name.toLowerCase())
      );

      // Core main ingredients (ignore water, salt, oil if they dilute match)
      const coreIngredients = Array.from(
        new Set(
          recipeIngredients.filter(
            (name) =>
              !['water', 'salt', 'cooking oil', 'oil', 'ice cold water'].includes(name)
          )
        )
      );

      const matched: string[] = [];
      const missing: string[] = [];

      coreIngredients.forEach((ingName) => {
        const isMatched = userPantry.some(
          (pantryItem) =>
            ingName.includes(pantryItem) || pantryItem.includes(ingName)
        );
        if (isMatched) {
          matched.push(ingName);
        } else {
          missing.push(ingName);
        }
      });

      const totalUnique = coreIngredients.length;
      const matchScore = totalUnique > 0 ? Math.round((matched.length / totalUnique) * 100) : 0;

      return {
        recipe,
        matchScore,
        matchedCount: matched.length,
        totalUniqueIngredients: totalUnique,
        matchedIngredients: matched,
        missingIngredients: missing,
      };
    })
      .filter((res) => res.matchedCount > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedIngredients]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#faf7f2] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-white/80 backdrop-blur-md flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                Cook With What You Have
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm">
                Enter ingredients in your kitchen to find authentic recipes you can make right now.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Ingredient Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Your Pantry Ingredients:
            </label>

            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-white border border-stone-300 focus-within:border-rose-900 focus-within:ring-4 focus-within:ring-rose-900/10 transition-all">
              {selectedIngredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 border border-amber-300/80 text-amber-950 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span className="capitalize">{ing}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ing)}
                    className="p-0.5 rounded-full hover:bg-amber-200 text-amber-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedIngredients.length === 0
                    ? 'Type ingredients (e.g. potato, tomato, paneer) and press Enter...'
                    : 'Add more...'
                }
                className="flex-1 min-w-[140px] border-none outline-none text-sm text-stone-800 placeholder:text-stone-400 bg-transparent px-2 py-1"
              />

              {inputVal.trim() && (
                <button
                  onClick={() => handleAddIngredient(inputVal)}
                  className="px-3 py-1 rounded-xl bg-rose-900 text-white text-xs font-semibold hover:bg-rose-950"
                >
                  Add
                </button>
              )}
            </div>

            {/* Quick Add Staple Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-stone-500 font-medium mr-1">Quick add:</span>
              {commonStaples.map((staple) => {
                const isAdded = selectedIngredients.includes(staple);
                return (
                  <button
                    key={staple}
                    onClick={() =>
                      isAdded ? handleRemoveIngredient(staple) : handleAddIngredient(staple)
                    }
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isAdded
                        ? 'bg-amber-500 text-white border-transparent'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {isAdded ? '✓ ' : '+ '}
                    {staple}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Matching Dishes ({matchedResults.length})
              </h3>
              <span className="text-xs text-stone-500">
                Ranked by highest ingredient match
              </span>
            </div>

            {matchedResults.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-600 text-sm">
                  No recipes found with these ingredients. Try adding staples like onion, tomato,
                  or potato!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchedResults.slice(0, 9).map(({ recipe, matchScore, missingIngredients }) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      onSelectRecipe(recipe);
                      onClose();
                    }}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Match Percentage Badge */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-md flex items-center gap-1">
                        <span>{matchScore}% match</span>
                      </div>
                      <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 text-amber-300 text-[11px] font-semibold backdrop-blur-xs">
                        {recipe.region}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 group-hover:text-rose-900 transition-colors line-clamp-1">
                          {recipe.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                          {recipe.totalTime} mins • {recipe.difficulty}
                        </p>
                      </div>

                      {missingIngredients.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                          <span className="font-semibold text-stone-700">Missing: </span>
                          <span className="line-clamp-1 capitalize">
                            {missingIngredients.slice(0, 3).join(', ')}
                            {missingIngredients.length > 3 ? '...' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
