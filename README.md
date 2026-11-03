# 🎬 CineList — Luxury Cinema Discovery & Watchlist Web App

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better-Auth](https://img.shields.io/badge/Better--Auth-1.7-black?style=for-the-badge&logo=auth0&logoColor=red)](https://better-auth.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**CineList** is a high-performance, luxury cinema web application designed for discovering trending & popular films, streaming official YouTube trailers in theater mode, browsing cast & crew ensembles, and curating personal watchlists and favorites.

[🌐 **Explore Live Demo**](https://cinelist-sm-sazzad.vercel.app/) • [📋 **Future Roadmap**](./next_plan.md) • [🐛 **Report Bug**](https://github.com/sm-sazzad/CineList/issues)

</div>

---

## 📸 Overview

CineList redefines the movie-browsing experience with a dark, high-contrast cinema aesthetic, glowing neon-red accents (`#ee162f` to `#fc6743`), zero layout shift, seamless state restoration, and real-time TMDB API integration.

---

## ✨ Key Features

### 🎥 Cinema & Movie Exploration
- **🔥 Trending & Popular Cinema:** Real-time data feeds powered by the TMDB API with audience ratings, release dates, and adult tags.
- **🍿 Official YouTube Cinema Trailer Modal:** Embedded theater backdrop player with ambient backlight glow, connection progress bar, and user-friendly status updates.
- **🎭 Top Cast & Key Crew:** Rich ensemble carousel featuring actor portraits, character identities (*"as Character"*), and spotlight badges for directors and screenplay writers.
- **🎯 "More Like This" Recommendations:** Curated 5-column grid of related films based on storyline mood and genre similarities, with automatic fallback handling.
- **🔍 Slide-Down Debounced Search:** Hardware-accelerated search bar that slides down from behind the navbar, complete with live debouncing and shimmer skeleton cards.

### ⚡ State Management & UX Perfection
- **💾 State & Scroll Restoration:** Intelligent `sessionStorage` caching on `/all-movies` and `/popular-movies`. Navigating into a movie on page 4 and pressing "Back" instantly restores all 80+ loaded movies and your exact scroll position.
- **🔔 Custom Zero-Dependency Luxury Toast System:** Custom glassmorphism notification cards with countdown timers, pause-on-hover, stackable alerts, and contextual cinema icons.
- **📜 Cinema Scrollbar & Reading Depth Indicator:** Frosted-glass 8px scrollbar that illuminates neon red-orange on hover, paired with a top 2.5px real-time reading progress bar.
- **✨ Shimmer Skeleton UI:** Smooth shimmering skeleton loaders on every route and modal to eliminate content popping and layout shifts.

### 🔐 User Accounts & Collections
- **🛡️ Better-Auth & MongoDB:** Secure email/password authentication with automated email verification (via Nodemailer) and Google/GitHub OAuth support.
- **❤️ Personal Watchlist & Favorites Switcher:** iOS/Linear-style sliding pill indicator to toggle smoothly between saved watchlist items and favorited masterpieces.
- **📱 100% Mobile & Tablet Responsive:** Standardized 36px circular pill action buttons and adaptive navigation drawer for all screens from 320px to 4K.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19.2.8](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), DaisyUI, CSS Variables |
| **Authentication** | [Better-Auth 1.7](https://better-auth.com/) + MongoDB Adapter |
| **Database** | [MongoDB](https://www.mongodb.com/) (Native driver `mongodb ^7.7.0`) |
| **Data Source** | [The Movie Database (TMDB) API](https://www.themoviedb.org/) |
| **Email Service** | [Nodemailer](https://nodemailer.com/) (SMTP / Gmail App Password) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |

---

## 🚀 Getting Started

Follow these steps to set up and run CineList locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or MongoDB Atlas)
- [TMDB API Read Access Token](https://www.themoviedb.org/settings/api)

### 1. Clone the Repository
```bash
git clone https://github.com/sm-sazzad/CineList.git
cd CineList
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```env
# TMDB API
TMDB_ACCESS_TOKEN=your_tmdb_bearer_token

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Better-Auth Configuration
BETTER_AUTH_SECRET=your_random_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Nodemailer / Email Verification
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience CineList!

---

## 📂 Project Structure

```
cine-list/
├── app/
│   ├── api/
│   │   ├── auth/                # Better-Auth endpoint handler
│   │   └── movies/trailer/      # Official YouTube trailer API route
│   ├── Components/
│   │   ├── Toast/               # Custom luxury glassmorphism toast system
│   │   ├── favouriteBtn/        # Watchlist & Favorite button actions
│   │   ├── hamburgerBtn/        # Mobile menu drawer
│   │   ├── MovieCast.tsx        # Top Cast & Key Crew carousel
│   │   ├── MovieRecommendations.tsx # "More Like This" curated movie grid
│   │   ├── MovieSkeleton.tsx    # Shimmer skeleton loader components
│   │   ├── Navbar.tsx           # Adaptive navbar with 36px circular pill buttons
│   │   ├── PopularMovieCard.tsx # Universal movie card with hover play
│   │   ├── ScrollProgressBar.tsx# Top real-time scroll depth line
│   │   ├── SearchBar.tsx        # Slide-down animated search bar
│   │   ├── SeledtedMovieCard.tsx# Detailed movie page layout
│   │   └── TrailerModal.tsx     # Luxury cinema trailer theater modal
│   ├── movie/[movie]/           # Dynamic movie details route
│   ├── popularMoreBtn/          # Multi-page pagination with state restoration
│   ├── watch-list/              # Watchlist & Favorites page with sliding pill tab
│   ├── globals.css              # Custom cinema scrollbar & shimmer animations
│   ├── layout.tsx               # Root layout with progress bar & toast container
│   └── page.tsx                 # Homepage with Hero, Trending, and Popular feeds
├── lib/
│   ├── auth.ts                  # Better-Auth server configuration
│   ├── auth-client.ts           # Better-Auth client-side helper
│   ├── email.ts                 # Nodemailer email verification utility
│   └── mongodb.ts               # MongoDB client connection pool
├── next_plan.md                 # Detailed step-by-step future roadmap
└── README.md                    # Project documentation
```

---

## 🗺️ Roadmap & Upcoming Milestones

Check out [**`next_plan.md`**](./next_plan.md) for our full development roadmap, including:
- **Phase 1:** Multi-genre interactive filter chips, year range, and rating sliders.
- **Phase 2:** Community reviews, star ratings, and review upvotes stored in MongoDB.
- **Phase 3:** Custom user movie playlists (e.g., *"Friday Night Thrillers"*).
- **Phase 4:** Public shareable user profile with top 4 pinned movies.
- **Phase 5:** Dynamic social share card generation via `@vercel/og`.
- **Phase 6:** "Surprise Me" random movie discovery wheel.
- **Phase 7:** Progressive Web App (PWA) with offline watchlist access.

---

## 👨‍💻 Author & Developer

**Sheikh Md Sazzad Hossain**  
*Frontend & Fullstack Developer | Computer Science & Technology Student*

- 🌐 **Portfolio:** [sazzad-dev.vercel.app](https://sazzad-dev.vercel.app/)
- 💻 **GitHub:** [@sm-sazzad](https://github.com/sm-sazzad)
- 💼 **LinkedIn:** [sm-sazzad](https://www.linkedin.com/in/sm-sazzad/)
- 📘 **Facebook:** [sazzad.hossain.5758](https://www.facebook.com/sazzad.hossain.5758/)
- 📸 **Instagram:** [@sazzad_hossain5758](https://www.instagram.com/sazzad_hossain5758/)
- ✉️ **Email:** [sazzadhossain5758@gmail.com](mailto:sazzadhossain5758@gmail.com)

---

<div align="center">
  <sub>© 2026 CineList. Designed & Developed with ❤️ by SM Sazzad.</sub>
</div>
