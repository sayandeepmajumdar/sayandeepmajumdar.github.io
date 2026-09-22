import {
  LinkedListAlgorithmStep,
  LinkedListNode,
  LinkedListState,
  LinkedListStepPointer,
} from '../types';
import {
  cloneListState,
  generateMemoryAddress,
  generateNodeId,
  getOrderedNodes,
} from '../lib/memoryAddress';

export function generatePrependSteps(
  initialState: LinkedListState,
  value: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  const existingAddresses = new Set(Object.values(state.nodes).map((n) => n.address));

  let stepIndex = 0;
  const oldHeadId = state.headId;

  // Step 0: Initial State
  const initialPointers: LinkedListStepPointer[] = [
    { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
    { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
  ];

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    pointers: initialPointers,
    variables: { head: oldHeadId ? state.nodes[oldHeadId]?.address : 'null', value },
    codeLine: 1,
    explanation: `Beginning Insert at Beginning (Prepend) with value ${value}.`,
    detailedWhy: 'Prepend places a new node before the current head in O(1) time without shifting any elements.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step 1: Allocate newNode in heap memory
  const newNodeId = generateNodeId();
  const newAddress = generateMemoryAddress(existingAddresses);
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: null,
    address: newAddress,
    label: `New (${value})`,
    status: 'mutate',
  };
  state.nodes[newNodeId] = newNode;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'allocate',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    pointers: [
      { name: 'HEAD', nodeId: oldHeadId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      head: oldHeadId ? state.nodes[oldHeadId]?.address : 'null',
      'newNode.address': newAddress,
      'newNode.value': value,
      'newNode.next': 'null',
    },
    codeLine: 2,
    explanation: `Allocated new Node in heap at address ${newAddress} with value ${value}.`,
    detailedWhy: 'In dynamic heap memory, each node is independently allocated. It does not need to be contiguous to other nodes.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 1 },
    predictionQuestion: {
      id: 'prepend-pred-1',
      prompt: 'Before updating HEAD, what must newNode.next be set to?',
      options: [
        {
          id: 'opt-a',
          label: 'Point to the current HEAD',
          isCorrect: true,
          explanation: 'Correct! By pointing newNode.next to the old head first, we preserve access to the entire rest of the list.',
        },
        {
          id: 'opt-b',
          label: 'Point to NULL',
          isCorrect: false,
          explanation: 'Incorrect. If newNode.next remains NULL, the remaining list nodes would become orphaned/disconnected.',
        },
        {
          id: 'opt-c',
          label: 'Point to TAIL',
          isCorrect: false,
          explanation: 'Incorrect. Prepend inserts at the beginning, so it must point to the existing head, not tail.',
        },
      ],
    },
  });

  // Step 2: newNode.next = head
  state.nodes[newNodeId].next = oldHeadId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    highlightArrow: {
      fromId: newNodeId,
      toId: oldHeadId,
      type: 'new',
      label: 'newNode.next = head',
    },
    pointers: [
      { name: 'HEAD', nodeId: oldHeadId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      head: oldHeadId ? state.nodes[oldHeadId]?.address : 'null',
      'newNode.next': oldHeadId ? state.nodes[oldHeadId]?.address : 'null',
    },
    codeLine: 3,
    explanation: `Set newNode.next = ${oldHeadId ? state.nodes[oldHeadId].address : 'null'}.`,
    detailedWhy: 'Connecting newNode to the previous head links the new node to the front of the existing chain.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 1 },
  });

  // Step 3: head = newNode (& tail if empty)
  state.headId = newNodeId;
  const isNowTail = state.tailId === null;
  if (isNowTail) {
    state.tailId = newNodeId;
  }
  state.nodes[newNodeId].status = 'neutral';

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    pointers: [
      { name: 'HEAD', nodeId: newNodeId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: {
      head: newAddress,
      tail: state.nodes[state.tailId]?.address,
      length: Object.keys(state.nodes).length,
    },
    codeLine: 4,
    explanation: `Updated HEAD pointer to point to newNode (${newAddress}).`,
    detailedWhy: isNowTail
      ? 'Because the list was empty, newNode is both HEAD and TAIL.'
      : 'Only the head pointer changed. All downstream nodes remained in their original memory locations.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  // Step 4: Complete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { head: newAddress, tail: state.nodes[state.tailId]?.address },
    codeLine: 6,
    explanation: `Prepend complete! Node (${value}) is now the head. Time complexity: O(1).`,
    detailedWhy: 'Unlike an array where all elements would need to shift right, linked lists prepend in constant O(1) time.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  return steps;
}

export function generateAppendSteps(
  initialState: LinkedListState,
  value: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  const existingAddresses = new Set(Object.values(state.nodes).map((n) => n.address));

  let stepIndex = 0;
  const oldTailId = state.tailId;

  // If list is empty, prepend handles it
  if (!state.headId) {
    return generatePrependSteps(initialState, value);
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
    variables: { tail: state.nodes[oldTailId!].address, value },
    codeLine: 1,
    explanation: `Beginning Insert at End (Append) with value ${value}.`,
    detailedWhy: 'With a maintained tail pointer, append takes O(1) time. We link directly after the current tail.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step 1: Allocate newNode
  const newNodeId = generateNodeId();
  const newAddress = generateMemoryAddress(existingAddresses);
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: null,
    address: newAddress,
    label: `New (${value})`,
    status: 'mutate',
  };
  state.nodes[newNodeId] = newNode;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'allocate',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: oldTailId, color: '#f43f5e' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      tail: state.nodes[oldTailId!].address,
      'newNode.address': newAddress,
      'newNode.value': value,
      'newNode.next': 'null',
    },
    codeLine: 2,
    explanation: `Allocated newNode at ${newAddress} with value ${value} and next = NULL.`,
    detailedWhy: 'The new node starts with next = null because it will become the final node in the list.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 1 },
  });

  // Step 2: tail.next = newNode
  state.nodes[oldTailId!].next = newNodeId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [oldTailId!, newNodeId],
    highlightArrow: {
      fromId: oldTailId!,
      toId: newNodeId,
      type: 'relink',
      label: 'tail.next = newNode',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: oldTailId, color: '#f43f5e' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'oldTail.next': newAddress,
      'newNode.address': newAddress,
    },
    codeLine: 6,
    explanation: `Rewired tail.next to point to newNode (${newAddress}).`,
    detailedWhy: 'The old tail now references the new node instead of pointing to NULL.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 1 },
    predictionQuestion: {
      id: 'append-pred-1',
      prompt: 'Now that tail.next points to newNode, what is the final step?',
      options: [
        {
          id: 'opt-a',
          label: 'Advance TAIL to newNode (tail = newNode)',
          isCorrect: true,
          explanation: 'Correct! The TAIL pointer must always track the last node in the chain.',
        },
        {
          id: 'opt-b',
          label: 'Update HEAD to newNode',
          isCorrect: false,
          explanation: 'Incorrect. HEAD marks the beginning of the list, which has not changed.',
        },
        {
          id: 'opt-c',
          label: 'Set newNode.next to HEAD',
          isCorrect: false,
          explanation: 'Incorrect! That would create a circular linked list (cycle).',
        },
      ],
    },
  });

  // Step 3: tail = newNode
  state.tailId = newNodeId;
  state.nodes[newNodeId].status = 'neutral';

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: newNodeId, color: '#f43f5e' },
    ],
    variables: {
      head: state.nodes[state.headId!].address,
      tail: newAddress,
      length: Object.keys(state.nodes).length,
    },
    codeLine: 7,
    explanation: `Updated TAIL reference to point to newNode (${newAddress}).`,
    detailedWhy: 'Now tail references the newly appended node. Append is fully resolved in O(1) time.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  // Step 4: Complete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { tail: newAddress },
    codeLine: 8,
    explanation: `Append complete! Value ${value} is now at the end of the list.`,
    detailedWhy: 'With a tail pointer reference, we avoided O(n) traversal from head to end.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  return steps;
}

