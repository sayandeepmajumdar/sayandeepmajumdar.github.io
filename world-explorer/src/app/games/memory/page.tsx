'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RotateCcw, Timer, Move, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES } from '@/data/countries';
import { useLearningProgress } from '@/lib/store';
import { shuffleArray } from '@/lib/utils';

interface MemoryCard {
  id: string; // unique card id e.g. "card-1"
  matchId: string; // e.g. "japan"
  type: 'flag' | 'name';
  content: string; // emoji flag or country name
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGamePage() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium'>('easy');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { markFlagLearned, unlockBadge } = useLearningProgress();

  const pairsCount = difficulty === 'easy' ? 6 : 8;

  const initGame = React.useCallback(() => {
    const selectedCountries = shuffleArray(COUNTRIES).slice(0, pairsCount);
    const deck: MemoryCard[] = [];

    selectedCountries.forEach((c, i) => {
      deck.push({
        id: `flag-${c.id}-${i}`,
        matchId: c.id,
        type: 'flag',
        content: c.flag,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: `name-${c.id}-${i}`,
        matchId: c.id,
        type: 'name',
        content: c.name,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(deck));
    setFlippedCards([]);
    setMoves(0);
    setMatchesCount(0);
    setSeconds(0);
    setIsCompleted(false);
    setIsTimerActive(true);
  }, [pairsCount]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isCompleted]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.matchId === secondCard.matchId) {
        // MATCH!
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setFlippedCards([]);
          const newMatches = matchesCount + 1;
          setMatchesCount(newMatches);

          markFlagLearned(firstCard.matchId);

          if (newMatches === pairsCount) {
            setIsCompleted(true);
            setIsTimerActive(false);
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
            });
            unlockBadge('flag_master');
          }
        }, 500);
      } else {
        // NO MATCH -> FLIP BACK
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-1">
            <span>🃏</span>
            <span>Spatial Concentration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Flag Memory Game
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium')}
            className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="easy">Easy (6 Pairs • 12 Cards)</option>
            <option value="medium">Medium (8 Pairs • 16 Cards)</option>
          </select>

          <button
            onClick={initGame}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-around text-xs font-bold">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Move className="w-4 h-4 text-teal-600" />
          <span>Moves: {moves}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Timer className="w-4 h-4 text-amber-500" />
          <span>Time: {seconds}s</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Trophy className="w-4 h-4 text-emerald-500" />
          <span>Matches: {matchesCount} / {pairsCount}</span>
        </div>
      </div>

      {/* Memory Card Grid */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          pairsCount === 6 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="relative aspect-square cursor-pointer perspective-1000"
            >
              <motion.div
                className="w-full h-full rounded-2xl relative select-none flex items-center justify-center p-3 text-center transition-all duration-300 transform-style-3d shadow-sm"
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Back of card (Hidden) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center backface-hidden ${
                    isRevealed ? 'pointer-events-none' : ''
                  }`}
                >
                  <span className="text-3xl opacity-40">🌍</span>
                </div>

                {/* Front of card (Revealed) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center p-2 backface-hidden rotate-y-180 ${
                    card.isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-md shadow-emerald-500/10'
                      : 'bg-white dark:bg-slate-800 border-teal-500 text-slate-900 dark:text-white'
                  }`}
                >
                  {card.type === 'flag' ? (
                    <span className="text-5xl sm:text-6xl">{card.content}</span>
                  ) : (
                    <span className="text-xs sm:text-sm font-black leading-tight">
                      {card.content}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mx-auto">
            🎉
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Memory Grid Cleared!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You completed the game in <strong>{moves} moves</strong> and <strong>{seconds} seconds</strong>!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={initGame}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <Link
              href="/games"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
            >
              Back to Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
