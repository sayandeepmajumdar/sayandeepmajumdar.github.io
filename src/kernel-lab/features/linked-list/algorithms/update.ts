import {
  LinkedListAlgorithmStep,
  LinkedListState,
} from '../types';
import { cloneListState, getOrderedNodes } from '../lib/memoryAddress';

export function generateUpdateSteps(
  initialState: LinkedListState,
  index: number,
  newValue: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  const orderedNodes = getOrderedNodes(initialState);
  let stepIndex = 0;

  if (orderedNodes.length === 0 || index < 0 || index >= orderedNodes.length) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'idle',
      listState: cloneListState(state),
      pointers: [],
      variables: { error: 'Index out of bounds', index, length: orderedNodes.length },
      codeLine: 1,
      explanation: `Index ${index} is out of bounds for list of size ${orderedNodes.length}.`,
      detailedWhy: 'Cannot update non-existent node.',
      stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    return steps;
  }

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
    variables: { targetIndex: index, newValue },
    codeLine: 1,
    explanation: `Beginning Update at index ${index} to new value ${newValue}.`,
    detailedWhy: 'In a linked list, updating a value requires traversing to the node at index, then overwriting its value in-place.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Traverse to index
  let currId = state.headId!;
  for (let i = 0; i < index; i++) {
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
      variables: { currentPosition: i, 'curr.value': state.nodes[currId].value },
      codeLine: 3,
      explanation: `Traversing: currently at index ${i} (${state.nodes[currId].value}). Following next pointer.`,
      detailedWhy: 'Advancing pointer chain.',
      stats: { traversals: i + 1, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    currId = state.nodes[currId].next!;
  }

  const targetNode = state.nodes[currId];
  const oldValue = targetNode.value;

  // Step: At target node
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'traverse',
    listState: cloneListState(state),
    activeNodeIds: [currId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'curr', nodeId: currId, color: '#3b82f6' },
    ],
    variables: {
      targetIndex: index,
      oldValue,
      targetAddress: targetNode.address,
    },
    codeLine: 3,
    explanation: `Reached target node [${index}] with old value ${oldValue}. Ready to overwrite.`,
    detailedWhy: 'Target node is located in heap at ' + targetNode.address,
    stats: { traversals: index + 1, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step: Update value
  state.nodes[currId].value = newValue;
  state.nodes[currId].status = 'mutate';

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [currId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'curr', nodeId: currId, color: '#10b981' },
    ],
    variables: {
      oldValue,
      'curr.value': newValue,
      targetAddress: targetNode.address,
    },
    codeLine: 4,
    explanation: `Overwrote curr.value: changed ${oldValue} -> ${newValue}.`,
    detailedWhy: 'Only the value field in the node object is modified. All next pointers remain untouched.',
    stats: { traversals: index + 1, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  // Complete
  state.nodes[currId].status = 'neutral';
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { updatedIndex: index, newValue },
    codeLine: 5,
    explanation: `Update complete! Node at index ${index} now holds value ${newValue}.`,
    detailedWhy: 'Traversal took O(index) time, followed by an O(1) payload write.',
    stats: { traversals: index + 1, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  return steps;
}
