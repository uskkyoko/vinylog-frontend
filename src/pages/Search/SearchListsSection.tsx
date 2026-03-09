import { Link } from "react-router-dom";
import type { ListSearchResult } from "../../types";

function SearchListCard({ list }: { list: ListSearchResult }) {
  return (
    <div className="card search-results__list-card">
      <h3 className="search-results__list-title">
        <Link to={`/lists/${list.id}`} className="search-results__list-link">
          {list.name}
        </Link>
      </h3>
      <p className="search-results__list-meta">by {list.user.username}</p>
    </div>
  );
}

export function SearchListsSection({ lists }: { lists: ListSearchResult[] }) {
  if (lists.length === 0) return null;
  return (
    <section className="search-results__section">
      <h2 className="search-results__section-title">Curated Lists</h2>
      <div className="grid grid--three">
        {lists.map((list) => (
          <SearchListCard key={list.id} list={list} />
        ))}
      </div>
    </section>
  );
}
