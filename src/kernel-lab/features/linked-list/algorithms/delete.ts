import {
  LinkedListAlgorithmStep,
  LinkedListNode,
  LinkedListState,
  LinkedListStepPointer,
} from '../types';
import { cloneListState, getOrderedNodes } from '../lib/memoryAddress';

export function generateDeleteBeginningSteps(
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
      variables: { head: 'null', error: 'List is empty' },
      codeLine: 2,
      explanation: 'List is already empty. Cannot delete from beginning.',
      detailedWhy: 'Underflow: attempting to delete from an empty list returns null or throws an exception.',
      stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    return steps;
  }

  const oldHeadId = state.headId;
  const oldHeadNode = { ...state.nodes[oldHeadId] };
  const nextHeadId = oldHeadNode.next;

  // Step 0: Initial
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    activeNodeIds: [oldHeadId],
    pointers: [
      { name: 'HEAD', nodeId: oldHeadId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'removed', nodeId: oldHeadId, color: '#ef4444' },
    ],
    variables: {
      head: oldHeadNode.address,
      'head.value': oldHeadNode.value,
      'head.next': nextHeadId ? state.nodes[nextHeadId]?.address : 'null',
    },
    codeLine: 1,
    explanation: `Targeting front node (${oldHeadNode.value}) at address ${oldHeadNode.address} for deletion.`,
    detailedWhy: 'Deleting the head node in a singly linked list requires only updating the HEAD pointer.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step 1: head = head.next
  state.headId = nextHeadId;
  if (!nextHeadId) {
    state.tailId = null;
  }

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: nextHeadId ? [nextHeadId] : [],
    pointers: [
      { name: 'HEAD', nodeId: nextHeadId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'oldHead', nodeId: oldHeadId, color: '#ef4444' },
    ],
    variables: {
      head: nextHeadId ? state.nodes[nextHeadId]?.address : 'null',
      'oldHead.address': oldHeadNode.address,
    },
    codeLine: 4,
    explanation: `Updated HEAD = HEAD.next (${nextHeadId ? state.nodes[nextHeadId]?.address : 'null'}).`,
    detailedWhy: 'The head pointer advances to the second node. The original head is now disconnected from HEAD.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  // Step 2: Recycle / Detach old node
  delete state.nodes[oldHeadId];
  const detachedNode: LinkedListNode = {
    ...oldHeadNode,
    next: null,
    status: 'detach',
  };

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'detach',
    listState: cloneListState(state),
    detachedNodes: [detachedNode],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: {
      freedMemory: oldHeadNode.address,
      remainingNodes: Object.keys(state.nodes).length,
    },
    codeLine: 6,
    explanation: `Unlinked node (${oldHeadNode.value}) at ${oldHeadNode.address}. Memory is reclaimed.`,
    detailedWhy: 'In garbage-collected environments like JavaScript, unreachable nodes are automatically deallocated.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  // Step 3: Complete
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
      newHead: state.headId ? state.nodes[state.headId]?.address : 'null',
    },
    codeLine: 6,
    explanation: 'Delete from beginning complete in O(1) time! No elements were shifted.',
    detailedWhy: 'Contrast this with arrays: deleting index 0 in an array requires shifting all n-1 elements left in O(n) time.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  return steps;
}

