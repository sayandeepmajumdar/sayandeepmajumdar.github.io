import { useState, useEffect, useCallback, useRef } from 'react';
import { AlgorithmStep, PredictionQuestion } from '../engine/Step';
import { AlgorithmId, RunnerOptions, runAlgorithm } from '../engine/AlgorithmRunner';
import { DEFAULT_SPEED } from '../engine/Playback';
import { playStepSound } from '../lib/sound';

export interface UseAlgorithmRunnerReturn {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  currentStep: AlgorithmStep | null;
  isPlaying: boolean;
  speed: number;
  predictionMode: boolean;
  activePrediction: PredictionQuestion | null;
  isComplete: boolean;
  pseudocodeKey: string;
  run: (id: AlgorithmId, array: number[], options?: RunnerOptions) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  restart: () => void;
  setSpeed: (speedMs: number) => void;
  togglePredictionMode: () => void;
  submitPrediction: (optionId: string) => { isCorrect: boolean; explanation: string } | null;
  dismissPrediction: () => void;
}

export function useAlgorithmRunner(initialSteps: AlgorithmStep[] = []): UseAlgorithmRunnerReturn {
  const [steps, setSteps] = useState<AlgorithmStep[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);
  const [predictionMode, setPredictionMode] = useState<boolean>(true);
  const [activePrediction, setActivePrediction] = useState<PredictionQuestion | null>(null);
  const [pseudocodeKey, setPseudocodeKey] = useState<string>('access');

  const currentStep = steps[currentStepIndex] || null;
  const isComplete = steps.length > 0 && currentStepIndex >= steps.length - 1;

  // Track timer reference
  const timerRef = useRef<number | null>(null);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    if (isComplete) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [steps.length, isComplete]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const goToStep = useCallback(
    (index: number) => {
      pause();
      if (index >= 0 && index < steps.length) {
        setCurrentStepIndex(index);
        setActivePrediction(null);
      }
    },
    [pause, steps.length]
  );

  const nextStep = useCallback(() => {
    pause();
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStepObj = steps[nextIndex];
      setCurrentStepIndex(nextIndex);

      if (predictionMode && nextStepObj?.predictionQuestion) {
        setActivePrediction(nextStepObj.predictionQuestion);
      } else {
        setActivePrediction(null);
      }
    }
  }, [pause, currentStepIndex, steps, predictionMode]);

  // Audio playback tracking
  const prevPlayedIndexRef = useRef<number>(-1);

  // Trigger audio on step change
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex >= 0 && currentStepIndex < steps.length) {
      if (currentStepIndex !== prevPlayedIndexRef.current) {
        prevPlayedIndexRef.current = currentStepIndex;
        const step = steps[currentStepIndex];
        if (step) {
          playStepSound(step.type);
        }
      }
    }
  }, [currentStepIndex, steps]);

  const prevStep = useCallback(() => {
    pause();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setActivePrediction(null);
    }
  }, [pause, currentStepIndex]);

  const restart = useCallback(() => {
    pause();
    prevPlayedIndexRef.current = -1;
    setCurrentStepIndex(0);
    setActivePrediction(null);
  }, [pause]);

  const togglePredictionMode = useCallback(() => {
    setPredictionMode((prev) => !prev);
    setActivePrediction(null);
  }, []);

  const dismissPrediction = useCallback(() => {
    setActivePrediction(null);
  }, []);

  const submitPrediction = useCallback(
    (optionId: string) => {
      if (!activePrediction) return null;
      const option = activePrediction.options.find((opt) => opt.id === optionId);
      if (!option) return null;
      return {
        isCorrect: option.isCorrect,
        explanation: option.explanation,
      };
    },
    [activePrediction]
  );

  const run = useCallback(
    (id: AlgorithmId, array: number[], options?: RunnerOptions) => {
      pause();
      const result = runAlgorithm(id, array, options);
      setSteps(result.steps);
      setPseudocodeKey(result.pseudocodeKey);
      prevPlayedIndexRef.current = -1;
      setCurrentStepIndex(0);
      setActivePrediction(null);
    },
    [pause]
  );

  // Playback timer effect
  useEffect(() => {
    if (!isPlaying || activePrediction !== null) {
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      const nextIndex = currentStepIndex + 1;
      const nextStepObj = steps[nextIndex];

      // Check if next step requires prediction
      if (predictionMode && nextStepObj?.predictionQuestion) {
        setCurrentStepIndex(nextIndex);
        setActivePrediction(nextStepObj.predictionQuestion);
        setIsPlaying(false); // Pause for prediction
      } else {
        setCurrentStepIndex(nextIndex);
      }
    }, speed);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentStepIndex, steps, speed, predictionMode, activePrediction]);

  return {
    steps,
    currentStepIndex,
    currentStep,
    isPlaying,
    speed,
    predictionMode,
    activePrediction,
    isComplete,
    pseudocodeKey,
    run,
    play,
    pause,
    togglePlay,
    nextStep,
    prevStep,
    goToStep,
    restart,
    setSpeed,
    togglePredictionMode,
    submitPrediction,
    dismissPrediction,
  };
}
