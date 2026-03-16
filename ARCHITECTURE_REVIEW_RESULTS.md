# Architecture Review Results

> Analyzed on: 2026-03-16
> Project: Vinylog Frontend (`src/`)
> Total components analyzed: 46
> Issues found: 3

## Summary

Vinylog has a mature, deliberately designed frontend architecture. The dual-state split (AuthContext for identity, Redux for mutable user data), the `useFetch`-based domain hook layer, and the API abstraction in `src/api/` are all well-executed and consistently applied across the codebase. Three issues stand out: `Profile.tsx` performs a raw API call to refresh state after follow/unfollow where the context already owns that responsibility; `ArtistDetail.tsx` implements a three-step async load inline with `useState`/`useEffect` while every other page uses `useFetch`; and `ListForm.tsx` embeds two named sub-components in its own file where the project convention calls for co-located separate files.

---

## Issues

### ARCH-01: Profile refreshes follow state with a raw API call instead of updating through context

**Severity**: High
**Principle**: Unclear Data Flow
**Location**: `src/pages/Profile/Profile.tsx` (lines 28–38)

After calling `followUser()` or `unfollowUser()` (context methods that already make the API request), `Profile.tsx` fires a second `api.getCurrentUser()` call to refresh the displayed user. This is a manual cache-bust that bypasses the state layer — errors in the refresh are silently swallowed, there is no loading feedback, and the pattern means `Profile.tsx` knows *how* follow updates the profile rather than just *that* it happened.

#### Current (Bad)

```tsx
// Profile.tsx
async function handleFollow() {
  await followUser(username!);
  const fresh = await api.getCurrentUser(username!); // raw refresh, no error handling
  setPublicUser(fresh);
}

async function handleUnfollow() {
  await unfollowUser(username!);
  const fresh = await api.getCurrentUser(username!); // duplicated pattern
  setPublicUser(fresh);
}
```

#### Recommended (Good)

Move the refresh into `useProfileData` by accepting an explicit `refresh` callback, or return a `refresh` function from the hook so the page stays at the right abstraction level:

```tsx
// hooks/useProfileData.ts — add a refresh function
export function useProfileData(username: string) {
  // ... existing state
  async function refresh() {
    const fresh = await api.getCurrentUser(username);
    setPublicUser(fresh);
  }
  return { ..., refresh };
}

// Profile.tsx — page knows nothing about the API call
async function handleFollow() {
  await followUser(username!);
  await refresh();
}

async function handleUnfollow() {
  await unfollowUser(username!);
  await refresh();
}
```

**Why this is better**: `Profile.tsx` stays at the page abstraction level — it calls intent-named methods and the mechanics of how state is refreshed live in the hook where they belong. Adding error handling or optimistic updates only requires changing one place.

---

### ARCH-02: ArtistDetail implements a three-step async load inline instead of using a custom hook

**Severity**: Medium
**Principle**: SLA Violation
**Location**: `src/pages/ArtistDetail/ArtistDetail.tsx` (lines 18–49)

Every other detail page in the project (`AlbumDetail`, `ReviewDetail`, `ListDetail`, `Profile`) uses either `useFetch` or a domain hook to keep data-fetching out of the component body. `ArtistDetail` breaks this pattern with a 30-line `useEffect` that manually manages three sequential API calls, three state variables (`artist`, `loading`, `error`), and a cleanup flag — all of which `useFetch` already handles. A reader familiar with the rest of the codebase has to context-switch when they open this file.

#### Current (Bad)

```tsx
// ArtistDetail.tsx — 30 lines of async orchestration in the component
const [artist, setArtist] = useState<ArtistDetails | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
  let isMounted = true;
  setLoading(true);
  async function load() {
    try {
      const initial = await api.getArtistsDetails(artistId);
      if (initial.spotify_id && initial.albums.length === 0) {
        await api.getSpotifyArtist(initial.spotify_id).catch(() => {});
        const synced = await api.getArtistsDetails(artistId);
        if (isMounted) setArtist(synced);
      } else {
        if (isMounted) setArtist(initial);
      }
    } catch { if (isMounted) setError(true); }
    finally { if (isMounted) setLoading(false); }
  }
  load();
  return () => { isMounted = false; };
}, [artistId]);
```

