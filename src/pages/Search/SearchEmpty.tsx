export function SearchEmpty({ query }: { query: string }) {
  return (
    <div className="search-results__empty">
      <p className="search-results__empty-text">
        No results found for "{query}".
      </p>
    </div>
  );
}
