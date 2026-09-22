import React from 'react';
import { LinkedListAlgorithmStep, LinkedListState } from '../types';
import { getOrderedNodes } from '../lib/memoryAddress';
import { Cpu, HelpCircle, HardDrive, ArrowRight, Layers, GitFork } from 'lucide-react';

export interface LinkedListMemoryViewProps {
  listState: LinkedListState;
  currentStep?: LinkedListAlgorithmStep | null;
  selectedNodeId?: string | null;
  onSelectNode?: (nodeId: string) => void;
}

export const LinkedListMemoryView: React.FC<LinkedListMemoryViewProps> = ({
  listState,
  currentStep,
  selectedNodeId,
  onSelectNode,
}) => {
  const orderedNodes = getOrderedNodes(listState);
  const activeNodeIds = currentStep?.activeNodeIds || [];
  const pointers = currentStep?.pointers || [];

  return (
    <div className="w-full space-y-4 font-mono text-xs">
      {/* Disclaimer and Concept Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-blue-500/30 bg-blue-950/20 text-slate-300 font-sans">
        <div className="flex items-start gap-2.5">
          <HardDrive className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 font-mono">SIMULATED HEAP RAM ALLOCATION</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 font-semibold">
                Simulated memory addresses
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Unlike arrays that require a contiguous slab of RAM (<code className="text-blue-300 font-mono">Base + i*4</code>),
              each linked list node is independently allocated anywhere in the heap and stitched together solely by reference addresses.
            </p>
          </div>
        </div>
      </div>

      {/* Memory Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-2.5 px-4">Node RAM Address</th>
                <th className="py-2.5 px-4">Logical ID</th>
                <th className="py-2.5 px-4">Stored Value</th>
                <th className="py-2.5 px-4">Next Pointer Address</th>
                <th className="py-2.5 px-4">Active References Pointing Here</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orderedNodes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 italic">
                    No heap memory currently allocated for this linked list.
                  </td>
                </tr>
              ) : (
                orderedNodes.map((node, idx) => {
                  const isActive = activeNodeIds.includes(node.id);
                  const isSelected = selectedNodeId === node.id;
                  const nextNode = node.next ? listState.nodes[node.next] : null;
                  const nextAddress = nextNode ? nextNode.address : 'NULL (0x0000)';

                  const nodePointers = pointers.filter((p) => p.nodeId === node.id);

                  return (
                    <tr
                      key={node.id}
                      onClick={() => onSelectNode?.(node.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/20 border-l-2 border-l-blue-500'
                          : isActive
                          ? 'bg-purple-950/30 border-l-2 border-l-purple-500'
                          : 'hover:bg-slate-900/50'
                      }`}
                    >
                      {/* Node RAM Address */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="font-bold text-blue-300 font-mono">
                            {node.address}
                          </span>
                        </div>
                      </td>

                      {/* Logical ID */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-300">
                          {node.label || `Node #${idx + 1}`}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1.5">[{idx}]</span>
                      </td>

                      {/* Stored Value */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-bold text-slate-100">
                          {node.value}
                        </span>
                      </td>

                      {/* Next Pointer Address */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-bold">
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                          <span
                            className={
                              nextAddress.startsWith('NULL')
                                ? 'text-rose-400'
                                : 'text-emerald-300'
                            }
                          >
                            {nextAddress}
                          </span>
                        </div>
                      </td>

                      {/* Active Pointers */}
                      <td className="py-3 px-4">
                        {nodePointers.length === 0 ? (
                          <span className="text-slate-600 text-[11px]">—</span>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1.5">
                            {nodePointers.map((ptr, pIdx) => (
                              <span
                                key={pIdx}
                                className="text-[10px] font-bold px-2 py-0.5 rounded font-mono shadow-xs"
                                style={{
                                  backgroundColor: `${ptr.color || '#38bdf8'}25`,
                                  color: ptr.color || '#38bdf8',
                                  border: `1px solid ${ptr.color || '#38bdf8'}60`,
                                }}
                              >
                                {ptr.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Array vs Linked List Memory Architecture Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-1.5 font-sans">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
            <Layers className="w-4 h-4" />
            <span>ARRAY MEMORY ARCHITECTURE</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Must be stored in one unbroken contiguous segment of memory.
            Enables instant $O(1)$ random indexing via direct hardware multiplication, but resizing requires allocating a new block and copying every element.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/15 space-y-1.5 font-sans">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <GitFork className="w-4 h-4" />
            <span>LINKED LIST HEAP ARCHITECTURE</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nodes can reside at scattered, non-contiguous addresses across memory.
            Each node contains its data plus the pointer address of the next node. Inserting or deleting requires only changing pointers, never moving data.
          </p>
        </div>
      </div>
    </div>
  );
};
