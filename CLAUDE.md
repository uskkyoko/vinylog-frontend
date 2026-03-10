# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. App Overview

**Vinylog** is a music discovery and review platform. Users log in, write reviews for albums, curate lists, and discover music.

Core entities:
- **User** — authenticated identity; has a profile, favourite albums, followers/following
- **Album** — music release with cover art, artist, tracklist (sourced from Spotify)
- **Artist** — musician/band; has albums
- **Review** — a user's rating + comment on an album
- **List** — a user-curated collection of albums

This repo is the **React + TypeScript frontend** (Vite) that talks to a FastAPI backend. `src/backend/templates/` contains Jinja2 templates kept for reference — not part of the Vite build.

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

## 2. State Management Approach

Two separate layers — chosen to keep identity concerns out of Redux and avoid unnecessary re-fetching:

**`AuthContext`** (`src/context/AuthContext.tsx`) — identity only, backed by `useReducer`
- Owns: current user object, auth token, login/signup/logout, follow/unfollow
- Why context: auth state is global and read-only from most components; no need for Redux's action history
- `status: 'loading' | 'authed' | 'anon'`

**Redux Toolkit** (`src/store.ts` + `src/store/`) — current user's *mutable* data
- Owns: the user's lists, reviews, favourite albums — data that must survive navigation and update reactively
- Why Redux: multiple pages read the same lists/reviews; mutations (create/delete) must reflect everywhere instantly without re-fetching
- Store file: `src/store.ts`
- Typed hooks: `src/hooks/hooks.ts` → `useAppSelector`, `useAppDispatch`

**`AppDataLoader`** (`src/context/AppStateContext.tsx`) — bridges auth → Redux
- When `status` becomes `'authed'`, dispatches the three initial fetch thunks

Provider nesting in `main.tsx`:
```
<Provider store> → <AuthProvider> → <AppDataLoader> → <BrowserRouter> → <App>
```

## 3. State Shape

```ts
// src/store.ts
export type RootState = {
  lists: {
    items: ListOut[];        // current user's lists
  };
  reviews: {
    items: ReviewOut[];      // current user's reviews
  };
  users: {
    favouriteAlbums: AlbumOut[];  // current user's favourite albums
  };
};
```

Thunks per slice (`src/store/`):
- `listsSlice`: `fetchMyLists`, `createList`, `deleteList`, `addAlbumToList`, `removeAlbumFromList`
- `reviewsSlice`: `fetchReviews`, `createReview`, `updateReview`, `deleteReview`
- `usersSlice`: `fetchFavouriteAlbums`, `saveFavouriteAlbums`

## 4. API Conventions

All backend communication lives in `src/api/`, split by domain:

```
src/api/
  http.ts      — fetch primitives: get<T>, mutateJSON<T>, mutateVoid, authHeaders, setAuthToken, UnauthorizedError
  auth.ts      — login, signup, getMe, logout
  users.ts     — getCurrentUser, updateUser, uploadAvatar, getFavouriteAlbums, updateFavouriteAlbums, followUser, unfollowUser
  albums.ts    — getAllAlbums, getAlbumDetails, getFeaturedAlbums, getPopularAlbums, searchAlbums, getAlbumTracks
  artists.ts   — getArtists
  lists.ts     — getLists, getMyLists, getUserLists, createList, updateList, deleteList
  reviews.ts   — getReview, getReviews, createReview, updateReview, deleteReview
  search.ts    — search(q)
  index.ts     — assembles all domain objects into a single `api` export
```

**Rules:**
- Import as `import { api } from "../../api"` — never import from individual domain files
- All paths must include a trailing slash to avoid FastAPI 307 redirects that drop the `Authorization` header (e.g. `/reviews/` not `/reviews`)
- `setAuthToken(token)` writes a module-level variable; `authHeaders()` injects it on every request
- On 401, `http.ts` throws `UnauthorizedError` — `AuthContext` catches this and logs out
- No `axios`, no TanStack Query — native `fetch` via the primitives in `http.ts`

## 5. File Structure

```
src/
├── api/              One file per domain + http.ts primitives
├── context/          AuthContext.tsx, AppStateContext.tsx (AppDataLoader)
├── hooks/            useFetch.ts (primitive), domain hooks, hooks.ts (typed Redux)
├── store/            listsSlice.ts, reviewsSlice.ts, usersSlice.ts
├── store.ts          configureStore + RootState + AppDispatch exports
├── types/            One file per domain, all re-exported from index.ts
├── components/       Shared components used across 2+ pages
│   ├── NavBar/
│   ├── ReviewCard/
│   ├── AlbumPickerField/
│   ├── StarRatingField/
│   └── Button.tsx, FormField.tsx, AppLayout.tsx, AlbumCard.tsx, ArtistCard.tsx …
├── pages/            One folder per route
│   ├── Home/         Home.tsx + co-located HomeHero.tsx, HomePanels.tsx …
│   ├── Albums/
│   ├── AlbumDetail/
│   ├── Profile/
│   ├── Reviews/
│   ├── ReviewDetail/
│   ├── CreateReview/
│   ├── Settings/
│   ├── Lists/
│   ├── Search/
│   └── Auth/         Login.tsx, Signup.tsx, Auth.css
├── App.tsx           Route definitions + ProtectedRoute
└── main.tsx          Provider nesting + app entry point
```

