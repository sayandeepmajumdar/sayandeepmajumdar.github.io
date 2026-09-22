import { PredictionQuestion } from '../../engine/Step';

export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
  address: string; // e.g. "0x10A4"
  label?: string;
  status?: 'neutral' | 'active' | 'compare' | 'found' | 'mutate' | 'detach' | 'selected';
}

export interface LinkedListState {
  nodes: Record<string, LinkedListNode>;
  headId: string | null;
  tailId: string | null;
}

export interface LinkedListStepPointer {
  name: string; // e.g. "HEAD", "TAIL", "curr", "prev", "next", "newNode", "target"
  nodeId: string | null; // null represents pointing to NULL / ground
  color?: string;
  label?: string;
}

export interface HighlightArrow {
  fromId: string;
  toId: string | null;
  type: 'traverse' | 'new' | 'relink' | 'break' | 'reversed';
  label?: string;
}

export interface LinkedListAlgorithmStep {
  id: string;
  stepIndex: number;
  type:
    | 'idle'
    | 'traverse'
    | 'compare'
    | 'found'
    | 'not-found'
    | 'allocate'
    | 'pointer-change'
    | 'bypass'
    | 'detach'
    | 'complete';
  listState: LinkedListState;
  activeNodeIds?: string[];
  highlightArrow?: HighlightArrow;
  detachedNodes?: LinkedListNode[];
  pointers: LinkedListStepPointer[];
  variables: Record<string, string | number | boolean | null>;
  codeLine?: number;
  explanation: string;
  detailedWhy?: string;
  stats: {
    traversals: number;
    comparisons: number;
    pointerWrites: number;
    allocations: number;
  };
  predictionQuestion?: PredictionQuestion;
}

export type LinkedListOperationId =
  | 'prepend'
  | 'append'
  | 'insertAt'
  | 'insertAfter'
  | 'deleteBeginning'
  | 'deleteEnd'
  | 'deleteAt'
  | 'deleteValue'
  | 'search'
  | 'length'
  | 'reverse'
  | 'update';

export interface LinkedListRunnerOptions {
  value?: number;
  index?: number;
  targetValue?: number;
  targetNodeId?: string;
  newValue?: number;
}
