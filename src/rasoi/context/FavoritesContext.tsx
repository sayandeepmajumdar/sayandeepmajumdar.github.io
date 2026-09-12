import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  clearFavorites: () => void;
  count: number;
}

const STORAGE_KEY = 'rasoi:favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['butter-chicken', 'paneer-tikka', 'masala-dosa'];
    } catch {
      return ['butter-chicken', 'paneer-tikka', 'masala-dosa'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to persist favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
