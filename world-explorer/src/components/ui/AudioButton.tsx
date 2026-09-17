'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakText, isSpeechSupported, SYNTHESIZED_SPEECH_DISCLAIMER } from '@/lib/audio';

interface AudioButtonProps {
  text: string;
  langCode?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDisclaimer?: boolean;
}

export function AudioButton({
  text,
  langCode = 'en-US',
  label = 'Listen',
  size = 'md',
  className = '',
  showDisclaimer = false,
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const supported = isSpeechSupported();

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    speakText(text, {
      lang: langCode,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  }[size];

  if (!supported) {
    return (
      <span
        title="Speech synthesis not supported in this browser environment"
        className="inline-flex items-center text-slate-400 text-xs gap-1 opacity-60"
      >
        <VolumeX className="w-3.5 h-3.5" />
        <span>Audio unavailable</span>
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col">
      <button
        type="button"
        onClick={handleSpeak}
        disabled={isPlaying}
        title={`${label}: "${text}" (${SYNTHESIZED_SPEECH_DISCLAIMER})`}
        aria-label={`Pronounce ${text}`}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition-all duration-150 active:scale-95 cursor-pointer ${sizeClasses} ${className}`}
      >
        {isPlaying ? (
          <>
            <span className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-2.5 bg-teal-600 dark:bg-teal-400 animate-pulse" />
              <span className="w-0.5 h-3.5 bg-teal-600 dark:bg-teal-400 animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-teal-600 dark:bg-teal-400 animate-pulse delay-150" />
            </span>
            <span>Speaking...</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{label}</span>
          </>
        )}
      </button>
      {showDisclaimer && (
        <span className="text-[10px] text-slate-400 mt-1 italic">
          Synthesized browser speech
        </span>
      )}
    </div>
  );
}
