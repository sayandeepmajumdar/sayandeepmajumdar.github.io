import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import {
  LinkedListOperationId,
  LinkedListRunnerOptions,
  LinkedListState,
} from '../types';
import { getOrderedNodes } from '../lib/memoryAddress';
import {
  Play,
  CornerDownRight,
  ArrowRight,
  Trash2,
  Search,
  RotateCcw,
  Hash,
  Edit,
  ArrowRightLeft,
} from 'lucide-react';

export interface LinkedListInspectorProps {
  listState: LinkedListState;
  activeOperation: LinkedListOperationId;
  selectedNodeId: string | null;
  onExecute: (op: LinkedListOperationId, options: LinkedListRunnerOptions) => void;
}

export const LinkedListInspector: React.FC<LinkedListInspectorProps> = ({
  listState,
  activeOperation,
  selectedNodeId,
  onExecute,
}) => {
  const orderedNodes = getOrderedNodes(listState);
  const n = orderedNodes.length;

  // Form states
  const [insertValue, setInsertValue] = useState<number>(5);
  const [appendValue, setAppendValue] = useState<number>(50);
  const [insertIndex, setInsertIndex] = useState<number>(2);
  const [insertIndexValue, setInsertIndexValue] = useState<number>(25);

  const [insertAfterTargetId, setInsertAfterTargetId] = useState<string>(
    selectedNodeId || orderedNodes[0]?.id || ''
  );
  const [insertAfterValue, setInsertAfterValue] = useState<number>(35);

  const [deleteIndex, setDeleteIndex] = useState<number>(1);
  const [deleteTargetValue, setDeleteTargetValue] = useState<number>(
    orderedNodes[1]?.value ?? 20
  );

  const [searchValue, setSearchValue] = useState<number>(
    orderedNodes[2]?.value ?? 30
  );

  const [updateIndex, setUpdateIndex] = useState<number>(1);
  const [updateNewValue, setUpdateNewValue] = useState<number>(99);

  // Sync selectedNodeId when user clicks a node in the visualizer
  useEffect(() => {
    if (selectedNodeId && listState.nodes[selectedNodeId]) {
      setInsertAfterTargetId(selectedNodeId);
      const clickedIdx = orderedNodes.findIndex((n) => n.id === selectedNodeId);
      if (clickedIdx !== -1) {
        setInsertIndex(clickedIdx);
        setDeleteIndex(clickedIdx);
        setUpdateIndex(clickedIdx);
        setDeleteTargetValue(listState.nodes[selectedNodeId].value);
        setSearchValue(listState.nodes[selectedNodeId].value);
      }
    }
  }, [selectedNodeId]);

  const metadata: Record<
    LinkedListOperationId,
    {
      title: string;
      icon: React.ReactNode;
      time: string;
      space: string;
      description: string;
    }
  > = {
    prepend: {
      title: 'Insert at Beginning (Prepend)',
      icon: <CornerDownRight className="w-4 h-4 text-emerald-400" />,
      time: 'O(1)',
      space: 'O(1)',
      description:
        'Allocates newNode, points newNode.next = HEAD, and updates HEAD. Instant constant-time insertion without shifting any elements.',
    },
    append: {
      title: 'Insert at End (Append)',
      icon: <ArrowRight className="w-4 h-4 text-emerald-400" />,
      time: 'O(1)',
      space: 'O(1)',
      description:
        'With a maintained TAIL pointer, append directly links tail.next = newNode and advances TAIL in O(1) time.',
    },
    insertAt: {
      title: 'Insert at Index',
      icon: <CornerDownRight className="w-4 h-4 text-teal-400" />,
      time: 'O(index)',
      space: 'O(1)',
      description:
        'Traverses to index - 1, points newNode.next = curr.next first, then updates curr.next = newNode to splice the node into the chain.',
    },
    insertAfter: {
      title: 'Insert After Node',
      icon: <ArrowRightLeft className="w-4 h-4 text-blue-400" />,
      time: 'O(1)',
      space: 'O(1)',
      description:
        'Splices a new node directly after an already referenced target node in O(1) time. A hallmark strength of pointer-based structures.',
    },
    deleteBeginning: {
      title: 'Delete from Beginning',
      icon: <Trash2 className="w-4 h-4 text-rose-400" />,
      time: 'O(1)',
      space: 'O(1)',
      description:
        'Advances HEAD = HEAD.next. The unlinked previous head is garbage collected in O(1) time (no shifting like arrays).',
    },
    deleteEnd: {
      title: 'Delete from End',
      icon: <Trash2 className="w-4 h-4 text-rose-400" />,
      time: 'O(n)',
      space: 'O(1)',
      description:
        'Because singly linked lists only have forward pointers, we must traverse from HEAD to find the predecessor before TAIL.',
    },
    deleteAt: {
      title: 'Delete by Index',
      icon: <Trash2 className="w-4 h-4 text-rose-400" />,
      time: 'O(index)',
      space: 'O(1)',
      description:
        'Traverses to predecessor at index - 1 and sets prev.next = target.next, cleanly bypassing the target node.',
    },
    deleteValue: {
      title: 'Delete by Value',
      icon: <Trash2 className="w-4 h-4 text-rose-400" />,
      time: 'O(n)',
      space: 'O(1)',
      description:
        'Linear search for matching node with two sliding pointers (curr & prev), followed by an O(1) pointer bypass.',
    },
    search: {
      title: 'Search Target Value',
      icon: <Search className="w-4 h-4 text-blue-400" />,
      time: 'O(n)',
      space: 'O(1)',
      description:
        'Steps through nodes from HEAD, comparing each value against the target until a match is found or NULL is reached.',
    },
    length: {
      title: 'Calculate Length',
      icon: <Hash className="w-4 h-4 text-teal-400" />,
      time: 'O(n)',
      space: 'O(1)',
      description:
        'Traverses the full chain counting each node sequentially until the NULL terminus.',
    },
    reverse: {
      title: 'Reverse Linked List',
      icon: <RotateCcw className="w-4 h-4 text-amber-400" />,
      time: 'O(n)',
      space: 'O(1)',
      description:
        'The signature 3-pointer algorithm: sliding prev, curr, and next to flip every pointer backward in-place.',
    },
    update: {
      title: 'Update Node Value',
      icon: <Edit className="w-4 h-4 text-purple-400" />,
      time: 'O(index)',
      space: 'O(1)',
      description:
        'Traverses to the desired node and overwrites its payload in-place. Pointers remain completely unchanged.',
    },
  };

  const handleRun = () => {
    switch (activeOperation) {
      case 'prepend':
        onExecute('prepend', { value: insertValue });
        break;
      case 'append':
        onExecute('append', { value: appendValue });
        break;
      case 'insertAt':
        onExecute('insertAt', { index: insertIndex, value: insertIndexValue });
        break;
      case 'insertAfter':
        onExecute('insertAfter', {
          targetNodeId: insertAfterTargetId,
          value: insertAfterValue,
        });
        break;
      case 'deleteBeginning':
        onExecute('deleteBeginning', {});
        break;
      case 'deleteEnd':
        onExecute('deleteEnd', {});
        break;
      case 'deleteAt':
        onExecute('deleteAt', { index: deleteIndex });
        break;
      case 'deleteValue':
        onExecute('deleteValue', { targetValue: deleteTargetValue });
        break;
      case 'search':
        onExecute('search', { targetValue: searchValue });
        break;
      case 'length':
        onExecute('length', {});
        break;
      case 'reverse':
        onExecute('reverse', {});
        break;
      case 'update':
        onExecute('update', { index: updateIndex, newValue: updateNewValue });
        break;
    }
  };

  const currentMeta = metadata[activeOperation];

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3.5 shadow-md">
      {/* Operation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100 font-mono">
          {currentMeta.icon}
          <span>{currentMeta.title}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <Badge variant="accent">Time: {currentMeta.time}</Badge>
          <Badge variant="outline">Space: {currentMeta.space}</Badge>
        </div>
      </div>

      {/* Dynamic Inputs per Operation */}
      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        {activeOperation === 'prepend' && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Value to Prepend at HEAD"
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(Number(e.target.value))}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              className="gap-2 font-mono text-xs font-semibold whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Prepend ({insertValue})</span>
            </Button>
          </div>
        )}

        {activeOperation === 'append' && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Value to Append at TAIL"
                type="number"
                value={appendValue}
                onChange={(e) => setAppendValue(Number(e.target.value))}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              className="gap-2 font-mono text-xs font-semibold whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Append ({appendValue})</span>
            </Button>
          </div>
        )}

        {activeOperation === 'insertAt' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <Input
              label="Value to Insert"
              type="number"
              value={insertIndexValue}
              onChange={(e) => setInsertIndexValue(Number(e.target.value))}
            />
            <Input
              label={`Target Index [0..${n}]`}
              type="number"
              min={0}
              max={n}
              value={insertIndex}
              onChange={(e) => setInsertIndex(Number(e.target.value))}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Insert at [{insertIndex}]</span>
            </Button>
          </div>
        )}

        {activeOperation === 'insertAfter' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Insert After Node
              </label>
              <select
                value={insertAfterTargetId}
                onChange={(e) => setInsertAfterTargetId(e.target.value)}
                className="w-full h-9 rounded-lg bg-slate-900 border border-slate-700 px-3 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
              >
                {orderedNodes.map((node, idx) => (
                  <option key={node.id} value={node.id}>
                    [{idx}] {node.label || 'Node'} (Val: {node.value}, {node.address})
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="New Node Value"
              type="number"
              value={insertAfterValue}
              onChange={(e) => setInsertAfterValue(Number(e.target.value))}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Insert After</span>
            </Button>
          </div>
        )}

        {activeOperation === 'deleteBeginning' && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Will detach HEAD node ({orderedNodes[0]?.value ?? 'none'}) and advance HEAD in O(1).
            </span>
            <Button
              variant="danger"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Head</span>
            </Button>
          </div>
        )}

        {activeOperation === 'deleteEnd' && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Traverses to node before TAIL, severs connection, updates TAIL in O(n).
            </span>
            <Button
              variant="danger"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Tail</span>
            </Button>
          </div>
        )}

        {activeOperation === 'deleteAt' && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label={`Index to Delete [0..${Math.max(0, n - 1)}]`}
                type="number"
                min={0}
                max={Math.max(0, n - 1)}
                value={deleteIndex}
                onChange={(e) => setDeleteIndex(Number(e.target.value))}
              />
            </div>
            <Button
              variant="danger"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete at [{deleteIndex}]</span>
            </Button>
          </div>
        )}

        {activeOperation === 'deleteValue' && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Target Value to Remove"
                type="number"
                value={deleteTargetValue}
                onChange={(e) => setDeleteTargetValue(Number(e.target.value))}
              />
            </div>
            <Button
              variant="danger"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Value ({deleteTargetValue})</span>
            </Button>
          </div>
        )}

        {activeOperation === 'search' && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Target Value to Search"
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(Number(e.target.value))}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search ({searchValue})</span>
            </Button>
          </div>
        )}

        {activeOperation === 'length' && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Iterates from HEAD to NULL, incrementing a count variable at each node.
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Count Length</span>
            </Button>
          </div>
        )}

        {activeOperation === 'reverse' && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Inverts pointer directions of all {n} nodes using 3 sliding pointers.
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Full Reversal</span>
            </Button>
          </div>
        )}

        {activeOperation === 'update' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <Input
              label={`Target Index [0..${Math.max(0, n - 1)}]`}
              type="number"
              min={0}
              max={Math.max(0, n - 1)}
              value={updateIndex}
              onChange={(e) => setUpdateIndex(Number(e.target.value))}
            />
            <Input
              label="New Value"
              type="number"
              value={updateNewValue}
              onChange={(e) => setUpdateNewValue(Number(e.target.value))}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleRun}
              disabled={n === 0}
              className="gap-2 font-mono text-xs font-semibold"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Update Node</span>
            </Button>
          </div>
        )}
      </div>

      {/* Pedagogical Description */}
      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        {currentMeta.description}
      </p>
    </div>
  );
};
