import React from 'react';
import { Modal } from './Modal';
import { Keyboard } from 'lucide-react';

export interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts = [
    { key: 'Space', description: 'Play or Pause execution' },
    { key: '→', description: 'Step forward to next state' },
    { key: '←', description: 'Step backward to previous state' },
    { key: 'R', description: 'Restart algorithm from beginning' },
    { key: '⌘ + K', description: 'Open Quick Search / Command Palette' },
    { key: '?', description: 'Open Keyboard Shortcuts guide' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-blue-400" />
          <span>Keyboard Shortcuts</span>
        </div>
      }
      maxWidth="md"
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          Kernel Lab is designed for full keyboard navigation like an IDE debugger.
          Shortcuts are automatically paused when typing inside form inputs.
        </p>

        <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-xs text-slate-300">{sc.description}</span>
              <kbd className="px-2 py-1 text-xs font-mono font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </Modal>
  );
};
