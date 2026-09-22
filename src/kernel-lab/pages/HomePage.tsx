import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Layers,
  Search,
  ArrowUpDown,
  Trophy,
  TrendingUp,
  Cpu,
  ArrowRight,
  Sparkles,
  GitFork,
  Binary,
  Workflow,
  Clock,
} from 'lucide-react';

export interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const continueItems = [
    {
      id: 'arrays',
      title: 'Arrays & Memory Offsets',
      category: 'Data Structures',
      progress: 72,
      description: 'Contiguous memory, O(1) access, shifts on insert & delete.',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 'searching',
      title: 'Binary Search Halving',
      category: 'Algorithms',
      progress: 45,
      description: 'Midpoint calculations, boundary elimination, prediction quiz.',
      icon: <Search className="w-5 h-5 text-teal-400" />,
    },
    {
      id: 'sorting',
      title: 'Sorting Algorithms & Comparison',
      category: 'Algorithms',
      progress: 28,
      description: 'Bubble, Selection, and Insertion Sort benchmarks & tradeoffs.',
      icon: <ArrowUpDown className="w-5 h-5 text-purple-400" />,
    },
  ];

  const exploreModules = [
    {
      id: 'arrays',
      title: 'Array Lab',
      badge: 'V1 Flagship',
      category: 'Data Structures',
      description: 'Access, insert, delete, swap, update, reverse, and rotate in simulated memory.',
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      active: true,
    },
    {
      id: 'searching',
      title: 'Searching Lab',
      badge: 'Interactive',
      category: 'Algorithms',
      description: 'Step through Linear Search and Binary Search with pointer tracking and prediction.',
      icon: <Search className="w-6 h-6 text-teal-400" />,
      active: true,
    },
    {
      id: 'sorting',
      title: 'Sorting Lab',
      badge: 'Interactive',
      category: 'Algorithms',
      description: 'Bubble, Selection, and Insertion Sort with live operation counters and code sync.',
      icon: <ArrowUpDown className="w-6 h-6 text-purple-400" />,
      active: true,
    },
    {
      id: 'comparison',
      title: 'Sorting Comparison',
      badge: 'Benchmark',
      category: 'Analysis',
      description: 'Run all sorting algorithms on the exact same array and analyze real tradeoffs.',
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      active: true,
    },
    {
      id: 'complexity',
      title: 'Big-O Visualizer',
      badge: 'Intuition Lab',
      category: 'Theory',
      description: 'Scale input size n from 10 to 1,000,000 to see exponential and quadratic growth.',
      icon: <Clock className="w-6 h-6 text-emerald-400" />,
      active: true,
    },
    {
      id: 'challenges',
      title: 'Array Practice Challenges',
      badge: 'Practice',
      category: 'Challenge',
      description: 'Test your understanding with hands-on element selection questions and quizzes.',
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      active: true,
    },
    {
      id: 'linked-list',
      title: 'Linked List Lab',
      badge: 'V1 Interactive',
      category: 'Data Structures',
      description: 'Dynamic pointer rewiring, node references, heap memory addresses, and 3-pointer reversal.',
      icon: <GitFork className="w-6 h-6 text-emerald-400" />,
      active: true,
    },
    {
      id: 'trees',
      title: 'Trees & BST',
      badge: 'Coming Soon',
      category: 'Data Structures',
      description: 'Binary search tree rotations, recursive traversals, and balance.',
      icon: <Binary className="w-6 h-6 text-slate-500" />,
      active: false,
    },
    {
      id: 'graphs',
      title: 'Graphs & BFS/DFS',
      badge: 'Coming Soon',
      category: 'Data Structures',
      description: 'Adjacency matrices, Dijkstra shortest paths, and topological sorts.',
      icon: <Workflow className="w-6 h-6 text-slate-500" />,
      active: false,
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <div className="relative p-8 sm:p-12 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-slate-950/90 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Laboratory • 100% In-Browser</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
            Kernel Lab
          </h1>

          <p className="text-lg sm:text-xl text-blue-300 font-medium font-mono">
            "Understand the logic. See the state. Control the algorithm."
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
            Don't just watch animations pass by. Manipulate arrays directly, observe continuous
            memory addresses, step through immutable execution frames, predict next decisions,
            and inspect variables in a developer-grade workbench.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('arrays')}
              className="font-mono text-xs font-semibold gap-2"
            >
              <span>Launch Array Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('challenges')}
              className="font-mono text-xs"
            >
              <Trophy className="w-4 h-4 mr-1.5 text-yellow-400" />
              <span>Practice Challenges</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Continue Learning Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-200 font-mono flex items-center gap-2">
            <span>Continue Learning</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">In-memory sessions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {continueItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="p-5 rounded-xl border border-slate-800/90 bg-slate-950/70 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-150 cursor-pointer group shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/30">
                    {item.icon}
                  </div>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-blue-400">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-blue-500 rounded-full group-hover:bg-blue-400 transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore the Lab Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-200 font-mono">
            Explore the Lab
          </h2>
          <span className="text-xs font-mono text-slate-500">Modules & Data Structures</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreModules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => mod.active && onNavigate(mod.id)}
              className={`p-5 rounded-xl border transition-all duration-150 flex flex-col justify-between space-y-3 ${
                mod.active
                  ? 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900/50 cursor-pointer group shadow-sm'
                  : 'border-slate-800/40 bg-slate-950/30 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {mod.icon}
                  </div>
                  <Badge variant={mod.active ? 'accent' : 'outline'}>{mod.badge}</Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-100 font-mono group-hover:text-blue-300 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {mod.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{mod.category}</span>
                {mod.active ? (
                  <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
                    Launch →
                  </span>
                ) : (
                  <span className="text-slate-600">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
