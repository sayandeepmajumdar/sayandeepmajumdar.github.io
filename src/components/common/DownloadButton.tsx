import React from 'react';
import { Download } from 'lucide-react';
import { downloadText, downloadBlob, cn } from '../../lib/utils';

interface DownloadButtonProps {
  content?: string | Blob;
  filename: string;
  mimeType?: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  onDownload?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename,
  mimeType = 'text/plain',
  label = 'Download',
  className = '',
  variant = 'secondary',
  size = 'md',
  onDownload,
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload();
      return;
    }
    if (!content) return;
    if (typeof content === 'string') {
      downloadText(content, filename, mimeType);
    } else if (content instanceof Blob) {
      downloadBlob(content, filename);
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
        onClick={handleDownload}
        className={cn(baseStyles, variantStyles, className)}
        title={label}
        aria-label={label}
      >
        <Download className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
    >
      <Download className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};
