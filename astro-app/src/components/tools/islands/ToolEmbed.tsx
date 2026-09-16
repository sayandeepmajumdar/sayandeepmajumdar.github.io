import React, { useRef, useEffect, useState } from 'react';
import { Loader2, Maximize2, Minimize2, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';
import { recordToolVisit, getStandaloneToolUrl } from '../../../utils/toolsStorage';

interface ToolEmbedProps {
  toolId: string;
  slug: string;
  title: string;
  category: string;
  initialHeight?: number;
}

export const ToolEmbed: React.FC<ToolEmbedProps> = ({
  toolId,
  slug,
  title,
  category,
  initialHeight = 850,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toolSrc = getStandaloneToolUrl(slug);

  useEffect(() => {
    // Record recent tool visit in localStorage
    recordToolVisit(toolId);

    // Sync theme with iframe
    const syncTheme = () => {
      if (!iframeRef.current?.contentDocument) return;
      const isDark = document.documentElement.classList.contains('dark');
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

      // Clean up internal back links inside the embedded iframe
      if (iframeRef.current?.contentDocument) {
        try {
          const doc = iframeRef.current.contentDocument;
          const styleEl = doc.createElement('style');
          styleEl.textContent = `
            .nav-back-link,
            a[href="../"],
            a[href="./../"],
            a[href="/tools/"],
            a[href*="tools/index.html"] {
              display: none !important;
            }
          `;
          doc.head?.appendChild(styleEl);
        } catch (e) {}
      }
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
  }, [toolId, slug]);

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

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-surface border border-line overflow-hidden shadow-xs transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-0' : ''
      }`}
    >
      {/* Tool Utility Sandbox Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-alt border-b border-line text-xs">
        <div className="flex items-center gap-2 text-muted font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>100% Client-Side Private Sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors cursor-pointer"
            title="Copy direct link to this tool"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors cursor-pointer"
            title="Reload Tool Sandbox"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <a
            href={toolSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-accent hover:text-white hover:bg-accent border border-accent/30 transition-colors font-semibold shadow-2xs"
            title="Open in dedicated tab"
          >
            <span>Open Standalone</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/85 backdrop-blur-xs gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-xs text-muted font-medium">Initializing sandbox for {title}...</p>
        </div>
      )}

      {/* Embedded Tool Iframe */}
      <iframe
        ref={iframeRef}
        src={toolSrc}
        title={title}
        className="w-full border-none block bg-paper"
        style={{
          height: isFullscreen ? 'calc(100vh - 44px)' : `${initialHeight}px`,
          minHeight: '650px',
        }}
      />
    </div>
  );
};
