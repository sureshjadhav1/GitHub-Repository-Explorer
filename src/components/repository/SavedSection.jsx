import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { RepositoryCard } from './RepositoryCard';

export const SavedSection = ({ savedRepos = [], onToggleSave, onExploreClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-app-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-content-main flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-brand-primary fill-brand-primary" />
            <span>Saved Repositories</span>
          </h2>
          <p className="text-xs text-content-muted mt-0.5">
            Your bookmarked open-source projects stored locally
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary-light text-brand-primary border border-brand-primary/20">
          {savedRepos.length} saved
        </span>
      </div>

      {savedRepos.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-app-surface border border-app-border rounded-card my-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-content-main mb-1">No saved repositories yet</h3>
          <p className="text-xs text-content-muted max-w-md mb-6 leading-relaxed">
            Click the bookmark icon on any repository card while exploring to save it to your personal discovery list.
          </p>
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-white font-semibold text-xs shadow-md hover:bg-brand-primary-hover transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Repositories</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedRepos.map((repo) => (
            <RepositoryCard
              key={repo.id}
              repo={repo}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};
