import React, { useRef, useEffect, useState } from 'react';
import { Loader2, Maximize2, Minimize2, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredTheme } from '../../lib/storage';

interface EmbeddedToolProps {
  slug: string;
  title: string;
  initialHeight?: number;
}

export const EmbeddedTool: React.FC<EmbeddedToolProps> = ({
  slug,
  title,
  initialHeight = 820,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toolSrc = `/${slug}/index.html`;

  // Sync theme with iframe
  useEffect(() => {
    const syncTheme = () => {
      if (!iframeRef.current?.contentDocument) return;
      const theme = getStoredTheme();
      const isDark = theme === 'dark';

      const doc = iframeRef.current.contentDocument;
      if (isDark) {
        doc.documentElement.classList.add('dark');
      } else {
        doc.documentElement.classList.remove('dark');
      }
    };

    const handleLoad = () => {
      setLoading(false);
      syncTheme();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    const observer = new MutationObserver(() => {
      syncTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      if (iframe) iframe.removeEventListener('load', handleLoad);
      observer.disconnect();
    };
  }, [slug]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      setLoading(true);
      iframeRef.current.src = toolSrc;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-surface border border-line overflow-hidden shadow-xs transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-0' : ''
      }`}
    >
      {/* Tool Utility Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-alt border-b border-line text-xs">
        <div className="flex items-center gap-2 text-muted font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Client-Side Sandbox</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleReload}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface transition-colors"
            title="Reload Tool Sandbox"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <a
            href={toolSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-surface transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-xs gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-xs text-muted font-medium">Loading {title}...</p>
        </div>
      )}

      {/* Embedded Tool Iframe */}
      <iframe
        ref={iframeRef}
        src={toolSrc}
        title={title}
        className="w-full border-none block bg-paper"
        style={{
          height: isFullscreen ? 'calc(100vh - 40px)' : `${initialHeight}px`,
          minHeight: '600px',
        }}
        sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-popups"
      />
    </div>
  );
};