export function generateDeleteEndSteps(
  initialState: LinkedListState
): LinkedListAlgorithmStep[] {
  const orderedNodes = getOrderedNodes(initialState);
  if (orderedNodes.length <= 1) {
    return generateDeleteBeginningSteps(initialState);
  }

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
    variables: { tail: state.nodes[state.tailId!].address },
    codeLine: 1,
    explanation: 'Beginning Delete from End.',
    detailedWhy: 'Key Singly Linked List Dilemma: Even though we have a TAIL pointer, we cannot step backwards! We must traverse from HEAD to find the node before tail.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
    predictionQuestion: {
      id: 'delete-end-pred-1',
      prompt: 'Why does Delete from End take O(n) time in a Singly Linked List despite having a TAIL pointer?',
      options: [
        {
          id: 'opt-a',
          label: 'Because we must traverse from HEAD to find the node BEFORE tail (no backward pointers)',
          isCorrect: true,
          explanation: 'Exactly! Singly linked lists only have forward pointers. To set prev.next = null, we must find prev by traversing from head.',
        },
        {
          id: 'opt-b',
          label: 'Because all nodes must shift left in memory',
          isCorrect: false,
          explanation: 'Incorrect. Nodes in linked lists never shift in memory.',
        },
        {
          id: 'opt-c',
          label: 'Because the tail pointer cannot be updated',
          isCorrect: false,
          explanation: 'Incorrect. Tail pointer can easily be updated once the predecessor is found.',
        },
      ],
    },
  });

  // Step 1..k: Traverse prev until prev.next == tail
  let prevId = state.headId!;
  let travCount = 1;

  while (state.nodes[prevId].next !== state.tailId) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: [prevId],
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      ],
      variables: {
        'prev.value': state.nodes[prevId].value,
        'prev.address': state.nodes[prevId].address,
        'prev.next': state.nodes[state.nodes[prevId].next!].address,
      },
      codeLine: 5,
      explanation: `Traversing: prev is at (${state.nodes[prevId].value}). Its next is not yet the tail.`,
      detailedWhy: 'We continue following next pointers until prev.next points to the tail node.',
      stats: { traversals: travCount++, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });

    prevId = state.nodes[prevId].next!;
  }

  // Found predecessor to tail
  const oldTailId = state.tailId!;
  const oldTailNode = { ...state.nodes[oldTailId] };

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'traverse',
    listState: cloneListState(state),
    activeNodeIds: [prevId, oldTailId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: oldTailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
    ],
    variables: {
      predecessor: state.nodes[prevId].address,
      targetTail: oldTailNode.address,
    },
    codeLine: 5,
    explanation: `Found predecessor node (${state.nodes[prevId].value}) directly before tail.`,
    detailedWhy: 'Now we can sever the connection by setting prev.next = null.',
    stats: { traversals: travCount, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step: prev.next = null
  state.nodes[prevId].next = null;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [prevId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: oldTailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
    ],
    variables: {
      'prev.next': 'null',
    },
    codeLine: 6,
    explanation: `Severed link: set prev.next = null. Old tail is no longer referenced by prev.`,
    detailedWhy: 'This unlinks the tail node from the chain.',
    stats: { traversals: travCount, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  // Step: tail = prev
  state.tailId = prevId;
  delete state.nodes[oldTailId];

  const detachedNode: LinkedListNode = {
    ...oldTailNode,
    next: null,
    status: 'detach',
  };

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'detach',
    listState: cloneListState(state),
    detachedNodes: [detachedNode],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: prevId, color: '#f43f5e' },
    ],
    variables: {
      newTail: state.nodes[prevId].address,
      freedNode: oldTailNode.address,
    },
    codeLine: 7,
    explanation: `Updated TAIL = prev (${state.nodes[prevId].address}). Old tail node detached.`,
    detailedWhy: 'The predecessor is now the official tail of the linked list.',
    stats: { traversals: travCount, comparisons: 0, pointerWrites: 2, allocations: 0 },
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
    variables: { tail: state.nodes[state.tailId!].address },
    codeLine: 7,
    explanation: `Delete from End completed in O(n) time.`,
    detailedWhy: 'Doubly Linked Lists fix this bottleneck by adding a "prev" pointer, allowing O(1) tail deletion.',
    stats: { traversals: travCount, comparisons: 0, pointerWrites: 2, allocations: 0 },
  });

  return steps;
}

export function generateDeleteAtSteps(
  initialState: LinkedListState,
  index: number
): LinkedListAlgorithmStep[] {
  const orderedNodes = getOrderedNodes(initialState);
  if (index <= 0 || orderedNodes.length <= 1) {
    return generateDeleteBeginningSteps(initialState);
  }
  if (index >= orderedNodes.length - 1) {
    return generateDeleteEndSteps(initialState);
  }

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
    variables: { targetIndex: index },
    codeLine: 1,
    explanation: `Beginning Delete at Index ${index}.`,
    detailedWhy: `We must traverse to index ${index - 1} so we can rewire its 'next' pointer around the removed node.`,
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Traverse to index - 1
  let prevId = state.headId!;
  for (let i = 0; i < index - 1; i++) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'traverse',
      listState: cloneListState(state),
      activeNodeIds: [prevId],
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      ],
      variables: { currentPosition: i, 'prev.address': state.nodes[prevId].address },
      codeLine: 4,
      explanation: `Traversing: at index ${i} (${state.nodes[prevId].address}). Moving forward.`,
      detailedWhy: 'Stepping forward along the chain.',
      stats: { traversals: i + 1, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });
    prevId = state.nodes[prevId].next!;
  }

  const targetId = state.nodes[prevId].next!;
  const targetNode = { ...state.nodes[targetId] };
  const successorId = targetNode.next;

  // Step: Identify target to delete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'traverse',
    listState: cloneListState(state),
    activeNodeIds: [prevId, targetId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      { name: 'target', nodeId: targetId, color: '#ef4444' },
    ],
    variables: {
      predecessor: state.nodes[prevId].address,
      targetToDelete: targetNode.address,
      'target.value': targetNode.value,
      successor: successorId ? state.nodes[successorId].address : 'null',
    },
    codeLine: 5,
    explanation: `Identified target node (${targetNode.value}) at index ${index}. Predecessor is (${state.nodes[prevId].value}).`,
    detailedWhy: 'To delete this node, we will bypass it by setting prev.next = target.next.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step: Bypass (prev.next = target.next)
  state.nodes[prevId].next = successorId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'bypass',
    listState: cloneListState(state),
    activeNodeIds: [prevId, successorId!],
    highlightArrow: {
      fromId: prevId,
      toId: successorId,
      type: 'relink',
      label: 'prev.next = target.next (BYPASS)',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
      { name: 'target', nodeId: targetId, color: '#ef4444' },
    ],
    variables: {
      'prev.next': successorId ? state.nodes[successorId].address : 'null',
    },
    codeLine: 6,
    explanation: `Bypassed target: prev.next now points directly to (${successorId ? state.nodes[successorId].address : 'null'}).`,
    detailedWhy: 'Notice how the arrow skips completely over the target node. The chain remains intact.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  // Step: Detach target node
  delete state.nodes[targetId];
  const detachedNode: LinkedListNode = {
    ...targetNode,
    next: null,
    status: 'detach',
  };

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'detach',
    listState: cloneListState(state),
    detachedNodes: [detachedNode],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'prev', nodeId: prevId, color: '#f59e0b' },
    ],
    variables: {
      deletedValue: targetNode.value,
      remainingCount: Object.keys(state.nodes).length,
    },
    codeLine: 8,
    explanation: `Unlinked target node (${targetNode.value}). It is no longer reachable.`,
    detailedWhy: 'Memory reclaimed without having to shift any other nodes in memory.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 1, allocations: 0 },
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
    variables: { remainingNodes: Object.keys(state.nodes).length },
    codeLine: 8,
    explanation: `Delete at Index ${index} complete!`,
    detailedWhy: 'Only 1 pointer change was required after reaching the predecessor.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 1, allocations: 0 },
  });

  return steps;
}

