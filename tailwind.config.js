/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
          'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
          'primary-text': 'rgb(var(--text-primary) / <alpha-value>)',
        },
        app: {
          bg: 'rgb(var(--bg-app) / <alpha-value>)',
          surface: 'rgb(var(--bg-surface) / <alpha-value>)',
          'surface-hover': 'rgb(var(--bg-surface-hover) / <alpha-value>)',
          sidebar: 'rgb(var(--bg-sidebar) / <alpha-value>)',
          'nav-active': 'rgb(var(--bg-nav-active) / <alpha-value>)',
          border: 'rgb(var(--border-color) / <alpha-value>)',
          'border-hover': 'rgb(var(--border-color-hover) / <alpha-value>)',
        },
        content: {
          main: 'rgb(var(--text-main) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          subtle: 'rgb(var(--text-subtle) / <alpha-value>)',
        }
      },
      borderRadius: {
        'search': '20px',
        'card': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': 'var(--card-shadow)',
        'card-hover': 'var(--card-shadow-hover)',
        'search-focus': '0 0 0 4px rgba(103, 70, 245, 0.15)',
      }
    },
  },
  plugins: [],
}