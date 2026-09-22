import {
  LinkedListAlgorithmStep,
  LinkedListOperationId,
  LinkedListRunnerOptions,
  LinkedListState,
} from '../types';
import {
  generateAppendSteps,
  generateInsertAfterSteps,
  generateInsertAtSteps,
  generatePrependSteps,
} from '../algorithms/insert';
import {
  generateDeleteAtSteps,
  generateDeleteBeginningSteps,
  generateDeleteEndSteps,
  generateDeleteValueSteps,
} from '../algorithms/delete';
import { generateLengthSteps, generateSearchSteps } from '../algorithms/search';
import { generateReverseSteps } from '../algorithms/reverse';
import { generateUpdateSteps } from '../algorithms/update';
import { LINKED_LIST_PSEUDOCODE } from '../lib/pseudocode';

export function runLinkedListAlgorithm(
  operationId: LinkedListOperationId,
  listState: LinkedListState,
  options: LinkedListRunnerOptions = {}
): { steps: LinkedListAlgorithmStep[]; operationId: LinkedListOperationId } {
  switch (operationId) {
    case 'prepend':
      return {
        steps: generatePrependSteps(listState, options.value ?? 5),
        operationId: 'prepend',
      };
    case 'append':
      return {
        steps: generateAppendSteps(listState, options.value ?? 50),
        operationId: 'append',
      };
    case 'insertAt':
      return {
        steps: generateInsertAtSteps(listState, options.index ?? 2, options.value ?? 25),
        operationId: 'insertAt',
      };
    case 'insertAfter':
      return {
        steps: generateInsertAfterSteps(
          listState,
          options.targetNodeId || listState.headId || '',
          options.value ?? 35
        ),
        operationId: 'insertAfter',
      };
    case 'deleteBeginning':
      return {
        steps: generateDeleteBeginningSteps(listState),
        operationId: 'deleteBeginning',
      };
    case 'deleteEnd':
      return {
        steps: generateDeleteEndSteps(listState),
        operationId: 'deleteEnd',
      };
    case 'deleteAt':
      return {
        steps: generateDeleteAtSteps(listState, options.index ?? 2),
        operationId: 'deleteAt',
      };
    case 'deleteValue':
      return {
        steps: generateDeleteValueSteps(listState, options.targetValue ?? 20),
        operationId: 'deleteValue',
      };
    case 'search':
      return {
        steps: generateSearchSteps(listState, options.targetValue ?? 30),
        operationId: 'search',
      };
    case 'length':
      return {
        steps: generateLengthSteps(listState),
        operationId: 'length',
      };
    case 'reverse':
      return {
        steps: generateReverseSteps(listState),
        operationId: 'reverse',
      };
    case 'update':
      return {
        steps: generateUpdateSteps(listState, options.index ?? 1, options.newValue ?? 99),
        operationId: 'update',
      };
    default:
      return {
        steps: [],
        operationId: 'prepend',
      };
  }
}

export function getPseudocodeForLinkedList(key: LinkedListOperationId) {
  return LINKED_LIST_PSEUDOCODE[key] || LINKED_LIST_PSEUDOCODE.prepend;
}
