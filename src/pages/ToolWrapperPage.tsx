import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { TOOLS_BY_SLUG } from '../data/tools';
import { ToolLayout } from '../components/layout/ToolLayout';
import { EmbeddedTool } from '../components/common/EmbeddedTool';
import { NotFoundPage } from './NotFoundPage';
import { Loader2 } from 'lucide-react';

export const ToolWrapperPage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const tool = TOOLS_BY_SLUG.get(slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  // If user accessed via incorrect category path, redirect to canonical category URL
  if (category && tool.category !== category && !tool.secondaryCategories?.includes(category as any)) {
    return <Navigate to={`/tools/${tool.category}/${tool.slug}`} replace />;
  }

  return (
    <ToolLayout tool={tool}>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <p className="text-xs text-muted font-medium">Loading {tool.name}...</p>
          </div>
        }
      >
        <EmbeddedTool slug={tool.slug} title={tool.name} />
      </Suspense>
    </ToolLayout>
  );
};
