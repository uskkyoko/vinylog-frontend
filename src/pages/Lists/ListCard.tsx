import { Link } from "react-router-dom";
import { ButtonLink } from "../../components/Button";
import type { ListOut } from "../../types";

function AlbumPreviews({ albums }: { albums: ListOut["albums"] }) {
  const albumCount = albums?.length ?? 0;
  if (albumCount === 0) {
    return (
      <div className="list-card__previews list-card__previews--empty">
        <span className="list-card__empty-text">No albums yet</span>
      </div>
    );
  }
  return (
    <>
      <div className="list-card__previews">
        {albums.slice(0, 4).map((album) => (
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
        {albumCount > 4 && (
          <div className="list-card__preview-more list-card__preview-more--desktop">
            <span className="list-card__preview-more-text">+{albumCount - 4}</span>
          </div>
        )}
        {albumCount > 3 && (
          <div className="list-card__preview-more list-card__preview-more--mobile">
            <span className="list-card__preview-more-text">+{albumCount - 3}</span>
          </div>
        )}
      </div>
      <p className="list-card__album-count">
        {albumCount} album{albumCount !== 1 ? "s" : ""}
      </p>
    </>
  );
}

export function ListCard({ list }: { list: ListOut }) {
  return (
    <article className="list-card">
      <div className="list-card__body">
        <h2 className="list-card__title">{list.name}</h2>
        <p className="list-card__description">
          {list.description || "No description yet."}
        </p>

        <AlbumPreviews albums={list.albums} />

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
        <ButtonLink to={`/lists/${list.id}`} variant="ghost" size="sm">
          Open list
        </ButtonLink>
      </div>
    </article>
  );
}
