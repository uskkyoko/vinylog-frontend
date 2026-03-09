# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vinylog is a music discovery and review platform. This repo is the **React + TypeScript frontend** (Vite) that talks to a FastAPI backend. `src/backend/templates/` contains Jinja2 templates kept for reference — not part of the Vite build.

## Commands

```bash
npm run dev          # start Vite dev server (proxies /api/* to localhost:8000)
npm run build        # type-check + production build
npm run lint         # ESLint
npm run typecheck    # tsc without emit
npm run test         # Vitest once
npm run test:watch   # Vitest watch mode
npm run verify       # typecheck + lint + test (full pre-commit check)
```

Run a single test file:
```bash
npx vitest run src/hooks/useFetch.test.ts
```

## Architecture

### API Layer

All backend communication lives in `src/api/`, split by domain:

```
src/api/
  http.ts      — shared fetch primitives: get, mutateJSON, mutateVoid, authHeaders, setAuthToken, UnauthorizedError
  auth.ts      — login, signup, getMe, logout
  users.ts     — getCurrentUser, updateUser, uploadAvatar, getFavouriteAlbums, updateFavouriteAlbums, followUser, unfollowUser
  albums.ts    — getAllAlbums, getAlbumDetails, getFeaturedAlbums, getPopularAlbums, searchAlbums
  artists.ts   — getArtists
  lists.ts     — getLists, getMyLists, getUserLists, createList, updateList, deleteList
  reviews.ts   — getReview, getReviews, createReview, updateReview, deleteReview
  index.ts     — assembles all domain objects into a single `api` export
```

Import as `import { api } from "../../api"`. All calls go to `/api/*` (Vite proxy). `setAuthToken(token)` writes a module-level variable that `authHeaders()` reads.

### State Management

**`AuthContext`** (`src/context/AuthContext.tsx`) — identity layer, backed by `useReducer`
- `status: 'loading' | 'authed' | 'anon'`
- On mount: reads token from `localStorage`, validates via `GET /users/me`
- Exposes: `user`, `login`, `signup`, `logout`, `updateCurrentUser`, `followUser`, `unfollowUser`

**Redux** (`src/store.ts` + `src/store/`) — current user's mutable data
- Three slices: `listsSlice`, `reviewsSlice`, `usersSlice`
- State shape: `state.lists.items`, `state.reviews.items`, `state.users.favouriteAlbums`
- All async thunks (fetchMyLists, createList, deleteList, createReview, updateReview, deleteReview, saveFavouriteAlbums, etc.) live in their respective slice files
- Use typed hooks from `src/hooks/hooks.ts`: `useAppSelector`, `useAppDispatch`

**`AppDataLoader`** (`src/context/AppStateContext.tsx`) — bridges auth → Redux
- Watches `AuthContext` status; dispatches `fetchMyLists`, `fetchReviews`, `fetchFavouriteAlbums` when `status === 'authed'`

Provider nesting in `main.tsx`: `<Provider store> > <AuthProvider> > <AppDataLoader> > <BrowserRouter> > <App>`

### Hook Layers

1. **`useFetch`** (`src/hooks/useFetch.ts`) — generic primitive. Returns `{ data, setData, loading, error }`. Second arg is initial value, third arg is deps array.
2. **Domain hooks** (`useAlbums`, `useArtists`, `useLists`, `useAlbumSearch`) — thin wrappers for public/read-only data. Use for data that doesn't need to survive navigation.
3. **Redux selectors** — use `useAppSelector` for the current user's lists, reviews, and favourite albums instead of re-fetching.

### Routing

`App.tsx` defines all routes. `/albums`, `/albums/:id`, `/lists`, `/login`, `/signup` are public. All others are wrapped in `ProtectedRoute` which redirects `anon` users to `/login` and renders `null` during `loading`.

### Page & Component Conventions

**Pages contain no raw HTML** — every meaningful UI block is a named component. Structure:
- `PageName.tsx` — thin shell: `AppLayout` + composed named sub-components + data fetching via `useFetch` or Redux selectors
- Page-specific sub-components are **co-located** in the same page folder (e.g., `src/pages/Profile/ProfileHeader.tsx`)
- Shared components used across multiple pages live in `src/components/`

**Shared components:**
- `AppLayout` — wraps NavBar + main + Footer; every page composes this itself (not at router level)
- `Button` / `ButtonLink` — use for all buttons and link-styled buttons; variants: `primary | ghost | danger | ai`; size: `sm`. Both accept an optional `className` prop for additional styles.
- `FormField` — label + input wrapper; use for all form fields to keep form abstraction consistent
- `AlbumCard`, `ArtistCard`, `ReviewCard`, `ReviewDetailCard` — reusable across pages

**Do not** use `className="btn btn--*"` directly on `<button>` or `<Link>` — always use `Button` / `ButtonLink` components.

### Types

All TypeScript interfaces live in `src/types/` (one file per domain). All re-exported from `src/types/index.ts`. Import from `"../../types"`.

### Styling

Co-located `.css` files per page/component. Global base styles in `src/index.css`. `src/backend/templates/` is the visual reference for CSS class names.

## Testing

Tests use **Vitest** + **@testing-library/react**. Test environment is `jsdom` (configured in `package.json`). Currently only `src/hooks/useFetch.test.ts` exists. New tests: use `renderHook` + `waitFor`, mock with `vi.fn()`, restore in `afterEach`.
