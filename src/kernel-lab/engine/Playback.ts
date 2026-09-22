import { AlgorithmStep } from './Step';

export interface PlaybackState {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number; // Interval in milliseconds (e.g. 300 to 2000)
  predictionMode: boolean;
  activePrediction: boolean; // Currently blocked waiting for user prediction
  isComplete: boolean;
}

export const DEFAULT_SPEED = 700; // ms per step

export function getInitialPlaybackState(steps: AlgorithmStep[] = []): PlaybackState {
  return {
    steps,
    currentStepIndex: 0,
    isPlaying: false,
    speed: DEFAULT_SPEED,
    predictionMode: false,
    activePrediction: false,
    isComplete: steps.length > 0 ? steps[0]?.type === 'complete' : false,
  };
}
