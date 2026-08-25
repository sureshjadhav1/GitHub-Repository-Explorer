import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState = ({ onClearSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-app-surface border border-app-border rounded-card my-6 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-content-main mb-1">No repositories found</h3>
      <p className="text-xs text-content-muted max-w-md mb-6 leading-relaxed">
        We couldn't find any GitHub repositories matching your exact search criteria. Try using different keywords or clearing filters.
      </p>
      <button
        onClick={onClearSearch}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-white font-semibold text-xs shadow-md hover:bg-brand-primary-hover transition-all active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Clear Search & Filters</span>
      </button>
    </div>
  );
};
