# 🎬 CineList — Development Roadmap & Future Plan

**CineList** is a modern, luxury cinema web application built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, **MongoDB**, **Better-Auth**, and the **TMDB API**.

---

## 🏆 Completed Milestones & Implemented Features

### ✅ Phase 1: Core Navigation & Responsive Design
- **Responsive Navbar:**
  - Tablet/mobile overflow resolution with custom `lg` breakpoint.
  - Symmetrical mobile header: Left brand logo, Right 36px circular pill action buttons (`SearchBar`, `WatchListBtn` with live badge, and `Hamburger`).
- **Slide-Down Search System:**
  - Smooth slide-down and slide-up animations using hardware-accelerated transitions.
  - Live TMDB search debouncing with custom shimmer loading cards.
- **Watchlist & Favorites Switcher:**
  - iOS/Linear-style sliding red-orange pill indicator.
  - Cross-fading grid transitions between saved movies.

### ✅ Phase 2: Performance & Cinema Experience
- **State & Scroll Restoration:**
  - `sessionStorage` caching for multi-page loads (`cinelist_cache_movies`, `cinelist_cache_popular`, and scroll offsets).
  - Preserves exact scroll position and loaded movie lists when navigating back from movie details.
- **Custom Cinema Scrollbar & Scroll Progress Bar:**
  - 8px frosted-glass scrollbar with fiery red-orange illuminating thumb.
  - 2.5px top progress line tracking real-time reading depth.
- **Official YouTube Trailer Theater Modal:**
  - Ambient backlight glow, progress loader, and informative connection message.
- **Zero-Dependency Luxury Toast System:**
  - Glassmorphism notifications replacing `react-toastify`.
  - Auto-dismiss countdown timer, pause-on-hover, and contextual iconography.

### ✅ Phase 3: Movie Details Enrichment (Today's Milestone)
- **Top Cast & Key Crew Section:**
  - TMDB credits integration (`/movie/{id}/credits`).
  - Director & Screenplay writer spotlight chips.
  - Horizontal smooth-scrolling cast carousel with left/right navigation controls and profile fallbacks.
- **"More Like This" Recommendations Grid:**
  - TMDB recommendations (`/movie/{id}/recommendations`) with automatic fallback to `/similar`.
  - Responsive 5-column cinema grid with rating badges, 18+ adult tags, and hover play animations.
- **Unified Skeletons:**
  - Complete shimmer loading placeholders matching the new layout.

---

## 🚀 Future Development Roadmap (Step-by-Step)

The following steps are scheduled for future development phases:

```
[Phase 1: Filter & Sort] ➔ [Phase 2: User Reviews & Ratings] ➔ [Phase 3: Custom Playlists] ➔ [Phase 4: Public Profiles] ➔ [Phase 5: Dynamic OG & SEO] ➔ [Phase 6: Surprise Me Wheel] ➔ [Phase 7: PWA Support]
```

---

### 📌 Step 1: Advanced Interactive Filter & Sorting Engine
**Goal:** Empower users to explore and filter movies by specific criteria on `/all-movies` and `/popular-movies`.

- **Key Features:**
  1. **Genre Chips Selector:** Multi-select interactive pills (Action, Sci-Fi, Horror, Drama, Comedy, Anime, etc.).
  2. **Release Year Filter:** Range slider or selector (e.g., 2020–2025, 2010s, 2000s, Classics).
  3. **Rating Threshold Slider:** Filter movies with TMDB rating $\ge 7.0$ or $\ge 8.0$.
  4. **Sort By Options:**
     - Most Popular (Default)
     - Highest Rated (`vote_average.desc`)
     - Release Date (Newest first)
     - Title Alphabetical (A–Z)
  5. **URL Query Synchronization:**
     - e.g., `/all-movies?genre=28,878&sort=vote_average.desc&min_rating=7`
     - Allows bookmarking and sharing filtered links.

---

### 📌 Step 2: Community Reviews & Star Rating System (MongoDB + Better-Auth)
**Goal:** Transform CineList from a catalog into an interactive cinema community.

