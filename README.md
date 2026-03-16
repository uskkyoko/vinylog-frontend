# Vinylog

Vinylog is a music discovery and review platform built with React + TypeScript. Users log in, write album reviews, curate lists, follow other users, and get AI-powered recommendations.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Testing:** Vitest + React Testing Library
- **Routing:** React Router DOM
- **State:** Redux Toolkit + AuthContext
- **Styling:** CSS3 (component-scoped)

---

## Project 3: Custom Hook (`useFetch`)

The core of the application's data layer is the `useFetch` hook. This utility abstracts the complexity of asynchronous side effects and state management into a reusable, type-safe interface.

[Image of a sequence diagram showing a React component, a custom hook, and an API service with state transitions for loading, data, and error]

### Hook Operations

1. **State Orchestration** — Manages `data`, `loading`, and `error` states simultaneously to provide a consistent UI feedback loop.
2. **Auto-Execution** — Triggers the provided `fetcher` function automatically on mount, abstracting `useEffect` boilerplate away from the UI.
3. **Dependency Synchronization** — Monitors a `dependencies` array to intelligently re-fetch data only when specific external values change.
4. **Memory Leak Prevention** — Implements a cleanup phase using an `isMounted` flag to prevent state updates on unmounted components, effectively handling race conditions.
5. **Manual State Override** — Exposes a `setData` function, allowing the UI to perform "optimistic updates" or manual state overrides without a server round-trip.

---

## Testing Suite

Consistency is verified using **Vitest** and **React Testing Library**. The suite ensures the hook behaves predictably under various network conditions.

### Running Tests

To run the automated test suite, execute the following:

```bash
npm install
npm run test
```

---

## Project 5

### Backend

Custom FastAPI deployed on Render: `https://vinylog.onrender.com`

Rationale: the backend was built for this course alongside the frontend. No Firebase or Supabase dependency — all endpoints are JWT-protected REST routes with a PostgreSQL database.

### Auth

- JWT email/password via `AuthContext` (`src/context/AuthContext.tsx`)
- `getMe` called on mount — session survives page reload via `localStorage` token
- `ProtectedRoute` component redirects unauthenticated users to `/login`
- Logout available in Settings

### Run Instructions

```bash
npm install
npm run dev
```

### Feature Verification

| Feature | Hook / Service | `loading` | `error` |
|---|---|---|---|
| Albums (browse) | `useAlbums` | ✓ | ✓ |
| Album detail | `useFetch` in `AlbumDetail` | ✓ | ✓ |
| Artists | `useArtistDetail` | ✓ | ✓ |
| Lists (browse) | `useFetch` in `Lists` | ✓ | ✓ |
| List detail | `useListDetail` | ✓ | ✓ |
| Reviews | `reviewsSlice` (Redux) | ✓ | ✓ |
| Review detail | `useFetch` in `ReviewDetail` | ✓ | ✓ |
| Recommend | `api.generateRecommendation` | ✓ | ✓ |
| Profile | `useProfileData` | ✓ | ✓ |
| Search | `useFetch` in `Search` | ✓ | ✓ |
| Settings | `usersSlice` (Redux) | ✓ | ✓ |

### AI usage

1. Decomposition of styles
2. Decomposition of component on the home page, etc
3. Synchronization with the vinylog api
4. Memory leak prevention for the custom hook
5. Adapting existing pydantic schemas for types.ts to maintain the consistency with the api
