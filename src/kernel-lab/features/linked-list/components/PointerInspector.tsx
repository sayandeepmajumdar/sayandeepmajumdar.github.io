import React from 'react';
import {
  LinkedListAlgorithmStep,
  LinkedListNode,
  LinkedListState,
  LinkedListStepPointer,
} from '../types';
import { Terminal, Activity, HelpCircle, GitFork, Cpu, ArrowRight } from 'lucide-react';
import { getOrderedNodes } from '../lib/memoryAddress';

export interface PointerInspectorProps {
  currentStep?: LinkedListAlgorithmStep | null;
  totalSteps: number;
  listState: LinkedListState;
  selectedNodeId?: string | null;
}

export const PointerInspector: React.FC<PointerInspectorProps> = ({
  currentStep,
  totalSteps,
  listState,
  selectedNodeId,
}) => {
  const stepIndex = currentStep ? currentStep.stepIndex + 1 : 0;
  const pointers = currentStep?.pointers || [
    { name: 'HEAD', nodeId: listState.headId, color: '#38bdf8' },
    { name: 'TAIL', nodeId: listState.tailId, color: '#f43f5e' },
  ];
  const variables = currentStep?.variables || {};
  const stats = currentStep?.stats || {
    traversals: 0,
    comparisons: 0,
    pointerWrites: 0,
    allocations: 0,
  };

  const selectedNode = selectedNodeId ? listState.nodes[selectedNodeId] : null;
  const orderedNodes = getOrderedNodes(listState);
  const selectedIndex = selectedNode
    ? orderedNodes.findIndex((n) => n.id === selectedNode.id)
    : -1;

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md font-mono text-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>POINTER STATE DEBUGGER</span>
        </div>
        <div className="text-slate-400">
          Step <span className="text-blue-400 font-bold">{stepIndex}</span> / {totalSteps}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Active Pointers Section */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              <span>Active Pointers</span>
            </div>
            <span className="text-[10px] text-slate-500 font-normal">Reference targets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pointers.map((ptr, pIdx) => {
              const targetNode = ptr.nodeId ? listState.nodes[ptr.nodeId] : null;
              const isNull = !targetNode;

              return (
                <div
                  key={pIdx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider font-mono"
                      style={{
                        backgroundColor: `${ptr.color || '#38bdf8'}25`,
                        color: ptr.color || '#38bdf8',
                        border: `1px solid ${ptr.color || '#38bdf8'}60`,
                      }}
                    >
                      {ptr.name}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </div>

                  <div className="text-right">
                    {isNull ? (
                      <span className="font-bold text-rose-400">NULL (0x0000)</span>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="font-semibold text-slate-200">
                          {targetNode.label || 'Node'} ({targetNode.value})
                        </span>
                        <span className="text-[10px] text-blue-400 font-mono">
                          [{targetNode.address}]
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Card (if user clicked a node) */}
        {selectedNode && (
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-blue-300">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>INSPECTED NODE: {selectedNode.label || selectedNode.id}</span>
              </div>
              <span className="text-[10px] text-blue-400">Index: [{selectedIndex}]</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 flex flex-col">
                <span className="text-[9px] text-slate-500">Address</span>
                <span className="font-bold text-slate-200">{selectedNode.address}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 flex flex-col">
                <span className="text-[9px] text-slate-500">Payload</span>
                <span className="font-bold text-emerald-400">{selectedNode.value}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 flex flex-col">
                <span className="text-[9px] text-slate-500">Next Pointer</span>
                <span className="font-bold text-blue-300">
                  {selectedNode.next
                    ? listState.nodes[selectedNode.next]?.address || selectedNode.next
                    : 'NULL'}
                </span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 flex flex-col">
                <span className="text-[9px] text-slate-500">Special Role</span>
                <span className="font-bold text-purple-400">
                  {selectedNode.id === listState.headId
                    ? 'HEAD'
                    : selectedNode.id === listState.tailId
                    ? 'TAIL'
                    : 'Internal'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Variables Scope */}
        {Object.keys(variables).length > 0 && (
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Frame Variables Scope
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2 bg-slate-900/60 rounded-lg border border-slate-800/80">
              {Object.entries(variables).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-2 py-1 bg-slate-950/50 rounded border border-slate-800/40 text-[11px]"
                >
                  <span className="text-slate-400">{key}</span>
                  <span className="font-semibold text-blue-300">
                    {val === null || val === undefined ? 'null' : String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operation Runtime Counters */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Operational Cost Counters</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Traversals</span>
              <span className="text-base font-bold text-blue-400">{stats.traversals}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Comparisons</span>
              <span className="text-base font-bold text-amber-400">{stats.comparisons}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Pointer Rewires</span>
              <span className="text-base font-bold text-purple-400">{stats.pointerWrites}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Heap Allocations</span>
              <span className="text-base font-bold text-emerald-400">{stats.allocations}</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Explanation & Why */}
        {currentStep && (
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-slate-300 font-sans space-y-1.5">
            <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <span>{currentStep.explanation}</span>
            </div>
            {currentStep.detailedWhy && (
              <div className="text-xs text-slate-400 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-blue-900/30">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Why? </strong>
                  {currentStep.detailedWhy}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
