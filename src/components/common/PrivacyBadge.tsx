import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PrivacyBadgeProps {
  localProcessing?: boolean;
  className?: string;
  showText?: boolean;
}

export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({
  localProcessing = true,
  className = '',
  showText = true,
}) => {
  if (!localProcessing) return null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 select-none shadow-xs',
        className
      )}
      title="All computation, hashing, encryption, and conversions occur 100% in your browser. Zero data leaves your device."
    >
      <ShieldCheck className="w-3.5 h-3.5" />
      {showText && <span>100% Local / In-Browser</span>}
    </div>
  );
};
