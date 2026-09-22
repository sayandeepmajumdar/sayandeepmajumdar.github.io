import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette, CommandItem } from './components/ui/CommandPalette';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { HomePage } from './pages/HomePage';
import { ArrayLabPage } from './pages/ArrayLabPage';
import { SearchingLab } from './features/searching/components/SearchingLab';
import { SortingLab } from './features/sorting/components/SortingLab';
import { SortingComparison } from './features/sorting/components/SortingComparison';
import { ComplexityLab } from './features/complexity/components/ComplexityLab';
import { ChallengeLab } from './features/challenges/components/ChallengeLab';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    return localStorage.getItem('kernel-lab:active-tab') || 'home';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('kernel-lab:sidebar-collapsed') === 'true';
  });

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('kernel-lab:sidebar-collapsed', String(next));
      return next;
    });
  };

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    localStorage.setItem('kernel-lab:active-tab', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener
  useKeyboardShortcuts({
    onSearch: () => setSearchOpen(true),
    onHelp: () => setShortcutsOpen((prev) => !prev),
  });

  const commandItems: CommandItem[] = [
    {
      id: 'arrays',
      title: 'Array Laboratory',
      category: 'Arrays',
      description: 'Access, insert, delete, swap, update, reverse, and rotate in simulated memory.',
      onSelect: () => handleSelectTab('arrays'),
    },
    {
      id: 'searching-linear',
      title: 'Linear Search',
      category: 'Searching',
      description: 'Sequential comparison across unsorted or sorted arrays in O(n) time.',
      onSelect: () => handleSelectTab('searching'),
    },
    {
      id: 'searching-binary',
      title: 'Binary Search',
      category: 'Searching',
      description: 'Logarithmic search space elimination with low/mid/high pointers.',
      onSelect: () => handleSelectTab('searching'),
    },
    {
      id: 'sorting-bubble',
      title: 'Bubble Sort',
      category: 'Sorting',
      description: 'Pairwise adjacent comparisons and bubbling swaps.',
      onSelect: () => handleSelectTab('sorting'),
    },
    {
      id: 'sorting-selection',
      title: 'Selection Sort',
      category: 'Sorting',
      description: 'Unsorted scan with minimum tracking and at most O(n) swaps.',
      onSelect: () => handleSelectTab('sorting'),
    },
    {
      id: 'sorting-insertion',
      title: 'Insertion Sort',
      category: 'Sorting',
      description: 'Picks key and shifts larger sorted elements rightward.',
      onSelect: () => handleSelectTab('sorting'),
    },
    {
      id: 'sorting-compare',
      title: 'Compare Sorting Algorithms',
      category: 'Sorting',
      description: 'Benchmark Bubble, Selection, and Insertion Sort on identical arrays.',
      onSelect: () => handleSelectTab('comparison'),
    },
    {
      id: 'big-o',
      title: 'Big-O Growth Lab',
      category: 'Complexity',
      description: 'Scale n from 10 to 1,000,000 to visualize operational explosion.',
      onSelect: () => handleSelectTab('complexity'),
    },
    {
      id: 'challenges',
      title: 'Array Practice Challenges',
      category: 'Challenges',
      description: 'Interactive questions on shifting, pointers, and sorting.',
      onSelect: () => handleSelectTab('challenges'),
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts Guide',
      category: 'Actions',
      description: 'View full cheat sheet for keyboard navigation.',
      onSelect: () => setShortcutsOpen(true),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col kernel-grid-bg text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigateHome={() => handleSelectTab('home')}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          isOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          isCollapsed={sidebarCollapsed}
        />

        {/* Workspace Canvas */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden min-w-0">
          <div className="w-full max-w-[1800px] mx-auto">
            {currentTab === 'home' && <HomePage onNavigate={handleSelectTab} />}
          {currentTab === 'arrays' && <ArrayLabPage />}
          {currentTab === 'searching' && <SearchingLab />}
          {currentTab === 'sorting' && (
            <SortingLab onGoToComparison={() => handleSelectTab('comparison')} />
          )}
          {currentTab === 'comparison' && <SortingComparison />}
          {currentTab === 'complexity' && <ComplexityLab />}
          {currentTab === 'challenges' && <ChallengeLab />}

          {/* Coming Soon Modules */}
          {currentTab === 'linked-list' && (
            <ComingSoonPage
              moduleName="Linked Lists"
              category="Data Structures"
              description="Interactive node pointer rewiring, head/tail manipulation, and cycle detection."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'stack' && (
            <ComingSoonPage
              moduleName="Stack (LIFO)"
              category="Data Structures"
              description="Push and pop call-frame visualizer, monotonic stacks, and balanced parentheses."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'queue' && (
            <ComingSoonPage
              moduleName="Queue & Deque (FIFO)"
              category="Data Structures"
              description="Enqueue, dequeue, circular buffer pointers, and priority queues."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'trees' && (
            <ComingSoonPage
              moduleName="Binary Trees & BST"
              category="Data Structures"
              description="Recursive tree traversals (Inorder, Preorder, Postorder) and AVL rotations."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'graphs' && (
            <ComingSoonPage
              moduleName="Graphs"
              category="Data Structures"
              description="Breadth-First Search (BFS), Depth-First Search (DFS), and Dijkstra shortest path."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'recursion' && (
            <ComingSoonPage
              moduleName="Recursion Lab"
              category="Algorithms"
              description="Call stack frames visualization, backtracking tree explorer, and base case bounds."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          {currentTab === 'dp' && (
            <ComingSoonPage
              moduleName="Dynamic Programming"
              category="Algorithms"
              description="Memoization tables, bottom-up 2D grid transitions, and subproblem overlaps."
              onBackToArrays={() => handleSelectTab('arrays')}
            />
          )}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        commands={commandItems}
      />

      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
};
