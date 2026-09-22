import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  BookOpen,
  X,
  Layers,
  Cpu,
  Zap,
  AlertTriangle,
  GitFork,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';

export interface LinkedListTheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TheorySectionId = 'overview' | 'memory' | 'comparison' | 'complexity' | 'pitfalls' | 'advanced';

interface TheorySection {
  id: TheorySectionId;
  label: string;
  icon: React.ReactNode;
}

export const LinkedListTheoryModal: React.FC<LinkedListTheoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<TheorySectionId>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const sections: TheorySection[] = [
    { id: 'overview', label: '1. What is a Linked List?', icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
    { id: 'memory', label: '2. Memory & Pointers', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { id: 'comparison', label: '3. Array vs Linked List', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'complexity', label: '4. Big-O Complexity', icon: <Clock className="w-4 h-4 text-amber-400" /> },
    { id: 'pitfalls', label: '5. Common Traps & Bugs', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
    { id: 'advanced', label: '6. Advanced Variants', icon: <GitFork className="w-4 h-4 text-teal-400" /> },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[90vh] rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl flex flex-col overflow-hidden relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100 font-mono">
                  Linked List Theory & Deep Dive
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  DSA Fundamentals
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A comprehensive textbook-grade guide to pointer mechanics, memory layouts, and trade-offs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Sidebar Navigation + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/90 p-3 shrink-0 overflow-x-auto md:overflow-y-auto">
            <div className="flex md:flex-col gap-1">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all text-left whitespace-nowrap md:whitespace-normal cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {sec.icon}
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Article Content Container */}
          <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm font-sans leading-relaxed">
            {/* 1. OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    1. What is a Linked List?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    A <strong className="text-blue-300">Linked List</strong> is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element is a standalone object called a <strong className="text-emerald-300">Node</strong>. Every node consists of two essential parts:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                      1. Data Field (Value)
                    </div>
                    <p className="text-xs text-slate-300">
                      Stores the actual value or payload (an integer, string, object, pointer to another structure).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      2. Next Pointer (Reference)
                    </div>
                    <p className="text-xs text-slate-300">
                      Stores the 64-bit memory address of the subsequent node in RAM, linking the chain together.
                    </p>
                  </div>
                </div>

                {/* Mental Model Analogy */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950 border border-blue-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-300">
                    <HelpCircle className="w-4 h-4 text-blue-400" />
                    <span>REAL-WORLD MENTAL MODEL: THE SCAVENGER HUNT</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Think of an <strong className="text-white">Array</strong> as a street of row houses with consecutive door numbers: House #0, House #1, House #2. To find House #5, you jump directly to it in $O(1)$ time.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A <strong className="text-white">Linked List</strong> is like a <em>Scavenger Hunt</em>: Clue #1 is under your pillow, and it contains the address to Clue #2 (inside the fridge), which contains the address to Clue #3 (in the garage). You cannot jump straight to Clue #3 without visiting Clues #1 and #2 first!
                  </p>
                </div>

                {/* Real-World Use Cases */}
                <div>
                  <h4 className="text-sm font-bold font-mono text-slate-200 mb-2">
                    Real-World Applications in Computer Science
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Dynamic Memory Allocation (malloc):</strong> Operating system memory allocators (like `glibc malloc`) track free memory chunks using doubly-linked free lists.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>LRU Cache (Least Recently Used):</strong> High-performance databases and web servers pair a Hash Map with a Doubly Linked List for $O(1)$ eviction.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Undo / Redo Buffers & Browser History:</strong> Navigating forward and backward through web pages or document edit states.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Music Playlists:</strong> Seamlessly inserting songs "Play Next" into the queue without re-indexing thousands of tracks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. MEMORY & POINTERS */}
            {activeSection === 'memory' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    2. Memory Layout & Pointer Mechanics
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Understanding linked lists requires understanding how computer memory (RAM) is organized between the <strong>Stack</strong> and the <strong>Heap</strong>.
                  </p>
                </div>

                {/* Heap vs Stack Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                      <HardDrive className="w-4 h-4" />
                      <span>STACK MEMORY (HEAD Pointer)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The variable <code className="text-amber-300 font-mono">head</code> lives on the stack. It does <em>not</em> contain the list data; it simply holds a 64-bit integer representing the memory address of the first node (e.g. <code className="text-blue-300 font-mono">0x1040</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                      <Cpu className="w-4 h-4" />
                      <span>HEAP MEMORY (The Nodes)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Each call to <code className="text-emerald-300 font-mono">new Node()</code> asks the operating system for a chunk of heap memory. The OS returns an address wherever free space is found. Nodes are non-contiguous.
                    </p>
                  </div>
                </div>

                {/* Hardware Diagram */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Simulated Heap Layout Example
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-blue-400 font-bold w-16">0x1040</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-200">Value: 10</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-emerald-400">Next: 0x20FC</span>
                      <span className="text-[10px] text-slate-500 ml-auto">(HEAD points here)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-blue-400 font-bold w-16">0x20FC</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-200">Value: 20</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-emerald-400">Next: 0x1188</span>
                      <span className="text-[10px] text-slate-500 ml-auto">(Gap of 4,284 bytes in RAM!)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-blue-400 font-bold w-16">0x1188</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-200">Value: 30</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-rose-400 font-bold">Next: NULL</span>
                      <span className="text-[10px] text-slate-500 ml-auto">(TAIL points here)</span>
                    </div>
                  </div>
                </div>

                {/* The Cost of Non-Contiguous Memory */}
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5">
                  <div className="font-bold text-amber-300 font-mono flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>CRITICAL COMPUTER ARCHITECTURE INSIGHT: CPU CACHE MISSES</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Modern CPUs do not fetch individual bytes; they fetch 64-byte blocks called <strong>Cache Lines</strong>. Because arrays are contiguous, reading index 0 automatically pulls indices 1 through 15 into high-speed L1 cache (spatial locality).
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Linked lists suffer from <strong>Pointer Chasing</strong>: because nodes are scattered in heap memory, following <code className="text-amber-200 font-mono">curr = curr.next</code> frequently triggers a CPU cache miss, stalling the processor while it fetches from slow main RAM.
                  </p>
                </div>
              </div>
            )}

            {/* 3. ARRAY VS LINKED LIST */}
            {activeSection === 'comparison' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    3. Array vs. Linked List Comparative Matrix
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Choosing between an array and a linked list is the quintessential engineering trade-off in DSA. Neither is universally superior.
                  </p>
                </div>

                {/* Comparative Table */}
                <div className="rounded-xl border border-slate-800 overflow-hidden font-mono text-xs shadow-md">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                        <th className="py-2.5 px-4">Feature / Operation</th>
                        <th className="py-2.5 px-4 text-blue-400">Array</th>
                        <th className="py-2.5 px-4 text-emerald-400">Singly Linked List</th>
                        <th className="py-2.5 px-4 text-slate-400">Why the Difference?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Random Access by Index</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Arrays calculate <code className="text-slate-300">Base + i*4</code> directly; lists must traverse sequentially.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Prepend (Insert at Front)</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Arrays must shift every item right; lists simply rewire 2 pointers.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Append (Insert at End)</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)*</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Both are O(1) if list maintains a TAIL pointer. (*Array amortized due to resizing).</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Insert / Delete at Index</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Array spends O(n) shifting; list spends O(n) traversing, then O(1) rewiring.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Insert After Known Node</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Once target reference is known, list splices in O(1). Array still shifts!</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Delete Head</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">List advances HEAD = HEAD.next. Array shifts all elements left.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Delete Tail (Singly)</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Singly list must traverse from HEAD to find node before tail (no back pointer).</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Memory Overhead</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">Zero</td>
                        <td className="py-2.5 px-4 text-amber-400 font-bold">+8 Bytes / node</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Each node stores an extra 64-bit next pointer address.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-200">Cache Locality</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">Excellent</td>
                        <td className="py-2.5 px-4 text-rose-400 font-bold">Poor</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">Contiguous memory prefetches well; scattered nodes cause cache misses.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Rules of Thumb */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-slate-200 font-mono uppercase">When to pick which?</div>
                  <p>
                    <strong className="text-blue-300">Choose Array:</strong> When you need fast random reads by index, binary search, and compact memory usage with CPU cache friendliness.
                  </p>
                  <p>
                    <strong className="text-emerald-300">Choose Linked List:</strong> When the dataset size fluctuates constantly, and you frequently insert or delete at the front or middle without knowing total capacity upfront.
                  </p>
                </div>
              </div>
            )}

            {/* 4. BIG-O COMPLEXITY */}
            {activeSection === 'complexity' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    4. Master Big-O Complexity Table
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Formal time and space complexities for all operations implemented in this laboratory:
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 overflow-hidden font-mono text-xs shadow-md">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                        <th className="py-2.5 px-4">Operation</th>
                        <th className="py-2.5 px-4">Best Time</th>
                        <th className="py-2.5 px-4">Average Time</th>
                        <th className="py-2.5 px-4">Worst Time</th>
                        <th className="py-2.5 px-4">Auxiliary Space</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2 px-4 font-bold text-emerald-300">Prepend (Insert Beginning)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-emerald-300">Append (Insert End w/ Tail)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-teal-300">Insert at Index</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1) [idx=0]</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-blue-300">Insert After Known Node</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-rose-300">Delete Beginning (Head)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-rose-300">Delete End (Tail)</td>
                        <td className="py-2 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-rose-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-rose-300">Delete by Index</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1) [idx=0]</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-rose-300">Delete by Value</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1) [at head]</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-blue-300">Search by Value</td>
                        <td className="py-2 px-4 text-emerald-400 font-bold">O(1) [at head]</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-teal-300">Calculate Length</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-300">Reverse (Iterative 3-Pointer)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-amber-400 font-bold">O(n)</td>
                        <td className="py-2 px-4 text-slate-300">O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. COMMON TRAPS & BUGS */}
            {activeSection === 'pitfalls' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    5. Classic Linked List Bugs & Traps
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Linked list questions are interview favorites because pointer manipulation is notoriously prone to off-by-one errors and memory leaks.
                  </p>
                </div>

                {/* Bug 1: The Lost Pointer Trap */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>TRAP #1: OVERWRITING THE POINTER TOO EARLY (MEMORY LEAK)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    When inserting <code className="text-white font-mono">newNode</code> after <code className="text-white font-mono">curr</code>, you MUST connect <code className="text-emerald-300 font-mono">newNode.next = curr.next</code> first!
                  </p>
                  <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
                    <span className="text-rose-400 font-bold">❌ FATAL BUG:</span>
                    <pre className="mt-1 text-slate-400">
                      curr.next = newNode;      // ERROR! Overwrote the only link to the rest of the list!
                      newNode.next = curr.next; // Points newNode to ITSELF! Created infinite cycle!
                    </pre>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
                    <span className="text-emerald-400 font-bold">✓ CORRECT SPLICING:</span>
                    <pre className="mt-1 text-slate-400">
                      newNode.next = curr.next; // Anchor successor first!
                      curr.next = newNode;      // Safe to rewire predecessor now.
                    </pre>
                  </div>
                </div>

                {/* Bug 2: Null Pointer Dereferencing */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>TRAP #2: NULL POINTER DEREFERENCE (NullPointerException)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Attempting to evaluate <code className="text-amber-300 font-mono">curr.next.value</code> when <code className="text-amber-300 font-mono">curr.next == null</code> immediately crashes your application with a Segmentation Fault or TypeError.
                  </p>
                  <p className="text-xs text-slate-400">
                    Always verify <code className="text-emerald-300 font-mono">curr !== null && curr.next !== null</code> before double-dereferencing.
                  </p>
                </div>

                {/* Bug 3: Forgetting to Update Tail */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>TRAP #3: STALE TAIL POINTER</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    If you insert at the end or delete the last element, you must explicitly update the <code className="text-blue-300 font-mono">TAIL</code> pointer! If you delete the tail without setting <code className="text-blue-300 font-mono">tail = prev</code>, TAIL continues pointing to deallocated garbage memory.
                  </p>
                </div>
              </div>
            )}

            {/* 6. ADVANCED VARIANTS */}
            {activeSection === 'advanced' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 mb-2">
                    6. Beyond Singly Linked Lists
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Singly linked lists are the foundation. Here are the three variations you will encounter in advanced software engineering:
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Doubly Linked List */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold text-purple-400">
                        A. DOUBLY LINKED LIST (DLL)
                      </div>
                      <Badge variant="accent">Two Pointers per Node</Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Each node stores both a <code className="text-purple-300 font-mono">next</code> pointer and a <code className="text-purple-300 font-mono">prev</code> pointer:
                    </p>
                    <div className="p-2 rounded bg-slate-950 font-mono text-xs text-center text-slate-300 border border-slate-800">
                      NULL ⇄ [10] ⇄ [20] ⇄ [30] ⇄ NULL
                    </div>
                    <p className="text-xs text-slate-400">
                      <strong>Big advantage:</strong> Deleting the tail node drops from $O(n)$ to instant $O(1)$ because tail.prev gives immediate access to the predecessor!
                    </p>
                  </div>

                  {/* Circular Linked List */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold text-teal-400">
                        B. CIRCULAR LINKED LIST (CLL)
                      </div>
                      <Badge variant="outline">No NULL Terminus</Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The last node's next pointer loops back directly to the <code className="text-teal-300 font-mono">HEAD</code> node instead of pointing to NULL. Used in CPU round-robin task schedulers and multiplayer turn-based game loops.
                    </p>
                  </div>

                  {/* Floyd's Cycle Detection */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold text-amber-400">
                        C. FAST & SLOW POINTERS (FLOYD'S TORTOISE & HARE)
                      </div>
                      <Badge variant="accent">Cycle Detection O(n)</Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Two pointers start at HEAD: Slow moves 1 step (<code className="text-slate-200 font-mono">slow = slow.next</code>), Fast moves 2 steps (<code className="text-slate-200 font-mono">fast = fast.next.next</code>). If they ever collide, a cycle exists in the list!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0 font-mono text-xs">
          <span className="text-slate-500 hidden sm:inline">
            Use the left sidebar to jump between sections
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="ml-auto font-mono text-xs font-semibold"
          >
            <span>Back to Laboratory</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
