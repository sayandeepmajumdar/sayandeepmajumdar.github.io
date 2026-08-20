import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/tools';
import { DynamicIcon } from '../common/DynamicIcon';

export const CategoryGrid: React.FC = () => {
  return (
    <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-ink tracking-tight">Explore by Category</h2>
          <p className="text-xs text-muted mt-0.5">Structured taxonomies for developers, designers, and creators.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const count = TOOLS.filter(
            (t) => t.category === cat.id || t.secondaryCategories?.includes(cat.id)
          ).length;

          return (
            <Link
              key={cat.id}
              to={`/tools/${cat.slug}`}
              className="group flex flex-col p-4 rounded-2xl bg-surface border border-line hover:border-accent/60 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent mb-3 group-hover:scale-105 transition-transform">
                <DynamicIcon name={cat.icon} className="w-5 h-5" />
              </div>

              <h3 className="text-sm font-bold text-ink group-hover:text-accent transition-colors">
                {cat.name}
              </h3>

              <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
                <span>{cat.isStub && count === 0 ? 'Coming soon' : `${count} tool${count === 1 ? '' : 's'}`}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
