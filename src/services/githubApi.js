import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/repositories';

const buildQuery = (userQuery, language, dateRange) => {
  let q = userQuery?.trim() || '';

  if (
    q.toLowerCase() === 'javascript' &&
    language &&
    language.toLowerCase() !== 'all' &&
    language.toLowerCase() !== 'javascript'
  ) {
    q = '';
  }

  if (!q) {
    q = 'stars:>1000';
  }

  // Language filter
  if (language && language.toLowerCase() !== 'all') {
    q += ` language:"${language}"`;
  }

  // Date range filter
  if (dateRange && dateRange !== 'anytime') {
    const now = new Date();
    if (dateRange === 'today') {
      now.setDate(now.getDate() - 1);
    } else if (dateRange === 'week') {
      now.setDate(now.getDate() - 7);
    } else if (dateRange === 'month') {
      now.setMonth(now.getMonth() - 1);
    } else if (dateRange === 'year') {
      now.setFullYear(now.getFullYear() - 1);
    }
    const isoDate = now.toISOString().split('T')[0];
    q += ` pushed:>=${isoDate}`;
  }

  return q;
};

export const fetchGitHubRepositories = async ({
  query = '',
  sort = 'stars',
  language = 'all',
  dateRange = 'anytime',
  page = 1,
  perPage = 12,
}) => {
  const searchQuery = buildQuery(query, language, dateRange);

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: searchQuery,
        sort: sort === 'stars' ? 'stars' : sort === 'forks' ? 'forks' : 'updated',
        order: 'desc',
        per_page: perPage,
        page,
      },
    });

    return {
      items: response.data.items || [],
      totalCount: response.data.total_count || 0,
      incompleteResults: response.data.incomplete_results || false,
      error: null,
      isRateLimited: false,
    };
  } catch (err) {
    console.error('GitHub API error:', err);

    const isRateLimit =
      err.response?.status === 403 ||
      err.response?.status === 429 ||
      err.response?.data?.message?.includes('rate limit');

    return {
      items: [],
      totalCount: 0,
      error: isRateLimit
        ? 'GitHub API limit reached. You have reached the current request limit.'
        : err.response?.data?.message || 'Error fetching repositories from GitHub. Please try again.',
      isRateLimited: isRateLimit,
    };
  }
};