export function generateDeleteValueSteps(
  initialState: LinkedListState,
  targetValue: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  let stepIndex = 0;

  if (!state.headId) {
    return generateDeleteBeginningSteps(initialState);
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
    variables: { targetValue },
    codeLine: 1,
    explanation: `Beginning Delete by Value: searching for node containing value ${targetValue}.`,
    detailedWhy: 'We maintain two pointers: curr (checking values) and prev (trailing one step behind).',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  let prevId: string | null = null;
  let currId: string | null = state.headId;
  let travCount = 0;
  let compCount = 0;
  let found = false;

  while (currId) {
    const currNode = state.nodes[currId];
    travCount++;
    compCount++;

    const isMatch = currNode.value === targetValue;

    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'compare',
      listState: cloneListState(state),
      activeNodeIds: [currId],
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
        ...(prevId ? [{ name: 'prev', nodeId: prevId, color: '#f59e0b' }] : []),
        { name: 'curr', nodeId: currId, color: isMatch ? '#10b981' : '#a855f7' },
      ],
      variables: {
        'curr.value': currNode.value,
        targetValue,
        match: isMatch,
        'prev.address': prevId ? state.nodes[prevId].address : 'null',
      },
      codeLine: 3,
      explanation: isMatch
        ? `Found matching node! curr.value (${currNode.value}) == target (${targetValue}).`
        : `Comparing: curr.value (${currNode.value}) != target (${targetValue}). Moving forward.`,
      detailedWhy: isMatch
        ? 'Target found. We can now bypass this node.'
        : 'Advance prev to curr, and curr to curr.next.',
      stats: { traversals: travCount, comparisons: compCount, pointerWrites: 0, allocations: 0 },
    });

    if (isMatch) {
      found = true;
      break;
    }

    prevId = currId;
    currId = currNode.next;
  }

  if (!found || !currId) {
    steps.push({
      id: `step-${stepIndex}`,
      stepIndex: stepIndex++,
      type: 'not-found',
      listState: cloneListState(state),
      pointers: [
        { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
        { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      ],
      variables: { result: 'Not Found', searchedNodes: travCount },
      codeLine: 5,
      explanation: `Reached end of list (NULL). Value ${targetValue} was not found. No nodes removed.`,
      detailedWhy: 'Linear search exhausted all nodes.',
      stats: { traversals: travCount, comparisons: compCount, pointerWrites: 0, allocations: 0 },
    });
    return steps;
  }

  const targetNode = { ...state.nodes[currId] };
  const successorId = targetNode.next;

  // If deleting head
  if (!prevId) {
    state.headId = successorId;
    if (!successorId) {
      state.tailId = null;
    }
  } else {
    state.nodes[prevId].next = successorId;
    if (currId === state.tailId) {
      state.tailId = prevId;
    }
  }

  delete state.nodes[currId];
  const detachedNode: LinkedListNode = {
    ...targetNode,
    next: null,
    status: 'detach',
  };

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'detach',
    listState: cloneListState(state),
    detachedNodes: [detachedNode],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: {
      deletedValue: targetNode.value,
      remainingCount: Object.keys(state.nodes).length,
    },
    codeLine: 7,
    explanation: `Bypassed and detached node with value ${targetValue}.`,
    detailedWhy: 'The predecessor pointer skipped over the removed node.',
    stats: { traversals: travCount, comparisons: compCount, pointerWrites: 1, allocations: 0 },
  });

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { remainingNodes: Object.keys(state.nodes).length },
    codeLine: 9,
    explanation: `Delete by Value (${targetValue}) complete!`,
    detailedWhy: 'Search required O(k) comparisons, followed by an O(1) pointer bypass.',
    stats: { traversals: travCount, comparisons: compCount, pointerWrites: 1, allocations: 0 },
  });

  return steps;
}
