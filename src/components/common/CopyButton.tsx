import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard, cn } from '../../lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  variant = 'secondary',
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-md select-none focus:outline-none focus:ring-2 focus:ring-accent/40';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-hover shadow-sm',
    secondary: 'bg-surface-alt border border-line text-ink hover:border-accent hover:text-accent shadow-sm',
    ghost: 'text-muted hover:text-ink hover:bg-surface-alt',
    icon: 'p-2 text-muted hover:text-accent hover:bg-surface-alt border border-line rounded-md',
  }[variant];

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(baseStyles, variantStyles, className)}
        title={copied ? copiedLabel : label}
        aria-label={copied ? copiedLabel : label}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
    >
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
};
