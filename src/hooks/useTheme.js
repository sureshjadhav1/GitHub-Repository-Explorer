import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('repo_explorer_theme');
    return saved || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (targetTheme) => {
      let isDark = false;
      if (targetTheme === 'dark') {
        isDark = true;
      } else if (targetTheme === 'light') {
        isDark = false;
      } else {
        // system preference
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('repo_explorer_theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return { theme, setTheme };
};
