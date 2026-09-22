import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'comparison' | 'swap' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    accent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    comparison: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    swap: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    outline: 'bg-transparent text-slate-400 border-slate-700/80',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-mono uppercase font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-wide font-mono font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
