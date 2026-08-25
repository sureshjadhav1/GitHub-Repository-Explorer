import React from 'react';
import { Search, X, Rocket, Loader2 } from 'lucide-react';

export const SearchBar = ({ query, setQuery, onSearch, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="relative flex items-center w-full bg-app-surface border border-app-border rounded-search shadow-sm hover:border-brand-primary/40 focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/15 transition-all duration-200 p-1.5 sm:p-2">
        {/* Search Icon */}
        <div className="pl-3.5 pr-2 text-content-muted flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-brand-primary" />
        </div>

        {/* Text Input - NEVER set disabled={isLoading} so focus is NEVER lost while typing */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub repositories (e.g. javascript, react, machine learning)..."
          className="w-full py-2.5 sm:py-3 px-2 bg-transparent text-content-main placeholder:text-content-subtle text-sm sm:text-base focus:outline-none"
          aria-label="Search repositories"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 mr-1 text-content-subtle hover:text-content-main rounded-full hover:bg-app-surface-hover transition-colors"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#6746F5] via-[#8B7CFF] to-[#A64CFF] hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <span>Searching</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Search</span>
              <Rocket className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
