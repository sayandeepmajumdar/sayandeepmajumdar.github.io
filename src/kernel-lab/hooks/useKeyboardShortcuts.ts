import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onRestart?: () => void;
  onHelp?: () => void;
  onSearch?: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Cmd+K or Ctrl+K for command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handlers.onSearch?.();
        return;
      }

      // Space: Play/Pause
      if (e.code === 'Space') {
        e.preventDefault();
        handlers.onTogglePlay?.();
        return;
      }

      // ArrowRight: Next Step
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        handlers.onNext?.();
        return;
      }

      // ArrowLeft: Previous Step
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlers.onPrev?.();
        return;
      }

      // R: Restart
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handlers.onRestart?.();
        return;
      }

      // ?: Help / Shortcuts modal
      if (e.key === '?') {
        e.preventDefault();
        handlers.onHelp?.();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
