# Architecture Review Results

> Analyzed on: 2026-03-09
> Project: vinylog-frontend
> Total components analyzed: 36
> Issues found: 3

## Summary

The architecture has improved markedly since the last review — all five previous issues are resolved, Redux slices cleanly replaced `AppStateContext`, and the new `AlbumDetail` and `ReviewDetail` pages follow the same thin-shell + co-located sub-component pattern established by the rest of the app. Three focused issues remain: the most structurally significant is `ReviewCard`'s dual-source album pattern, which silently behaves differently depending on which caller uses it; the other two are a mild prop-drilling case in `Home.tsx` and an invalid HTML structure in `NavBar`.

---

## Issues

### ISSUE-01: `ReviewCard` has two ways to get its album — hidden dual-source logic

**Severity**: Medium
**Principle**: Unclear Data Flow
**Location**: `src/components/ReviewCard/ReviewCard.tsx`

`ReviewCard` accepts an optional `album?: AlbumOut` prop and silently falls back to `review.album` when it is absent: `const displayAlbum = album || review.album`. This means the component behaves differently for two caller groups — `AlbumDetailReviews` passes `album` explicitly (because `review.album` may not be populated from that endpoint), while `ProfileReviews` and `Reviews` omit it and rely on the nested object. A reader of `ReviewCard` cannot tell which album source is authoritative; a reader of any caller cannot tell whether the passed `album` is required or a fallback. When the backend is fixed to always return a populated `review.album`, the prop becomes dead weight that no-one knows to remove.

#### Current (Bad)

```tsx
export function ReviewCard({ review, username, album }: {
  review: ReviewOut;
  username: string;
  album?: AlbumOut;        // optional — but why?
}) {
  const displayAlbum = album || review.album;   // silent dual-source
  // ...
}

// AlbumDetailReviews.tsx — must pass album because review.album is flat
<ReviewCard review={review} username={review.user.username} album={album} />

// ProfileReviews.tsx — omits it, relies on review.album being populated
<ReviewCard review={review} username={username} />
```

#### Recommended (Good)

Fix the backend's `GET /reviews/{id}` to always return the nested `album` object (as `GET /users/{username}/reviews` already does), then remove the optional prop:

```tsx
export function ReviewCard({ review, username }: {
  review: ReviewOut;    // review.album is always populated
  username: string;
}) {
  // review.album is the single source of truth
}

// AlbumDetailReviews.tsx — no need to pass album separately
<ReviewCard key={review.id} review={review} username={review.user.username} />
```

**Why this is better**: One component, one data source, one calling convention — no invisible behavioral difference between callers.

---

### ISSUE-02: `Home.tsx` prop-drills `user` to components that can read it themselves

**Severity**: Low
**Principle**: Unclear Data Flow
**Location**: `src/pages/Home/Home.tsx`

`Home.tsx` calls `useAuth()` to get `user`, then passes it as a prop to both `HomeHero` and `HomeRecommend`. Both components are auth-aware by design — `HomeHero` uses `user` to choose between `StatsCard` and `GuestCard`, and `HomeRecommend` returns `null` when `user` is absent. Neither component is ever rendered outside of an `AuthProvider`-wrapped tree, so both can call `useAuth()` directly and eliminate the prop entirely. The current pattern adds a coupling layer to `Home.tsx` that it doesn't need to own.

#### Current (Bad)

```tsx
// Home.tsx
export default function Home() {
  const { user } = useAuth();   // fetched here...
  // ...
  return (
    <AppLayout>
      <HomeHero user={user} />           {/* ...passed down */}
      <HomePanels ... />
      <HomeRecommend user={user} />      {/* ...and again */}
    </AppLayout>
  );
}

// HomeRecommend.tsx
export function HomeRecommend({ user }: { user: UserOut | null }) {
  if (!user) return null;
  // ...
}
```

#### Recommended (Good)

```tsx
// Home.tsx — no longer needs to know about auth
export default function Home() {
  const { data: featuredAlbums } = useFeaturedAlbums();
  const { data: trendingArtists } = useArtists();
  const { data: communityLists } = useLists();

  return (
    <AppLayout>
      <HomeHero />
      <HomePanels featuredAlbums={featuredAlbums} ... />
      <HomeRecommend />
    </AppLayout>
  );
}

// HomeRecommend.tsx — reads its own dependency
export function HomeRecommend() {
  const { user } = useAuth();
  if (!user) return null;
  // ...
}
```

