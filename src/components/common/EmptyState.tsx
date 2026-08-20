import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DynamicIcon } from './DynamicIcon';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'Inbox',
  title,
  description,
  actionText,
  actionHref,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-surface border border-line shadow-xs',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center text-accent mb-4 shadow-inner">
        <DynamicIcon name={icon} className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-ink mb-1.5">{title}</h3>
      <p className="text-sm text-muted max-w-md mb-6 leading-relaxed">{description}</p>

      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all shadow-sm"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {actionText && onAction && !actionHref && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all shadow-sm"
        >
          <span>{actionText}</span>
          <Sparkles className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