#### Recommended (Good)

```tsx
// hooks/useArtistDetail.ts — encapsulates the Spotify sync logic
export function useArtistDetail(artistId: number) {
  return useFetch<ArtistDetails | null>(
    async () => {
      const initial = await api.getArtistsDetails(artistId);
      if (initial.spotify_id && initial.albums.length === 0) {
        await api.getSpotifyArtist(initial.spotify_id).catch(() => {});
        return api.getArtistsDetails(artistId);
      }
      return initial;
    },
    null,
    [artistId],
  );
}

// ArtistDetail.tsx — back to the standard page pattern
const { data: artist, loading, error } = useArtistDetail(artistId);
```

**Why this is better**: The page component is back to one line of data fetching — consistent with every other detail page in the project. The Spotify sync logic lives in a named hook that can be tested independently and updated without touching the page.

---

### ARCH-03: ListForm defines two sub-components inline rather than as co-located files

**Severity**: Low
**Principle**: SLA Violation
**Location**: `src/pages/Lists/ListForm.tsx` (lines 27–102)

`ListForm.tsx` is 287 lines. The first 100 lines define `SearchResultItem` and `SelectedAlbumItem` — two fully independent, named presentational components — before the `ListForm` function begins. The project convention (stated in `CLAUDE.md` and followed everywhere else) is: co-located sub-components go in their own file. Having three components in one file makes the file harder to scan and obscures that `ListForm` is actually a composition of named sub-components.

#### Current (Bad)

```tsx
// ListForm.tsx — 287 lines, three components in one file
function SearchResultItem({ album, alreadyAdded, onAdd }) { /* 35 lines */ }
function SelectedAlbumItem({ album, onRemove }) { /* 38 lines */ }
export function ListForm({ list }: Props) { /* 185 lines */ }
```

#### Recommended (Good)

```
src/pages/Lists/
  ListForm.tsx          ← only ListForm (now ~185 lines)
  SearchResultItem.tsx  ← named export, its own file
  SelectedAlbumItem.tsx ← named export, its own file
```

```tsx
// ListForm.tsx — imports instead of embedding
import { SearchResultItem } from "./SearchResultItem";
import { SelectedAlbumItem } from "./SelectedAlbumItem";
```

**Why this is better**: `ListForm.tsx` now reads as a form that *composes* album-picker sub-components rather than *defining* them. Consistent with how every other page in the project organizes its co-located components.

---

## Recommendations Summary

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 1 | ARCH-01: Follow refresh bypasses state layer | Low | High |
| 2 | ARCH-02: ArtistDetail async load should be a hook | Low | Medium |
| 3 | ARCH-03: Extract ListForm sub-components to own files | Very Low | Low |

---

## Architecture Health Score

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| Single Level of Abstraction | 4 | Pages and components are clean; ArtistDetail and ListForm are the exceptions |
| Component API Design | 5 | Props are minimal and well-typed throughout; `Button`, `FormField`, `AlbumPickerField` set a good standard |
| Data Flow Clarity | 4 | Dual-state split is excellent; Profile's manual API refresh is the one inconsistency |
| API Abstraction Layer | 5 | Domain objects + `http.ts` primitives + single `api` export is exactly right for this project size |
| App Layout / Shell | 5 | Every page composes `<AppLayout>` itself — correct pattern, no router-level wrapper |
| Code Duplication | 4 | Form error display (`auth__error`) repeated across forms; minor |
| Composition Patterns | 5 | `useFetch` + domain hooks + Redux thunks compose cleanly; `AppDataLoader` bridge is well-designed |
| **Overall** | **4.6** | Solid, production-quality architecture with three focused, low-effort fixes remaining |
