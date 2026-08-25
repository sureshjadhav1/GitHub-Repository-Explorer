import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { RepositoryCard } from './RepositoryCard';
import { formatNumber } from '../../utils/formatters';

export const RepositoryGrid = ({
  repositories = [],
  totalCount = 0,
  isLoading,
  isLoadingMore,
  onLoadMore,
  isRepoSaved,
  onToggleSave,
}) => {
  const hasMore = repositories.length < totalCount;

  return (
    <div className="space-y-8">
      {/* 3-col responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repositories.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
            isSaved={isRepoSaved(repo.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Pagination / Load More Footer */}
      {repositories.length > 0 && (
        <div className="flex flex-col items-center justify-center pt-4 pb-8 space-y-2">
          {hasMore && (
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-brand-primary-light hover:bg-brand-primary-light/80 text-brand-primary font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 border border-brand-primary/20"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                  <span>Loading more...</span>
                </>
              ) : (
                <>
                  <span>Load more repositories</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          <p className="text-xs text-content-muted font-medium">
            Showing {repositories.length} of {formatNumber(totalCount)} repositories
          </p>
        </div>
      )}
    </div>
  );
};