**Why this is better**: Each component declares the dependencies it actually uses; `Home.tsx` is reduced to pure composition of its data-fetching and layout concerns.

---

### ISSUE-03: `NavBar` renders `<Link>` elements directly inside `<ul>` without `<li>` wrappers

**Severity**: Low
**Principle**: SLA Violation
**Location**: `src/components/NavBar/NavBar.tsx`

The `navbar__menu` `<ul>` element contains `<Link>` (which renders as `<a>`) directly as children. The HTML spec requires that `<ul>` contains only `<li>` elements. This produces invalid HTML, breaks screen-reader list semantics, and could cause unexpected behaviour with accessibility tooling.

#### Current (Bad)

```tsx
<ul className="navbar__menu">
  <Link to="/" className="navbar__link">Home</Link>
  <Link to="/albums" className="navbar__link">Albums</Link>
  <Link to="/lists" className="navbar__link">Lists</Link>
  <Link to="/profile" className="navbar__link">Profile</Link>
</ul>
```

#### Recommended (Good)

```tsx
<ul className="navbar__menu">
  <li><Link to="/" className="navbar__link">Home</Link></li>
  <li><Link to="/albums" className="navbar__link">Albums</Link></li>
  <li><Link to="/lists" className="navbar__link">Lists</Link></li>
  <li><Link to="/profile" className="navbar__link">Profile</Link></li>
</ul>
```

**Why this is better**: Valid HTML, correct list semantics, screen-reader compatibility.

---

## Components confirmed clean

Every other component was read and checked. Notable clean components:

- **`AuthContext.tsx`** — `useReducer` auth state with clean action dispatch; `followUser` / `unfollowUser` correctly refresh user from `GET /users/me` after mutation.
- **`AppDataLoader`** — minimal bridge between `AuthContext` and Redux; dispatches exactly the three required thunks when `status === 'authed'`.
- **`listsSlice` / `reviewsSlice` / `usersSlice`** — clean RTK slices; all async thunks correctly derive payload from args rather than `getState()`, avoiding circular type dependencies.
- **`SettingsForm.tsx`** — consistent abstraction: all fields use `FormField`, avatar uses `AvatarUpload`, favourites use `FavouriteAlbumsField`; no mixed levels.
- **`ListCard.tsx`** — `AlbumPreviews` correctly extracted as a private component; `ListCard` is describable in one sentence.
- **`AlbumCarousel.tsx`** — scroll controls use `Button`; no raw `<button>` elements.
- **`Login.tsx` / `Signup.tsx`** — each owns exactly one form and one submit handler; no `mode` prop.
- **`ReviewDetailCard.tsx`** — clean two-column layout; owner actions correctly gated behind `isOwner`.
- **`ProfileHeader.tsx`** — `FavouriteAlbums` correctly scoped as a private sub-component.
- **`HomePanels.tsx`** / **`HomePanel.tsx`** / **`HomeListItem`** — three-level composition that reads naturally.

---

## Recommendations Summary

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 1 | ISSUE-01: Remove `album` optional prop from `ReviewCard` (fix backend first) | Low | Medium |
| 2 | ISSUE-02: `HomeHero` and `HomeRecommend` call `useAuth()` directly | Low | Low |
| 3 | ISSUE-03: Wrap `NavBar` links in `<li>` elements | Low | Low |

---

## Architecture Health Score

| Criterion | Score (1-5) | Notes |
|-----------|-------------|-------|
| Single Level of Abstraction | 5 | All pages and child components operate at consistent abstraction levels; no raw HTML blocks in pages |
| Component API Design | 4 | Props are minimal and well-typed throughout; `ReviewCard` dual-source album is the one rough edge |
| Data Flow Clarity | 4 | Redux + AuthContext split is clean; `user` prop drilling in Home and `album` dual-source in ReviewCard are the remaining spots |
| API Abstraction Layer | 5 | `src/api/` domain split is solid; all fetch calls go through `http.ts` primitives; no direct `fetch` calls in hooks or components |
| App Layout / Shell | 5 | `AppLayout`-inside-page applied correctly on every route including the two new detail pages |
| Code Duplication | 5 | No structural duplication found; `ReviewCard` shared across Profile, Reviews, and AlbumDetail correctly |
| Composition Patterns | 5 | Private sub-components correctly scoped; `children` used well in `HomePanel`; Redux slices clean |
| **Overall** | **4.7** | Excellent architecture — the three remaining issues are all low-effort and localized; the codebase is in a strong, maintainable state |