export function generateInsertAtSteps(
  initialState: LinkedListState,
  index: number,
  value: number
): LinkedListAlgorithmStep[] {
  const orderedNodes = getOrderedNodes(initialState);
  if (index <= 0 || orderedNodes.length === 0) {
    return generatePrependSteps(initialState, value);
  }
  if (index >= orderedNodes.length) {
    return generateAppendSteps(initialState, value);
  }

  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  const existingAddresses = new Set(Object.values(state.nodes).map((n) => n.address));
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
    variables: { targetIndex: index, value },
    codeLine: 1,
    explanation: `Beginning Insert at Index ${index} with value ${value}.`,
    detailedWhy: `To insert at index ${index}, we must traverse from head to find the predecessor node at index ${index - 1}.`,
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step 1..k: Traverse curr to index - 1
  let currId = state.headId!;
  for (let i = 0; i < index; i++) {
    const isPredecessor = i === index - 1;
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
        currentPosition: i,
        targetIndex: index,
        'curr.value': state.nodes[currId].value,
        'curr.address': state.nodes[currId].address,
      },
      codeLine: 4,
      explanation: isPredecessor
        ? `Reached predecessor node at index ${i} (${state.nodes[currId].address}).`
        : `Traversing: currently at index ${i} (${state.nodes[currId].address}). Moving to next node.`,
      detailedWhy: isPredecessor
        ? `This node will precede our new node. Its 'next' pointer currently references the node at index ${index}.`
        : 'Singly linked lists do not support random access. We must step node-by-node from the head.',
      stats: { traversals: i + 1, comparisons: 0, pointerWrites: 0, allocations: 0 },
    });

    if (i < index - 1) {
      currId = state.nodes[currId].next!;
    }
  }

  const predecessorId = currId;
  const successorId = state.nodes[predecessorId].next;

  // Step: Allocate newNode
  const newNodeId = generateNodeId();
  const newAddress = generateMemoryAddress(existingAddresses);
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: null,
    address: newAddress,
    label: `New (${value})`,
    status: 'mutate',
  };
  state.nodes[newNodeId] = newNode;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'allocate',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId, predecessorId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'curr', nodeId: predecessorId, color: '#a855f7' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'curr.address': state.nodes[predecessorId].address,
      'newNode.address': newAddress,
      'newNode.value': value,
    },
    codeLine: 5,
    explanation: `Allocated newNode at ${newAddress} for value ${value}.`,
    detailedWhy: 'Now we must perform the two-step pointer splice to link newNode between predecessor and successor.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 0, allocations: 1 },
    predictionQuestion: {
      id: 'insert-at-pred-1',
      prompt: 'Which pointer must be updated FIRST to avoid losing data?',
      options: [
        {
          id: 'opt-a',
          label: 'newNode.next = curr.next (point newNode to successor first)',
          isCorrect: true,
          explanation: 'Correct! We must attach newNode to the successor first. If we changed curr.next first, we would lose the successor reference.',
        },
        {
          id: 'opt-b',
          label: 'curr.next = newNode (point predecessor to newNode first)',
          isCorrect: false,
          explanation: 'Incorrect! Overwriting curr.next first breaks our only link to the rest of the list, causing a memory leak!',
        },
      ],
    },
  });

  // Step: newNode.next = curr.next
  state.nodes[newNodeId].next = successorId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId, successorId!],
    highlightArrow: {
      fromId: newNodeId,
      toId: successorId,
      type: 'new',
      label: 'newNode.next = curr.next',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'curr', nodeId: predecessorId, color: '#a855f7' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'curr.next': successorId ? state.nodes[successorId].address : 'null',
      'newNode.next': successorId ? state.nodes[successorId].address : 'null',
    },
    codeLine: 6,
    explanation: `Set newNode.next = curr.next (${successorId ? state.nodes[successorId].address : 'null'}).`,
    detailedWhy: 'Successor is safely anchored. Now it is safe to rewire the predecessor.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 1, allocations: 1 },
  });

  // Step: curr.next = newNode
  state.nodes[predecessorId].next = newNodeId;
  state.nodes[newNodeId].status = 'neutral';

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [predecessorId, newNodeId],
    highlightArrow: {
      fromId: predecessorId,
      toId: newNodeId,
      type: 'relink',
      label: 'curr.next = newNode',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'curr', nodeId: predecessorId, color: '#a855f7' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'curr.next': newAddress,
      'newNode.next': successorId ? state.nodes[successorId].address : 'null',
    },
    codeLine: 7,
    explanation: `Rewired curr.next to point to newNode (${newAddress}).`,
    detailedWhy: 'The splice is complete! The chain now flows: curr -> newNode -> successor.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  // Step: Complete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { insertedAt: index, newValue: value },
    codeLine: 8,
    explanation: `Insert at Index ${index} complete! Total elements: ${Object.keys(state.nodes).length}.`,
    detailedWhy: 'Notice that only two pointer references were modified. No nodes were moved in memory.',
    stats: { traversals: index, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  return steps;
}

