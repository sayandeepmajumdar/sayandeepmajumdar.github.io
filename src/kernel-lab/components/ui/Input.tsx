import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  prefix,
  suffix,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-mono font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && <div className="absolute left-3 text-slate-400 select-none pointer-events-none">{prefix}</div>}
        <input
          id={inputId}
          className={`w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm font-mono rounded-lg border border-slate-700/80 px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-50 ${
            prefix ? 'pl-9' : ''
          } ${suffix ? 'pr-9' : ''} ${error ? 'border-red-500 focus:ring-red-500/50' : ''} ${className}`}
          {...props}
        />
        {suffix && <div className="absolute right-3 text-slate-400 select-none pointer-events-none">{suffix}</div>}
      </div>
      {error && <span className="text-[11px] text-red-400 font-mono">{error}</span>}
      {hint && !error && <span className="text-[11px] text-slate-400">{hint}</span>}
    </div>
  );
};
