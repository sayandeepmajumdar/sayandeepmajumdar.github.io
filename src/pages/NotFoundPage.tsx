import React from 'react';
import { EmptyState } from '../components/common/EmptyState';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <EmptyState
        icon="AlertCircle"
        title="404 — Page Not Found"
        description="The tool or page you are looking for does not exist or has been moved."
        actionText="Return to Tools Hub"
        actionHref="/"
      />
    </div>
  );
};