export function generateInsertAfterSteps(
  initialState: LinkedListState,
  targetNodeId: string,
  value: number
): LinkedListAlgorithmStep[] {
  const steps: LinkedListAlgorithmStep[] = [];
  const state = cloneListState(initialState);
  const existingAddresses = new Set(Object.values(state.nodes).map((n) => n.address));

  if (!state.nodes[targetNodeId]) {
    return generateAppendSteps(initialState, value);
  }

  let stepIndex = 0;
  const targetNode = state.nodes[targetNodeId];
  const successorId = targetNode.next;

  // Step 0: Identify target node
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'idle',
    listState: cloneListState(state),
    activeNodeIds: [targetNodeId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'target', nodeId: targetNodeId, color: '#f59e0b' },
    ],
    variables: {
      targetId: targetNodeId,
      'target.value': targetNode.value,
      'target.address': targetNode.address,
      newValue: value,
    },
    codeLine: 1,
    explanation: `Preparing to insert value ${value} directly after Node (${targetNode.value}).`,
    detailedWhy: 'Inserting after a known node is an O(1) operation because we already hold the reference to the predecessor.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 0 },
  });

  // Step 1: Allocate newNode
  const newNodeId = generateNodeId();
  const newAddress = generateMemoryAddress(existingAddresses);
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: null,
    address: newAddress,
    label: `New (${value})`,
    status: 'mutate',
  };
  state.nodes[newNodeId] = newNode;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'allocate',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId, targetNodeId],
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'target', nodeId: targetNodeId, color: '#f59e0b' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'target.address': targetNode.address,
      'newNode.address': newAddress,
      'newNode.value': value,
    },
    codeLine: 2,
    explanation: `Allocated newNode at ${newAddress} with value ${value}.`,
    detailedWhy: 'Next, connect newNode to targetNode.next before updating targetNode.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 0, allocations: 1 },
  });

  // Step 2: newNode.next = targetNode.next
  state.nodes[newNodeId].next = successorId;

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [newNodeId],
    highlightArrow: {
      fromId: newNodeId,
      toId: successorId,
      type: 'new',
      label: 'newNode.next = target.next',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'target', nodeId: targetNodeId, color: '#f59e0b' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'newNode.next': successorId ? state.nodes[successorId].address : 'null',
    },
    codeLine: 3,
    explanation: `Connected newNode.next to targetNode's successor (${successorId ? state.nodes[successorId].address : 'null'}).`,
    detailedWhy: 'Both targetNode and newNode now temporarily point to the successor.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 1, allocations: 1 },
  });

  // Step 3: targetNode.next = newNode
  state.nodes[targetNodeId].next = newNodeId;
  state.nodes[newNodeId].status = 'neutral';
  const wasTail = targetNodeId === state.tailId;
  if (wasTail) {
    state.tailId = newNodeId;
  }

  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'pointer-change',
    listState: cloneListState(state),
    activeNodeIds: [targetNodeId, newNodeId],
    highlightArrow: {
      fromId: targetNodeId,
      toId: newNodeId,
      type: 'relink',
      label: 'target.next = newNode',
    },
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
      { name: 'target', nodeId: targetNodeId, color: '#f59e0b' },
      { name: 'newNode', nodeId: newNodeId, color: '#10b981' },
    ],
    variables: {
      'target.next': newAddress,
      tail: state.nodes[state.tailId].address,
    },
    codeLine: 4,
    explanation: `Rewired targetNode.next = newNode (${newAddress}).${wasTail ? ' Updated TAIL reference.' : ''}`,
    detailedWhy: 'The new node is now spliced directly after targetNode.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  // Step 4: Complete
  steps.push({
    id: `step-${stepIndex}`,
    stepIndex: stepIndex++,
    type: 'complete',
    listState: cloneListState(state),
    pointers: [
      { name: 'HEAD', nodeId: state.headId, color: '#38bdf8' },
      { name: 'TAIL', nodeId: state.tailId, color: '#f43f5e' },
    ],
    variables: { insertedAfter: targetNode.value, newValue: value },
    codeLine: 6,
    explanation: `Insert After Node complete in O(1) time!`,
    detailedWhy: 'Linked lists excel at insertions after known nodes because only references are updated.',
    stats: { traversals: 0, comparisons: 0, pointerWrites: 2, allocations: 1 },
  });

  return steps;
}
