import React from 'react';

export const RepositorySkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-5 bg-app-surface border border-app-border rounded-card shadow-sm space-y-4 animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-content-subtle/20" />
              <div className="w-20 h-3 rounded bg-content-subtle/20" />
            </div>
            <div className="w-5 h-5 rounded bg-content-subtle/20" />
          </div>

          {/* Title Skeleton */}
          <div className="w-3/4 h-5 rounded bg-content-subtle/30" />

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-3 rounded bg-content-subtle/20" />
            <div className="w-2/3 h-3 rounded bg-content-subtle/20" />
          </div>

          {/* Topics Skeleton */}
          <div className="flex gap-2">
            <div className="w-16 h-5 rounded-full bg-content-subtle/20" />
            <div className="w-20 h-5 rounded-full bg-content-subtle/20" />
            <div className="w-14 h-5 rounded-full bg-content-subtle/20" />
          </div>

          {/* Divider */}
          <div className="h-px bg-app-border" />

          {/* Stats & Footer Skeleton */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-3">
              <div className="w-12 h-3 rounded bg-content-subtle/20" />
              <div className="w-12 h-3 rounded bg-content-subtle/20" />
            </div>
            <div className="w-20 h-3 rounded bg-content-subtle/20" />
          </div>
        </div>
      ))}
    </div>
  );
};
