import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const CustomFilterDropdown = ({
  label,
  value,
  options = [],
  onChange,
  icon: HeaderIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.key === value) || options[0];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-app-surface border border-app-border text-content-main hover:border-brand-primary/50 hover:bg-app-surface-hover shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
          isOpen ? 'border-brand-primary ring-2 ring-brand-primary/20' : ''
        }`}
      >
        {HeaderIcon && <HeaderIcon className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
        <span className="truncate max-w-[130px]">{selectedOption?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-content-muted shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-primary' : ''
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 py-1.5 bg-app-surface border border-app-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-content-subtle uppercase border-b border-app-border/60 mb-1">
            {label}
          </div>
          <div className="max-h-60 overflow-y-auto space-y-0.5 px-1">
            {options.map((option) => {
              const isSelected = option.key === value;
              const ItemIcon = option.icon;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    onChange(option.key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-brand-primary-light text-brand-primary font-bold dark:bg-brand-primary-light/40'
                      : 'text-content-main hover:bg-app-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    {ItemIcon && (
                      <ItemIcon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-brand-primary' : 'text-content-muted'
                        }`}
                      />
                    )}
                    <span className="truncate">{option.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
