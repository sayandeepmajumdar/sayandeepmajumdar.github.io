import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Clock, ArrowLeft, GitFork, Binary, Workflow } from 'lucide-react';

export interface ComingSoonPageProps {
  moduleName: string;
  category: string;
  description: string;
  onBackToArrays: () => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  moduleName,
  category,
  description,
  onBackToArrays,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-20 rounded-2xl border border-slate-800 bg-slate-950/60 text-center max-w-2xl mx-auto space-y-6 shadow-xl">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
        <Clock className="w-8 h-8 text-blue-400" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="accent">Coming Soon in V2</Badge>
        </div>
        <h2 className="text-2xl font-bold text-slate-100 font-mono">{moduleName}</h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-lg font-sans">
          {description}
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 max-w-md text-left font-mono">
        <span className="text-blue-400 font-bold block mb-1">Architecture Roadmap:</span>
        Kernel Lab V1 is hyper-focused on masterclass interactive Array logic, searching, and sorting.
        This data structure will plug directly into the same state engine in an upcoming release.
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={onBackToArrays}
        className="gap-2 font-mono text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Array Lab</span>
      </Button>
    </div>
  );
};
