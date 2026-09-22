import { LinkedListNode, LinkedListState } from '../types';

// Pre-curated realistic non-contiguous heap addresses
const POOL_OF_ADDRESSES = [
  '0x1040',
  '0x1098',
  '0x1110',
  '0x11A4',
  '0x2048',
  '0x20DC',
  '0x2170',
  '0x3014',
  '0x30A8',
  '0x313C',
  '0x4080',
  '0x4114',
  '0x41A8',
  '0x503C',
  '0x50D0',
];

let addressCounter = 0x6000;

export function generateMemoryAddress(existingAddresses?: Set<string>): string {
  if (existingAddresses) {
    for (const addr of POOL_OF_ADDRESSES) {
      if (!existingAddresses.has(addr)) {
        return addr;
      }
    }
  }
  addressCounter += Math.floor(Math.random() * 48 + 16);
  return `0x${addressCounter.toString(16).toUpperCase()}`;
}

let nodeIdCounter = 1;

export function generateNodeId(): string {
  return `node-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function resetNodeCounters() {
  nodeIdCounter = 1;
}

/**
 * Creates a complete LinkedListState from an array of numbers.
 * Generates unique non-contiguous addresses for each node.
 */
export function createListFromValues(values: number[]): LinkedListState {
  if (values.length === 0) {
    return {
      nodes: {},
      headId: null,
      tailId: null,
    };
  }

  const nodes: Record<string, LinkedListNode> = {};
  const usedAddresses = new Set<string>();
  const ids: string[] = [];

  values.forEach((val, i) => {
    const id = `node-${i + 1}`;
    const address = generateMemoryAddress(usedAddresses);
    usedAddresses.add(address);
    ids.push(id);

    nodes[id] = {
      id,
      value: val,
      next: null,
      address,
      label: `Node #${i + 1}`,
      status: 'neutral',
    };
  });

  // Link consecutive nodes
  for (let i = 0; i < ids.length - 1; i++) {
    nodes[ids[i]].next = ids[i + 1];
  }

  return {
    nodes,
    headId: ids[0],
    tailId: ids[ids.length - 1],
  };
}

/**
 * Traverses the linked list from head and returns the ordered array of nodes.
 * Includes a cycle safeguard to prevent infinite loops.
 */
export function getOrderedNodes(state: LinkedListState): LinkedListNode[] {
  const result: LinkedListNode[] = [];
  if (!state.headId) return result;

  const visited = new Set<string>();
  let currId: string | null = state.headId;

  while (currId && state.nodes[currId] && !visited.has(currId)) {
    visited.add(currId);
    result.push(state.nodes[currId]);
    currId = state.nodes[currId].next;
  }

  return result;
}

/**
 * Deep clones a LinkedListState to ensure immutable step snapshots.
 */
export function cloneListState(state: LinkedListState): LinkedListState {
  const clonedNodes: Record<string, LinkedListNode> = {};
  for (const [id, node] of Object.entries(state.nodes)) {
    clonedNodes[id] = { ...node };
  }
  return {
    nodes: clonedNodes,
    headId: state.headId,
    tailId: state.tailId,
  };
}
