import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedContextType {
  savedIds: string[];
  recentIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  addRecent: (id: string) => void;
  clearRecent: () => void;
  savedCount: number;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

const SAVED_STORAGE_KEY = 'yatra_saved_destinations';
const RECENT_STORAGE_KEY = 'yatra_recent_destinations';

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading saved destinations', e);
      return [];
    }
  });

  const [recentIds, setRecentIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading recent destinations', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.error('Error writing saved destinations', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.error('Error writing recent destinations', e);
    }
  }, [recentIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const addRecent = (id: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 8); // Keep up to 8 most recent
    });
  };

  const clearRecent = () => {
    setRecentIds([]);
  };

  return (
    <SavedContext.Provider
      value={{
        savedIds,
        recentIds,
        toggleSave,
        isSaved,
        addRecent,
        clearRecent,
        savedCount: savedIds.length,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
