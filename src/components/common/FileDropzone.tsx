import React, { useRef, useState } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { cn, formatBytes } from '../../lib/utils';

interface FileDropzoneProps {
  onFileSelect: (file: File, content?: string | ArrayBuffer) => void;
  accept?: string;
  maxSizeMB?: number;
  readAs?: 'text' | 'arrayBuffer' | 'dataUrl' | 'none';
  label?: string;
  sublabel?: string;
  className?: string;
  compact?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  accept,
  maxSizeMB = 50,
  readAs = 'text',
  label = 'Drop file here or click to browse',
  sublabel = 'All processing happens locally in your browser',
  className = '',
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds maximum allowed ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);

    if (readAs === 'none') {
      onFileSelect(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onFileSelect(file, e.target?.result || undefined);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };

    if (readAs === 'text') {
      reader.readAsText(file);
    } else if (readAs === 'arrayBuffer') {
      reader.readAsArrayBuffer(file);
    } else if (readAs === 'dataUrl') {
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        onClick={onClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          'border-2 border-dashed rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center select-none',
          compact ? 'p-4 gap-2' : 'p-8 gap-3',
          isDragging
            ? 'border-accent bg-accent/5'
            : 'border-line bg-surface hover:border-accent/60 hover:bg-surface-alt/50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-accent">
          <UploadCloud className="w-5 h-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">{label}</p>
          <p className="text-xs text-muted mt-0.5">{sublabel}</p>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-alt border border-line text-xs font-mono text-ink mt-1">
            <File className="w-3.5 h-3.5 text-accent" />
            <span>{selectedFile.name}</span>
            <span className="text-muted">({formatBytes(selectedFile.size)})</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
