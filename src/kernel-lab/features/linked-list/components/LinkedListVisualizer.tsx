import React from 'react';
import { LinkedListNodeCard } from './LinkedListNodeCard';
import {
  LinkedListAlgorithmStep,
  LinkedListNode,
  LinkedListState,
} from '../types';
import { getOrderedNodes } from '../lib/memoryAddress';
import { ArrowRight, Trash2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export interface LinkedListVisualizerProps {
  listState: LinkedListState;
  currentStep?: LinkedListAlgorithmStep | null;
  selectedNodeId?: string | null;
  onSelectNode?: (nodeId: string) => void;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  listState,
  currentStep,
  selectedNodeId,
  onSelectNode,
}) => {
  const orderedNodes = getOrderedNodes(listState);
  const activeNodeIds = currentStep?.activeNodeIds || [];
  const stepType = currentStep?.type || 'idle';
  const highlightArrow = currentStep?.highlightArrow;
  const detachedNodes = currentStep?.detachedNodes || [];
  const pointers = currentStep?.pointers || [];

  // Pointers that point specifically to NULL
  const nullPointers = pointers.filter((p) => p.nodeId === null);

  // Empty List State
  if (orderedNodes.length === 0 && detachedNodes.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 sm:p-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-center space-y-4">
        <div className="flex items-center gap-6 text-sm font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <span className="font-bold">HEAD</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="text-rose-400 font-bold">NULL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
            <span className="font-bold">TAIL</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="text-rose-400 font-bold">NULL</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-slate-300 text-sm font-semibold">The Linked List is Empty</p>
          <p className="text-xs text-slate-500 max-w-md">
            Both HEAD and TAIL point to NULL (0x0000). Use the control bar above to prepend, append, or generate nodes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Scrollable Node Chain Track */}
      <div className="w-full overflow-x-auto py-6 px-2 flex items-center min-h-[190px] scrollbar-thin">
        <div className="flex items-center gap-3 sm:gap-4 mx-auto">
          {/* Main Nodes Chain */}
          {orderedNodes.map((node, idx) => {
            const nextNode = node.next ? listState.nodes[node.next] : null;
            const nextAddress = nextNode ? nextNode.address : null;

            // Determine status
            let status:
              | 'neutral'
              | 'active'
              | 'compare'
              | 'found'
              | 'mutate'
              | 'detach'
              | 'selected' = 'neutral';

            if (selectedNodeId === node.id) {
              status = 'selected';
            }

            if (activeNodeIds.includes(node.id)) {
              if (stepType === 'compare') {
                status = 'compare';
              } else if (stepType === 'found') {
                status = 'found';
              } else if (stepType === 'allocate' || stepType === 'pointer-change' || stepType === 'bypass') {
                status = 'mutate';
              } else if (stepType === 'traverse') {
                status = 'active';
              }
            }

            // Pointers pointing to this node
            const nodePointers = pointers.filter((p) => p.nodeId === node.id);

            // Is this the highlighted connection arrow?
            const isHighlightedArrow =
              highlightArrow &&
              highlightArrow.fromId === node.id &&
              highlightArrow.toId === node.next;

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div className="shrink-0">
                  <LinkedListNodeCard
                    node={node}
                    index={idx}
                    pointers={nodePointers}
                    status={status}
                    isSelected={selectedNodeId === node.id}
                    nextAddress={nextAddress}
                    onClick={() => onSelectNode?.(node.id)}
                  />
                </div>

                {/* Connecting SVG Arrow to Next Node or NULL */}
                <div className="shrink-0 flex flex-col items-center justify-center relative px-0.5">
                  <div className="h-7 mb-1.5" /> {/* Top spacing align with pointer shelf */}
                  <div
                    className={`flex items-center transition-all duration-200 ${
                      isHighlightedArrow
                        ? 'text-purple-400 scale-110 drop-shadow-md'
                        : 'text-emerald-400/80 hover:text-emerald-300'
                    }`}
                  >
                    <svg
                      width="38"
                      height="20"
                      viewBox="0 0 38 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="overflow-visible"
                    >
                      <defs>
                        <marker
                          id={`arrowhead-${node.id}`}
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 6 3, 0 6"
                            fill={isHighlightedArrow ? '#c084fc' : '#34d399'}
                          />
                        </marker>
                      </defs>
                      <path
                        d="M 2 10 L 32 10"
                        stroke={isHighlightedArrow ? '#c084fc' : '#34d399'}
                        strokeWidth={isHighlightedArrow ? '2.5' : '1.8'}
                        strokeDasharray={isHighlightedArrow ? '4 2' : undefined}
                        markerEnd={`url(#arrowhead-${node.id})`}
                        className={isHighlightedArrow ? 'animate-pulse' : ''}
                      />
                    </svg>
                  </div>
                  {isHighlightedArrow && highlightArrow?.label && (
                    <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-1 rounded border border-purple-500/30 whitespace-nowrap absolute -bottom-4">
                      {highlightArrow.label}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}

          {/* NULL Ground Terminator */}
          <div className="shrink-0 flex flex-col items-center select-none">
            {/* Null pointers shelf (e.g. prev -> NULL, curr -> NULL) */}
            <div className="h-7 flex items-end justify-center gap-1 mb-1.5 min-w-[70px]">
              {nullPointers.map((ptr, pIdx) => {
                const color = ptr.color || '#f59e0b';
                return (
                  <div
                    key={pIdx}
                    className="flex flex-col items-center animate-in fade-in duration-150"
                  >
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap"
                      style={{
                        backgroundColor: `${color}25`,
                        color,
                        border: `1px solid ${color}60`,
                      }}
                    >
                      {ptr.name}
                    </span>
                    <div
                      className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px]"
                      style={{ borderTopColor: color }}
                    />
                  </div>
                );
              })}
            </div>

            {/* NULL Terminal Box */}
            <div className="w-20 sm:w-24 h-[76px] rounded-xl border border-dashed border-slate-700 bg-slate-950/60 flex flex-col items-center justify-center p-2 text-center transition-all hover:border-slate-500">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                TERMINUS
              </span>
              <span className="text-sm font-mono font-black text-rose-400">
                NULL
              </span>
              <span className="text-[9px] font-mono text-slate-600">0x0000</span>
            </div>
            <span className="mt-1 text-[10px] font-mono text-slate-600">end</span>
          </div>
        </div>
      </div>

      {/* Detached / Orphaned Nodes Shelf (Garbage Collection Stage) */}
      {detachedNodes.length > 0 && (
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/15 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-400">
              <Trash2 className="w-4 h-4" />
              <span>GARBAGE COLLECTION SHELF • UNLINKED NODES</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-900/30 text-red-300 border border-red-800/50">
              {detachedNodes.length} Unreferenced
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3 font-sans">
            These nodes have 0 incoming pointers. In modern memory management (e.g. JavaScript V8 mark-and-sweep),
            nodes unreachable from the root <strong className="text-slate-200">HEAD</strong> pointer are safely deallocated.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {detachedNodes.map((dNode) => (
              <div
                key={dNode.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg border border-red-500/40 bg-slate-950/80 font-mono text-xs shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Address</span>
                  <span className="font-bold text-red-300">{dNode.address}</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Payload</span>
                  <span className="font-bold text-slate-200">{dNode.value}</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span>next → </span>
                  <span className="text-rose-400 font-bold">NULL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
