import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ message, isRateLimited, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-card my-6 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-content-main mb-1">
        {isRateLimited ? 'GitHub API Limit Reached' : 'Something went wrong'}
      </h3>
      <p className="text-xs text-content-muted max-w-md mb-6 leading-relaxed">
        {message || 'GitHub could not return the repositories right now. Please check your connection or try again later.'}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-content-main text-app-surface font-semibold text-xs shadow-md hover:opacity-90 transition-all active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
