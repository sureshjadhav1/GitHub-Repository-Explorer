import React from 'react';
import { Star, GitFork, AlertCircle, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { formatNumber, getLanguageColor } from '../../utils/formatters';

export const RepositoryCard = ({ repo, isSaved, onToggleSave }) => {
  const languageColor = getLanguageColor(repo.language);

  // Topic pill pastel styles mapping
  const topicColorStyles = [
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
    'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/50',
  ];

  return (
    <div className="group relative flex flex-col justify-between p-5 bg-app-surface border border-app-border hover:border-brand-primary/40 rounded-card shadow-card hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-200">
      {/* Top Header: Owner Avatar & Bookmark Icon */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <a
            href={repo.owner?.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity"
          >
            <img
              src={repo.owner?.avatar_url}
              alt={`${repo.owner?.login}'s avatar`}
              className="w-7 h-7 rounded-full object-cover border border-app-border shrink-0"
              loading="lazy"
            />
            <span className="text-xs font-semibold text-content-muted truncate">
              {repo.owner?.login}
            </span>
          </a>

          {/* Bookmark/Save Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave(repo);
            }}
            className={`p-1.5 rounded-xl transition-all ${
              isSaved
                ? 'text-brand-primary bg-brand-primary-light dark:bg-brand-primary-light/40'
                : 'text-content-subtle hover:text-brand-primary hover:bg-app-surface-hover'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save repository'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-primary' : ''}`} />
          </button>
        </div>

        {/* Repository Title with verified badge */}
        <h3 className="text-base font-bold text-content-main mb-1.5 flex items-center gap-1.5 group-hover:text-brand-primary transition-colors">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {repo.name}
          </a>
          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
        </h3>

        {/* Description (line-clamped) */}
        <p className="text-xs text-content-muted line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
          {repo.description || 'No description provided for this repository.'}
        </p>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 3).map((topic, index) => {
              const style = topicColorStyles[index % topicColorStyles.length];
              return (
                <span
                  key={topic}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${style}`}
                >
                  {topic}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Card Bottom Section */}
      <div>
        {/* Statistics Bar */}
        <div className="flex items-center gap-4 text-xs text-content-muted pt-3 pb-3 border-t border-app-border">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span className="font-semibold text-content-main">
              {formatNumber(repo.stargazers_count)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-semibold text-content-main">
              {formatNumber(repo.forks_count)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-purple-500" />
            <span className="font-semibold text-content-main">
              {formatNumber(repo.open_issues_count)}
            </span>
          </div>
        </div>

        {/* Footer: Language dot & GitHub link */}
        <div className="flex items-center justify-between text-xs pt-1">
          {/* Language dot */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm"
              style={{ backgroundColor: languageColor }}
            />
            <span className="font-medium text-content-main">
              {repo.language || 'Code'}
            </span>
          </div>

          {/* GitHub link */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-content-muted hover:text-brand-primary transition-colors text-[11px]"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