**Naming patterns:**
- Page shell: `PageName.tsx` (default export)
- Co-located sub-components: `PageNameSection.tsx` / `PageNameCard.tsx` (named exports)
- Shared components: `ComponentName.tsx` or `ComponentName/ComponentName.tsx`
- Slices: `domainSlice.ts`, reducer export: `domainReducer`
- Types: `src/types/domain.ts`, one interface per concept

## 6. Adding New Features

Follow these steps in order when adding any new operation (e.g. "bookmark an album"):

### Step 1 — Add the type

In `src/types/<domain>.ts`, add the request/response interface:
```ts
export interface BookmarkCreate { album_id: number; }
export interface BookmarkOut { id: number; album: AlbumOut; created_at: string; }
```
Re-export from `src/types/index.ts` if it's a new file.

### Step 2 — Add the API function

In the relevant `src/api/<domain>.ts` file:
```ts
createBookmark: (data: BookmarkCreate): Promise<BookmarkOut> =>
  mutateJSON<BookmarkOut>("/bookmarks/", "POST", data),
deleteBookmark: (id: number): Promise<void> =>
  mutateVoid(`/bookmarks/${id}/`, "DELETE"),
```
Add it to the `api` export object in `src/api/index.ts`.

### Step 3 — Add a Redux slice (if data is mutable and survives navigation)

In `src/store/bookmarksSlice.ts`:
```ts
export const fetchBookmarks = createAsyncThunk("bookmarks/fetch", () => api.getBookmarks());
export const createBookmark = createAsyncThunk("bookmarks/create", (data: BookmarkCreate) => api.createBookmark(data));
export const deleteBookmark = createAsyncThunk("bookmarks/delete", async (id: number) => { await api.deleteBookmark(id); return id; });

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: { items: [] as BookmarkOut[] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createBookmark.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteBookmark.fulfilled, (state, action) => { state.items = state.items.filter((b) => b.id !== action.payload); });
  },
});
export const bookmarksReducer = bookmarksSlice.reducer;
```

Register in `src/store.ts`:
```ts
import { bookmarksReducer } from "./store/bookmarksSlice";
export const store = configureStore({ reducer: { ..., bookmarks: bookmarksReducer } });
```

Dispatch initial fetch in `AppDataLoader` (`src/context/AppStateContext.tsx`) when `status === 'authed'`.

### Step 4 — Skip Redux for read-only / page-local data

If the data doesn't need to survive navigation (e.g. album search results, public artist list), use a domain hook instead:
```ts
// src/hooks/useBookmarks.ts
export function useBookmarks(userId: number) {
  return useFetch(() => api.getBookmarks(userId), [] as BookmarkOut[], [userId]);
}
```

### Step 5 — Build the UI

- Add a new page folder `src/pages/Bookmarks/` with `Bookmarks.tsx` (thin shell) + co-located sub-components
- Page shell pattern:
  ```tsx
  export default function Bookmarks() {
    const bookmarks = useAppSelector((state) => state.bookmarks.items);
    return (
      <AppLayout>
        <BookmarksHeader />
        <BookmarksList bookmarks={bookmarks} />
      </AppLayout>
    );
  }
  ```
- Register the route in `App.tsx`; wrap in `<ProtectedRoute>` if auth-required

### Step 6 — Verify

```bash
npm run verify   # typecheck + lint + test must all pass
```

---

## Component Conventions (enforced)

- **Pages contain no raw HTML** — every block is a named component
- **All buttons** → `<Button>` or `<ButtonLink>`. Never `<button className="...">` directly
- **All form fields** → wrapped in `<FormField label="..." htmlFor="...">`
- **All pages** → compose `<AppLayout>` themselves (never at router level)
- **CSS** → co-located `.css` file per page/component; global base in `src/index.css`

## Testing

Tests use **Vitest** + **@testing-library/react**. Test environment is `jsdom` (configured in `package.json`). Currently only `src/hooks/useFetch.test.ts` exists. New tests: use `renderHook` + `waitFor`, mock with `vi.fn()`, restore in `afterEach`.
