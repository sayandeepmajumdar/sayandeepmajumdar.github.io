import { AlgorithmStep } from './Step';
import { generateAccessSteps } from '../features/arrays/algorithms/access';
import { generateInsertSteps } from '../features/arrays/algorithms/insert';
import { generateDeleteSteps } from '../features/arrays/algorithms/delete';
import { generateUpdateSteps } from '../features/arrays/algorithms/update';
import { generateSwapSteps } from '../features/arrays/algorithms/swap';
import { generateReverseSteps } from '../features/arrays/algorithms/reverse';
import { generateRotateSteps } from '../features/arrays/algorithms/rotate';
import { generateLinearSearchSteps } from '../features/searching/algorithms/linearSearch';
import { generateBinarySearchSteps } from '../features/searching/algorithms/binarySearch';
import { generateBubbleSortSteps } from '../features/sorting/algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../features/sorting/algorithms/selectionSort';
import { generateInsertionSortSteps } from '../features/sorting/algorithms/insertionSort';
import {
  ARRAY_PSEUDOCODE,
  SEARCHING_PSEUDOCODE,
  SORTING_PSEUDOCODE,
} from '../lib/pseudocode';

export type AlgorithmId =
  | 'access'
  | 'insert'
  | 'delete'
  | 'update'
  | 'swap'
  | 'reverse'
  | 'rotate'
  | 'linearSearch'
  | 'binarySearch'
  | 'bubbleSort'
  | 'selectionSort'
  | 'insertionSort';

export interface RunnerOptions {
  index?: number;
  value?: number;
  target?: number;
  indexA?: number;
  indexB?: number;
  kPositions?: number;
}

export function runAlgorithm(
  algorithmId: AlgorithmId,
  array: number[],
  options: RunnerOptions = {}
): { steps: AlgorithmStep[]; pseudocodeKey: string } {
  switch (algorithmId) {
    case 'access':
      return {
        steps: generateAccessSteps(array, options.index ?? 0),
        pseudocodeKey: 'access',
      };
    case 'insert':
      return {
        steps: generateInsertSteps(array, options.index ?? 0, options.value ?? 42),
        pseudocodeKey: 'insert',
      };
    case 'delete':
      return {
        steps: generateDeleteSteps(array, options.index ?? 0),
        pseudocodeKey: 'delete',
      };
    case 'update':
      return {
        steps: generateUpdateSteps(array, options.index ?? 0, options.value ?? 99),
        pseudocodeKey: 'update',
      };
    case 'swap':
      return {
        steps: generateSwapSteps(array, options.indexA ?? 0, options.indexB ?? 1),
        pseudocodeKey: 'swap',
      };
    case 'reverse':
      return {
        steps: generateReverseSteps(array),
        pseudocodeKey: 'reverse',
      };
    case 'rotate':
      return {
        steps: generateRotateSteps(array, options.kPositions ?? 2),
        pseudocodeKey: 'rotate',
      };
    case 'linearSearch':
      return {
        steps: generateLinearSearchSteps(array, options.target ?? 23),
        pseudocodeKey: 'linearSearch',
      };
    case 'binarySearch':
      return {
        steps: generateBinarySearchSteps(array, options.target ?? 23),
        pseudocodeKey: 'binarySearch',
      };
    case 'bubbleSort':
      return {
        steps: generateBubbleSortSteps(array),
        pseudocodeKey: 'bubbleSort',
      };
    case 'selectionSort':
      return {
        steps: generateSelectionSortSteps(array),
        pseudocodeKey: 'selectionSort',
      };
    case 'insertionSort':
      return {
        steps: generateInsertionSortSteps(array),
        pseudocodeKey: 'insertionSort',
      };
    default:
      return {
        steps: [],
        pseudocodeKey: 'access',
      };
  }
}

export function getPseudocodeForAlgorithm(key: string) {
  return (
    ARRAY_PSEUDOCODE[key] ||
    SEARCHING_PSEUDOCODE[key] ||
    SORTING_PSEUDOCODE[key] ||
    []
  );
}
