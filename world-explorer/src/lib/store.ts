'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgressState, SpacedRepetitionRecord } from './types';
import { getTodayDateString } from './utils';

const STORAGE_KEY = 'world_explorer_progress_v1';

const INITIAL_STATE: UserProgressState = {
  learnedCountryIds: ['japan', 'france', 'brazil'], // starter sample so first visit has some visual discovery
  learnedFlagIds: ['japan', 'france', 'brazil'],
  quizzesTaken: 3,
  quizScoreSum: 3,
  currentStreak: 1,
  bestStreak: 1,
  lastActiveDate: getTodayDateString(),
  unlockedBadgeIds: ['first_step'],
  completedDailyDates: [],
  spacedRepetition: {
    japan: {
      countryId: 'japan',
      correctCount: 2,
      incorrectCount: 0,
      lastTested: Date.now() - 86400000,
      intervalDays: 3,
      easeFactor: 2.5,
      nextReviewDate: Date.now() + 86400000 * 2,
    },
    brazil: {
      countryId: 'brazil',
      correctCount: 1,
      incorrectCount: 1,
      lastTested: Date.now() - 86400000 * 2,
      intervalDays: 1,
      easeFactor: 2.1,
      nextReviewDate: Date.now() - 1000, // Due for review!
    },
  },
};

function loadStoredState(): UserProgressState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STATE, ...parsed };
  } catch {
    return INITIAL_STATE;
  }
}

function saveStoredState(state: UserProgressState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
}

// Global subscribers for reactive multi-component sync without heavy context boilerplate
const listeners = new Set<() => void>();
let globalState: UserProgressState = INITIAL_STATE;
let isInitialized = false;

function notifyListeners() {
  saveStoredState(globalState);
  listeners.forEach((l) => l());
}

export function useLearningProgress() {
  const [state, setState] = useState<UserProgressState>(globalState);

  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined') {
      globalState = loadStoredState();
      isInitialized = true;
    }
    setState(globalState);

    const onChange = () => setState(globalState);
    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  const markCountryLearned = useCallback((countryId: string) => {
    if (!globalState.learnedCountryIds.includes(countryId)) {
      globalState = {
        ...globalState,
        learnedCountryIds: [...globalState.learnedCountryIds, countryId],
      };
      notifyListeners();
    }
  }, []);

  const markFlagLearned = useCallback((countryId: string) => {
    if (!globalState.learnedFlagIds.includes(countryId)) {
      globalState = {
        ...globalState,
        learnedFlagIds: [...globalState.learnedFlagIds, countryId],
      };
      notifyListeners();
    }
  }, []);

  const recordQuizResult = useCallback(
    (countryId: string, isCorrect: boolean) => {
      const today = getTodayDateString();
      let newStreak = globalState.currentStreak;
      if (globalState.lastActiveDate !== today) {
        newStreak += 1;
      }

      // Update Spaced Repetition for this country
      const existingSr: SpacedRepetitionRecord =
        globalState.spacedRepetition[countryId] || {
          countryId,
          correctCount: 0,
          incorrectCount: 0,
          lastTested: Date.now(),
          intervalDays: 1,
          easeFactor: 2.5,
          nextReviewDate: Date.now(),
        };

      const newCorrect = existingSr.correctCount + (isCorrect ? 1 : 0);
      const newIncorrect = existingSr.incorrectCount + (isCorrect ? 0 : 1);
      const newEase = Math.max(
        1.3,
        existingSr.easeFactor + (isCorrect ? 0.1 : -0.2)
      );
      const newInterval = isCorrect ? Math.round(existingSr.intervalDays * newEase) : 1;
      const nextReview = Date.now() + newInterval * 86400000;

      const updatedSr: Record<string, SpacedRepetitionRecord> = {
        ...globalState.spacedRepetition,
        [countryId]: {
          countryId,
          correctCount: newCorrect,
          incorrectCount: newIncorrect,
          lastTested: Date.now(),
          intervalDays: newInterval,
          easeFactor: newEase,
          nextReviewDate: nextReview,
        },
      };

      globalState = {
        ...globalState,
        quizzesTaken: globalState.quizzesTaken + 1,
        quizScoreSum: globalState.quizScoreSum + (isCorrect ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: Math.max(newStreak, globalState.bestStreak),
        lastActiveDate: today,
        spacedRepetition: updatedSr,
      };
      notifyListeners();
    },
    []
  );

  const unlockBadge = useCallback((badgeId: string) => {
    if (!globalState.unlockedBadgeIds.includes(badgeId)) {
      globalState = {
        ...globalState,
        unlockedBadgeIds: [...globalState.unlockedBadgeIds, badgeId],
      };
      notifyListeners();
    }
  }, []);

  const recordDailyChallenge = useCallback(
    (date: string, isCorrect: boolean) => {
      if (!globalState.completedDailyDates.includes(date)) {
        globalState = {
          ...globalState,
          completedDailyDates: [...globalState.completedDailyDates, date],
          quizzesTaken: globalState.quizzesTaken + 1,
          quizScoreSum: globalState.quizScoreSum + (isCorrect ? 1 : 0),
        };
        notifyListeners();
      }
    },
    []
  );

  const getWeakAreas = useCallback(() => {
    const list: {
      countryId: string;
      accuracy: number;
      total: number;
      incorrect: number;
    }[] = [];

    Object.values(state.spacedRepetition).forEach((record) => {
      const total = record.correctCount + record.incorrectCount;
      if (total > 0) {
        const accuracy = Math.round((record.correctCount / total) * 100);
        if (accuracy < 80 || record.incorrectCount > 0) {
          list.push({
            countryId: record.countryId,
            accuracy,
            total,
            incorrect: record.incorrectCount,
          });
        }
      }
    });

    return list.sort((a, b) => a.accuracy - b.accuracy);
  }, [state.spacedRepetition]);

  const getReviewQueue = useCallback(() => {
    const now = Date.now();
    return Object.values(state.spacedRepetition)
      .filter((record) => record.nextReviewDate <= now)
      .map((r) => r.countryId);
  }, [state.spacedRepetition]);

  const resetProgress = useCallback(() => {
    globalState = {
      ...INITIAL_STATE,
      learnedCountryIds: [],
      learnedFlagIds: [],
      quizzesTaken: 0,
      quizScoreSum: 0,
      currentStreak: 1,
      bestStreak: 1,
      unlockedBadgeIds: [],
      completedDailyDates: [],
      spacedRepetition: {},
    };
    notifyListeners();
  }, []);

  return {
    state,
    markCountryLearned,
    markFlagLearned,
    recordQuizResult,
    unlockBadge,
    recordDailyChallenge,
    getWeakAreas,
    getReviewQueue,
    resetProgress,
  };
}
