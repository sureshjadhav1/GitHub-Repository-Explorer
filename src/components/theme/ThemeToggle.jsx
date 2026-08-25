import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor },
  ];

  const currentOption = options.find((opt) => opt.key === theme) || options[2];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select color theme"
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full bg-app-surface border border-app-border text-content-main hover:bg-app-surface-hover hover:border-brand-primary/40 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
      >
        <CurrentIcon className="w-4 h-4 text-brand-primary" />
        <span>Theme</span>
        <ChevronDown className={`w-3.5 h-3.5 text-content-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1 bg-app-surface border border-app-border rounded-xl shadow-lg z-50 animate-in fade-in zoom-in-95">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => {
                  setTheme(opt.key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-left transition-colors ${
                  isSelected
                    ? 'bg-brand-primary-light text-brand-primary font-semibold dark:bg-brand-primary-light/40'
                    : 'text-content-main hover:bg-app-surface-hover'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-primary' : 'text-content-muted'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
