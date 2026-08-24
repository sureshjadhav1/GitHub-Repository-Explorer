import React from 'react';

export const PopularSearches = ({ activeQuery, onSelectPopular }) => {
  const popularItems = [
    'javascript',
    'react',
    'nextjs',
    'python',
    'typescript',
    'tailwindcss',
    'nodejs',
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar text-xs">
      <span className="font-semibold text-content-muted shrink-0 pr-1">Popular</span>
      <div className="flex items-center gap-2 shrink-0">
        {popularItems.map((item) => {
          const isActive = activeQuery?.toLowerCase() === item;
          return (
            <button
              key={item}
              onClick={() => onSelectPopular(item)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-primary to-purple-600 text-white shadow-sm'
                  : 'bg-app-surface border border-app-border text-content-muted hover:text-content-main hover:border-brand-primary/40 hover:bg-app-surface-hover'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
