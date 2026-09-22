import React from 'react';
import {
  Layers,
  Search,
  ArrowUpDown,
  GitCompare,
  TrendingUp,
  Trophy,
  GitFork,
  Binary,
  Workflow,
  Sparkles,
  Home,
  Clock,
  Layers3,
  ListTree,
} from 'lucide-react';

export interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  isCollapsed = false,
}) => {
  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        {
          id: 'home',
          label: 'Dashboard',
          icon: <Home className="w-4 h-4 text-slate-400" />,
          active: true,
        },
      ],
    },
    {
      title: 'LAB (DATA STRUCTURES)',
      items: [
        {
          id: 'arrays',
          label: 'Arrays',
          icon: <Layers className="w-4 h-4 text-blue-400" />,
          active: true,
          badge: 'V1',
        },
        {
          id: 'linked-list',
          label: 'Linked List',
          icon: <GitFork className="w-4 h-4 text-emerald-400" />,
          active: true,
          badge: 'V1',
        },
        {
          id: 'stack',
          label: 'Stack',
          icon: <Layers3 className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
        {
          id: 'queue',
          label: 'Queue',
          icon: <Clock className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
        {
          id: 'trees',
          label: 'Trees',
          icon: <Binary className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
        {
          id: 'graphs',
          label: 'Graphs',
          icon: <Workflow className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
      ],
    },
    {
      title: 'ALGORITHMS',
      items: [
        {
          id: 'searching',
          label: 'Searching',
          icon: <Search className="w-4 h-4 text-teal-400" />,
          active: true,
        },
        {
          id: 'sorting',
          label: 'Sorting',
          icon: <ArrowUpDown className="w-4 h-4 text-purple-400" />,
          active: true,
        },
        {
          id: 'comparison',
          label: 'Compare Sorting',
          icon: <GitCompare className="w-4 h-4 text-amber-400" />,
          active: true,
          badge: 'Bench',
        },
        {
          id: 'recursion',
          label: 'Recursion',
          icon: <ListTree className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
        {
          id: 'dp',
          label: 'Dynamic Prog.',
          icon: <Sparkles className="w-4 h-4 text-slate-500" />,
          active: false,
          badge: 'Soon',
        },
      ],
    },
    {
      title: 'CHALLENGES & THEORY',
      items: [
        {
          id: 'challenges',
          label: 'Practice Challenges',
          icon: <Trophy className="w-4 h-4 text-yellow-400" />,
          active: true,
        },
        {
          id: 'complexity',
          label: 'Big-O Growth Lab',
          icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
          active: true,
        },
      ],
    },
  ];

  const handleItemClick = (id: string, active: boolean) => {
    if (active) {
      onSelectTab(id);
      onCloseMobile?.();
    } else {
      onSelectTab(id);
      onCloseMobile?.();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-16 bottom-0 left-0 z-30 shrink-0 bg-slate-950/95 border-r border-slate-800/80 overflow-y-auto transition-all duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 w-64 p-4' : '-translate-x-full'
        } ${isCollapsed ? 'md:w-16 md:p-2' : 'md:w-64 md:p-4'}`}
      >
        <div className="space-y-6">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              {!isCollapsed && (
                <div className="px-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isSelected = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item.id, item.active)}
                      title={isCollapsed ? `${item.label} (${section.title})` : undefined}
                      className={`w-full flex items-center ${
                        isCollapsed ? 'justify-center p-2.5' : 'justify-between px-2.5 py-2'
                      } rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                          : item.active
                          ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                          : 'text-slate-600 hover:text-slate-500 hover:bg-slate-900/40 border border-transparent'
                      }`}
                    >
                      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                        {item.icon}
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            item.badge === 'V1'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : item.badge === 'Bench'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-slate-900 text-slate-600 border border-slate-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
