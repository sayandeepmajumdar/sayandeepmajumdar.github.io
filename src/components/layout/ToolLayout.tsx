import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Share2, ExternalLink, Check, Mail } from 'lucide-react';
import { Tool } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';
import { DynamicIcon } from '../common/DynamicIcon';
import { PrivacyBadge } from '../common/PrivacyBadge';
import { ToolCard } from '../common/ToolCard';
import { isFavorite, toggleFavorite, recordToolVisit } from '../../lib/storage';
import { getToolsByCategory } from '../../data/tools';
import { copyToClipboard } from '../../lib/utils';

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  const [favorite, setFavorite] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(tool.id));
    recordToolVisit(tool.id);

    const handleFavChange = (e: any) => {
      if (Array.isArray(e.detail)) {
        setFavorite(e.detail.includes(tool.id));
      }
    };
    window.addEventListener('toolbox:favorites-updated', handleFavChange);
    return () => window.removeEventListener('toolbox:favorites-updated', handleFavChange);
  }, [tool.id]);

  const handleFavorite = () => {
    const next = toggleFavorite(tool.id);
    setFavorite(next);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const ok = await copyToClipboard(url);
    if (ok) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Related tools
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumbs */}
      <Breadcrumbs category={tool.category} toolName={tool.name} />

      {/* Tool Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line shadow-xs mb-6 sm:mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center text-accent shrink-0 shadow-inner">
              <DynamicIcon name={tool.icon} className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  {tool.name}
                </h1>
                {tool.localProcessing && <PrivacyBadge localProcessing={tool.localProcessing} />}
                {tool.badge && (
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-surface-alt border border-line text-muted">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted mt-1.5 leading-relaxed max-w-3xl">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start shrink-0">
            <button
              type="button"
              onClick={handleFavorite}
              className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                favorite
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                  : 'border-line bg-surface-alt text-muted hover:text-ink'
              }`}
              title={favorite ? 'Favorited' : 'Star this tool'}
            >
              <Star className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{favorite ? 'Starred' : 'Star'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl border border-line bg-surface-alt text-muted hover:text-ink transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Copy shareable link"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{shared ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Standalone HTML extract link */}
            <a
              href={`/${tool.slug}/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-line bg-surface-alt text-muted hover:text-accent transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Open standalone zero-dependency HTML version"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Standalone</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Tool Content */}
      <div className="tool-main-content mb-12">{children}</div>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <div className="mt-12 pt-8 border-t border-line">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-ink">
              More in {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
            </h3>
            <Link
              to={`/tools/${tool.category}`}
              className="text-xs font-semibold text-accent hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <ToolCard key={rel.id} tool={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Request Tool Prompt */}
      <div className="mt-12 p-6 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-ink">Need a specific tool or feature?</h4>
          <p className="text-xs text-muted mt-0.5">Let us know what developer or marketing tool you'd like us to build next.</p>
        </div>
        <a
          href="mailto:developerslab101@gmail.com?subject=New%20Tool%20Request%20-%20Toolzy&body=Hi%20Toolzy%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20new%20tool%20for%20Toolzy%3A%0A%0A-%20Tool%20Name%3A%20%0A-%20Description%20%26%20Use%20Case%3A%20%0A-%20Key%20Features%3A%20%0A%0AThank%20you!"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-accent text-white hover:bg-accent-hover transition-colors shrink-0 shadow-xs"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Request a Tool</span>
        </a>
      </div>
    </div>
  );
};
