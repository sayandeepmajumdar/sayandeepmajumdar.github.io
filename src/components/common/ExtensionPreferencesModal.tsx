import React, { useState, useEffect } from 'react';
import {
  X,
  AppWindow,
  Compass,
  Check,
  Zap,
  Sliders,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  getExtensionPreferences,
  saveExtensionPreferences,
  openToolzyNewTab,
  ExtensionPreferences,
} from '../../lib/extensionPreferences';

interface ExtensionPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionPreferencesModal: React.FC<ExtensionPreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prefs, setPrefs] = useState<ExtensionPreferences>(getExtensionPreferences());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPrefs(getExtensionPreferences());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectClickAction = async (action: 'popup' | 'newtab') => {
    const updated = await saveExtensionPreferences({ defaultClickAction: action });
    setPrefs(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLaunchNewTab = () => {
    openToolzyNewTab();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-surface border border-line p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-150 text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent-light flex items-center justify-center text-accent">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">Extension Display Settings</h3>
              <p className="text-xs text-muted">Choose where and how Toolzy opens in your browser</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface-alt transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display Modes Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
            When clicking the extension toolbar icon:
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Option 1: Full New Tab (Default) */}
            <div
              onClick={() => handleSelectClickAction('newtab')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                prefs.defaultClickAction === 'newtab'
                  ? 'border-accent bg-accent/5 ring-1 ring-accent shadow-xs'
                  : 'border-line bg-surface-alt hover:border-accent/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface border border-line text-accent mt-0.5 shadow-2xs">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-ink">New Tab Dashboard</h4>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-surface-alt border border-line text-muted">
                      Default
                    </span>
                    {prefs.defaultClickAction === 'newtab' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-accent text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted mt-0.5">
                    Clicking the extension icon opens the complete Toolzy dashboard in a new browser tab.
                  </p>
                </div>
              </div>
              <div className="shrink-0 pt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    prefs.defaultClickAction === 'newtab'
                      ? 'border-accent bg-accent text-white'
                      : 'border-line bg-surface'
                  }`}
                >
                  {prefs.defaultClickAction === 'newtab' && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>
            </div>

            {/* Option 2: Quick Popup */}
            <div
              onClick={() => handleSelectClickAction('popup')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                prefs.defaultClickAction === 'popup'
                  ? 'border-accent bg-accent/5 ring-1 ring-accent shadow-xs'
                  : 'border-line bg-surface-alt hover:border-accent/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface border border-line text-accent mt-0.5 shadow-2xs">
                  <AppWindow className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-ink">Quick Popup Launcher</h4>
                    {prefs.defaultClickAction === 'popup' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-accent text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted mt-0.5">
                    Clicking the extension icon opens a floating popup with fast tool search, 1-click UUID generator, and Unix Epoch timestamp.
                  </p>
                </div>
              </div>
              <div className="shrink-0 pt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    prefs.defaultClickAction === 'popup'
                      ? 'border-accent bg-accent text-white'
                      : 'border-line bg-surface'
                  }`}
                >
                  {prefs.defaultClickAction === 'popup' && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Launch Button */}
        <div className="p-3.5 rounded-xl bg-surface-alt border border-line flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>Instant Dashboard</span>
          </div>
          <button
            type="button"
            onClick={handleLaunchNewTab}
            className="px-3.5 py-1.5 rounded-lg bg-surface border border-line text-ink hover:border-accent hover:text-accent font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Tab Now</span>
          </button>
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-accent-light/50 border border-accent/20 text-xs text-muted">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Opening a new browser tab (<code className="font-mono text-accent">Ctrl+T</code> / <code className="font-mono text-accent">Cmd+T</code>) will automatically open Toolzy. You can also right-click any selected text to format or decode on the fly.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Preference Saved
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