- **Key Features:**
  1. **MongoDB `reviews` Collection:**
     ```typescript
     interface IReview {
       _id: string;
       userId: string;
       userName: string;
       userImage: string;
       movieId: number;
       rating: number; // 1 to 10
       headline: string;
       content: string;
       likesCount: number;
       createdAt: Date;
     }
     ```
  2. **Interactive 10-Star Rating Input:**
     - Hover and click star selector with glowing neon-red fill.
  3. **Review Submission Modal:**
     - Form with live character counter and luxury toast notification on submit.
  4. **Community Reviews Tab on Movie Details:**
     - Average community rating score displayed alongside TMDB score.
     - Review cards with verified user avatars, date, and helpfulness upvotes.

---

### 📌 Step 3: Custom Movie Collections & Playlists
**Goal:** Let users organize movies beyond standard "Watchlist" and "Favorites".

- **Key Features:**
  1. **Custom Playlists:**
     - Users can create named lists (e.g., *"Friday Night Thrillers"*, *"Christopher Nolan Marathon"*, *"Best of 90s"*).
     - Privacy setting: Public or Private.
  2. **"Add to Collection" Popover:**
     - Easy checkbox menu on any movie card or details page.
  3. **Playlist Showcase View:**
     - Auto-generated 4-poster collage cover.
     - Shareable playlist link.

---

### 📌 Step 4: Public User Profiles & Social Watchlist
**Goal:** Give users a cinema identity they can showcase.

- **Key Features:**
  1. **User Profile Route (`/user/[username]`):**
     - Top 4 "Favorite Cinema Masterpieces" pinned at the top.
     - Stats badge: Total movies watched, total hours logged.
     - Activity timeline: Recently rated or added movies.
  2. **Custom Bio & Social Links:**
     - Personal cinema bio and links (Letterboxd, Twitter, Portfolio).

---

### 📌 Step 5: Dynamic Social Sharing Cards & SEO (OpenGraph)
**Goal:** Deliver rich media link previews when CineList links are shared on social media.

- **Key Features:**
  1. **Next.js Dynamic Metadata:**
     - Automated `generateMetadata` for `/movie/[movie]` with localized title, description, and keywords.
  2. **Dynamic OpenGraph Image Generator (`@vercel/og`):**
     - Generates 1200x630px social card on the fly:
       - High-res movie backdrop with dark vignette.
       - Movie poster and title.
       - Audience score badge and CineList branding.
  3. **JSON-LD Schema Markup:**
     - Structured `schema.org/Movie` data for Google Rich Search Results.

---

### 📌 Step 6: "Surprise Me" / Random Movie Discovery Wheel
**Goal:** Solve decision paralysis for movie night.

- **Key Features:**
  1. **"Surprise Me" Magic Button:**
     - Available in the header or homepage hero.
  2. **Filter by Mood:**
     - "Adrenaline & Action", "Mind-Bending Sci-Fi", "Lighthearted Comedy", "Heartfelt Drama".
  3. **Cinematic Reveal Wheel/Animation:**
     - Spins and lands on a highly-rated movie from that mood with instant "Watch Trailer" or "View Details" CTA.

---

### 📌 Step 7: PWA (Progressive Web App) & Offline Caching
**Goal:** Allow users to install CineList as a standalone app on Mobile and Desktop.

- **Key Features:**
  1. **Web App Manifest (`manifest.json`):**
     - Custom CineList neon app icons, splash screens, and standalone display mode.
  2. **Service Worker:**
     - Cache shell assets and watchlist data offline.
     - Smooth offline indicator when internet connection drops.

---

## 🛠️ Architecture Guidelines & Constraints
- **Framework Standards:** Next.js 16 App Router, React 19 Server Components by default; `"use client"` only when interactivity or DOM listeners are necessary.
- **Performance:** Zero unnecessary dependencies, GPU-accelerated CSS animations (`linear-to-r`, `cubic-bezier`), image optimization via `next/image`.
- **Theme Palette:**
  - Primary Red: `#ee162f`
  - Secondary Flame: `#fc6743`
  - Accent Red: `#fd3148`
  - Backgrounds: `#000000`, `stone-950`, `stone-900`
  - Borders: `border-white/10`, `hover:border-red-500/40`

---
*Created on: 2026-11-03 | Maintained for CineList by SM Sazzad*

