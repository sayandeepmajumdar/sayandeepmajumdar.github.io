import { useState, useEffect, useCallback, useRef } from 'react';
import {
  LinkedListAlgorithmStep,
  LinkedListOperationId,
  LinkedListRunnerOptions,
  LinkedListState,
} from '../types';
import { PredictionQuestion } from '../../../engine/Step';
import { runLinkedListAlgorithm } from '../engine/LinkedListRunner';
import { DEFAULT_SPEED } from '../../../engine/Playback';
import { playStepSound } from '../../../lib/sound';

export interface UseLinkedListRunnerReturn {
  steps: LinkedListAlgorithmStep[];
  currentStepIndex: number;
  currentStep: LinkedListAlgorithmStep | null;
  isPlaying: boolean;
  speed: number;
  predictionMode: boolean;
  activePrediction: PredictionQuestion | null;
  isComplete: boolean;
  currentOperation: LinkedListOperationId;
  run: (
    op: LinkedListOperationId,
    listState: LinkedListState,
    options?: LinkedListRunnerOptions
  ) => void;
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

export function useLinkedListRunner(
  initialSteps: LinkedListAlgorithmStep[] = []
): UseLinkedListRunnerReturn {
  const [steps, setSteps] = useState<LinkedListAlgorithmStep[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);
  const [predictionMode, setPredictionMode] = useState<boolean>(true);
  const [activePrediction, setActivePrediction] = useState<PredictionQuestion | null>(null);
  const [currentOperation, setCurrentOperation] = useState<LinkedListOperationId>('prepend');

  const currentStep = steps[currentStepIndex] || null;
  const isComplete = steps.length > 0 && currentStepIndex >= steps.length - 1;

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

  const prevStep = useCallback(() => {
    pause();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setActivePrediction(null);
    }
  }, [pause, currentStepIndex]);

  const restart = useCallback(() => {
    pause();
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
    (
      op: LinkedListOperationId,
      listState: LinkedListState,
      options?: LinkedListRunnerOptions
    ) => {
      pause();
      const result = runLinkedListAlgorithm(op, listState, options);
      setSteps(result.steps);
      setCurrentOperation(result.operationId);
      setCurrentStepIndex(0);
      setActivePrediction(null);
    },
    [pause]
  );

  // Audio feedback tracking
  const prevPlayedIndexRef = useRef<number>(-1);
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex >= 0 && currentStepIndex < steps.length) {
      if (currentStepIndex !== prevPlayedIndexRef.current) {
        prevPlayedIndexRef.current = currentStepIndex;
        const step = steps[currentStepIndex];
        if (step) {
          // Map LinkedList step types to sound effects
          if (step.type === 'compare') {
            playStepSound('compare');
          } else if (step.type === 'pointer-change' || step.type === 'bypass') {
            playStepSound('swap');
          } else if (step.type === 'found') {
            playStepSound('found');
          } else if (step.type === 'allocate') {
            playStepSound('insert');
          } else if (step.type === 'detach') {
            playStepSound('delete');
          } else if (step.type === 'traverse') {
            playStepSound('access');
          } else if (step.type === 'complete') {
            playStepSound('complete');
          }
        }
      }
    }
  }, [currentStepIndex, steps]);

  // Playback timer loop
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

      if (predictionMode && nextStepObj?.predictionQuestion) {
        setCurrentStepIndex(nextIndex);
        setActivePrediction(nextStepObj.predictionQuestion);
        setIsPlaying(false);
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
    currentOperation,
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
