import React from 'react';
import { PseudocodeLine } from '../../engine/Step';
import { Code2, Copy, Check } from 'lucide-react';

export interface LogicViewProps {
  lines: PseudocodeLine[];
  activeLineNumber?: number;
  algorithmName?: string;
}

export const LogicView: React.FC<LogicViewProps> = ({
  lines,
  activeLineNumber,
  algorithmName = 'Algorithm Logic',
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = lines.map((l) => '  '.repeat(l.indent) + l.code).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono font-medium">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>{algorithmName}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Logic View
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-800"
          title="Copy pseudocode"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Lines Container */}
      <div className="p-3 font-mono text-xs overflow-x-auto select-text leading-relaxed">
        {lines.length === 0 ? (
          <div className="p-4 text-slate-500 italic text-center">No logic snippet available</div>
        ) : (
          lines.map((line) => {
            const isActive = activeLineNumber === line.lineNumber;
            return (
              <div
                key={line.lineNumber}
                className={`flex items-start rounded-xs px-2 py-0.5 transition-all duration-150 border-l-2 ${
                  isActive
                    ? 'active-code-line border-l-blue-500 font-semibold'
                    : 'border-l-transparent text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                {/* Line Number */}
                <span
                  className={`w-7 shrink-0 text-right pr-3 select-none text-[11px] ${
                    isActive ? 'text-blue-400 font-bold' : 'text-slate-600'
                  }`}
                >
                  {String(line.lineNumber).padStart(2, '0')}
                </span>

                {/* Code Content with Indentation */}
                <div
                  className="flex-1 flex flex-wrap items-center gap-2"
                  style={{ paddingLeft: `${line.indent * 16}px` }}
                >
                  <span className={isActive ? 'text-blue-200' : 'text-slate-300'}>
                    {line.code}
                  </span>
                  {line.comment && (
                    <span className="text-slate-500 text-[11px] italic">
                      // {line.comment}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
