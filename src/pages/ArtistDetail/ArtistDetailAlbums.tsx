import { Link } from "react-router-dom";
import type { ArtistAlbumSummary } from "../../types";

export function ArtistDetailAlbums({
  albums,
}: {
  albums: ArtistAlbumSummary[];
}) {
  if (albums.length === 0) {
    return <p>No albums found for this artist yet.</p>;
  }

  return (
    <div className="artist-albums">
      <div className="artist-albums__header">
        <h2 className="artist-albums__title">Albums ({albums.length})</h2>
      </div>
      <div className="artist-albums__grid">
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/albums/${album.spotify_id}`}
            className="artist-albums__item"
          >
            <div className="artist-albums__item-image-wrapper">
              {album.cover_url ? (
                <img
                  src={album.cover_url}
                  alt={album.title}
                  className="artist-albums__item-image"
                />
              ) : (
                <div className="artist-albums__item-image artist-albums__item-image--placeholder" />
              )}
            </div>
            <div className="artist-albums__item-info">
              <p className="artist-albums__item-title">{album.title}</p>
              <p className="artist-albums__item-year">
                {album.release_date?.slice(0, 4)}
              </p>
              {album.average_rating != null && (
                <p className="artist-albums__item-rating">
                  ★ {album.average_rating.toFixed(1)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
