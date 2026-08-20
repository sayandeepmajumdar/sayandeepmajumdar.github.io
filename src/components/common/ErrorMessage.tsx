import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium',
        className
      )}
    >
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-0.5 text-red-500/70 hover:text-red-500 rounded transition-colors"
          aria-label="Dismiss error"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
