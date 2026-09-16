import React, { useState, useEffect } from 'react';
import { Heart, Share2, Printer, Check } from 'lucide-react';

interface RecipeActionsProps {
  recipeId: string;
  recipeName: string;
  recipeDescription: string;
}

const STORAGE_KEY = 'rasoi_favorites_v1';

export const RecipeActions: React.FC<RecipeActionsProps> = ({
  recipeId,
  recipeName,
  recipeDescription,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setIsFavorited(ids.includes(recipeId));
      }
    } catch {
      // Ignore storage errors
    }
  }, [recipeId]);

  const toggleFavorite = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let ids: string[] = stored ? JSON.parse(stored) : [];
      if (ids.includes(recipeId)) {
        ids = ids.filter((id) => id !== recipeId);
        setIsFavorited(false);
      } else {
        ids.push(recipeId);
        setIsFavorited(true);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      // Dispatch custom storage event so other tabs / components update
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {
      // Ignore storage errors
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${recipeName} — Rasoi`,
          text: recipeDescription,
          url: window.location.href,
        })
        .catch(() => {});
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
    <div className="flex items-center gap-2">
      {/* Share Button */}
      <button
        type="button"
        onClick={handleShare}
        className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors shadow-2xs"
        title="Share recipe"
        aria-label="Share recipe"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {copiedShare && (
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
          <Check className="w-3.5 h-3.5" />
          <span>Link copied!</span>
        </span>
      )}

      {/* Print Button */}
      <button
        type="button"
        onClick={handlePrint}
        className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors shadow-2xs"
        title="Print recipe"
        aria-label="Print recipe"
      >
        <Printer className="w-4 h-4" />
      </button>

      {/* Favorite Heart Button */}
      <button
        type="button"
        onClick={toggleFavorite}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs ${
          isFavorited
            ? 'bg-rose-600 text-white shadow-rose-900/20'
            : 'bg-white border border-stone-200 text-stone-800 hover:bg-rose-50 hover:text-rose-900'
        }`}
        aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        <span>{isFavorited ? 'Saved in Box' : 'Save to Favorites'}</span>
      </button>
    </div>
  );
};
