import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Cpu,
  ArrowRight,
  GitFork,
  CheckCircle,
  Play,
  Pause,
} from 'lucide-react';

export interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGuidedPath?: () => void;
}

export const QuickTourModal: React.FC<QuickTourModalProps> = ({
  isOpen,
  onClose,
  onStartGuidedPath,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const slides = [
    {
      title: 'The Big Idea: What is a Linked List?',
      subtitle: 'Think of it as train cars connected by coupling chains',
      icon: <GitFork className="w-8 h-8 text-blue-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            In an <strong className="text-blue-300">Array</strong>, all elements are locked into adjacent memory lockers in a single unbroken line.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            In a <strong className="text-emerald-300">Linked List</strong>, elements (called <span className="text-white font-semibold">Nodes</span>) can live <em className="text-emerald-200">anywhere</em> in your computer's RAM. They stay connected solely because each node remembers where the next node lives.
          </p>
          {/* Visual Diagram */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
            <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 font-bold">
              Car A [10]
            </div>
            <span className="text-emerald-400 font-bold">──link──➔</span>
            <div className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 font-bold">
              Car B [20]
            </div>
            <span className="text-emerald-400 font-bold">──link──➔</span>
            <div className="px-3 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">
              NULL (End)
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Anatomy of a Node: Data + Next',
      subtitle: 'Every node has exactly two compartments',
      icon: <Cpu className="w-8 h-8 text-emerald-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Every node is a small container holding two critical pieces of information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">1. Data (Payload)</span>
              <p className="text-xs text-slate-300">The actual number, text, or object you want to store (e.g. <code className="text-blue-300">25</code>).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Next Pointer</span>
              <p className="text-xs text-slate-300">The memory address (<code className="text-emerald-300">0x10A4</code>) pointing to the successor node.</p>
            </div>
          </div>
          {/* Node Visual */}
          <div className="flex justify-center pt-1">
            <div className="w-48 rounded-xl border border-emerald-500/40 bg-slate-950 overflow-hidden shadow-md">
              <div className="px-3 py-1 bg-slate-900 text-[10px] font-mono text-slate-400 flex justify-between border-b border-slate-800">
                <span>Node #1</span>
                <span className="text-blue-400">0x1040</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-800 text-center py-2.5 font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase">DATA</span>
                  <div className="text-lg font-bold text-slate-100">25</div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase">NEXT</span>
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
                    <ArrowRight className="w-3 h-3" />
                    <span>0x1098</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'HEAD & NULL: The Entrance and Dead-End',
      subtitle: 'How you navigate a scattered chain',
      icon: <ArrowRight className="w-8 h-8 text-purple-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Since nodes are scattered across RAM, you cannot guess where they are. You need two special markers:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 shrink-0">HEAD</span>
              <span>The master reference pointer that tells you where the <strong>first node</strong> is located. If you lose HEAD, the entire list is lost in memory!</span>
            </li>
            <li className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 shrink-0">NULL</span>
              <span>The last node’s next pointer points to <strong>NULL</strong> (0x0000), signaling that you have reached the end of the chain.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Why Linked Lists? Instant O(1) Prepend!',
      subtitle: 'The superpower that beats traditional arrays',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            When inserting at the beginning of an <strong className="text-blue-300">Array</strong> of 1,000,000 items, the computer must shift all 1,000,000 items right by one slot (slow O(n)).
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            In a <strong className="text-emerald-300">Linked List</strong>, adding to the front takes just <strong className="text-emerald-400">2 constant-time steps</strong>:
          </p>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">Step 1:</span>
              <span>newNode.next = HEAD <span className="text-slate-500">// Connect new node to existing front</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">Step 2:</span>
              <span>HEAD = newNode <span className="text-slate-500">// Hand the HEAD badge to new node</span></span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Zero elements are shifted. Total execution time: <strong className="text-slate-200">O(1) Constant Time</strong>!
          </p>
        </div>
      ),
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying, slides.length]);

  if (!isOpen) return null;

  const current = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              {current.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  Quick Tour • Step {currentSlide + 1} of {slides.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="text-[10px] font-mono flex items-center gap-1 text-slate-500 hover:text-slate-300 p-0.5"
                  title={isAutoPlaying ? 'Pause autoplay' : 'Enable 6-second autoplay'}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-slate-400" />}
                  <span>{isAutoPlaying ? 'Autoplay on' : 'Autoplay'}</span>
                </button>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-0.5">
                {current.title}
              </h3>
              <p className="text-xs text-slate-400">{current.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="min-h-[220px] relative z-10 flex flex-col justify-center">
          {current.content}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 relative z-10">
          {/* Slide Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'w-6 bg-blue-500'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentSlide((prev) => prev - 1)}
                className="font-mono text-xs gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            )}

            {!isLast ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentSlide((prev) => prev + 1)}
                className="font-mono text-xs gap-1 font-semibold"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {onStartGuidedPath && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onStartGuidedPath();
                    }}
                    className="font-mono text-xs gap-1.5"
                  >
                    <GitFork className="w-3.5 h-3.5 text-blue-400" />
                    <span>Start Guided Path</span>
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onClose}
                  className="font-mono text-xs gap-1.5 font-semibold"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Start Exploring</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
