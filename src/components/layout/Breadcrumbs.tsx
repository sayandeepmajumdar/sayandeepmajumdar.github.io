import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORY_MAP } from '../../data/categories';
import { Category } from '../../types';

interface BreadcrumbsProps {
  category?: Category;
  toolName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, toolName }) => {
  const categoryInfo = category ? CATEGORY_MAP.get(category) : undefined;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted font-medium mb-4 select-none overflow-x-auto whitespace-nowrap py-1">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-ink transition-colors"
        title="Tools Hub"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Hub</span>
      </Link>

      {category && categoryInfo && (
        <>
          <ChevronRight className="w-3 h-3 text-muted/60" />
          <Link
            to={`/tools/${category}`}
            className="hover:text-ink transition-colors"
          >
            {categoryInfo.name}
          </Link>
        </>
      )}

      {toolName && (
        <>
          <ChevronRight className="w-3 h-3 text-muted/60" />
          <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-none">
            {toolName}
          </span>
        </>
      )}
    </nav>
  );
};
