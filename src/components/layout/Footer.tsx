import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Mail, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { ToolzyLogo } from '../common/ToolzyLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-surface mt-auto py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Privacy Statement */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ToolzyLogo size="sm" showIcon={true} />
              <span className="text-xs text-muted font-medium">by sayandeep.dev</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                100% Client-Side
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-md">
              A private, high-performance developer tools platform built with modern web standards.
              All crypto algorithms, text formatters, image minifiers, and file exports run entirely inside your browser. No cookies, no tracking, zero telemetry.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
              <a
                href="mailto:developerslab101@gmail.com?subject=New%20Tool%20Request%20-%20Toolzy&body=Hi%20Toolzy%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20new%20tool%20for%20Toolzy%3A%0A%0A-%20Tool%20Name%3A%20%0A-%20Description%20%26%20Use%20Case%3A%20%0A-%20Key%20Features%3A%20%0A%0AThank%20you!"
                className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold transition-colors"
                title="Send tool request email to developerslab101@gmail.com"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request a Tool</span>
              </a>
              <span>•</span>
              <a
                href="https://github.com/sayandeepmajumdar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <span>•</span>
              <a
                href="/index.html"
                className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              >
                <span>Portfolio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="/sitemap.xml"
                className="hover:text-ink transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-3 font-mono">
              Categories
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tools/${cat.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-3 font-mono">
              More Tools
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tools/${cat.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} sayandeep.dev • Built with React, TypeScript &amp; Tailwind</p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero server requests • 100% in-browser processing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
