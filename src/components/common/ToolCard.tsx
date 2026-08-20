import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Tool } from '../../types';
import { DynamicIcon } from './DynamicIcon';
import { isFavorite, toggleFavorite } from '../../lib/storage';
import { cn } from '../../lib/utils';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, className = '' }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(tool.id));
    const handleFavChange = (e: any) => {
      if (Array.isArray(e.detail)) {
        setFavorite(e.detail.includes(tool.id));
      }
    };
    window.addEventListener('toolbox:favorites-updated', handleFavChange);
    return () => window.removeEventListener('toolbox:favorites-updated', handleFavChange);
  }, [tool.id]);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavorite(tool.id);
    setFavorite(next);
  };

  const toolUrl = `/tools/${tool.category}/${tool.slug}`;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-5 rounded-2xl bg-surface border border-line hover:border-accent/60 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
            <DynamicIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.localProcessing && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                title="100% Client-side: zero data leaves your browser"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Local</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleToggleFav}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                favorite
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-muted/50 hover:text-amber-500 hover:bg-surface-alt'
              )}
              title={favorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle favorite"
            >
              <Star className={cn('w-4 h-4', favorite ? 'fill-current' : '')} />
            </button>
          </div>
        </div>

        <Link to={toolUrl} className="block focus:outline-none">
          <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-1">
            <span>{tool.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
          </h3>
          <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </Link>
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-[11px] uppercase tracking-wider text-muted font-mono">
          {tool.category}
        </span>

        {tool.tags && tool.tags.length > 0 && (
          <span className="text-[11px] text-muted truncate max-w-[150px]">
            #{tool.tags[0]}
          </span>
        )}
      </div>
    </div>
  );
};
