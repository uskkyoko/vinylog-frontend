# Architecture Review Results

> Analyzed on: 2026-03-10
> Project: vinylog-frontend
> Total components analyzed: 53
> Issues found: 3

## Summary

The architecture is in excellent shape — the prop-drilling fix in `Home.tsx` from the previous review is confirmed resolved, Redux slices are clean, the `AppDataLoader` bridge is minimal, and every page correctly composes `AppLayout` itself. Three small issues remain: one is a direct violation of the project's own `Button` convention in `FavouriteAlbumsField`; one is a navigational bug in `ProfileListCard` (relative vs absolute path); and one is a mild SLA leak in `Reviews.tsx` where inline page-header markup was not extracted into a named component.

---

## Issues

### ISSUE-01: `FavouriteAlbumsField` uses a raw `<button>` for the remove action

**Severity**: Low
**Principle**: SLA Violation
**Location**: `src/pages/Settings/FavouriteAlbumsField.tsx:87`

The remove `×` button is a raw `<button type="button" className="settings__remove">` instead of the project's `Button` component. CLAUDE.md explicitly states: *"Do not use `className="btn btn--*"` directly on `<button>` — always use `Button` / `ButtonLink` components."* Every other interactive element in the project uses `Button`; this one is inconsistent and will drift further from the design system if copied.

#### Current (Bad)

```tsx
<button
  type="button"
  className="settings__remove"
  aria-label="Remove album"
  onClick={() => onRemove(album.spotify_id)}
>
  ×
</button>
```

#### Recommended (Good)

```tsx
<Button
  variant="ghost"
  size="sm"
  onClick={() => onRemove(album.spotify_id)}
>
  ×
</Button>
```

**Why this is better**: One calling convention for all interactive elements — consistent with every other removal action in the codebase (`AlbumPickerField`, `SettingsForm`).

---

### ISSUE-02: `ProfileListCard` navigates with a relative path

**Severity**: Low
**Principle**: Poor Component API
**Location**: `src/pages/Profile/ProfileLists.tsx:38`

The "View" link uses `to={\`lists/${list.id}\`}` (no leading slash). React Router treats this as a relative path, so from `/profile` it navigates to `/profile/lists/123` instead of `/lists/123`. Every other list link in the project (`ListCard`, `HomeListItem`, `SearchListsSection`) correctly uses `/lists/${id}`.

#### Current (Bad)

```tsx
<ButtonLink to={`lists/${list.id}`} variant="ghost" size="sm">
  View
</ButtonLink>
```

#### Recommended (Good)

```tsx
<ButtonLink to={`/lists/${list.id}`} variant="ghost" size="sm">
  View
</ButtonLink>
```

**Why this is better**: Absolute path navigates correctly from any route, matching every other list link in the app.

---

### ISSUE-03: `Reviews.tsx` contains inline page-header markup

**Severity**: Low
**Principle**: SLA Violation
**Location**: `src/pages/Reviews/Reviews.tsx`

The page renders its header block inline — raw `<header>`, `<div>`, `<p>`, `<h1>`, and `<ButtonLink>` — rather than composing a named component. Compare `ProfileReviews.tsx`, which handles a structurally identical section as a self-contained named component. `Reviews.tsx` as a page should be a thin composition; instead it mixes layout markup with its data-fetching and rendering logic.

#### Current (Bad)

```tsx
export default function Reviews() {
  // ...
  return (
    <AppLayout>
      <section className="profile">
        <div className="container">
          <header className="profile-section__header">  {/* raw markup */}
            <div>
              <p className="eyebrow">Activity</p>
              <h1 className="profile-section__title">All Reviews</h1>
            </div>
            <ButtonLink to="/profile" variant="ghost" size="sm">Back to profile</ButtonLink>
          </header>
          <div className="profile-reviews">
            {reviews.map((review) => <ReviewCard ... />)}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
```

#### Recommended (Good)

```tsx
// Reviews.tsx — thin shell
export default function Reviews() {
  const reviews = useAppSelector((state) => state.reviews.items);
  if (!user) return null;
  return (
    <AppLayout>
      <section className="profile">
        <div className="container">
          <ReviewsHeader />
          <ReviewsList reviews={reviews} username={user.username} />
        </div>
      </section>
    </AppLayout>
  );
}
```

