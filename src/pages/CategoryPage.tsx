import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { EmptyState } from '../components/common/EmptyState';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { CATEGORY_MAP } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { Category } from '../types';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const categoryKey = category as Category;
  const categoryInfo = categoryKey ? CATEGORY_MAP.get(categoryKey) : undefined;
  const tools = categoryKey ? getToolsByCategory(categoryKey) : [];

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <EmptyState
          title="Category Not Found"
          description="The requested category does not exist in our taxonomy."
          actionText="Back to Tools Hub"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs category={categoryKey} />

      {/* Category Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line shadow-xs mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center text-accent shrink-0 shadow-inner">
            <DynamicIcon name={categoryInfo.icon} className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-ink tracking-tight">
                {categoryInfo.name} Tools
              </h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-accent-light text-accent">
                {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>
            <p className="text-sm text-muted mt-1.5 leading-relaxed max-w-2xl">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid or Stub */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={categoryInfo.icon}
          title={`${categoryInfo.name} tools coming soon`}
          description={`We are actively building high-performance, 100% client-side tools for the ${categoryInfo.name} category. Check back soon or explore other categories.`}
          actionText="Browse All Tools"
          actionHref="/"
          secondaryActionText={`Request ${categoryInfo.name} Tool`}
          secondaryActionHref={`mailto:developerslab101@gmail.com?subject=New%20${encodeURIComponent(
            categoryInfo.name
          )}%20Tool%20Request%20-%20Toolzy&body=Hi%20Toolzy%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20new%20tool%20for%20the%20${encodeURIComponent(
            categoryInfo.name
          )}%20category%3A%0A%0A-%20Tool%20Name%3A%20%0A-%20Description%20%26%20Use%20Case%3A%20%0A-%20Key%20Features%3A%20%0A%0AThank%20you!`}
        />
      )}
    </div>
  );
};
