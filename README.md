# Repo Explorer ✨

> **Discover Amazing Repositories** — Search, explore and discover the best open-source projects on GitHub.

![Repo Explorer Banner](https://img.shields.io/badge/Repo-Explorer-6746F5?style=for-the-badge&logo=github&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌟 Overview

**Repo Explorer** is a modern developer discovery platform built with React 18, Vite, and Tailwind CSS. It connects to the official **GitHub Search REST API** to allow developers to discover trending projects, search repositories, apply custom filters, save favorites locally, and toggle between Light and Dark modes.

---

## ✨ Features

- **🎨 Centralized CSS Design System**:
  - All colors, background gradients, text styles, radiuses, and shadows are defined in centralized CSS custom variables in `src/index.css` and mapped to `tailwind.config.js`.
  - Change colors in **one single file** (`src/index.css`) to update the theme across the entire application.

- **🚀 Real-Time GitHub API Search**:
  - Live query validation, pagination ("Load More Repositories"), rate-limit detection, and friendly error states.
  - URL search parameter sync (`?q=...&sort=...&lang=...`) allowing shareable search URLs and browser navigation history support.

- **🎛️ Custom Popover Filters**:
  - **Sort by**: Most stars, Most forks, Recently updated.
  - **Language Filter**: All, JavaScript, TypeScript, Python, Go, Rust, Java, C++, PHP, HTML, CSS.
  - **Timeframe Updated**: Any time, Past week, Past month, Past year.
  - Built with accessible custom React popover dropdowns instead of raw browser inputs.

- **🏷️ Repository Cards & Formatting**:
  - Compact number formatting (`148.1k` stars, `26.6k` forks, `163` issues).
  - Programming language dot indicator with custom GitHub language color mappings.
  - Verified badges, line-clamped descriptions, colored topic tags, and direct `View on GitHub ↗` links.

- **🔖 Saved Repositories**:
  - Bookmark repositories with a single click. Favorites are stored in `localStorage` and accessible anytime via the **Saved** tab.

- **📱 Fully Responsive Layout**:
  - **Desktop**: Sticky sidebar (~240px wide) with navigation, language counters, and star promo box.
  - **Mobile**: Fixed bottom tab bar (`Explore`, `Saved`, `Menu`) with slide-over drawer for category selection.

- **🌙 Dark Mode & Light Mode**:
  - Supports **Light**, **Dark**, and **System** preference syncing.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📁 Project Architecture

```text
GitHub-Repository-Explorer/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx                        # Main layout & router state manager
    ├── index.css                      # Centralized CSS variables & theme tokens
    ├── main.jsx                       # Application entry point
    ├── components/
    │   ├── common/
    │   │   └── GithubIcon.jsx         # Standalone SVG GitHub brand icon
    │   ├── illustration/
    │   │   └── HeroIllustration.jsx   # SVG developer discovery hero graphic
    │   ├── layout/
    │   │   ├── Sidebar.jsx            # Sticky desktop left navigation
    │   │   └── MobileNavigation.jsx   # Fixed mobile bottom navigation
    │   ├── repository/
    │   │   ├── LanguageBadge.jsx
    │   │   ├── RepositoryCard.jsx     # Card component with stats & bookmark
    │   │   ├── RepositoryGrid.jsx     # Responsive grid with Load More button
    │   │   ├── RepositoryStats.jsx
    │   │   ├── RepositoryTopics.jsx
    │   │   └── SavedSection.jsx       # Saved/Bookmarked repositories view
    │   ├── search/
    │   │   ├── CustomFilterDropdown.jsx # Custom popover filter dropdown
    │   │   ├── PopularSearches.jsx    # Quick pill suggestions
    │   │   ├── SearchBar.jsx          # Rounded search input bar
    │   │   └── SearchFilters.jsx      # Results header & filter controls
    │   ├── states/
    │   │   ├── EmptyState.jsx         # Empty search results fallback
    │   │   ├── ErrorState.jsx         # API error & rate-limit state
    │   │   └── RepositorySkeleton.jsx # Pulse skeleton loading grid
    │   └── theme/
    │       └── ThemeToggle.jsx        # Light / Dark / System switcher
    ├── hooks/
    │   ├── useSavedRepos.js           # LocalStorage bookmark manager
    │   └── useTheme.js                # Theme switcher hook
    ├── services/
    │   └── githubApi.js               # GitHub REST API service & query builder
    └── utils/
        └── formatters.js              # Number compacting & language color map
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sureshjadhav1/GitHub-Repository-Explorer.git
   cd GitHub-Repository-Explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎨 Customizing Theme Colors

To change the primary brand color, dark mode background, or surface colors across the application, edit the CSS variables in `src/index.css`:

```css
:root {
  /* Change primary brand accent color (RGB format for opacity support) */
  --color-primary: 103 70 245; /* #6746F5 */
  
  /* Change Light App Background */
  --bg-app: 250 250 255;
  
  /* Change Card Surface Background */
  --bg-surface: 255 255 255;
}

.dark {
  /* Change Dark Mode Primary Accent */
  --color-primary: 139 124 255; /* #8B7CFF */
  
  /* Change Dark Mode App Background */
  --bg-app: 11 13 23; /* #0B0D17 */
}
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).