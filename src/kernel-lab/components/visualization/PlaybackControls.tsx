import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { toggleSound, isSoundEnabled } from '../../lib/sound';

export interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
  predictionMode: boolean;
  onTogglePredictionMode: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onRestart,
  canGoNext,
  canGoPrev,
  speed,
  onSpeedChange,
  predictionMode,
  onTogglePredictionMode,
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  React.useEffect(() => {
    const handleSoundChange = (e: Event) => {
      setSoundOn((e as CustomEvent).detail);
    };
    window.addEventListener('kernel-lab:sound-change', handleSoundChange);
    return () => window.removeEventListener('kernel-lab:sound-change', handleSoundChange);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-800 bg-slate-950/90 shadow-md">
      {/* Primary Playback Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onRestart}
          title="Restart (R)"
          className="font-mono text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Restart</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={!canGoPrev}
          title="Previous Step (←)"
          className="font-mono text-xs"
        >
          <SkipBack className="w-3.5 h-3.5 mr-1" />
          <span>Prev</span>
        </Button>

        <Button
          variant={isPlaying ? 'secondary' : 'primary'}
          size="sm"
          onClick={onTogglePlay}
          title="Play / Pause (Space)"
          className="font-mono text-xs min-w-[80px]"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 mr-1 fill-current" />
              <span>Play</span>
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          title="Next Step (→)"
          className="font-mono text-xs"
        >
          <span>Next</span>
          <SkipForward className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-2.5 min-w-[170px] max-w-[220px]">
        <Sliders className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div className="flex flex-col w-full gap-0.5">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Speed</span>
            <span>{Math.round(1000 / speed * 10) / 10}x</span>
          </div>
          {/* We invert so dragging right makes it faster (smaller ms) */}
          <input
            type="range"
            min="200"
            max="1800"
            step="100"
            value={2000 - speed}
            onChange={(e) => onSpeedChange(2000 - Number(e.target.value))}
            className="h-1.5 w-full bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            title="Adjust execution speed"
          />
        </div>
      </div>

      {/* Additional Learning & Audio Toggles */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePredictionMode}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
            predictionMode
              ? 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-xs'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400'
          }`}
          title="Toggle interactive prediction prompts during execution"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Predict Mode:</span>
          <span>{predictionMode ? 'ON' : 'OFF'}</span>
        </button>

        <button
          type="button"
          onClick={handleSoundToggle}
          className={`p-1.5 rounded-lg border transition-colors ${
            soundOn
              ? 'text-blue-400 border-blue-500/30 bg-blue-500/10'
              : 'text-slate-500 border-slate-800 bg-slate-900 hover:text-slate-400'
          }`}
          title={soundOn ? 'Sound feedback ON' : 'Sound feedback OFF'}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
