export type StepType =
  | 'idle'
  | 'access'
  | 'compare'
  | 'swap'
  | 'shift'
  | 'insert'
  | 'delete'
  | 'update'
  | 'eliminate'
  | 'found'
  | 'not-found'
  | 'sorted'
  | 'complete';

export interface PointerInfo {
  name: string;
  index: number;
  color?: string; // Optional custom accent color
  label?: string; // Extra tag e.g. "min"
}

export interface PredictionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PredictionQuestion {
  id: string;
  prompt: string;
  options: PredictionOption[];
}

export interface StepStats {
  comparisons: number;
  swaps: number;
  reads: number;
  writes: number;
}

export interface AlgorithmStep {
  id: string;
  stepIndex: number;
  type: StepType;
  arrayState: number[];
  indices?: number[]; // Primary indices being acted on (e.g. [i, j])
  secondaryIndices?: number[]; // E.g., eliminated or sorted partition
  values?: number[];
  variables?: Record<string, number | string | boolean | null>;
  pointers?: PointerInfo[];
  codeLine?: number; // 1-indexed line number in logic view
  explanation: string; // Concise summary: "Comparing A[2] = 23 and A[3] = 67"
  detailedWhy?: string; // Pedagogical explanation: "Because 23 < 67, they are already ordered."
  stats: StepStats;
  predictionQuestion?: PredictionQuestion;
}

export interface PseudocodeLine {
  lineNumber: number;
  code: string;
  indent: number;
  comment?: string;
}

export interface AlgorithmMetadata {
  id: string;
  name: string;
  category: 'array' | 'searching' | 'sorting';
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  pseudocode: PseudocodeLine[];
}

export function createStep(params: Omit<AlgorithmStep, 'id'> & { id?: string }): AlgorithmStep {
  return {
    id: params.id || `step-${params.stepIndex}-${Math.random().toString(36).substring(2, 7)}`,
    ...params,
    arrayState: [...params.arrayState], // Ensure immutable clone
  };
}
