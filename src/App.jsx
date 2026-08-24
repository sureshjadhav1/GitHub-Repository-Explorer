import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { HeroIllustration } from './components/illustration/HeroIllustration';
import { SearchBar } from './components/search/SearchBar';
import { PopularSearches } from './components/search/PopularSearches';
import { SearchFilters } from './components/search/SearchFilters';
import { RepositoryGrid } from './components/repository/RepositoryGrid';
import { SavedSection } from './components/repository/SavedSection';
import { RepositorySkeleton } from './components/states/RepositorySkeleton';
import { EmptyState } from './components/states/EmptyState';
import { ErrorState } from './components/states/ErrorState';
import { fetchGitHubRepositories } from './services/githubApi';
import { useSavedRepos } from './hooks/useSavedRepos';
import { GithubIcon } from './components/common/GithubIcon';
import { X } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getInitialParam = (key, fallback) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || fallback;
  };

  const initialQuery = getInitialParam('q', 'javascript');
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const [sort, setSort] = useState(() => getInitialParam('sort', 'stars'));
  const [language, setLanguage] = useState(() => getInitialParam('lang', 'all'));
  const [dateRange, setDateRange] = useState(() => getInitialParam('time', 'anytime'));

  // Repositories & API state
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Saved repositories hook
  const { savedRepos, toggleSaveRepo, isRepoSaved } = useSavedRepos();

  const updateUrlParams = (newQuery, newSort, newLang, newTime) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newSort && newSort !== 'stars') params.set('sort', newSort);
    if (newLang && newLang !== 'all') params.set('lang', newLang);
    if (newTime && newTime !== 'anytime') params.set('time', newTime);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Primary API fetch function
  const executeSearch = useCallback(
    async (pageToFetch = 1, append = false, targetQuery = activeQuery) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const result = await fetchGitHubRepositories({
        query: targetQuery,
        sort,
        language,
        dateRange,
        page: pageToFetch,
        perPage: 12,
      });

      if (result.error) {
        setError(result.error);
        setIsRateLimited(result.isRateLimited);
        if (!append) setRepositories([]);
      } else {
        setTotalCount(result.totalCount);
        if (append) {
          setRepositories((prev) => [...prev, ...result.items]);
        } else {
          setRepositories(result.items);
        }
      }

      setLoading(false);
      setLoadingMore(false);
    },
    [activeQuery, sort, language, dateRange]
  );

  // Initial load and filter change trigger
  useEffect(() => {
    if (activeTab === 'explore') {
      setCurrentPage(1);
      updateUrlParams(activeQuery, sort, language, dateRange);
      executeSearch(1, false, activeQuery);
    }
  }, [activeQuery, sort, language, dateRange, activeTab, executeSearch]);

  // Handle Tab Switch Actions
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'explore' && !activeQuery) {
      setQuery('javascript');
      setActiveQuery('javascript');
    }
  };

  // Search Submit Handler
  const handleSearchSubmit = () => {
    if (activeTab !== 'explore') setActiveTab('explore');
    setActiveQuery(query);
    setCurrentPage(1);
  };

  // Popular search selection
  const handlePopularSelect = (selectedQuery) => {
    setQuery(selectedQuery);
    setActiveQuery(selectedQuery);
    if (activeTab !== 'explore') setActiveTab('explore');
    setCurrentPage(1);
  };

  // Category sidebar click selection
  const handleCategorySelect = (categoryName) => {
    setLanguage(categoryName.toLowerCase());
    if (activeTab !== 'explore') setActiveTab('explore');
    setCurrentPage(1);
  };

  // Load More Handler
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    executeSearch(nextPage, true, activeQuery);
  };

  // Reset/Clear Search
  const handleClearSearch = () => {
    setQuery('javascript');
    setActiveQuery('javascript');
    setSort('stars');
    setLanguage('all');
    setDateRange('anytime');
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-app-bg text-content-main font-sans antialiased transition-colors">
      {/* Desktop Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onSelectCategory={handleCategorySelect}
        savedCount={savedRepos.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-24 lg:pb-12">
        {/* Top Bar / Mobile Header */}
        <header className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-content-main text-app-surface flex items-center justify-center shadow-sm">
              <GithubIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-content-main">Repo Explorer</span>
          </div>

          {/* Spacer on Desktop */}
          <div className="hidden lg:block" />

          {/* Theme Toggle */}
          <ThemeToggle />
        </header>

        {/* Saved Repositories View */}
        {activeTab === 'saved' ? (
          <SavedSection
            savedRepos={savedRepos}
            onToggleSave={toggleSaveRepo}
            onExploreClick={() => setActiveTab('explore')}
          />
        ) : (
          /* Main Discovery View */
          <div className="space-y-6">
            {/* Hero Header + Illustration */}
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-content-main leading-tight">
                  Discover{' '}
                  <span className="text-gradient-hero">
                    Amazing
                  </span>{' '}
                  Repositories
                </h1>
                <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                  Search, explore and discover the best open-source projects on GitHub ✨
                </p>
              </div>

              {/* Decorative Hero Illustration on Desktop */}
              <div className="hidden md:block shrink-0">
                <HeroIllustration />
              </div>
            </div>

            {/* Search Input Container */}
            <div className="space-y-3 pt-2">
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearchSubmit}
                isLoading={loading}
              />

              {/* Popular Searches Pills */}
              <PopularSearches
                activeQuery={activeQuery}
                onSelectPopular={handlePopularSelect}
              />
            </div>

            {/* Search Results Filter & Summary Header */}
            <SearchFilters
              totalCount={totalCount}
              sort={sort}
              setSort={setSort}
              language={language}
              setLanguage={setLanguage}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />

            {/* Content States: Loading, Error, Empty, or Repository Grid */}
            {loading ? (
              <RepositorySkeleton count={6} />
            ) : error ? (
              <ErrorState
                message={error}
                isRateLimited={isRateLimited}
                onRetry={() => executeSearch(1, false, activeQuery)}
              />
            ) : repositories.length === 0 ? (
              <EmptyState onClearSearch={handleClearSearch} />
            ) : (
              <RepositoryGrid
                repositories={repositories}
                totalCount={totalCount}
                isLoading={loading}
                isLoadingMore={loadingMore}
                onLoadMore={handleLoadMore}
                isRepoSaved={isRepoSaved}
                onToggleSave={toggleSaveRepo}
              />
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedRepos.length}
        onOpenMobileMenu={() => setShowMobileMenu(true)}
      />

      {/* Mobile Categories Slide-Over Menu Modal */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-4/5 max-w-xs h-full bg-app-surface p-6 shadow-2xl overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-brand-primary" />
                <span className="font-bold text-base text-content-main">Categories</span>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-1 rounded-lg text-content-muted hover:text-content-main"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { name: 'JavaScript', color: 'bg-yellow-400', count: '1.2M' },
                { name: 'TypeScript', color: 'bg-blue-500', count: '795K' },
                { name: 'Python', color: 'bg-blue-600', count: '725K' },
                { name: 'Go', color: 'bg-emerald-500', count: '412K' },
                { name: 'Rust', color: 'bg-amber-600', count: '186K' },
                { name: 'Java', color: 'bg-amber-800', count: '500K' },
                { name: 'C++', color: 'bg-pink-600', count: '300K' },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    handleCategorySelect(cat.name);
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-app-surface border border-app-border text-xs font-medium text-content-main hover:border-brand-primary"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[11px] text-content-muted">{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-app-border text-center">
              <p className="text-xs text-content-muted">
                Repo Explorer — Discover Amazing Repositories
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
