export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

export const getLanguageColor = (language) => {
  if (!language) return '#9CA3AF'; // Gray fallback

  const colors = {
    javascript: '#F1E05A',
    typescript: '#3178C6',
    python: '#3572A5',
    go: '#00ADD8',
    rust: '#DEA584',
    java: '#B07219',
    'c++': '#F34B7D',
    c: '#555555',
    'c#': '#178600',
    php: '#4F5D95',
    ruby: '#701516',
    swift: '#F05138',
    kotlin: '#A97BFF',
    dart: '#00B4AB',
    html: '#E34C26',
    css: '#563D7C',
    shell: '#89E051',
    vue: '#41B883',
    jupyter: '#DA5B0B',
  };

  const lower = language.toLowerCase();
  return colors[lower] || '#8B7CFF'; // Default theme accent
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return 'Today';
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