**Why this is better**: The page is now describable in one sentence using only component names; the header and list are independently readable and reusable.

---

## Components confirmed clean

All 53 components were read and checked. Notable highlights:

- **`Home.tsx`** — No longer imports `useAuth` or passes `user` as a prop; now purely composes data-fetching hooks and layout. ISSUE-02 from the previous review fully resolved.
- **`HomeHero.tsx` / `HomeRecommend.tsx`** — Each now calls `useAuth()` directly; no prop drilling. Clean.
- **`NavBar.tsx`** — `<li>` wrappers confirmed present. ISSUE-03 from the previous review confirmed resolved.
- **`ReviewForm.tsx`** — Clean three-field form; `AlbumPickerField`, `StarRatingField`, `FavouriteTrackField` each at consistent abstraction level.
- **`AlbumPickerField.tsx`** — Clean single-select pattern; selected state renders as a pill, unselected state renders search. Two branches are structurally consistent.
- **`FavouriteAlbumsField.tsx`** — Clean multi-select pattern; only the raw `<button>` (ISSUE-01 above) breaks the convention.
- **`SettingsForm.tsx`** — All five fields use `FormField`; `AvatarUpload` and `FavouriteAlbumsField` correctly extracted as sub-components. Clean.
- **`StatsCard.tsx`** — Reads Redux state directly; no prop drilling. Correct.
- **`AlbumDetailHero.tsx`** — Clean two-button layout; "Write a review" pre-fill link is well-constructed.
- **`AlbumDetailReviews.tsx`** — Passes `album` explicitly to `ReviewCard`; consistent with the current `ReviewCard` API (ISSUE-01 from the previous review — backend fix still pending).
- **`ReviewDetail.tsx`** — `useFetch` for local data, `dispatch(deleteReview)` for mutation. Correct layer separation.
- **`Search.tsx`** — Each section (`SearchArtistsSection`, `SearchAlbumsSection`, etc.) returns `null` when empty; page shell stays clean.
- **`ListCard.tsx`** — `AlbumPreviews` correctly scoped as a private sub-component; `ListCard` is describable in one sentence.
- **`ProfileHeader.tsx`** — `FavouriteAlbums` correctly scoped as a private sub-component.
- **`AppDataLoader`** — Minimal bridge; dispatches exactly three thunks on auth change and nothing else.
- **`listsSlice` / `reviewsSlice` / `usersSlice`** — Thunks cleanly derive all payload from arguments; no `getState()` misuse.

---

## Recommendations Summary

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 1 | ISSUE-02: Fix relative path in `ProfileListCard` | Low | Medium (navigational bug) |
| 2 | ISSUE-01: Replace raw `<button>` with `Button` in `FavouriteAlbumsField` | Low | Low |
| 3 | ISSUE-03: Extract `ReviewsHeader` + `ReviewsList` from `Reviews.tsx` | Low | Low |

---

## Architecture Health Score

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| Single Level of Abstraction | 4 | `Reviews.tsx` inline header and raw `<button>` in `FavouriteAlbumsField` are the only breaches; all other components are clean |
| Component API Design | 5 | Props are minimal and well-typed throughout; callbacks expose the right level of detail |
| Data Flow Clarity | 5 | Auth → Redux → components layering is consistent; no prop drilling remains after ISSUE-02 fix |
| API Abstraction Layer | 5 | `src/api/` domain split is solid; `http.ts` owns all fetch primitives; no direct `fetch` calls in hooks or components |
| App Layout / Shell | 5 | `AppLayout`-inside-page correctly applied on every route |
| Code Duplication | 4 | `AlbumPickerField` and `FavouriteAlbumsField` share structural search-and-select logic; acceptable given different selection semantics (single vs multi), but worth noting |
| Composition Patterns | 5 | Private sub-components correctly scoped; `children` used well in `HomePanel`; Redux slices are clean |
| **Overall** | **4.7** | Excellent architecture — two of the three issues are one-liners; the codebase is in a strong, maintainable state |
