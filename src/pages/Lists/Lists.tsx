import { Link } from "react-router-dom";
import "./Lists.css";
import { useLists } from "../../hooks/useLists";

export default function Lists() {
  const { data: lists, loading } = useLists();

  if (loading || !lists) {
    return (
      <section className="profile">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="lists-page">
      <div className="container">
        <header className="lists-page__intro">
          <p className="eyebrow">Community crates</p>
          <h1 className="lists-page__title">Lists</h1>
          <p className="lists-page__subtitle">
            See what collectors are sequencing—curated journeys through genre,
            mood, and moment.
          </p>
        </header>

        <div className="lists-page__grid">
          {lists.map((list) => (
            <article key={list.id} className="list-card">
              <div className="list-card__body">
                <h2 className="list-card__title">{list.name}</h2>
                <p className="list-card__description">
                  {list.description || "No description yet."}
                </p>

                {(list.albums?.length ?? 0) > 0 ? (
                  <>
                    <div className="list-card__previews">
                      {list.albums.slice(0, 4).map((album) => (
                        <Link
                          key={album.id}
                          to={`/albums/${album.id}`}
                          className="list-card__preview-item"
                        >
                          <img
                            src={album.cover_url ?? ""}
                            alt={album.title}
                            className="list-card__preview-image"
                          />
                        </Link>
                      ))}
                      {(list.albums?.length ?? 0) > 4 && (
                        <div className="list-card__preview-more list-card__preview-more--desktop">
                          <span className="list-card__preview-more-text">
                            +{list.albums.length - 4}
                          </span>
                        </div>
                      )}
                      {(list.albums?.length ?? 0) > 3 && (
                        <div className="list-card__preview-more list-card__preview-more--mobile">
                          <span className="list-card__preview-more-text">
                            +{list.albums.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="list-card__album-count">
                      {list.albums.length} album
                      {list.albums.length !== 1 ? "s" : ""}
                    </p>
                  </>
                ) : (
                  <div className="list-card__previews list-card__previews--empty">
                    <span className="list-card__empty-text">No albums yet</span>
                  </div>
                )}

                <div className="list-card__meta">
                  <span className="list-card__author">
                    by{" "}
                    <Link
                      to={`/profile/${list.user.username}`}
                      className="list-card__author-link"
                    >
                      {list.user.username}
                    </Link>
                  </span>
                </div>
              </div>
              <div className="list-card__actions">
                <Link
                  to={`/lists/${list.id}`}
                  className="btn btn--ghost btn--sm"
                >
                  Open list
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
