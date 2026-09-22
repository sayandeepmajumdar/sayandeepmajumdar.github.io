import {
  LinkedListAlgorithmStep,
  LinkedListState,
} from '../types';
import { cloneListState } from '../lib/memoryAddress';

export function generateSearchSteps(
  initialState: LinkedListState,
  targetValue: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  let stepIndex = 0;

  // Step 0: Initial
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { targetValue, position: 0 },
    codeLine: 1,
    explanation: `Beginning Search for target value: ${targetValue}.`,
    detailedWhy: 'Unlike arrays where binary search achieves O(log n), singly linked lists cannot jump to midpoints and require linear O(n) traversal.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  if (!state.headId) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'not-found',
      listState: cloneListState(state),
      pointers: [],
      variables: { result: 'List is empty', targetValue },
      codeLine: 6,
      explanation: 'List is empty. Target cannot be found.',
      detailedWhy: 'Search terminated immediately at NULL.',
      stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    return steps;
  }

  let currId: string | null = state.headId;
  let pos = 0;
  let compCount = 0;
  let found = false;

  while (currId) {
    const currNode = state.nodes[currId];
    compCount++;
    const isMatch = currNode.value === targetValue;

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: isMatch ? 'found' : 'compare',
      listState: cloneListState(state),
      activeNodeIds: [currId],
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        { name: 'curr', nodeId: currId, color: isMatch ? '#10b981' : '#a855f7' },
      ],
      variables: {
        'curr.value': currNode.value,
        'curr.address': currNode.address,
        targetValue,
        position: pos,
        isMatch,
      },
      codeLine: 4,
      explanation: isMatch
        ? `Found target ${targetValue} at position ${pos} (Address: ${currNode.address})!`
        : `Node [${pos}] value (${currNode.value}) != target (${targetValue}). Following next link.`,
      detailedWhy: isMatch
        ? `Search concludes successfully after ${compCount} comparison${compCount > 1 ? 's' : ''}.`
        : `Pointer advances to curr.next (${currNode.next ? state.nodes[currNode.next]?.address : 'NULL'}).`,
      stats: { traversals: pos + 1, comparisons: compCount, pointerWrites: 0, allocations: 0 },
    });

    if (isMatch) {
      found = true;
      break;
    }

    currId = currNode.next;
    pos++;
  }

  if (!found) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'not-found',
      listState: cloneListState(state),
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      ],
      variables: { result: -1, totalComparisons: compCount },
      codeLine: 6,
      explanation: `Reached NULL. Target ${targetValue} does not exist in the linked list. Returned -1.`,
      detailedWhy: 'Full list traversed without finding a matching value (Worst case O(n)).',
      stats: { traversals: pos, comparisons: compCount, pointerWrites: 0, allocations: 0 },
    });
  } else {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'complete',
      listState: cloneListState(state),
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        { name: 'FOUND', nodeId: currId, color: '#10b981' },
      ],
      variables: { foundAtPosition: pos, totalComparisons: compCount },
      codeLine: 4,
      explanation: `Search complete! Found at index ${pos} with ${compCount} comparison${compCount > 1 ? 's' : ''}.`,
      detailedWhy: 'Search returns the logical 0-indexed position along the pointer chain.',
      stats: { traversals: pos + 1, comparisons: compCount, pointerWrites: 0, allocations: 0 },
    });
  }

  return steps;
}

export function generateLengthSteps(
  initialState: LinkedListState
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  let stepIndex = 0;

  // Step 0: Initial
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { count: 0 },
    codeLine: 1,
    explanation: 'Beginning Traversal to calculate Linked List Length.',
    detailedWhy: 'Because a singly linked list does not store a fixed length field by default, finding the length requires counting every node from head to null.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  let currId: string | null = state.headId;
  let count = 0;

  while (currId) {
    const currNode = state.nodes[currId];
    count++;

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: [currId],
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        { name: 'curr', nodeId: currId, color: '#a855f7' },
      ],
      variables: {
        'curr.value': currNode.value,
        'curr.address': currNode.address,
        count,
      },
      codeLine: 4,
      explanation: `Visited node (${currNode.value}) at ${currNode.address}. Incremented count to ${count}.`,
      detailedWhy: 'Following curr.next link to the subsequent node.',
      stats: { traversals: count, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });

    currId = currNode.next;
  }

  // Complete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { totalLength: count },
    codeLine: 6,
    explanation: `Reached NULL! Total length of the linked list is ${count}.`,
    detailedWhy: 'Time complexity is O(n) because each of the n nodes was visited once.',
    stats: { traversals: count, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  return steps;
}
