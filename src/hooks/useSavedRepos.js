import { useState, useEffect } from 'react';

export const useSavedRepos = () => {
  const [savedRepos, setSavedRepos] = useState(() => {
    try {
      const stored = localStorage.getItem('repo_explorer_saved');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse saved repositories from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('repo_explorer_saved', JSON.stringify(savedRepos));
    } catch (e) {
      console.error('Failed to save repositories to localStorage', e);
    }
  }, [savedRepos]);

  const toggleSaveRepo = (repo) => {
    setSavedRepos((prev) => {
      const exists = prev.some((item) => item.id === repo.id);
      if (exists) {
        return prev.filter((item) => item.id !== repo.id);
      } else {
        return [repo, ...prev];
      }
    });
  };

  const isRepoSaved = (repoId) => {
    return savedRepos.some((item) => item.id === repoId);
  };

  return { savedRepos, toggleSaveRepo, isRepoSaved };
};
