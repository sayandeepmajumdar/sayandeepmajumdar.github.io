import {
  LinkedListAlgorithmStep,
  LinkedListState,
  LinkedListStepPointer,
} from '../types';
import { cloneListState } from '../lib/memoryAddress';

export function generateReverseSteps(
  initialState: LinkedListState
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  let stepIndex = 0;

  if (!state.headId) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'idle',
      listState: cloneListState(state),
      pointers: [],
      variables: { head: 'null' },
      codeLine: 1,
      explanation: 'List is empty. Nothing to reverse.',
      detailedWhy: 'An empty list is already trivial.',
      stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    return steps;
  }

  const originalHeadId = state.headId;
  const originalTailId = state.tailId;

  // Step 0: Initial State
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: null, color: '#f59e0b', label: 'NULL' },
      { name: 'curr', nodeId: state.headId, color: '#a855f7' },
    ],
    variables: {
      prev: 'null',
      curr: state.nodes[state.headId].address,
      head: state.nodes[state.headId].address,
    },
    codeLine: 2,
    explanation: 'Initializing 3-pointer Reversal: prev = null, curr = head.',
    detailedWhy: 'The classic iterative reversal uses three sliding pointers: prev (already reversed), curr (current node being flipped), and next (holding the upcoming unreversed sublist).',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    predictionQuestion: {
      id: 'reverse-pred-1',
      prompt: 'Why do we need a "next" pointer before executing curr.next = prev?',
      options: [
        {
          id: 'opt-a',
          label: 'Because reversing curr.next overwrites our only link to the rest of the list',
          isCorrect: true,
          explanation: 'Precisely! As soon as curr.next points backward to prev, the forward link to curr.next is broken unless saved in next.',
        },
        {
          id: 'opt-b',
          label: 'Because curr must point to two nodes simultaneously',
          isCorrect: false,
          explanation: 'Incorrect. Each node in a singly linked list can only store one next pointer.',
        },
        {
          id: 'opt-c',
          label: 'To check if the list has a cycle',
          isCorrect: false,
          explanation: 'Incorrect. Cycle detection uses fast/slow pointers (Floyd algorithm), not three iterative pointers.',
        },
      ],
    },
  });

  let prevId: string | null = null;
  let currId: string | null = state.headId;
  let pointerWrites = 0;
  let iteration = 0;

  while (currId) {
    iteration++;
    const currNode = state.nodes[currId];
    const nextId: string | null = currNode.next;

    // Sub-step A: next = curr.next
    const pointersA: LinkedListStepPointer[] = [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b', label: prevId ? undefined : 'NULL' },
      { name: 'curr', nodeId: currId, color: '#a855f7' },
      { name: 'next', nodeId: nextId, color: '#10b981', label: nextId ? undefined : 'NULL' },
    ];

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: nextId ? [currId, nextId] : [currId],
      pointers: pointersA,
      variables: {
        prev: prevId ? state.nodes[prevId].address : 'null',
        curr: currNode.address,
        next: nextId ? state.nodes[nextId].address : 'null',
      },
      codeLine: 5,
      explanation: `Step ${iteration}.1: Saved next = curr.next (${nextId ? state.nodes[nextId].address : 'NULL'}).`,
      detailedWhy: 'Storing next guarantees we will not lose the rest of the list once curr.next is rewired backward.',
      stats: { traversals: iteration, comparisons: 0, pointerWrites, allocations: 0 },
    });

    // Sub-step B: curr.next = prev (Rewire pointer backward!)
    state.nodes[currId].next = prevId;
    pointerWrites++;

    const pointersB: LinkedListStepPointer[] = [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b', label: prevId ? undefined : 'NULL' },
      { name: 'curr', nodeId: currId, color: '#a855f7' },
      { name: 'next', nodeId: nextId, color: '#10b981', label: nextId ? undefined : 'NULL' },
    ];

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'pointer-change',
      listState: cloneListState(state),
      activeNodeIds: prevId ? [currId, prevId] : [currId],
      highlightArrow: {
        fromId: currId,
        toId: prevId,
        type: 'reversed',
        label: 'curr.next = prev (REVERSED)',
      },
      pointers: pointersB,
      variables: {
        'curr.next': prevId ? state.nodes[prevId].address : 'null',
        prev: prevId ? state.nodes[prevId].address : 'null',
        curr: currNode.address,
        next: nextId ? state.nodes[nextId].address : 'null',
      },
      codeLine: 6,
      explanation: `Step ${iteration}.2: REWIRED curr.next = prev (${prevId ? state.nodes[prevId].address : 'NULL'}). Arrow flipped backward!`,
      detailedWhy: `Node (${currNode.value}) now points back to (${prevId ? state.nodes[prevId].value : 'NULL'}).`,
      stats: { traversals: iteration, comparisons: 0, pointerWrites, allocations: 0 },
    });

    // Sub-step C: prev = curr
    prevId = currId;

    const pointersC: LinkedListStepPointer[] = [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      { name: 'curr', nodeId: currId, color: '#a855f7' },
      { name: 'next', nodeId: nextId, color: '#10b981', label: nextId ? undefined : 'NULL' },
    ];

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: [prevId],
      pointers: pointersC,
      variables: {
        prev: state.nodes[prevId].address,
        curr: currNode.address,
        next: nextId ? state.nodes[nextId].address : 'null',
      },
      codeLine: 7,
      explanation: `Step ${iteration}.3: Advanced prev = curr (${state.nodes[prevId].address}).`,
      detailedWhy: 'prev now marks the end of our growing reversed chain.',
      stats: { traversals: iteration, comparisons: 0, pointerWrites, allocations: 0 },
    });

    // Sub-step D: curr = next
    currId = nextId;

    const pointersD: LinkedListStepPointer[] = [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      { name: 'curr', nodeId: currId, color: '#a855f7', label: currId ? undefined : 'NULL' },
    ];

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: currId ? [currId] : [],
      pointers: pointersD,
      variables: {
        prev: state.nodes[prevId].address,
        curr: currId ? state.nodes[currId].address : 'null',
      },
      codeLine: 8,
      explanation: `Step ${iteration}.4: Advanced curr = next (${currId ? state.nodes[currId].address : 'NULL'}).`,
      detailedWhy: currId
        ? 'Ready to process next node.'
        : 'curr has reached NULL! All nodes have been reversed.',
      stats: { traversals: iteration, comparisons: 0, pointerWrites, allocations: 0 },
    });
  }

  // Final Step: head = prev, tail = originalHead
  state.headId = prevId;
  state.tailId = originalHeadId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [state.headId!, state.tailId!],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: {
      head: state.nodes[state.headId!].address,
      tail: state.nodes[state.tailId!].address,
    },
    codeLine: 9,
    explanation: `Updated HEAD = prev (${state.nodes[state.headId!].address}) and TAIL = originalHead.`,
    detailedWhy: 'HEAD now points to what used to be the tail, and TAIL points to what used to be the head.',
    stats: { traversals: iteration, comparisons: 0, pointerWrites: pointerWrites + 2, allocations: 0 },
  });

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
    variables: {
      newHead: state.nodes[state.headId!].address,
      newTail: state.nodes[state.tailId!].address,
    },
    codeLine: 10,
    explanation: 'Reverse Linked List complete! O(n) time, O(1) auxiliary space.',
    detailedWhy: 'Every pointer was inverted in-place without allocating any new nodes.',
    stats: { traversals: iteration, comparisons: 0, pointerWrites: pointerWrites + 2, allocations: 0 },
  });

  return steps;
}
