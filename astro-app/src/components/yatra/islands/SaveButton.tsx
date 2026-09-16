import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getSavedIds, toggleSavedId } from '../../../utils/yatraSaved';

interface SaveButtonProps {
  destinationId: string;
  destinationName?: string;
  className?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  destinationId,
  destinationName,
  className = '',
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(getSavedIds().includes(destinationId));
    const handleStorage = () => setIsSaved(getSavedIds().includes(destinationId));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [destinationId]);

  const handleToggle = () => {
    const updated = toggleSavedId(destinationId);
    setIsSaved(updated.includes(destinationId));
  };

  return (
    <button
      onClick={handleToggle}
      title={isSaved ? 'Remove from Saved' : 'Save to Bucket List'}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95 shadow-md ${
        isSaved
          ? 'bg-rose-500 text-white shadow-rose-500/30'
          : 'bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white border border-white/10'
      } ${className}`}
    >
      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      <span>{isSaved ? 'Saved to Bucket List' : 'Save to Bucket List'}</span>
    </button>
  );
};
