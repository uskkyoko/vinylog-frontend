export function SearchIntro({ query }: { query: string }) {
  return (
    <div className="search-results__intro">
      <p className="eyebrow">Search</p>
      <h1 className="search-results__title">Results for "{query}"</h1>
    </div>
  );
}
