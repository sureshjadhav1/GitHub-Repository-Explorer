import React from 'react';
import { Compass, Bookmark, Menu } from 'lucide-react';

export const MobileNavigation = ({
  activeTab = 'explore',
  setActiveTab,
  savedCount = 0,
  onOpenMobileMenu,
}) => {
  const items = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-app-surface/95 backdrop-blur-md border-t border-app-border px-3 py-2 flex items-center justify-around shadow-lg select-none">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-brand-primary font-semibold'
                : 'text-content-muted hover:text-content-main'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5 mb-0.5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-2.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-brand-primary text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}

      {/* Menu / Categories button */}
      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-content-muted hover:text-content-main transition-all"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Menu</span>
      </button>
    </nav>
  );
};
