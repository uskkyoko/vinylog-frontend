# Vinyl & Artist Discovery

CrateDigger is a modern React application built for music enthusiasts to track albums, follow trending artists, and curate community lists. The project focuses on clean architecture, modular component design, and robust data-fetching patterns using TypeScript.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Testing:** Vitest + React Testing Library
- **Routing:** React Router DOM
- **Styling:** CSS3 (Component-based architecture)

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

### AI usage

1. Decomposition of styles
2. Decomposition of component on the home page, etc
3. Synchronization with the vinylog api
4. Memory leak prevention for the custom hook
5. Adapting existing pydantic schemas for types.ts to maintain the consistency with the api
