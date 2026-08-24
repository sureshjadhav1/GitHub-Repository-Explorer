import React, { useState } from 'react';
import { Star, GitFork, Clock, Filter, Check, Code, Calendar } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { CustomFilterDropdown } from './CustomFilterDropdown';

export const SearchFilters = ({
  totalCount = 0,
  sort,
  setSort,
  language,
  setLanguage,
  dateRange,
  setDateRange,
}) => {
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);

  const sortOptions = [
    { key: 'stars', label: 'Most stars', icon: Star },
    { key: 'forks', label: 'Most forks', icon: GitFork },
    { key: 'updated', label: 'Recently updated', icon: Clock },
  ];

  const languageOptions = [
    { key: 'all', label: 'All languages' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'typescript', label: 'TypeScript' },
    { key: 'python', label: 'Python' },
    { key: 'go', label: 'Go' },
    { key: 'rust', label: 'Rust' },
    { key: 'java', label: 'Java' },
    { key: 'c++', label: 'C++' },
    { key: 'php', label: 'PHP' },
    { key: 'html', label: 'HTML' },
    { key: 'css', label: 'CSS' },
  ];

  const dateOptions = [
    { key: 'anytime', label: 'Any time' },
    { key: 'week', label: 'Past week' },
    { key: 'month', label: 'Past month' },
    { key: 'year', label: 'Past year' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 my-2 border-b border-app-border select-none">
      {/* Total Result Count (shrink-0 min-w-max prevents left number truncation like 105.2k) */}
      <div className="shrink-0 min-w-max text-sm font-semibold text-content-main flex items-center gap-1.5">
        <span className="text-base font-bold text-brand-primary">
          {formatNumber(totalCount)}
        </span>
        <span className="text-content-muted">repositories found</span>
      </div>

      {/* Custom Styled Desktop Filter Dropdowns */}
      <div className="hidden sm:flex items-center gap-4 text-xs flex-wrap justify-end">
        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <span className="text-content-muted font-medium">Sort by</span>
          <CustomFilterDropdown
            label="Sort By"
            value={sort}
            options={sortOptions}
            onChange={(newSort) => setSort(newSort)}
            icon={Star}
          />
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <span className="text-content-muted font-medium">Language</span>
          <CustomFilterDropdown
            label="Language"
            value={language}
            options={languageOptions}
            onChange={(newLang) => setLanguage(newLang)}
            icon={Code}
          />
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <span className="text-content-muted font-medium">Updated</span>
          <CustomFilterDropdown
            label="Date Updated"
            value={dateRange}
            options={dateOptions}
            onChange={(newDate) => setDateRange(newDate)}
            icon={Calendar}
          />
        </div>
      </div>

      {/* Mobile Filter Trigger Button */}
      <div className="sm:hidden flex items-center justify-end">
        <button
          onClick={() => setShowMobileFilterModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-app-surface border border-app-border text-content-main hover:bg-app-surface-hover shadow-sm"
        >
          <Filter className="w-3.5 h-3.5 text-brand-primary" />
          <span>Filter Options</span>
        </button>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {showMobileFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 sm:hidden">
          <div className="w-full bg-app-surface border-t border-app-border rounded-t-2xl p-5 space-y-5 animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <h3 className="font-bold text-base text-content-main">Filter Repositories</h3>
              <button
                onClick={() => setShowMobileFilterModal(false)}
                className="text-xs font-bold px-3 py-1 rounded-full bg-brand-primary text-white"
              >
                Apply Filters
              </button>
            </div>

            {/* Sort options */}
            <div>
              <label className="block text-xs font-bold text-content-muted uppercase tracking-wider mb-2">
                Sort by
              </label>
              <div className="grid grid-cols-1 gap-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSort(opt.key)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                      sort === opt.key
                        ? 'bg-brand-primary-light text-brand-primary font-bold dark:bg-brand-primary-light/40 border border-brand-primary/30'
                        : 'bg-app-surface border border-app-border text-content-main'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <opt.icon className="w-4 h-4 text-brand-primary" />
                      <span>{opt.label}</span>
                    </div>
                    {sort === opt.key && <Check className="w-4 h-4 text-brand-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Language options */}
            <div>
              <label className="block text-xs font-bold text-content-muted uppercase tracking-wider mb-2">
                Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setLanguage(opt.key)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium text-left transition-all ${
                      language === opt.key
                        ? 'bg-brand-primary-light text-brand-primary font-bold dark:bg-brand-primary-light/40 border border-brand-primary/30'
                        : 'bg-app-surface border border-app-border text-content-main'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {language === opt.key && <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Date range options */}
            <div>
              <label className="block text-xs font-bold text-content-muted uppercase tracking-wider mb-2">
                Updated Timeframe
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setDateRange(opt.key)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium text-left transition-all ${
                      dateRange === opt.key
                        ? 'bg-brand-primary-light text-brand-primary font-bold dark:bg-brand-primary-light/40 border border-brand-primary/30'
                        : 'bg-app-surface border border-app-border text-content-main'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {dateRange === opt.key && <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
