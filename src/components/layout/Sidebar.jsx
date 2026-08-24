import React from 'react';
import { Compass, Bookmark, ChevronDown, Moon, Trophy } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import { useTheme } from '../../hooks/useTheme';

export const Sidebar = ({
  activeTab = 'explore',
  setActiveTab,
  onSelectCategory,
  savedCount = 0,
}) => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount },
  ];

  const categories = [
    { name: 'JavaScript', color: 'bg-yellow-400', count: '1.2M' },
    { name: 'TypeScript', color: 'bg-blue-500', count: '795K' },
    { name: 'Python', color: 'bg-blue-600', count: '725K' },
    { name: 'Go', color: 'bg-emerald-500', count: '412K' },
    { name: 'Rust', color: 'bg-amber-600', count: '186K' },
  ];

  return (
    <aside className="w-60 shrink-0 hidden lg:flex flex-col h-screen sticky top-0 bg-app-sidebar border-r border-app-border p-5 overflow-y-auto select-none transition-colors">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-content-main text-app-surface flex items-center justify-center shadow-md">
          <GithubIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight text-content-main">Repo Explorer</span>
          <span className="text-[11px] text-content-muted">Discovery Platform</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'bg-app-nav-active text-brand-primary font-semibold'
                  : 'text-content-muted hover:text-content-main hover:bg-app-surface-hover'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-brand-primary rounded-r-full" />
              )}
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-primary' : 'text-content-muted'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'bg-app-border text-content-muted'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="px-3 text-[11px] font-bold text-content-subtle tracking-wider uppercase mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-content-muted hover:text-content-main hover:bg-app-surface-hover transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span className="group-hover:text-brand-primary transition-colors">{cat.name}</span>
              </div>
              <span className="text-[11px] text-content-subtle">{cat.count}</span>
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-content-muted hover:text-brand-primary transition-colors">
            <span>More</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="mt-auto" />

      {/* Promo Star Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-primary-light/60 to-purple-100/50 dark:from-brand-primary-light/20 dark:to-purple-950/30 border border-brand-primary/20 mb-6">
        <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-2.5 text-brand-primary">
          <Trophy className="w-4 h-4" />
        </div>
        <h5 className="font-semibold text-xs text-content-main mb-1">Star your favorite</h5>
        <p className="text-[11px] text-content-muted mb-3 leading-relaxed">
          Search repositories and bookmark your favorites.
        </p>
        <a
          href="https://github.com/sureshjadhav1/GitHub-Repository-Explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-app-surface border border-app-border rounded-xl text-xs font-semibold text-content-main hover:border-brand-primary transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <GithubIcon className="w-3.5 h-3.5 text-brand-primary" />
          <span>Star on GitHub</span>
        </a>
      </div>

      {/* Dark mode Quick Toggle in Sidebar */}
      <div className="pt-3 border-t border-app-border flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-xs text-content-muted">
          <Moon className="w-4 h-4" />
          <span>Dark mode</span>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`w-11 h-6 rounded-full p-1 transition-colors relative ${
            theme === 'dark' ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-700'
          }`}
          aria-label="Toggle dark mode"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </aside>
  );
};
