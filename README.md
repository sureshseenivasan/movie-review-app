# Movie Review

A movie review app built with React, TypeScript, and Tailwind CSS. Search and filter movies, view full details, and rate them with a 1-5 star system. Movie data comes live from [TMDB](https://www.themoviedb.org).

## Tech Stack

- React + Vite (TypeScript)
- Tailwind CSS v4
- React Hooks (`useState`, `useEffect`, `useMemo`) — no external state library
- TMDB public API

## Setup

```bash
npm install
```

Create `.env` in the project root (copy `.env.example`):
```env
VITE_TMDB_TOKEN=your_v4_read_access_token_here
```

Get this token from **themoviedb.org → Settings → API → "API Read Access Token"** (the long token starting with `eyJ...`, not the short "API Key"). Free to request, personal use.

## Run

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx     # title search input
│   ├── FilterBar.tsx     # genre / year / rating dropdowns
│   ├── MovieList.tsx     # responsive grid, empty state
│   ├── MovieCard.tsx     # poster, title, year, genre, rating badge
│   ├── MovieDetails.tsx  # modal: description, cast, director, rating input
│   └── StarRating.tsx    # reusable 1-5 star control (read-only or interactive)
├── services/
│   └── movieApi.ts       # TMDB calls: popular, search, details
├── data/
│   └── mockMovies.ts     # optional offline fallback data
├── types/
│   └── Movie.ts
├── App.tsx                # wires search/filter state to the API and UI
└── main.tsx
```

## Requirement → Implementation

| Requirement | Where it's implemented |
|---|---|
| Movie listings with title, poster, year, genre | `MovieCard.tsx`, fed by `getPopularMovies()` |
| Responsive layout | `MovieList.tsx` grid (1–5 columns by screen size) |
| Search by title | `SearchBar.tsx` → debounced call to `searchMovies()` in `App.tsx` |
| Filter by genre / year / rating | `FilterBar.tsx`, applied client-side in `App.tsx`'s `filteredMovies` |
| Movie details on click | `MovieDetails.tsx` modal, enriched via `getMovieDetails()` |
| Star-based rating (1-5) | `StarRating.tsx`, interactive in the modal |
| Average/current rating shown on cards | Rating badge in `MovieCard.tsx` |
| UI reflects the user's current rating | `handleRating()` in `App.tsx` updates both the modal and the underlying movie list |

## Running Offline / Without an API Key

`data/mockMovies.ts` has 5 sample movies in the same `Movie` shape the API returns. To use it instead of TMDB, replace the `getPopularMovies()`/`searchMovies()` calls in `App.tsx` with `mockMovies` directly.

## Notes

- TMDB's rating is out of 10; this app converts it to a 0-5 star scale.
- Cast and director are only available from the movie-details endpoint, so they're fetched the moment a card is clicked, not upfront for every movie in the grid (keeps the initial load fast).
- Ratings given in this app are local only (stored in React state) — they are not sent to TMDB.
